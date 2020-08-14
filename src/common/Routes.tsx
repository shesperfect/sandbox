import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Home } from './Home';
import {
  Snow2DComponent,
  Snow3DComponent,
  BezierParticlesComponent,
  PerlinFlowFieldComponent,
  TerrainComponent,
  CubeWaveComponent, Water2DComponent,
} from '../components';

export const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={ Home } />
      <Route path="/snow-2d" component={ Snow2DComponent } />
      <Route path="/snow-3d" component={ Snow3DComponent } />
      <Route path="/bezier-particles" component={ BezierParticlesComponent } />
      <Route path="/perlin-flow-field" component={ PerlinFlowFieldComponent } />
      <Route path="/terrain" component={ TerrainComponent } />
      <Route path="/cube-wave" component={ CubeWaveComponent } />
      <Route path="/water-2d" component={ Water2DComponent } />
    </Switch>
  );
};
