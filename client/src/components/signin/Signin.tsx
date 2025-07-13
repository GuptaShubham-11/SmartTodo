import { Mail, Lock, DoorClosedLocked, DoorOpen } from 'lucide-react';
import './Signin.css';
import { useState } from 'react';
import Loader from '../loader/Loader';
import { userApi } from '../../api/userApi';
import { useToast } from '../toast/ToastProvider';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

const Signin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await userApi.signIn(formData);
      login(response.data.user);
      toast.success('Signin successful!');
      navigate('/dashboard');
    } catch (err: any) {
      toast.error(err.message || 'Signin failed!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signin-container">
      <form className="signin-form" onSubmit={handleSubmit}>
        <h2>Welcome Back</h2>

        <div className="input-group">
          <Mail size={18} />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInput}
            required
          />
        </div>

        <div className="input-group">
          <Lock size={18} />
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInput}
            minLength={8}
            maxLength={12}
            required
          />
          <span
            className="show-password"
            role="button"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? (
              <DoorClosedLocked size={18} />
            ) : (
              <DoorOpen size={18} />
            )}
          </span>
        </div>

        <button type="submit" disabled={isLoading}>
          {isLoading ? <Loader /> : 'Sign In'}
        </button>

        <p className="signup-link">
          No Account? <Link to="/signup">Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

export default Signin;
