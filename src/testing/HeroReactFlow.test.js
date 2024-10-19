import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'; // For matchers like toBeInTheDocument
import React from 'react';
import HeroReactFlow from "../components/HeroReactFlow/HeroReactFlow";

beforeAll(() => {
    // Mock the ResizeObserver to prevent errors related to resizing in the tests
    global.ResizeObserver = class {
        observe() {}
        unobserve() {}
        disconnect() {}
    };
});

// Mock the constants
jest.mock('../constants', () => ({
    API_URL: 'https://swapi.dev/api/' // Mocking the API_URL constant
}));

// Mock the fetch API calls for starship and film data
global.fetch = jest.fn((url) => {
    if (url.includes('starships')) {
        return Promise.resolve({
            json: () => Promise.resolve({ id: 1, name: 'X-Wing' })
        });
    } else if (url.includes('films')) {
        return Promise.resolve({
            json: () => Promise.resolve({ id: 1, title: 'A New Hope' })
        });
    }
    return Promise.reject(new Error('not found'));
});

describe('HeroReactFlow Component', () => {
    const mockHeroProps = {
        hero: {
            id: 1,
            name: 'Luke Skywalker',
            films: ['/films/1/'],
            starships: ['/starships/1/']
        }
    };
    const mockVisibilityHandler = jest.fn();

    test('renders the close button and checks if initial state is empty', () => {
        // Render the component with mock props
        render(<HeroReactFlow props={mockHeroProps} visibility={mockVisibilityHandler} />);

        // Check if the close button is rendered and has the correct class
        expect(screen.getByRole('button')).toBeInTheDocument(); // Close button is rendered
        expect(screen.getByRole('button')).toHaveClass('close-button');
    });

    test('calls visibility handler on close button click', () => {
        // Render the component
        render(<HeroReactFlow props={mockHeroProps} visibility={mockVisibilityHandler} />);

        // Simulate clicking the close button
        fireEvent.click(screen.getByRole('button'));

        // Ensure the visibility handler is called once
        expect(mockVisibilityHandler).toHaveBeenCalledTimes(1);
    });
});
