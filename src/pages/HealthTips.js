import React, { useEffect, useState } from 'react';
import api from '../api';

function HealthTips() {
  const [tips, setTips] = useState([]);

  useEffect(() => {
    api.get('/health-tips')
      .then(res => setTips(res.data.tips || []))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Health Tips</h2>
      <ul>
        {tips.map((tip, idx) => (
          <li key={idx}>{tip.title?.english || 'No title'}</li>
        ))}
      </ul>
    </div>
  );
}

export default HealthTips; 