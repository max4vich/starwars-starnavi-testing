module.exports = {
    transform: {
        "^.+\\.[t|j]sx?$": "babel-jest",  // Use babel-jest for JavaScript/TypeScript transformation
    },
    transformIgnorePatterns: [
        "node_modules/(?!(axios)/)"  // Make sure axios is transformed
    ],
    moduleNameMapper: {
        "\\.(css|less)$": "identity-obj-proxy",  // Mock CSS imports
    },
};
