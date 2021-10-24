const fs = require ('fs');
const path = require('path');

function findById (id, animalsArr){
    const result = animalsArr.filter(animal => animal.id === id)[0];
    return result;
};

function createNewAnimal(body, animalsArray){
    const animal = body;
    animalsArray.push(animal);
    fs.writeFileSync(
        path.join(__dirname, '../data/animals.json'),
        JSON.stringify ({ animals: animalsArray }, null, 2)
    );
    return animal;
}

function filterByQuery (query, animalsArr){
    let personalityTraitArr = [];
    let filteredResults = animalsArr;

    if (query.personalityTraits){
        if(typeof query.personalityTraits === 'string'){
            personalityTraitArr = [query.personalityTraits];
        } else {
            personalityTraitArr = query.personalityTraits;
        }

        personalityTraitArr.forEach(trait => {
            filteredResults = filteredResults.filter(animal => animal.personalityTraits.indexOf(trait) !== -1);
        });
    }

    if (query.diet) {
        filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
    }
    if (query.species) {
        filteredResults = filteredResults.filter(animal => animal.species === query.species);
        console.log('hi');
    }
    if (query.name){
        filteredResults = filteredResults.filter(animal => animal.name === query.name);
    }
    return filteredResults;
};

function validateAnimal(animal){
    if (!animal.name || typeof animal.name !== 'string') {
        return false;
    }
    if (!animal.species || typeof animal.species !== 'string'){
        return false;
    }
    if (!animal.diet || typeof animal.diet !== 'string'){
        return false;
    }
    if (!animal.personalityTraits || !Array.isArray(animal.personalityTraits)) {
        return false;
    }
    return true;
}

module.exports = {
    filterByQuery,
    findById,
    createNewAnimal,
    validateAnimal
}