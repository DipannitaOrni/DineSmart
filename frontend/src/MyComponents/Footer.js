import React from 'react';

function Footer() {
  return (
    <footer className='footer'>
      <div className='footer-content'>
        <p>&copy; {new Date().getFullYear()} DineSmart. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
