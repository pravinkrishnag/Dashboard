import React from 'react';
import './Header.css'; // Ensure you have the CSS file

function Header() {
  return (
    <>
      <nav>
        <div id="nav-begin">
          <li>
            <button>Home</button>
          </li>
          <li>
            <button>Graph</button>
          </li>
        </div>
        <div id="nav-end">
          <li>
            <input type="text" id="searchText" placeholder="Search..." />
          </li>
          <li>
            <button>Search</button>
          </li>
        </div>
      </nav>
    </>
  );
}

export default Header;
