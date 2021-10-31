module.exports =  {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  preset: 'ts-jest',
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  modulePaths: [
    "<rootDir>",
    "/home/some/other/path"
  ],
  moduleDirectories: [
    "node_modules"
  ],
}
