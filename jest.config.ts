import { pathsToModuleNameMapper } from 'ts-jest/utils';
import {compilerOptions} from './tsconfig.json'

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
  moduleDirectories: [
    "node_modules"
  ],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/src/',
  }),
}
