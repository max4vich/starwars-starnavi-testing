import { useEffect, useState } from "react";  // Import React hooks
import axios from "axios";  // Import axios for API requests
import HeroCard from "../../components/HeroCard/HeroCard";  // Import the HeroCard component
import './HomePage.css';  // Import CSS for styling
import { API_URL } from "../../constants";  // Import API base URL from constants

function HomePage() {
    const [heroesArray, setHeroesArray] = useState([]);  // State to store the list of heroes
    const [page, setPage] = useState(1);  // State to manage the current page number for API requests
    const [loading, setLoading] = useState(false);  // State to manage the loading state during data fetching

    // Function to fetch data from the API
    const fetchData = async () => {
        setLoading(true);  // Set loading to true when starting data fetch
        try {
            const response = await axios.get(`${API_URL}/people/?page=${page}`);  // Fetch heroes for the current page
            setHeroesArray(prevHeroes => [...prevHeroes, ...response.data.results]);  // Append the new heroes to the existing array
        } catch (error) {
            console.error(error);  // Log any errors that occur during the request
        } finally {
            setLoading(false);  // Set loading to false after data is fetched (success or error)
        }
    };

    // useEffect to trigger fetchData when the page number changes
    useEffect(() => {
        fetchData();  // Call fetchData whenever the page state changes
    }, [page]);  // Dependency array ensures that fetchData is called only when 'page' changes

    return (
        <div className='home-page'>
            <h1>List of heroes:</h1>
            <div className='heroes-list'>
                {heroesArray.length > 0 && (  // Ensure heroesArray has data before rendering
                    heroesArray.map((hero) =>  // Map through the heroes array to render HeroCard components
                        <HeroCard name={hero.name} id={hero.id} hero={hero} key={hero.id} />  // Pass hero data as props to HeroCard
                    )
                )}
            </div>
            {loading && <div className='spinner'>Loading...</div>}
            {page < 9 && (  // Only show the "Load More" button if there are more pages to load
                <button className='load-button' onClick={() => setPage(prevPage => prevPage + 1)}>
                    Load More
                </button>
            )}
        </div>
    );
}

export default HomePage;
