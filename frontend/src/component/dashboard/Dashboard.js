import React, { useEffect, useState } from 'react';
import '../../App.css'; 
import axios from 'axios';

function Dashboard() {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token'); 
        const response = await axios.get('http://localhost:8000/user', {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });

        setData(response.data); 
      } catch (e) {
        setError(e.message); 
      }
    };

    fetchData(); 
  }, []); 

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>User Dashboard</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>} 
      {data ? (
        <table style={{ width: '40%', borderCollapse: 'collapse', margin: '0 auto' }}>
          <thead>
            <tr>
              <th className="thStyle">Token</th>
              <th className="thStyle">Username</th>
              <th className="thStyle">Created At</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="tdStyle tokenColumn">{localStorage.getItem('token') || 'Your Token Here'}</td>
              <td className="tdStyle">{data.username || 'John Doe'}</td>
              <td className="tdStyle">{data.createdAt || 'Not available'}</td>
            </tr>
           
          </tbody>
        </table>
      ) : (
        <p>Loading...</p> 
      )}
    </div>
  );
}

export default Dashboard;
