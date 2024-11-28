
import React, { useEffect, useState, useContext } from 'react';

import axios from 'axios';
import { AuthContext } from '../auth/AuthContext';

const AdminCheck = () => { 
  const { token } = useContext(AuthContext);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    if (token) {
      console.log(token);
      axios({
        method: 'get',
        url: `${import.meta.env.VITE_BACKEND_URL}/scope-example/protectedadmin`,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(response => {
          setStatus(response.data.message);
        })
        .catch(error => {
          setStatus(error.message);
        });
    } else {
      setStatus("No token found");
    }
  }, [token]);  // Add 'token' as a dependency

  return (
    <div>
      {status}
    </div>
  );
}

export default AdminCheck;
