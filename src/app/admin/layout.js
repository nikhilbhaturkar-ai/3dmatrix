import './admin.css';

export const metadata = {
  title: 'Admin · 3D Matrix',
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }) {
  return <div className="admin-shell">{children}</div>;
}
