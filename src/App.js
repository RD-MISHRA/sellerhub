// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthForm from './components/AuthForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Side from './components/SideBar';
import NavbarComponent from './components/NavbarComponent';
function App() {
  return (
    <Router>
      <div className="App">
<NavbarComponent/>
        <Routes>
          <Route path="/" element={<AuthForm />} />
          <Route path="/SellerHome" element={<Side />} />
          {/* Replace component prop with element and provide AuthForm as JSX */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
