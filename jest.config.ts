module.exports =  {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/main/**'
  ],
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
  moduleNameMapper: {
    '@presentation/(.*)': '<rootDir>/src/presentation/$1',
    '@data/(.*)': '<rootDir>/src/data/$1',
    '@util/(.*)': '<rootDir>/src/util/$1',
    '@infra/(.*)': '<rootDir>/src/infra/$1',
    '@domain/(.*)': '<rootDir>/src/domain/$1'     
  }
}
