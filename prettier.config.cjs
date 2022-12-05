/** @type {import("prettier").Config} */
module.exports = {
  importOrder: ['^components/(.*)$', '^[./]'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  singleQuote: true,
  jsxSingleQuote: true,
  semi: false,
  printWidth: 80,
  tabWidth: 2,
  plugins: [
    require.resolve('prettier-plugin-tailwindcss'),
    require.resolve('@trivago/prettier-plugin-sort-imports'),
  ],
}
