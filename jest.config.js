module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['<rootDir>/test/**/*spec.ts'],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    'dist',
    'test',
    '<rootDir>/src/migration',
  ],
  modulePathIgnorePatterns: ['dist'],
  setupFiles: ['./jest.env.ts'],
  forceExit: true,
  coverageReporters: ['lcov', 'text', 'text-summary'],
};
