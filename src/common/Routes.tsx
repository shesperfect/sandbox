import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Home } from './Home';
import {
  SnowComponent,
  BezierParticlesComponent,
  PerlinFlowFieldComponent,
  TerrainComponent,
  CubeWaveComponent, Water2DComponent,
} from '../components';

export const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={ Home } />
      <Route path="/snow" component={ SnowComponent } />
      <Route path="/bezier-particles" component={ BezierParticlesComponent } />
      <Route path="/perlin-flow-field" component={ PerlinFlowFieldComponent } />
      <Route path="/terrain" component={ TerrainComponent } />
      <Route path="/cube-wave" component={ CubeWaveComponent } />
      <Route path="/water-2d" component={ Water2DComponent } />
    </Switch>
  );
};
