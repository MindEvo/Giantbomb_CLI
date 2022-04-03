const superagent = require('superagent');
const config = require('./config');

//////////////////////////////////////////////
// searchGames                              //
//------------------------------------------//
// Accepts a string as the argument.        //
// Returns an object (JSON).                //
//////////////////////////////////////////////
const searchGames = async (term) => {
    try {
        const searchURL = `${config.base}/search/?api_key=${config.apikey}&format=json&query=${term}&resources=game&field_list=name,original_release_date,id`;
        const response = await superagent.get(searchURL)
            .set('User-Agent', 'thomas123@csla');
        return response.body;
    } catch (error) {return error;}
};

//////////////////////////////////////////////
// getGame                                  //
//------------------------------------------//
// Accepts a Number as the argument.        //
// Returns an object (JSON).                //
//////////////////////////////////////////////
const getGame = async (id) => {
    try {
        const getURL = `${config.base}/game/3030-${id}/?api_key=${config.apikey}&format=json&field_list=genres,deck,platforms,similar_games,developers,publishers`;
        const response = await superagent.get(getURL)
            .set('User-Agent', 'thomas123@csla');
            return response.body
    }
    catch (error) {return error;}
}

module.exports = {
    searchGames,
    getGame
};