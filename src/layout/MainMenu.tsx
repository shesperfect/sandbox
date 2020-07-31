import React from 'react';
import { Link } from 'react-router-dom';

export function MainMenu() {
  return (
    <header>
      <ul className="nav justify-content-end">
        <li className="nav-item">
          <Link className="nav-link active"  to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link"  to="/blog">Blog</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link"  to="/about">About</Link>
        </li>
      </ul>
    </header>
  );
}
