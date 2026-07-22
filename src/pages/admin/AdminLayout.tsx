import { Outlet, Link, useLocation } from 'react-router-dom';
import { Home, FileText, PlusCircle, Settings } from 'lucide-react';

export default function AdminLayout() {
  const location = useLocation();

  const menu = [
    { name: 'Dashboard', path: '/admin', icon: <Home className="w-5 h-5" /> },
    { name: 'All Blogs', path: '/admin/blogs', icon: <FileText className="w-5 h-5" /> },
    { name: 'Add New Blog', path: '/admin/blogs/new', icon: <PlusCircle className="w-5 h-5" /> },
    { name: 'Back to Website', path: '/', icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-ivory flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-line shadow-sm flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-line">
          <span className="font-serif text-xl text-ink font-semibold">Admin Panel</span>
        </div>
        <nav className="flex-1 py-6 px-4 flex flex-col gap-2">
          {menu.map((item) => {
            const isActive = location.pathname === item.path || (item.path !== '/admin' && item.path !== '/' && location.pathname.startsWith(item.path));
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive 
                    ? 'bg-pine text-white shadow-md' 
                    : 'text-ink-soft hover:bg-ivory/50 hover:text-ink'
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-line px-8 flex items-center justify-between shadow-sm z-10">
          <h2 className="text-lg font-medium text-ink">Content Management</h2>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-brass-bright flex items-center justify-center text-pine font-bold text-sm">
              AD
            </div>
            <span className="text-sm font-medium text-ink-soft">Admin User</span>
          </div>
        </header>
        <div className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
