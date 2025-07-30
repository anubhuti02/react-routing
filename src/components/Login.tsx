import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { User } from '../types';

const Login: React.FC = () => {
  const { login } = useApp();
  const [role, setRole] = useState<'teacher' | 'student'>('student');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && email.trim()) {
      const user: User = {
        id: Date.now().toString(),
        name: name.trim(),
        email: email.trim(),
        role,
      };
      login(user);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Quiz App Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Role:</label>
            <div className="role-selector">
              <button
                type="button"
                className={`role-btn ${role === 'student' ? 'active' : ''}`}
                onClick={() => setRole('student')}
              >
                Student
              </button>
              <button
                type="button"
                className={`role-btn ${role === 'teacher' ? 'active' : ''}`}
                onClick={() => setRole('teacher')}
              >
                Teacher
              </button>
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Enter your name"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>
          
          <button type="submit" className="login-btn">
            Login as {role}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;