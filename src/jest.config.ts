module.exports = {
    testMatch: [
        "**/*.tests.tsx",
        "**/*.tests.ts"
    ],
    testEnvironment: 'jest-environment-jsdom',
    setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
    testPathIgnorePatterns: ["<rootDir>/cypress/"],
};
export { }