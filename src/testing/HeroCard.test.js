import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; // For matchers like toBeInTheDocument
import React from 'react';
import HeroCard from "../components/HeroCard/HeroCard";

// Mock the HeroReactFlow component to avoid actual rendering of the flow chart
jest.mock('../components/HeroReactFlow/HeroReactFlow', () => () => <div data-testid="hero-react-flow" />);

describe('HeroCard Component', () => {
    const heroData = {
        id: 1,
        name: 'Luke Skywalker',
    };

    test('renders hero name and image correctly', () => {
        // Arrange & Act
        render(<HeroCard {...heroData} />);

        // Assert
        const heroImage = screen.getByAltText(heroData.name);
        const heroName = screen.getByText(heroData.name);

        expect(heroImage).toBeInTheDocument();  // Check if the image is rendered
        expect(heroImage).toHaveAttribute('src', `https://starwars-visualguide.com/assets/img/characters/${heroData.id}.jpg`);
        expect(heroName).toBeInTheDocument();  // Check if the name is rendered
    });

    test('toggles HeroReactFlow component visibility on card click', () => {
        // Arrange
        render(<HeroCard {...heroData} />);

        // Initially, HeroReactFlow should not be rendered
        expect(screen.queryByTestId('hero-react-flow')).not.toBeInTheDocument();

        // Act - Simulate a click on the hero card
        fireEvent.click(screen.getByText(heroData.name));

        // Assert - HeroReactFlow should now be visible
        expect(screen.getByTestId('hero-react-flow')).toBeInTheDocument();

        // Act - Simulate another click on the hero card
        fireEvent.click(screen.getByText(heroData.name));

        // Assert - HeroReactFlow should no longer be visible
        expect(screen.queryByTestId('hero-react-flow')).not.toBeInTheDocument();
    });
});
