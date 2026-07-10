import './App.css';

import { Route, Routes } from 'react-router-dom';

import { Auth } from './pages/Auth/Auth.jsx';


function App() {
  return (
    <>
      <Routes>
        <Route path="/auth" element={<Auth />}></Route>
      </Routes>
    </>
  );
}

export default App;
