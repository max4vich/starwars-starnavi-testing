import './App.css'; // Import the main CSS file for styling the App component
import HomePage from "./pages/HomePage/HomePage"; // Import the HomePage component
import ParallaxContainer from "./components/ParallaxContainer/ParallaxContainer"; // Import the ParallaxContainer component for a parallax effect

function App() {
    return (
        <>
            {/* Render the ParallaxContainer which adds a parallax background effect */}
            <ParallaxContainer />
            {/* Render the HomePage component which serves as the main content of the application */}
            <HomePage />
        </>
    );
}

export default App; // Export the App component for use in the main index file
