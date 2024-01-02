/*import React, { useState } from 'react';
import LoginForm from './components/logIn';
import Reservation from './components/reservation';



const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  const handleLogin = (values) => {
    // Simulate a login process, replace with actual authentication logic
    if (values.username === 'yunjin13' && values.password === 'yunjin-na') {
      setLoggedIn(true);
      setUsername(values.username);
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div>
      {loggedIn ? (
        <Reservation username={username} />
      ) : (
        <LoginForm onSubmit={handleLogin} />
      )}
    </div>
  );
};

export default App; */
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import LoginForm from './components/logIn';
import Reservation from './components/reservation';
import './App.css';
import './Navbar.css';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [selectedComponent, setSelectedComponent] = useState('Reservation'); // Set the default component to 'Reservation'

  const handleLogin = (values) => {
    if (values.username === 'yunjin13' && values.password === 'yunjin-na') {
      setLoggedIn(true);
      setUsername(values.username);
    } else {
      alert('Invalid credentials');
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUsername('');
  };

  const handleNavigation = (component) => {
    setSelectedComponent(component);
  };

  return (
    <div>
      {loggedIn ? (
        <div>
          <nav>
            <ul>
              <li><button onClick={() => handleNavigation('Reservation')}>Reservation</button></li>
              <li><button onClick={handleLogout}>Log Out</button></li>
            </ul>
          </nav>
          {/* Render the selected component based on the state */}
          {selectedComponent === 'Reservation' && <Reservation username={username} />}
        </div>
      ) : (
        <LoginForm onSubmit={handleLogin} />
      )}
    </div>
  );
};

export default App;
