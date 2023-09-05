// Dice command
function rollDice(ctx) {
    const sides = 6;
    const res = Math.floor(Math.random() * sides) + 1;
    return `You rolled a ${res}`;
}

// Vibecheck command
function vibeCheck(ctx) {
    const tags = ctx[1];
    const rand = randInRange(0, 100);
    return `You are ${rand}% vibing!`;
}


// Utility Commands

// These are used within multiple commands
function randInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}


const botCommands = {
    'dice': rollDice,
    'vibecheck': vibeCheck,
};

module.exports = botCommands;