import React from 'react'; // Import React
import './App.css';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Correct import statement
import Home from './pages/Home';
import Register from './pages/Register';
import { AuthProvider } from './context/AuthContext'; // Import the AuthProvider
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider> {/* Wrap your components with AuthProvider */}
          <Navbar/>
          <main className="form-signin w-100 m-auto">
            <Routes> {/* Use Routes to wrap Route components */}
              <Route path='/' element={<Home />}/> {/* Use element prop */}
              <Route path='/login' element={<Login />}/>
              <Route path='/signup' element={<Register />}/>
              <Route path='/dashboard' element={<Dashboard />}/>
            </Routes>
          </main>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;

