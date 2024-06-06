const fs= require('fs');
const path = require('path');

require('dotenv').config({
    path: `.env.test`
})

const babelPreset = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, '.babelrc'), 'utf8')
);

module.exports = {
    presets: [...babelPreset, '@babel/preset-typescript'],
    plugins: process.env.ENVIRONMENT_NAME === 'production'
        ? ['transform-remove-console', '@babel/plugin-transform-runtime']
        : ['@babel/plugin-transform-runtime'],
    ignore: ['./src/public/**/*.js'],
}