// Signed admin session tokens (HMAC-SHA256 via Web Crypto).
// Works in both proxy.js and server code. Token format: base64url(payload).base64url(signature)

export const SESSION_COOKIE = 'admin_session';
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

const te = new TextEncoder();

function b64url(bytes) {
  let s = '';
  for (const b of bytes) s += String.fromCharCode(b);
  return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function fromB64url(str) {
  const s = atob(str.replace(/-/g, '+').replace(/_/g, '/'));
  return Uint8Array.from(s, (c) => c.charCodeAt(0));
}

function secret() {
  const s = process.env.ADMIN_SESSION_SECRET;
  if (!s || s.length < 32) throw new Error('ADMIN_SESSION_SECRET must be set (at least 32 characters).');
  return s;
}

async function hmacKey() {
  return crypto.subtle.importKey('raw', te.encode(secret()), { name: 'HMAC', hash: 'SHA-256' }, false, [
    'sign',
    'verify',
  ]);
}

export async function createSessionToken() {
  const payload = b64url(te.encode(JSON.stringify({ exp: Date.now() + SESSION_MAX_AGE * 1000 })));
  const sig = new Uint8Array(await crypto.subtle.sign('HMAC', await hmacKey(), te.encode(payload)));
  return `${payload}.${b64url(sig)}`;
}

export async function verifySessionToken(token) {
  try {
    if (!token || typeof token !== 'string') return false;
    const [payload, sig] = token.split('.');
    if (!payload || !sig) return false;
    const ok = await crypto.subtle.verify('HMAC', await hmacKey(), fromB64url(sig), te.encode(payload));
    if (!ok) return false;
    const { exp } = JSON.parse(new TextDecoder().decode(fromB64url(payload)));
    return typeof exp === 'number' && Date.now() < exp;
  } catch {
    return false;
  }
}

/** Constant-time password check (compares HMAC digests so lengths don't leak). */
export async function passwordMatches(input) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected || typeof input !== 'string') return false;
  const key = await hmacKey();
  const [a, b] = await Promise.all([
    crypto.subtle.sign('HMAC', key, te.encode(input)),
    crypto.subtle.sign('HMAC', key, te.encode(expected)),
  ]);
  const x = new Uint8Array(a);
  const y = new Uint8Array(b);
  let diff = 0;
  for (let i = 0; i < x.length; i++) diff |= x[i] ^ y[i];
  return diff === 0;
}

export function isAdminConfigured() {
  return Boolean(process.env.ADMIN_PASSWORD && (process.env.ADMIN_SESSION_SECRET || '').length >= 32);
}
