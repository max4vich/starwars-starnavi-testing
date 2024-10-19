import './ParallaxContainer.css'; // Import the CSS for the ParallaxContainer component
import { useEffect, useState } from 'react'; // Import React hooks: useEffect and useState
import background from '../../images/sky-background.png'; // Import the background image
import logo from '../../images/logo.png'; // Import the logo image

function ParallaxContainer() {
    // Declare a state variable 'offset' to track the vertical scroll position (default is 0)
    const [offset, setOffset] = useState(0);

    // Function to handle the scroll event, updating the 'offset' value with the current scrollY position
    const handleScroll = () => {
        setOffset(window.scrollY);
    };

    // useEffect hook to add and clean up the scroll event listener
    useEffect(() => {
        // Add a scroll event listener that triggers the handleScroll function
        window.addEventListener('scroll', handleScroll);
        // Cleanup function to remove the scroll event listener when the component is unmounted
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []); // Empty dependency array means this effect runs only on component mount and unmount

    return (
        <div className='parallax-container'>
            {/* Background image with a parallax effect, moves at half the scroll speed */}
            <img
                className='background'
                src={background}
                style={{ transform: `translateY(${offset * 0.5}px)` }} // The background's vertical position changes with scroll
                alt="Background"
            />
            {/* Static logo image */}
            <img className='logo' src={logo} alt="Logo" />
        </div>
    );
}

export default ParallaxContainer; // Export the ParallaxContainer component
