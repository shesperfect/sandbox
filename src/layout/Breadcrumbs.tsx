import React from 'react';
import { Link } from 'react-router-dom';

export function Breadcrumbs() {
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
        <li className="breadcrumb-item"><Link to="/components">Components</Link></li>
        <li className="breadcrumb-item active" aria-current="page">Component name</li>
      </ol>
    </nav>
  );
}
