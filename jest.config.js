/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  setupFiles: ['<rootDir>/.jest/setEnvVars.ts'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/.jest/setupFilesAfterEnv.ts'],
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
};