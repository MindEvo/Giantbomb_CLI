const yargs = require('yargs/yargs');
const app = require('./app.js');

yargs(process.argv.slice(2))
    // the $ 0 will auto match the file name
    // the <> will match up to the .command
    // the [] will match to .options
    .usage('$0: Usage <cmd> [options]')
    .command('search <term>', 'Search for a game by name or term.',
        // handler
        (args) => {
            if (process.argv.length < 4) console.log("Must enter a search term.")
            else {
                const arg = process.argv.slice(3).join(' ');
                app._main(arg);
            }
        }
    )
    .help().argv;

    