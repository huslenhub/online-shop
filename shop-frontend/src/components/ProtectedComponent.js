// src/components/ProtectedComponent.js
import React, { useEffect, useState } from 'react';

const ProtectedComponent = () => {
  const [data, setData] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/protected-route', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // 저장된 토큰 포함
          },
        });

        if (!response.ok) {
          throw new Error('인증되지 않음');
        }

        const result = await response.json();
        setData(result);
      } catch (error) {
        setMessage(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {message && <p>{message}</p>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
};

export default ProtectedComponent;
