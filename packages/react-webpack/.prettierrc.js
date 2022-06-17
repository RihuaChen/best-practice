const fabric = require('@umijs/fabric');

module.exports = {
  ...fabric.prettier,
  plugins: [
    require('stylelint-prettier'),
    require('prettier-plugin-packagejson'),
    require('@trivago/prettier-plugin-sort-imports'),
  ],
  importOrder: ['^@(.*)$', '^[./]'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
