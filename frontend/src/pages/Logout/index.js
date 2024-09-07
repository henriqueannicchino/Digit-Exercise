import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('id');
    localStorage.removeItem('name');
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    localStorage.clear();

    
    navigate('/');
  }, [navigate]);

  return null;
};

export default Logout;