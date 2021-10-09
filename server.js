const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const { animals } = require('./data/animals');

app.listen(PORT, () => {
    console.log("server is live on port 3001!");
});

app.get('/api/animals', (req, res) => {
    let results = animals;
    if (req.query){
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

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
}

