/** @type {import("prettier").Config} */
module.exports = {
  plugins: [require.resolve('prettier-plugin-tailwindcss')],
  arrowParens: 'avoid',
  jsxSingleQuote: true,
  singleQuote: true,
};
