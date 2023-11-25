const delay = require('./delay');
const print = require('./print');
const { text, wordDuration } = require('./config');

const run = async () => {
    for (const index in Object(text)) {
        print(+index);
        await delay(wordDuration);
    }
};

run();