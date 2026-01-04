import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  User,
  ClipboardCopy,
  LogOut,
} from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
// import './Header.css';

import { useAuthStore } from '../../store/authStore';
import { useToast } from '../toast/ToastProvider';
import { userApi } from '../../api/userApi';
import Loader from '../loader/Loader';

const Header = () => {
  const location = useLocation();
  const [isUserBoxOpen, setUserBoxOpen] = useState(false);
  const userBoxRef = useRef<HTMLDivElement>(null);
  const { user, logout } = useAuthStore();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const navLinks = [
    {
      to: '/dashboard',
      label: 'Dashboard',
      icon: <LayoutDashboard size={18} />,
    },
    { to: '/groups', label: 'Groups', icon: <Users size={18} /> },
  ];

  const handleCopyId = () => {
    if (!user) return;
    navigator.clipboard.writeText(user?._id);
    toast.success('User ID copied to clipboard!');
  };

  const handleSignOut = async () => {
    try {
      setIsLoading(true);
      await userApi.signOut();
      logout();
      toast.success('Signed out.');
    } catch (error: any) {
      toast.error(error.message || 'Failed to sign out.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        userBoxRef.current &&
        !userBoxRef.current.contains(e.target as Node)
      ) {
        setUserBoxOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-gray-900 text-white border-b border-gray-800">

      <div className="flex items-center">
        <h1 className="text-2xl font-bold tracking-wide">
  Smart<span className="text-yellow-400">Todo</span>
</h1>

      </div>

      <nav className="flex items-center gap-6">
        {navLinks.map(({ to, label, icon }) => (
          <Link
            key={to}
            to={to}
            className={`flex items-center gap-2 text-sm font-medium transition-colors ${
  location.pathname === to
    ? 'text-yellow-400'
    : 'text-gray-300 hover:text-white'
}`}
          >
            {icon}
            <span>{label}</span>
          </Link>
        ))}

        <div className="relative" ref={userBoxRef}>
          <button
            className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-800 text-gray-200 hover:bg-gray-700 hover:text-white transition-colors"

            onClick={() => setUserBoxOpen((prev) => !prev)}
          >
            <User size={20} />
          </button>

          {isUserBoxOpen && (
            <div className="absolute right-0 mt-2 w-64 rounded-lg bg-gray-900 border border-gray-800 shadow-lg p-4 space-y-2">
              <p className="text-sm font-semibold text-white">{user?.name}</p>
              <p className="text-xs text-gray-400">{user?.email}</p>
              <div className="flex items-center justify-between gap-2 text-xs text-gray-300">
                <span className="truncate">{user?._id}</span>
                <button onClick={handleCopyId}
  className="p-1 rounded hover:bg-gray-800 transition">
                  <ClipboardCopy size={16} />
                </button>
              </div>
              <button
                disabled={isLoading}
                onClick={handleSignOut}
                className="flex items-center justify-center gap-2 w-full mt-2 px-3 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition disabled:opacity-50"
                
              >
                {isLoading ? (
                  <Loader />
                ) : (
                  <>
                    <LogOut size={16} />
                    <span>Sign out</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
