import './HeroCard.css'; // Import the CSS for styling the HeroCard component
import HeroReactFlow from "../HeroReactFlow/HeroReactFlow"; // Import the HeroReactFlow component for detailed flow view
import { useEffect, useState } from "react"; // Import React hooks: useEffect and useState

function HeroCard(hero) {
    // Declare a state variable 'flowVisibility' to track the visibility of HeroReactFlow component (default is false)
    const [flowVisibility, setFlowVisibility] = useState(false);

    // Function to toggle the visibility of the HeroReactFlow component
    const visibilityHandler = () => {
        setFlowVisibility(!flowVisibility); // Toggle the current visibility state
    };

    return (
        <>
            {/* Hero card which displays the hero's image and name */}
            <div className='hero-card' onClick={() => { visibilityHandler() }}>
                {/* Render the hero's image using their id for the URL */}
                <img src={`https://starwars-visualguide.com/assets/img/characters/${hero.id}.jpg`} alt={hero.name} />
                {/* Display the hero's name */}
                <h3>{hero.name}</h3>
            </div>
            {/* Conditionally render the HeroReactFlow component if flowVisibility is true */}
            {flowVisibility && <HeroReactFlow props={hero} visibility={visibilityHandler} />}
        </>
    );
}

export default HeroCard; // Export the HeroCard component
