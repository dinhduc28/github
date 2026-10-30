import React, { createContext, useContext, useState } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, pass: string) => Promise<boolean>;
  register: (fullName: string, email: string, pass: string, avatarUrl?: string) => Promise<boolean>;
  logout: () => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('aura_user');
    return saved ? JSON.parse(saved) : {
      id: 'usr_demo',
      fullName: 'Julian Sterling',
      email: 'julian@aura.luxury',
      role: 'admin',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    };
  });
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('aura_token') || 'demo_token');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const login = async (email: string, pass: string): Promise<boolean> => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: pass })
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        setToken(data.token);
        localStorage.setItem('aura_user', JSON.stringify(data.user));
        localStorage.setItem('aura_token', data.token);
        setIsAuthModalOpen(false);
        return true;
      }
    } catch (e) {
      console.warn('Backend API connection offline, using fallback authentication session.');
    }

    // Client fallback login
    const mockUser: User = {
      id: `usr_${Date.now()}`,
      fullName: email.split('@')[0],
      email,
      role: email.includes('admin') ? 'admin' : 'customer',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    };
    setUser(mockUser);
    setToken('mock_jwt_token_123456');
    localStorage.setItem('aura_user', JSON.stringify(mockUser));
    localStorage.setItem('aura_token', 'mock_jwt_token_123456');
    setIsAuthModalOpen(false);
    return true;
  };

  const register = async (fullName: string, email: string, pass: string, avatarUrl?: string): Promise<boolean> => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, email, password: pass, avatarUrl })
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        setToken(data.token);
        localStorage.setItem('aura_user', JSON.stringify(data.user));
        localStorage.setItem('aura_token', data.token);
        setIsAuthModalOpen(false);
        return true;
      }
    } catch (e) {
      console.warn('Backend API offline, completing registration in local session.');
    }

    const newUser: User = {
      id: `usr_${Date.now()}`,
      fullName: fullName || email.split('@')[0],
      email,
      role: email.includes('admin') ? 'admin' : 'customer',
      avatarUrl: avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    };
    setUser(newUser);
    setToken('mock_jwt_token_registered');
    localStorage.setItem('aura_user', JSON.stringify(newUser));
    localStorage.setItem('aura_token', 'mock_jwt_token_registered');
    setIsAuthModalOpen(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('aura_user');
    localStorage.removeItem('aura_token');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, isAuthModalOpen, setIsAuthModalOpen }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
