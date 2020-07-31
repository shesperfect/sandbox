import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Home } from './Home';
import { SnowComponent, BezierParticles } from '../components';

export const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={ Home } />
      <Route path="/snow" component={ SnowComponent } />
      <Route path="/bezier-particles" component={ BezierParticles } />
    </Switch>
  );
};
