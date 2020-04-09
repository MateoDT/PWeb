import React from 'react';
import './App.css';
import Counter from './components/Counter';
import Layout from './components/Layout';

function App() {
  return (
    <div class='Page'>
      <Layout>
        <Counter/>
      </Layout>
    </div>
  );
}

export default App;
