const deck = {
    "id": "123413423",
    "title": "React"
};
const card = {
    "id":"8xf0y6ziyjabvozdd253nd",
    "deckId": "123413423",
    "question": "What is React",
    "Answer": "A library for managing user interface"
};

const score = {

};

const state = {
    deck: [deck],
    card: [card]
};

const myDummyData = {
    "Hobbies":{
        "id":"23bd17af-a6a9-4296-9f59-40b063805062",
        "title":"Hobbies",
        "cards":[]
    },
    "Home":{
        "id":"1a1fdae2-71a7-4933-805a-a11e5778ade6",
        "title":"Home",
        "cards":[]
    }
};

const dummyData = {
    React: {
        title: 'React',
            cards: [
            {
                question: 'What is React?',
                answer: 'A library for managing user interfaces'
            },
            {
                question: 'Where do you make Ajax requests in React?',
                answer: 'The componentDidMount lifecycle event'
            }
        ]
    },
    JavaScript: {
        title: 'JavaScript',
            cards: [
            {
                question: 'What is a closure?',
                answer: 'The combination of a function and the lexical environment within which that function was declared.'
            }
        ]
    }
};