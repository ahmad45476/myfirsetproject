import { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // تحميل بيانات المستخدم عند التهيئة
  useEffect(() => {
    const user = localStorage.getItem('artAppUser');
    const token = localStorage.getItem('artAppToken');
    
    if (user && token) {
      try {
       
       
      } catch (error) {
        console.error('Error parsing user data', error);
        logout();
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:4000/login', {
        email,
        password
      });
      
      
      const { user, token } = response.data;
      
      // حفظ البيانات في localStorage
      localStorage.setItem('artAppUser', user);
      localStorage.setItem('artAppToken', token);
      localStorage.setItem('userData', JSON.stringify(response.data));
      console.log(response.data);
      
      
      
      // تعيين الهيدر الافتراضي لطلبات axios

      
      setCurrentUser(user);
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'فشل تسجيل الدخول'
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('artAppUser');
    localStorage.removeItem('artAppToken');
    delete axios.defaults.headers.common['Authorization'];
    setCurrentUser(null);
    navigate('/login');
  };

  const value = {
    currentUser,
    login,
    logout,
    isAuthenticated: !!currentUser
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}