import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SkyVisualization from './pages/SkyVisualization';
import Home from "./pages/Home";
import ObjectInfoModal from "./pages/ObjectInfoModal";
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="app">
        <div className="info">
          <p>Explore the virtual sky by panning, zooming, and rotating the view.</p>
        </div>
        <div className="controls">
          <p>Controls: Left-click and drag to rotate, scroll to zoom, right-click and drag to pan</p>
        </div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/visualization" component={SkyVisualization} />
          <Route path="/infomodal" component={SkyVisualization} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
