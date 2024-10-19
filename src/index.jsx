import React from 'react'; // Import the React library
import ReactDOM from 'react-dom/client'; // Import ReactDOM for rendering the application to the DOM
import './index.css'; // Import the main CSS file for global styling
import App from './App'; // Import the App component which is the main component of the application

// Create a root element to render the application into
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component inside the root element
root.render(
    <App />
);
