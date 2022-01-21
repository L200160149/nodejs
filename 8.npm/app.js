// const validator = require('validator');

// const email = validator.isEmail('tes@gmail.com');
// console.log(email);

// const phoneNumber = validator.isMobilePhone('085600023512', 'id-ID');
// console.log(phoneNumber);

// const chalk = require('chalk');
// console.log(chalk.bgRed('Hello worldd!'));


const yargs = require('yargs');

yargs.command({
    command: 'add',
    describe: 'Menambahkan contact baru: ',
})
console.log(yargs.argv)