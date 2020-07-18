// Load up the discord.js library
const Discord = require("discord.js");
const ms = require("ms");
// This is your client. Some people call it `bot`, some people call it `self`, 
// some might call it `cootchie`. Either way, when you see `client.something`, or `bot.something`,
// this is what we're refering to. Your client.
const client = new Discord.Client();

// Here we load the config.json file that contains our token and our prefix values. 
const config = require("./config.json");
// config.token contains the bot's token
// config.prefix contains the message prefix.

client.on("ready", () => {
    // This event will run if the bot starts, and logs in, successfully.
    console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
    // Example of changing the bot's playing game to something useful. `client.user` is what the
    // docs refer to as the "ClientUser".
    client.user.setActivity(`bro help`);
});

client.on("guildCreate", guild => {
    // This event triggers when the bot joins a guild.
    console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
    client.user.setActivity(`bro help`);
});

client.on("guildDelete", guild => {
    // this event triggers when the bot is removed from a guild.
    console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
    client.user.setActivity(`bro help`);
});


client.on("message", async message => {
    // This event will run on every single message received, from any channel or DM.

    // It's good practice to ignore other bots. This also makes your bot ignore itself
    // and not get into a spam loop (we call that "botception").
    if (message.author.bot) return;

    // Also good practice to ignore any message that does not start with our prefix,
    // which is set in the configuration file.
    if (message.content.indexOf(config.prefix) !== 0) return;

    // Here we separate our "command" name, and our "arguments" for the command.
    // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
    // command = say
    // args = ["Is", "this", "the", "real", "life?"]
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const content = message.content;
    const commands = [
        {
            name: "help",
            value: "Show this help info."
        },
        {
            name: "kick",
            value: "Kick a member."
        },
        {
            name: "ban",
            value: "Ban a member."
        },
        {
            name: "purge",
            value: "Deletes the last x messages."
        },
        {
            name: "mute",
            value: "Mute a user"
        },
		{
            name: "unmute",
            value: "Unute a user"
        },
        {
            name: "role",
            value: "Add a role to a user."
        },
		{
            name: "removerole",
            value: "Remove a role from a user."
        },
        {
            name: "warn",
            value: "Give a user a warning."
        },
		{
            name: "nick",
            value: "Change a nickname"
        },
        {
            name: "echo",
            value: "Let the bot send a message."
        }
    ];

    // Let's go with a few common example commands! Feel free to delete or change those.
    client.on('guildMemberAdd', member => {
        console.log('User' + member.user.tag + 'has joined the server!');

    });
    if (command === "price") {
let item = args[0]
message.channel.send(`**Price Request!** ${message.author} wants to know the price of **${item}** for switch <@&543091627367989307> <@&555543685199298560>`)
//end of module

	}
});

client.login(process.env.token);
