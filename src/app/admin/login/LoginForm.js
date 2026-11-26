'use client';

import { useActionState } from 'react';
import { login } from '../actions';

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(login, null);
  return (
    <form className="admin-login" action={formAction}>
      <h1>Admin login</h1>
      <p>Manage 3D Matrix products.</p>
      {state?.error && <div className="admin-notice error">{state.error}</div>}
      <div className="admin-field">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          className="admin-input"
          autoComplete="current-password"
          required
          autoFocus
        />
      </div>
      <button type="submit" className="admin-btn primary" style={{ width: '100%' }} disabled={pending}>
        {pending ? 'Checking…' : 'Log in'}
      </button>
    </form>
  );
}
