import { useCallback, useEffect, useState } from 'react';
import {
    ReactFlow,
    addEdge,
    useEdgesState,
    useNodesState,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import './HeroReactFlow.css';
import { API_URL } from "../../constants";
import close from '../../images/close.svg'

function HeroReactFlow({props, visibility}) {
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    //{id: "4", data: { label: "node1" }, position: {x:0,y:0}, style: {color: 'black'}}
    const fetchStarshipData = async (starshipId) => {
        try {
            const response = await fetch(`${API_URL}starships/${starshipId}/`);
            return response.json();
        }
        catch(error) {
            console.error(error)
        }
    }
    const fetchFilmData = async (filmId) => {
        try {
            const response = await fetch(`${API_URL}films/${filmId}/`);
            return response.json();
        }
        catch(error) {
            console.error(error)
        }
    }

    useEffect(() => {
        // Only proceed if props are valid
        if (props && props.id && props.name) {
            const heroNode = {
                id: props.hero.id.toString(),
                position: { x: 0, y: 0 },
                data: { label: props.name },
                style: { color: 'black' }
            };
            setNodes([heroNode]); // Set hero node only

            if (Array.isArray(props.hero.films) && Array.isArray(props.hero.starships)) {
                // Fetch film and starship names
                const filmPromises = props.hero.films.map(fetchFilmData);
                const starshipPromises = props.hero.starships.map(fetchStarshipData);

                // Wait for all film and starship promises to be fulfilled
                Promise.all([Promise.all(filmPromises), Promise.all(starshipPromises)])
                    .then(([films, starships]) => {
                        // Create film nodes
                        const filmNodes = films.map((film, index) => ({
                            id: `film-${film.id}`,
                            type: 'default',
                            position: { x: 250, y: (index + 1) * 100 },
                            data: { label: film.title },
                            style: { color: 'black' }
                        }));
                        // Create starship nodes
                        const starshipNodes = starships.map((starship, index) => ({
                            id: `starship-${starship.id}`,
                            type: 'default',
                            position: { x: 450, y: (index + 1) * 100 },
                            data: { label: starship.name },
                            style: { color: 'black' }
                        }));

                        // Set nodes after fetching
                        setNodes((prev) => [...prev, ...filmNodes, ...starshipNodes]);

                        // Create edges from hero to films
                        const heroToFilmEdges = filmNodes.map((filmNode) => ({
                            id: `edge-hero-${filmNode.id}`,
                            source: heroNode.id,
                            target: filmNode.id,
                            style: { color: 'black' }
                        }));

                        // Create edges from films to starships
                        const filmToStarshipEdges = starshipNodes.map((starshipNode, index) => ({
                            id: `edge-film-${starshipNode.id}`,
                            source: filmNodes[index].id, // Use the corresponding film node
                            target: starshipNode.id,
                            style: { color: 'black' }
                        }));

                        setEdges([...heroToFilmEdges, ...filmToStarshipEdges]);
                    })
                    .catch((error) => {
                        console.error("Error fetching film or starship data:", error);
                    });
            } else {
                console.error("Films or starships data is not available.");
            }
        }
    }, [props, setNodes, setEdges]);

    const onConnect = useCallback(
        (connection) => setEdges((eds) => addEdge(connection, eds)),
        [setEdges],
    );

    return (
        <div className='flow-absolute'>
            <button onClick={visibility} className="close-button"><img src={close}/></button>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                fitView
            />
        </div>
    );
}

export default HeroReactFlow;
