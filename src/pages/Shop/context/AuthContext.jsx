import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();

  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem('user_user') || 'null')
  );

  const login = (token, userData) => {
    localStorage.setItem('user_token', token);
    localStorage.setItem('user_user', JSON.stringify(userData));
    setUser(userData);
    navigate('/orders');
  };

  const logout = () => {
    localStorage.removeItem('user_token');
    localStorage.removeItem('user_user');
    setUser(null);
    navigate('/login');
  };

  const updateUser = (newData) => {
    const updated = { ...user, ...newData };
    localStorage.setItem('user_user', JSON.stringify(updated));
    setUser(updated);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);