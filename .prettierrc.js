module.exports = {
  bracketSpacing: true,
  jsxBracketSameLine: true,
  singleQuote: true,
  trailingComma: 'all',
  arrowParens: 'avoid',
  endOfLine: 'auto',
  printWidth: 100,
  tabWidth: 2,

  importOrder: [
    'prop-types',
    '@react-navigation',
    'monent',
    '^src/(.*)$',
    '^src/(.*)',
    '^src/(.*)/(.*)$',
    '^[./]',
    '^[../]',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
