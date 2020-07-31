import React from 'react';
import { Link } from 'react-router-dom';

export function ComponentMenu() {
  return (
    <header>
      <ul>
        <li><Link to="/snow">Snow</Link></li>
        <li><Link to="/bezier-particles">Bezier particles</Link></li>
      </ul>
    </header>
  );
}
