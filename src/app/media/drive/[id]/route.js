import { downloadPhoto, isGoogleConfigured } from '@/lib/google';

// Serves product photos stored in the owner's Google Drive.
// The app only has access to files it uploaded itself (drive.file scope), so
// this cannot be used to read any other file in the Drive. Responses are
// cached by the CDN for a year: a Drive file id always points to the same photo.

const ID = /^[A-Za-z0-9_-]{10,100}$/;

export async function GET(_request, { params }) {
  const { id } = await params;
  if (!ID.test(id) || !isGoogleConfigured()) return new Response('Not found', { status: 404 });

  let res;
  try {
    res = await downloadPhoto(id);
  } catch {
    return new Response('Photo unavailable', { status: 502 });
  }
  if (!res.ok) return new Response('Not found', { status: res.status === 404 || res.status === 403 ? 404 : 502 });

  const type = res.headers.get('content-type') || 'application/octet-stream';
  if (!type.startsWith('image/')) return new Response('Not found', { status: 404 });

  return new Response(res.body, {
    headers: {
      'Content-Type': type,
      'Cache-Control': 'public, max-age=31536000, s-maxage=31536000, immutable',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}
