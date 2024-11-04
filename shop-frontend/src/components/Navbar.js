// src/components/Navbar.js
import React from 'react';

const Navbar = () => {
  return (
    <div style={styles.navbar}>
      <div style={styles.left}>
        <a href="#home" style={styles.link}>Home</a>
      </div>
      <div style={styles.categories}>
        <a href="#category1" style={styles.link}>Category 1</a>
        <a href="#category2" style={styles.link}>Category 2</a>
        <a href="#category3" style={styles.link}>Category 3</a>
        <a href="#category4" style={styles.link}>Category 4</a>
        <a href="#category5" style={styles.link}>Category 5</a>
      </div>
      <div style={styles.right}>
        <a href="#login" style={styles.link}>Login</a> / <a href="#signup" style={styles.link}>Sign Up</a>
      </div>
    </div>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#333',
    color: '#fff',
  },
  left: {
    flex: 1,
  },
  categories: {
    flex: 2,
    display: 'flex',
    justifyContent: 'center',
    gap: '15px',
  },
  right: {
    flex: 1,
    textAlign: 'right',
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
  },
};

export default Navbar;
