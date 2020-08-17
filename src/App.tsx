import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { Application } from '@core/application';

import { Routes } from './common/Routes';
import { Breadcrumbs, MainMenu } from './layout';

import './App.scss';

export default class App extends React.Component<any, any> {
  componentDidMount() {
    const app = new Application();
  }

  render() {
    return (
      <BrowserRouter>
        <div className="container-fluid">
          <MainMenu />
          <Breadcrumbs />

          <Routes />
        </div>
      </BrowserRouter>
    );
  }
}
