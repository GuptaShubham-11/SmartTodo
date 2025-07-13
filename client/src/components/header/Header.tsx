import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  User,
  ClipboardCopy,
  LogOut,
} from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import './Header.css';
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
    <header className="header">
      <div className="header-left">
        <h1 className="header-logo">
          Smart<span>Todo</span>
        </h1>
      </div>

      <nav className="header-nav">
        {navLinks.map(({ to, label, icon }) => (
          <Link
            key={to}
            to={to}
            className={`header-link ${location.pathname === to ? 'active' : ''}`}
          >
            {icon}
            <span className="link-label">{label}</span>
          </Link>
        ))}

        <div className="user-menu" ref={userBoxRef}>
          <button
            className="user-icon-btn"
            onClick={() => setUserBoxOpen((prev) => !prev)}
          >
            <User size={20} />
          </button>

          {isUserBoxOpen && (
            <div className="user-dropdown">
              <p className="user-name">{user?.name}</p>
              <p className="user-email">{user?.email}</p>
              <div className="user-id-row">
                <span className="user-id">{user?._id}</span>
                <button className="copy-btn" onClick={handleCopyId}>
                  <ClipboardCopy size={16} />
                </button>
              </div>
              <button
                disabled={isLoading}
                className="signout-btn"
                onClick={handleSignOut}
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
