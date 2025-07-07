import { Mail, Lock, User, Pencil, Check, Square, DoorClosedLocked, DoorOpen } from 'lucide-react';
import './Signup.css';
import { useState } from 'react';
import Loader from '../loader/Loader';
import { userApi } from '../../api/userApi';
import { useToast } from '../toast/ToastProvider';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const toast = useToast();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await userApi.signUp(formData);

            toast.success('Signup successful!');
            navigate('/signin');
        } catch (err: any) {
            toast.error(err.message || 'Signup failed!');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="signup-container">
            {/* Left Side */}
            <div className="signup-left">
                <div className="shapes">
                    <Square className="shape square" size={32} />
                    <Pencil className="shape pencil" size={28} />
                    <Check className="shape check" size={28} />
                    <div className="circle"></div>
                    <div className="dot"></div>
                </div>
                <div className="left-content">
                    <h1>Welcome to <span>SmartTodo</span></h1>
                    <p>Your intelligent Kanban task assistant.</p>
                </div>
            </div>

            {/* Right Side */}
            <div className="signup-right">
                <form className="signup-form" onSubmit={handleSubmit}>
                    <h2>Create Account</h2>

                    <div className="input-group">
                        <User size={18} />
                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={handleInput}
                            required
                        />
                    </div>

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
                            required
                        />
                        <span className="show-password" role="button" onClick={() => setShowPassword(prev => !prev)}>
                            {showPassword ? <DoorClosedLocked size={18} /> : <DoorOpen size={18} />}
                        </span>
                    </div>

                    <button type="submit" disabled={isLoading}>
                        {isLoading ? <Loader /> : 'Sign Up'}
                    </button>

                    <p className="signin-link">
                        Already have an account? <a href="/signin">Sign In</a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Signup;
