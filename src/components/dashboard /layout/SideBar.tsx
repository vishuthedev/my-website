"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import styles from './common.module.scss'
// import { FaBars } from 'react-icons/fa'; // Import the toggle icon

const Sidebar: React.FC = () => {
  const [showSidebar, setShowSidebar] = useState(true);

  const toggleSidebar = () => {
    setShowSidebar((prev) => !prev);
  };

  return (
    <div className={`${styles['sidebar']} ${showSidebar ? styles.show : styles.hide}`}>
      <button className="toggle-button" onClick={toggleSidebar}>
        {/* <FaBars /> */}
      </button>
      <nav>
        <ul>
          <li>
            <Link href="/dashboard/dashboard">
              Dashboard
            </Link>
          </li>
          {/* Add more navigation links as needed */}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
