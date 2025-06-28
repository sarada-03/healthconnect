import React, { useState } from 'react';
import api from '../api';
import QRCode from 'qrcode.react';

function HealthRecords() {
  const [qr, setQr] = useState(null);
  const [url, setUrl] = useState('');
  // Get user from localStorage (set this after login/register)
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user?.id || '';

  const generateQr = async () => {
    if (!userId) {
      alert('User not logged in!');
      return;
    }
    try {
      const res = await api.get(`/health-records/${userId}/qrcode`);
      setQr(res.data.qr);
      setUrl(res.data.url);
    } catch (err) {
      alert('Failed to generate QR code');
    }
  };

  return (
    <div>
      <h2>Health Records Page</h2>
      <button onClick={generateQr}>Generate My Health QR Code</button>
      {qr && (
        <div style={{ marginTop: 20 }}>
          <img src={qr} alt="Health Record QR Code" />
          <div><a href={url} target="_blank" rel="noopener noreferrer">View My Health Record</a></div>
        </div>
      )}
    </div>
  );
}

export default HealthRecords; 