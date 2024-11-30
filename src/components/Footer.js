import React from 'react';
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
const Footer = () => {
  return (
    <footer
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        backgroundColor: '#f8f9fa',
        boxShadow: '0 -2px 10px rgba(0,0,0,0.1)',
      }}
    >

      <p style={{ margin: 0, fontSize: '14px', color: '#555' }}>
        © 2024 Furniture 
      </p>
      <div style={{ display: 'flex', gap: '15px' }}>
        <a
          href="https://www.facebook.com/"
          style={{ color: '#4267B2', fontSize: '18px' }}
        >
          <FaFacebook />
        </a>
        <a
          href="https://www.instagram.com/"
          style={{ color: '#E4405F', fontSize: '18px' }}
        >
          <FaInstagram />
        </a>
        <a
          href="https://x.com/"
          style={{ color: '#000', fontSize: '18px' }}
        >
          <FaXTwitter />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
