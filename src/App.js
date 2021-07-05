import React from 'react'
import './App.css';

import Header from './componets/header/header';
import Home from './pages/home/home';

function App() {

  return (
    <div className="App">
      <Header />
      <Home key={1} />
    </div>
  );
}

export default App;
