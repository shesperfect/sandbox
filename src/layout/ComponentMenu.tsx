import React from 'react';
import { Link } from 'react-router-dom';

export function ComponentMenu() {
  return (
    <header>
      <ul>
        <li><Link to="/snow-2d">Snow 2D</Link></li>
        <li><Link to="/snow-3d">Snow 3D</Link></li>
        <li><Link to="/bezier-particles">Bezier particles</Link></li>
        <li><Link to="/perlin-flow-field">Perlin noise flow field</Link></li>
        <li><Link to="/terrain">Simple Terrain</Link></li>
        <li><Link to="/cube-wave">Cube Wave</Link></li>
        <li><Link to="/water-2d">Water 2D</Link></li>
      </ul>
    </header>
  );
}
