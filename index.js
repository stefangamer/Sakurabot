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
  client.user.setActivity(`Being a smol bean | -help`);
});

client.on("guildCreate", guild => {
  // This event triggers when the bot joins a guild.
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setActivity(`Being a smol bean | -help`);
});

client.on("guildDelete", guild => {
  // this event triggers when the bot is removed from a guild.
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setActivity(`Being a smol bean | -help`);
});

client.on("message", async message => ((((((({
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
  
if(content === "Are you a bot?"){
message.channel.send("Oh no dear, I am a living creature!")
}
  
  if(command === "ping") {
    // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
    // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
  }
  		
  if(command === "help") {
    //Please only mess with new lines
    const m = message.channel.send("I've sent you a list of my commands through DM!")
	message.author.send({embed: {
    color: 12745742,
    author: {
      name: client.user.username,
      icon_url: client.user.avatarURL
    },
    title: "Help",
    description: "**☕ Hey there, here is a list of my commands ☕**",
    fields: [{
        name: "-report",
        value: "Report a user to our staff members."
      },
	  {
        name: "-avatar",
        value: "Request someones avatar."
      },
	  {
        name: "-role and -removerole",
        value: "Add or remove a role to a user."
      },
      {
        name: "-kick",
        value: "Kick a player (Mod only)."
      },
      {
        name: "-ban",
        value: "Ban a player (Admin only)."
	  },
      {
        name: "-purge (amount)",
        value: "Deletes the last x messages."
      },
	  {
        name: "-mute and -unmute",
        value: "Mute or unmute a user."
      },
      {
        name: "-warn",
        value: "Give a user a warning (trainee+)."
      }
    ],
    timestamp: new Date(),
    footer: {
      icon_url: client.user.avatarURL,
      text: "Sakura bot"
    }
  }
});
  }
  
	
 if (command === "report") {
        const sayMessage = args.join(" ");
    var yeet = 1
    let reason = args.slice(1).join(' ');
    let member = message.mentions.members.first()
    fetched = parseInt(yeet)
	    message.channel.bulkDelete(fetched)    
        message.channel.send(`Reported ${member} successfully.`)
        client.channels.get('671019711517032459').send(`${message.author} Reports ${member} for **${reason}** <@&671016730704740363> <@&671016759234396190>.`);
    }

 if (command === "support") {
message.delete
message.channel.send(`${message.author} needs support  <@&671016730704740363>`)
    }

 if (command === "sakura") {
 var memes = Math.floor((Math.random() * 10) + 1); //change the 11 to how many memes you have
            message.channel.send(new Discord.Attachment("./Images/" + memes + ".jpg", "./Images/" + memes + ".jpg"))
            message.channel.send(new Discord.Attachment("./Images/" + memes + ".png", "./Images/" + memes + ".png"))
    }
	
if (command === "avatar") {
  if (!message.mentions.users.size) {

return message.channel.send(`Your avatar: ${message.author.displayAvatarURL}`);

}



const avatarList = message.mentions.users.map(user => {

return `${user.username}\'s avatar: ${user.displayAvatarURL}`;

});

message.channel.send(avatarList);
}

if (command === "pet") {
message.channel.send("U... UwU ❤")
}
	
  if(command === "warn") {
    var embedColor = '#ffffff' // Change this to change the color of the embeds!
    
    var missingPermissionsEmbed = new Discord.RichEmbed() // Creates the embed thats sent if the user is missing permissions
        .setColor(embedColor)
        .setAuthor(message.author.username, message.author.avatarURL)
        .setTitle('Insufficient Permissions!')
        .setDescription('You need the `MANAGE_MESSAGES` permission to use this command!')
        .setTimestamp();
    var missingArgsEmbed = new Discord.RichEmbed() // Creates the embed thats sent if the command isnt run right
        .setColor(embedColor)
        .setAuthor(message.author.username, message.author.avatarURL)
        .setTitle('Missing Arguments!')
        .setDescription('Usage: `warn [@User] [Reason]')
        .setTimestamp();
    if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(missingPermissionsEmbed); // Checks if the user has the permission
    let mentioned = message.mentions.users.first(); // Gets the user mentioned!
    if(!mentioned) return message.channel.send(missingArgsEmbed); // Triggers if the user donsn't tag a user in the message
    let reason = args.slice(1).join(' ') // .slice(1) removes the user mention, .join(' ') joins all the words in the message, instead of just sending 1 word
    if(!reason) return message.channe.send(missingArgsEmbed); // Triggers if the user dosn't provide a reason for the warning

    var warningEmbed = new Discord.RichEmbed() // Creates the embed that's DM'ed to the user when their warned!
        .setColor(embedColor)
        .setAuthor(message.author.username, message.author.avatarURL)
        .setTitle(`You've been warned in ${message.guild.name}`)
        .addField('Warned by', message.author.tag)
        .addField('Reason', reason)
        .setTimestamp();
	let warnedmember = message.mentions.members.first()
	
    var warningEmbed2 = new Discord.RichEmbed() // Creates the embed that's DM'ed to the user when their warned!
        .setColor(embedColor)
        .setTitle(`${warnedmember} has been warned in ${message.guild.name}`)
        .addField('Warned by', message.author.tag)
        .addField('Reason', reason)
        .setTimestamp();
    mentioned.send(warningEmbed); // DMs the user the above embed!
    var warnSuccessfulEmbed = new Discord.RichEmbed() // Creates the embed thats returned to the person warning if its sent.
        .setColor(embedColor)
        .setTitle('User Successfully Warned!');
    message.channel.send(warnSuccessfulEmbed); // Sends the warn successful embed
    message.delete(); // Deletes the command
    client.channels.get('678271951533506565').send(warningEmbed2);
}
  
  if(command === "say") {if(message.member.roles.some(r=>["Kira", "Trainee", "Bot Designer", "Emperor", "High Power", "Mod", "Administrator", "Technician PRO"].includes(r.name)) ) {
    // makes the bot say something and delete the message. As an example, it's open to anyone to use. 
    // To get the "message" itself we join the `args` back into a string with spaces: 
    const sayMessage = args.join(" ");
    // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
    message.delete().catch(O_o=>{}); 
    // And we get the bot to say the thing: 
    message.channel.send(sayMessage);
  }
  }
  
if (command === "nick") {
        if(!message.member.hasPermission("MANAGE_NICKNAMES")) return message.reply("Hey! You can't do that!");
        let nick = args.slice(1).join(' ');
		let nicked = message.mentions.members.first()
        message.mentions.members.first().setNickname(`${nick}`)
     }


if(command === "nickall") {if(message.member.roles.some(r=>["Kira"].includes(r.name)) ) {
for (const item of message.guild.members) {
    let nick = args.slice(0).join(' ');
    let id = item[0];
    let member = item[1];
    member.setNickname(`${nick}`)  
  }} else return message.reply("Ur gay")
}
  
  if(command === "kick") {
    // This command must be limited to the roles we wanna choose. In this example we just hardcode the role names.
    // Please read on Array.some() to understand this bit: 
    // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/some?
        if(!message.member.hasPermission("KICK_MEMBERS")) return message.reply("Hey! You can't do that!");
    
    // Let's first check if we have a member and if we can kick them!
    // message.mentions.members is a collection of people that have been mentioned, as GuildMembers.
    // We can also support getting the member by ID, which would be args[0]
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!member)
      return message.reply("Please mention a valid member!");
    if(!member.kickable) 
      return message.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");
    
    // slice(1) removes the first part, which here should be the user mention or ID
    // join(' ') takes all the various parts to make it a single string.
    let reason = args.slice(1).join(' ');
    if(!reason) reason = "No reason provided";
    
    // Now, time for a swift kick in the nuts!
    await member.kick(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
    message.reply(`${member.user.tag} has been kicked by ${message.author.tag} because: ${reason}`);

  }
  

  if(command === "mute") {
 if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("No can do.");
  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!tomute) return message.reply("Couldn't find user.");
  if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("Can't mute them!");
  let reason = args.slice(2).join(" ");
  if(!reason) return message.reply("Usage is -mute (user) (time in minutes) (reason) \n EG: -mute @kyle 10 spam");

  let muterole = message.guild.roles.find(`name`, "muted");
  //start of create role
  if(!muterole){
    try{
      muterole = await message.guild.createRole({
        name: "muted",
        color: "#000000",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }
  //end of create role
  let mutetime = args[1]
    let muteminutes = mutetime * 60000
   timeInt = parseInt(muteminutes)

  message.delete().catch(O_o=>{});

  try{
    await tomute.send(`Hi! You've been muted for ${mutetime} minute(s). Sorry!`)
  }catch(e){
    message.channel.send(`A user has been muted... but their DMs are locked. They will be muted for ${mutetime} minutes`)
  }

  let muteembed = new Discord.RichEmbed()
  .setDescription(`Mute executed by ${message.author}`)
  .setColor("#0000000")
  .addField("Muted User", tomute)
  .addField("Muted in", message.channel)
  .addField("Time", message.createdAt)
  .addField("Length", mutetime + " minute(s)")
  .addField("Reason", reason);

  let channel = message.guild.channels.find(c => c.name === "logs");
  if(!channel) return message.reply("Please create a logs channel first!");
  channel.send(muteembed);

  await(tomute.addRole(muterole.id));

setTimeout(function() {
         tomute.removeRole(muterole.id); 
        }, timeInt);

//end of module
}

module.exports.help = {
  name: "tempmute"
}

 if (command === "role") {
	    let role = args[1]
        let memberRole = message.guild.roles.find("name", role)
        let member = message.mentions.members.first()
        member.addRole(memberRole)
        message.reply(`${member} has gotten the role ${role}.`)
    }
	
if (command === "removerole") {
	    let role = args[1]
        let memberRole = message.guild.roles.find("name", role)
        let member = message.mentions.members.first()
        member.removeRole(memberRole)
        message.reply(`${member} was taken away the ${role} role.`)
    }

if(command === "unmute") {
	 let member = message.mentions.members.first()
	 let Boterator = message.guild.roles.find("name", "muted")
	 member.removeRole(Boterator)
	 client.channels.get('544625078823026700').send(`${member} has been unmuted by ${message.author}.`)
  }

	  if(command === "ban") {
        if(!message.member.hasPermission("BAN_MEMBERS")) return message.reply("Hey! You can't do that!");
		
		let member = message.mentions.members.first();
		if(!member)
		  return message.reply("Please mention a valid member!");
		if(!member.bannable) 
		  return message.reply("I cannot ban this user! Do they have a higher role? Do I have ban permissions?");

		let reason = args.slice(1).join(' ');
		if(!reason) reason = "No reason provided";
		
		await member.ban(reason)
		  .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}.`));
		message.reply(`${member.user.tag} has been banned by ${message.author.tag} because: ${reason}.`);
		 client.channels.get('544625078823026700').send(`${member} has been banned by ${message.author}.`)
	  }
	  
  if(command === "purge")//delete messages 
  {
 if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("No can do.");
 const deleteCount = parseInt(args[0], 10);
 const deleteCount2 = parseInt(deleteCount + 1)
  
    
    if(!deleteCount || deleteCount < 1 || deleteCount > 100)// min and max purge 
      return message.reply("Please provide a number between 1 and 99 for the number of messages to delete");
    
    const fetched = await message.channel.fetchMessages({limit: deleteCount2});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Couldn't delete messages because of: ${error}.`));
}});

client.login(process.env.token);