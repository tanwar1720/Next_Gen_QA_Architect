module.exports = {
  default: {
    requireModule: ['ts-node/register', 'tsconfig-paths/register'],
    require: ['src/bdd/**/*.ts', 'src/steps/**/*.ts'],
    format: [
      'progress',
      'html:test-results/cucumber-report.html',
      'json:test-results/cucumber-report.json',
    ],
    publishQuiet: true,
    parallel: 0,
  },
};
