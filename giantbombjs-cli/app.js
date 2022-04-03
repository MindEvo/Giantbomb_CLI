const inquirer = require('inquirer');
const index = require('giantbombjs-api');

//////////////////////////////////////////////////////////
// _print                                               //
// -----------------------------------------------------//
// Accepts an object                                    //
// Prints information to the screen on the game selected//
// by the user.                                         //
//////////////////////////////////////////////////////////
const _print = (game) => {
    //Temp and output are both used throughout this method
    //to hold and then print data to the screen.
    let temp = [];
    let output = '';

    //Display description of game.
    output = game.results.deck;
    console.log(output,'\n');
    
    //Display platforms game is available on.
    for (i in game.results.platforms) {
        temp.push(game.results.platforms[i].name);
    }
    if (temp.length > 1) output = temp.join(', ');
    else output = temp[0];
    console.log(`Platforms: ${output}`);
    temp = [];
    
    //Display developers of game.
    for (i in game.results.developers) {
        temp.push(game.results.developers[i].name)
    }
    if (temp.length > 1) output = temp.join(', ');
    else output = temp[0];
    console.log(`Developers: ${output}`);
    temp = [];
    
    //Display genres.
    for (i in game.results.genres) {
        temp.push(game.results.genres[i].name)
    }
    if (temp.length > 1) output = temp.join(', ');
    else output = temp[0];
    console.log(`Genres: ${output}`);
    temp = [];
    
    //Display publishers.
    for (i in game.results.publishers) {
        temp.push(game.results.publishers[i].name)
    }
    if (temp.length > 1) output = temp.join(', ');
    else output = temp[0];
    console.log(`Publisher: ${output}`);
    temp = [];
    
    //Display, if any, games that are similar to the game selected.
    if (game.results.similar_games !== null) {
        console.log('Similar Games:');
        for (i in game.results.similar_games) {
            console.log('\t',game.results.similar_games[i].name);
        }
    }
};

//////////////////////////////////////////////////////////
// _selectPrompt                                        //
// -----------------------------------------------------//
// Accepts an object.                                   //
// Returns an object containing the id of the game      //
// selected by the user.                                //
//////////////////////////////////////////////////////////
const _selectPrompt = async (games) => {

    //////////////////////////////////////////////////////////////
    // Logic to create a list of games for the user to choose   //
    // from. Each item in the list will be the name of the      //
    // game and its year of release. Ex: title (yyyy)           //
    //////////////////////////////////////////////////////////////
    const terms = [];
    for (i in games.results) {
        // Games can have a null value for release date.
        let rd = '';
        if (games.results[i].original_release_date !== null) {
            rd = games.results[i].original_release_date
            //original_release_date ex output: "yyyy-mm-dd"
            //Slice to get just the year of release.
            rd = rd.slice(0,4);
        }
        else rd = 'N/A';

        const game = {
            name: games.results[i].name + ' (' + rd + ')',
            value: games.results[i].id
        }

        terms.push(game);
    }

    return inquirer.prompt({
        type: 'list',
        name: 'id',
        message: 'Choose game:',
        choices: terms
    });
};

//////////////////////////////////////////////////////////
// _main                                                //
// -----------------------------------------------------//
// Application main method.                             //
// Accepts a string as the argument.                    //
//////////////////////////////////////////////////////////
const _main = async (arg) => {
    try {
        // Get search results.
        const results = await index.searchGames(arg);    

        // Send it.
        const selection = await _selectPrompt(results);

        // Find the game data via returned id.
        const gameData = await index.getGame(selection.id);
        _print(gameData);

    }
    catch (error) {console.log(error);}
};

module.exports = {
    _main
};