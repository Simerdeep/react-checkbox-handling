module.exports={

    "collectCoverage" : true,
    "collectCoverageFrom": [
        "src/**"
    ],
    "coverageDirectory": "<rootDir>/coverage",
    "testPathIgnorePatterns": [
        "<rootDir>/node_modules",
        "<rootDir>/dist"
    ],
    "moduleNameMapper": {
        "\\.(css|less|sass|scss)$": "<rootDir>/__mocks__/styleMock.js",
    },
    "setupFiles": ["<rootDir>/setupEnzyme.js"]
}