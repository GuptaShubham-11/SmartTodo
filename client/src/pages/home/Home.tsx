import { useEffect } from 'react';
import {
  Move,
  Users,
  Clock,
  BarChart2,
  XCircle,
  X,
  CheckCircle,
  Check,
  PlayCircle,
  Twitter,
  Linkedin,
  Github,
} from 'lucide-react';
import './Home.css';
import { KanbanBoard, FeatureCard, ComparisonCard } from '../../components';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const animateOnScroll = () => {
      const elements = document.querySelectorAll('.fade-in, .slide-in');
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.85) {
          el.classList.add('active');
        }
      });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();

    return () => window.removeEventListener('scroll', animateOnScroll);
  }, []);

  return (
    <div className="landing">
      {/* Header */}
      <header className="header">
        <a href="#" className="logo">
          SmartTodo
        </a>
        <div className="btn-group">
          <button
            onClick={() => navigate('/signin')}
            className="btn btn--secondary"
          >
            Sign In
          </button>
          <button
            onClick={() => navigate('/signup')}
            className="btn btn--accent"
          >
            Get Started
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="hero">
        <div className="hero__content fade-in">
          <h1>Kanban Reimagined for Modern Teams</h1>
          <p>Streamline your workflow, collaborate effectively.</p>
          <div className="hero__buttons">
            <button
              onClick={() => navigate('/signup')}
              className="btn btn--accent"
            >
              Try SmartTodo Free
            </button>
            <button
              className="btn btn--secondary"
              onClick={() =>
                document
                  .getElementById('preview')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              <PlayCircle size={18} /> Watch Demo
            </button>
          </div>
        </div>
        <div className="hero__visual fade-in">
          <img src="./KanbanBoard.svg" alt="Modern Kanban Board" />
        </div>
      </section>

      {/* Kanban Preview */}
      <section id="preview" className="preview fade-in">
        <KanbanBoard />
      </section>

      {/* Features */}
      <section id="features" className="features">
        <h2 className="section-title slide-in">Powerful Features</h2>
        <div className="features__grid">
          <FeatureCard
            icon={<Move />}
            title="Drag & Drop"
            description="Effortless task organization with drag-and-drop functionality."
          />
          <FeatureCard
            icon={<Users />}
            title="Team Collaboration"
            description="Real-time updates for seamless teamwork."
          />
          <FeatureCard
            icon={<Clock />}
            title="Time Tracking"
            description="Task management with accurate time tracking."
          />
          <FeatureCard
            icon={<BarChart2 />}
            title="Analytics"
            description="Detailed insights for informed decision-making."
          />
        </div>
      </section>

      {/* Comparison */}
      <section id="compare" className="compare">
        <h2 className="section-title slide-in">Why SmartTodo Stands Out</h2>
        <div className="compare__grid">
          <ComparisonCard
            title="Traditional Tools"
            icon={<XCircle />}
            items={[
              { icon: <X />, text: 'Static, non-interactive boards' },
              { icon: <X />, text: 'Limited customization options' },
              { icon: <X />, text: 'No real-time collaboration' },
              { icon: <X />, text: 'Cluttered user interface' },
              { icon: <X />, text: 'Mobile experience lacking' },
            ]}
            type="competitor"
          />
          <ComparisonCard
            title="SmartTodo"
            icon={<CheckCircle />}
            items={[
              { icon: <Check />, text: 'Dynamic, interactive boards' },
              { icon: <Check />, text: 'Fully customizable workflows' },
              { icon: <Check />, text: 'Real-time team collaboration' },
              { icon: <Check />, text: 'Clean, modern interface' },
              { icon: <Check />, text: 'Flawless mobile experience' },
            ]}
            type="smarttodo"
          />
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="cta fade-in">
        <h2>Start Your Productivity Journey</h2>
        <p>
          Join thousands of teams using SmartTodo to visualize workflows and
          deliver projects faster.
        </p>
        <button onClick={() => navigate('/signup')} className="btn btn--accent">
          Create Your First Board
        </button>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer__content">
          <div className="footer__links">
            <a href="#" className="footer__link">
              About
            </a>
            <a href="#" className="footer__link">
              Careers
            </a>
            <a href="#" className="footer__link">
              Blog
            </a>
            <a href="#" className="footer__link">
              Help Center
            </a>
            <a href="#" className="footer__link">
              API
            </a>
            <a href="#" className="footer__link">
              Status
            </a>
          </div>
          <div className="footer__socials">
            <a href="https://x.com/GuptaShubham91" className="social__icon">
              <Twitter size={18} />
            </a>
            <a
              href="https://leetcode.com/GuptaShubham-11/"
              className="social__icon"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="https://github.com/GuptaShubham-11"
              className="social__icon"
            >
              <Github size={18} />
            </a>
          </div>
          <div className="footer__copyright">
            © 2025 SmartTodo. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
