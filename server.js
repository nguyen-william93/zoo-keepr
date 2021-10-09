const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const { animals } = require('./data/animals');

app.listen(PORT, () => {
    console.log(`API server is now on ${PORT}`);
});

app.get('/api/animals', (req, res) => {
    let results = animals;
    if (req.query){
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

app.get('/api/animals/:id', (req, res) => {
    const result = findById(req.params.id, animals);
    if (result){
        res.json(result);
    } else {
        res.send(404);
    }
});

function findById (id, animalsArr){
    const result = animalsArr.filter(animal => animal.id === id)[0];
    return result;
};

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

