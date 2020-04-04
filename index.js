// Load up the discord.js library
const Discord = require("discord.js");

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
  client.user.setActivity(`Catching villains in ${client.guilds.size} servers!`);
});

client.on("guildCreate", guild => {
  // This event triggers when the bot joins a guild.
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setActivity(`Catching villains in ${client.guilds.size} servers!`);
});

client.on("guildDelete", guild => {
  // this event triggers when the bot is removed from a guild.
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setActivity(`Catching villains in ${client.guilds.size} servers!`);
});

client.on("message", async message => {
  // This event will run on every single message received, from any channel or DM.
  
  // It's good practice to ignore other bots. This also makes your bot ignore itself
  // and not get into a spam loop (we call that "botception").
  if(message.author.bot) return;
  
  // Also good practice to ignore any message that does not start with our prefix, 
  // which is set in the configuration file.
  if(message.content.indexOf(config.prefix) !== 0) return;
  
  // Here we separate our "command" name, and our "arguments" for the command. 
  // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
  // command = say
  // args = ["Is", "this", "the", "real", "life?"]
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  const content = message.content
  
  // Let's go with a few common example commands! Feel free to delete or change those.
  client.on('guildMemberAdd', member => {
  console.log('User' + member.user.tag + 'has joined the server!');

  var role = member.guild.roles.find('name', 'Member');
  member.addRole(role);
});
 if (command === "help") {
	     message.channel.send("I've sent you a list of my commands through DM!")
        message.author.send("```These are my commands. \n -Ticket, Create a ticket. \n -Credit, see the credits :3```")
 }
if(command === "ticket") {
message.delete()
let user = message.member.user.tag
let userid = message.member.id
let staffrole = message.guild.roles.find("name", "Staff");
let helpmessage = args.join(" ");
if (!helpmessage) return message.reply ("Please provide a reason!")
if (!staffrole) return message.reply("No staff role found!")
let staffid = staffrole.id
const channel = await message.guild.createChannel(`${user}`, {
    type: 'text',
    permissionOverwrites: [
        {
            id: message.guild.id,
            deny: ['VIEW_CHANNEL'],
        },
        {
            id: message.author.id,
            allow: ['VIEW_CHANNEL', 'SEND_MESSAGES'],
        },
        {
            id: `${staffid}`,
            allow: ['VIEW_CHANNEL', 'SEND_MESSAGES'],
        },
    ],
})
const category = message.guild.channels.find(c => c.name == "Modmail" && c.type == "category");
if (!category) return message.reply("Category not found!")
channel.setParent(category.id);

message.reply("You have been given a personal channel! Please be patient and wait for a Staff member to help you out!")
channel.send(`${staffrole} ${message.member} **Needs help** with **${helpmessage}**`) 
};

if (command === "close"){
if(message.channel.parent.name === "Modmail") {
message.channel.delete()
} else return message.reply("This isn't a Modmail channel!")
}
	  
  if(command === "credit")//delete messages 
  {
message.channel.send("Creddit big husker man ol right reserve")
}});

client.login(process.env.token);