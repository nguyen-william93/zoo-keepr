const fs = require('fs');
const { filterByQuery, findById, createNewAnimal, validateAnimal,} = require('../lib/animals');
const { animals } = require('../data/animals');
jest.mock('fs');

test("creates an animal object", () => {
    const animal = createNewAnimal({ name: "Darlene", id: "12345" }, animals);

    expect(animal.name).toBe("Darlene");
    expect(animal.id).toBe("12345");
});

test("filters by query", () => {
    const startingAnimals = [
        {
        id: "3",
        name: "Erica",
        species: "gorilla",
        diet: "omnivores",
        personalityTraits: ['quirky', 'rash'],
        },
        {
            id: "4",
            name: "Noel",
            diet: "carnivore",
            personalityTraits: ["impish", "sassy", "brave"]
        },
    ];
    const updateAnimals = filterByQuery({ species: "gorilla" }, startingAnimals);
    expect(updateAnimals.length).toEqual(1);
});

test("find by id", () => {
    const startingAnimals = [
        {
        id: "3",
        name: "Erica",
        species: "gorilla",
        diet: "omnivores",
        personalityTraits: ['quirky', 'rash'],
        },
        {
            id: "4",
            name: "Noel",
            diet: "carnivore",
            personalityTraits: ["impish", "sassy", "brave"]
        },
    ];
    const result = findById("3", startingAnimals);
    expect(result.name).toBe('Erica');
});

test("validate personality traits", () => {
    const validAnimals =
        {
        id: "3",
        name: "Erica",
        species: "gorilla",
        diet: "omnivores",
        personalityTraits: ['quirky', 'rash'],
        };
    
    const invalidAnimals = {
        id: '3',
        name: "Erica",
        species: "gorilla",
        diet: "omnivore",
    }

    const result = validateAnimal(validAnimals);
    const result2 = validateAnimal(invalidAnimals);

    expect(result).toBe(true);
    expect(result2).toBe(false);
});