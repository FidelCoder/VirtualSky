// import logo from './logo.svg';
// import './App.css';

// import Home from "./pages/Home"

// function App() {
//   return (
//     <div>
//       <Home />
//     </div>
//   );
// }

// export default App;


import React from 'react';
import SkyVisualization from './pages/SkyVisualization';
import Home from "./pages/Home"
import './App.css';

const App = () => {
  return (
    <div className="app">
      <div className="info">
        <p>Explore the virtual sky by panning, zooming, and rotating the view.</p>
      </div>
      <div className="controls">
        <p>Controls: Left-click and drag to rotate, scroll to zoom, right-click and drag to pan</p>
      </div>
      <Home />,
      <SkyVisualization />
    </div>
  );
};

export default App;
