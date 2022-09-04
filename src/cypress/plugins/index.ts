const cucumber = require('cypress-cucumber-preprocessor').default
const path = require('path');

module.exports = (on: (arg0: string, arg1: any) => void) => {
    const options = {
        typescript: path.join(path.resolve('./'), 'node_modules/typescript'),
    }
    on('file:preprocessor', cucumber(options))
}