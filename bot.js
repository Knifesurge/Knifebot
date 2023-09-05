const tmi = require('tmi.js');
const botCommands = require('./commands.js');

// Define configuration options
const opts = {
    options: { debug: true },
    identity: {
        username: 'knifechatbot',
        password: 'oauth:1qep0czu0cvhufgzpkl8nkuv4txr6l'
    },
    channels: [
        'knifesurge'
    ]
};

// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);
client.on('connectFailed', function(error) {
    console.log('[!!] Connect error: ' + error.toString());
});

// Connect to Twitch
client.connect().catch(console.error);

//============== START OF HANDLERS ==============

// Called every time the bot connects to Twitch chat
function onConnectedHandler(addr, port) {
    console.log(`* Connected to ${addr}:${port}`);
}

// Called every time a message comes in
function onMessageHandler(channel, tags, message, self) {
    if (self || !message.startsWith('!')) return; // Ignore our own messages

    const args = message.slice(1).split(' ');
    const command = args.shift(1).toLowerCase();

    // If known command, execute it
    if (command in botCommands) {
        // DEBUG
        console.log(`args: ${args}`);
        const ctx = [args,tags];

        const res = botCommands[command](ctx);
        client.say(channel, `@${tags.username} ${res}`);
        console.log(`* Executed ${command} command`);
    }
    else {
        console.log(`* Unknown command ${command}`);
    }
}

//============== END OF HANDLERS ==============
