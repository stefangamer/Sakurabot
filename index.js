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
            name: "echo",
            value: "Let the bot send a message."
        }
    ];

    // Let's go with a few common example commands! Feel free to delete or change those.
    client.on('guildMemberAdd', member => {
        console.log('User' + member.user.tag + 'has joined the server!');

    });
    if (command === "help") {
        let input = args.join(" ");
        message.delete();
        if (!input) {
            //Please only mess with new lines
            const m = message.channel.send("I've sent you a list of my commands through DM!");
            message.author.send({
                embed: {
                    color: 12745742,
                    author: {
                        name: client.user.username,
                        icon_url: client.user.avatarURL
                    },
                    title: "Help",
                    description: "***_So you want to know how to use my power? Here is a quick guide!_***",
                    fields: commands,
                    timestamp: new Date(),
                    footer: {
                        icon_url: client.user.avatarURL,
                        text: "Paradise Bot V.1.2.0"
                    }
                }
            });
        }

        const validCommand = commands.find(function(item){
            return item.name === input;
        });

        if (!validCommand && !!input) {
            message.channel.send('That is not a valid command, SMH....');
            return;
        }

        if (input === "help") {
            const embed = new Discord.RichEmbed()
                .setTitle("`!help`")
                .setDescription("This contains info on how to properly use `!help`")
                .addField("Description", "Shows this command!")
                .addField("Usage", "```!help (command name)```")
                .addField("Example", "```!help kick```")
                .addField("Permissions needed", "`None`")
                .setFooter("Variables surrounded by [] are mandatory, () means optional");
            message.channel.send(embed)
        }
        if (input === "kick") {
            const embed = new Discord.RichEmbed()
                .setTitle("`!kick`")
                .setDescription("This contains info on how to properly use `!kick`")
                .addField("Description", "Kicks a user from the server.")
                .addField("Usage", "```!kick [user] (reason)```")
                .addField("Example", "```!kick @Husky spam```")
                .addField("Permissions needed", "`KICK_MEMBERS`")
                .setFooter("Variables surrounded by [] are mandatory, () means optional");
            message.channel.send(embed)
        }
        if (input === "ban") {
            const embed = new Discord.RichEmbed()
                .setTitle("`!ban`")
                .setDescription("This contains info on how to properly use `!ban`")
                .addField("Description", "Bans a user from the server.")
                .addField("Usage", "```!ban [user] (reason)```")
                .addField("Example", "```!ban @Husky spam```")
                .addField("Permissions needed", "`BAN_MEMBERS`")
                .setFooter("Variables surrounded by [] are mandatory, () means optional");
            message.channel.send(embed)
        }
        if (input === "purge") {
            const embed = new Discord.RichEmbed()
                .setTitle("`!purge`")
                .setDescription("This contains info on how to properly use `!purge`")
                .addField("Description", "Deletes an amount of messages.")
                .addField("Usage", "```!purge [amount between 1-99]```")
                .addField("Example", "```!purge 20```")
                .addField("Permissions needed", "`MANAGE_MESSAGES`")
                .setFooter("Variables surrounded by [] are mandatory, () means optional");
            message.channel.send(embed)
        }
        if (input === "mute") {
            const embed = new Discord.RichEmbed()
                .setTitle("`!mute`")
                .setDescription("This contains info on how to properly use `!mute`")
                .addField("Description", "Mutes a user.")
                .addField("Usage", "```!mute [@user] [time in muinutes] (reason)```")
                .addField("Example", "```!mute @Husky 10 spam```")
                .addField("Permissions needed", "`MANAGE_MESSAGES`")
                .setFooter("Variables surrounded by [] are mandatory, () means optional");
            message.channel.send(embed)
        }
        if (input === "ummute") {
            const embed = new Discord.RichEmbed()
                .setTitle("`!mute`")
                .setDescription("This contains info on how to properly use `!ummute`")
                .addField("Description", "Unmutes a user.")
                .addField("Usage", "```!unmute [@user]```")
                .addField("Example", "```!unmute @Husky```")
                .addField("Permissions needed", "`MANAGE_MESSAGES`")
                .setFooter("Variables surrounded by [] are mandatory, () means optional");
            message.channel.send(embed)
        }
        if (input === "role") {
            const embed = new Discord.RichEmbed()
                .setTitle("`!role`")
                .setDescription("This contains info on how to properly use `!role`")
                .addField("Description", "Gives a role to a user.")
                .addField("Usage", "```!role [@user] [role name (case sensitive!)]```")
                .addField("Example", "```!role @Husky Administrator```")
                .addField("Permissions needed", "`MANAGE_ROLES`")
                .setFooter("Variables surrounded by [] are mandatory, () means optional");
            message.channel.send(embed)
        }
        if (input === "removerole") {
            const embed = new Discord.RichEmbed()
                .setTitle("`!removerole`")
                .setDescription("This contains info on how to properly use `!removerole`")
                .addField("Description", "Removes a role from a user.")
                .addField("Usage", "```!removerole [@user] [role name (case sensitive!)]```")
                .addField("Example", "```!removerole @Husky Administrator```")
                .addField("Permissions needed", "`MANAGE_ROLES`")
                .setFooter("Variables surrounded by [] are mandatory, () means optional");
            message.channel.send(embed)
        }
        if (input === "warn") {
            const embed = new Discord.RichEmbed()
                .setTitle("`!warn`")
                .setDescription("This contains info on how to properly use `!warn`")
                .addField("Description", "Gives a warning to a user.")
                .addField("Usage", "```!warn [@user] [reason]```")
                .addField("Example", "```!warn @husky spam```")
                .addField("Permissions needed", "`MANAGE_MESSAGES`")
                .setFooter("Variables surrounded by [] are mandatory, () means optional");
            message.channel.send(embed)
        }
        if (input === "echo") {
            const embed = new Discord.RichEmbed()
                .setTitle("`!echo`")
                .setDescription("This contains info on how to properly use `!echo`")
                .addField("Description", "Lets the bot send a specific message in a channel")
                .addField("Usage", "```!echo (channel mention) [message]```")
                .addField("Example", "```!echo hi or !echo #general hi```")
                .addField("Permissions needed", "`MANAGE_MESSAGES`")
                .setFooter("Variables surrounded by [] are mandatory, () means optional");
            message.channel.send(embed)
        }

    }


    if (command === "warn") {
        let warnchannel = message.guild.channels.find(c => c.name === "warnings");
        if (!warnchannel) return message.reply("Please create a warnings channel first!");
        var embedColor = '#ffffff'; // Change this to change the color of the embeds!

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
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(missingPermissionsEmbed); // Checks if the user has the permission
        let mentioned = message.mentions.users.first(); // Gets the user mentioned!
        if (!mentioned) return message.channel.send(missingArgsEmbed); // Triggers if the user donsn't tag a user in the message
        let reason = args.slice(1).join(' '); // .slice(1) removes the user mention, .join(' ') joins all the words in the message, instead of just sending 1 word
        if (!reason) return message.channe.send(missingArgsEmbed); // Triggers if the user dosn't provide a reason for the warning

        var warningEmbed = new Discord.RichEmbed() // Creates the embed that's DM'ed to the user when their warned!
            .setColor(embedColor)
            .setAuthor(message.author.username, message.author.avatarURL)
            .setTitle(`You've been warned in ${message.guild.name}`)
            .addField('Warned by', message.author.tag)
            .addField('Reason', reason)
            .setTimestamp();
        mentioned.send(warningEmbed); // DMs the user the above embed!
        var warnSuccessfulEmbed = new Discord.RichEmbed() // Creates the embed thats returned to the person warning if its sent.
            .setColor(embedColor)
            .setTitle('User Successfully Warned!');
        message.channel.send(warnSuccessfulEmbed); // Sends the warn successful embed
        let author = message.author;
        let user = message.mentions.members.first();
        var warningEmbed2 = new Discord.RichEmbed() // Creates the embed that's DM'ed to the user when their warned!
            .setColor(embedColor)
            .setAuthor(message.author.username, message.author.avatarURL)
            .setTitle('Warn')
            .addField('Member warned', user)
            .addField('Warned by', author)
            .addField('Reason', reason)
            .setTimestamp();
        message.delete(); // Deletes the command
        warnchannel.send(warningEmbed2);
        let firstwarning = message.guild.roles.find("name", "1 Warning");
        let secondwarning = message.guild.roles.find("name", "2 Warnings");
        let thirdwarning = message.guild.roles.find("name", "3 Warnings");
        if (!thirdwarning) return message.reply("Husky stfu you can't code can't find the third warning role sucks to suck");
        let muterole = message.guild.roles.find("name", "muted");
        let mutetime = 1440;
        let muteminutes = mutetime * 60000;
        timeInt = parseInt(muteminutes);
        let poop = message.mentions.members.first();
        if (!poop.roles.some(r => ["1 Warning"].includes(r.name))) {
            poop.addRole(firstwarning.id)
        }
        if (message.mentions.members.first().roles.some(r => ["1 Warning"].includes(r.name))) {
            poop.addRole(secondwarning.id)
        }
        if (message.mentions.members.first().roles.some(r => ["2 Warnings"].includes(r.name))) {
            poop.addRole(thirdwarning.id);
            await (poop.addRole(muterole.id));
            setTimeout(function () {
                poop.removeRole(muterole.id);
            }, timeInt).catch
        }
    }

    if (command === "unmute") {
        message.delete();
        let muteduser = message.mentions.members.first();
        if (!muteduser) return message.channel.send("Please specify a user to unmute. For correct usage use `!help unmute`");
        let role = message.guild.roles.find("name", "muted");
        muteduser.removeRole(role);
        message.channel.send(`Successfully unmuted ${muteduser.user.tag}`)
    }

    if (command === "purge")//delete messages
    {
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("No can do.");
        const deleteCount = parseInt(args[0], 10);
        const deleteCount2 = parseInt(deleteCount + 1);
        if (!deleteCount2 > 99) return message.reply("Please give an amount between 0 and 99");

        if (!deleteCount || deleteCount < 1 || deleteCount > 100)// min and max purge
            return message.reply("Please provide a number between 1 and 99 for the number of messages to delete");

        const fetched = await message.channel.fetchMessages({limit: deleteCount2});
        message.channel.bulkDelete(fetched)
            .catch(error => message.reply(`Couldn't delete messages because of: ${error}.`));
    }

    if (command === "say") {
        if (!message.member.hasPermission('MANAGE_MESSAGES'))
            return message.reply("I won't let you take control of my body!");
        message.delete();
        // makes the bot say something and delete the message. As an example, it's open to anyone to use.
        // To get the "message" itself we join the `args` back into a string with spaces:
        const sayMessage = args.join(" ");
        // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley
        // And we get the bot to say the thing:
        message.channel.send(sayMessage);
    }

    if (command === "echo") {
        if (!message.member.hasPermission('MANAGE_MESSAGES'))
            return message.reply("I won't let you take control of my body!");
        message.delete();
        // makes the bot say something and delete the message. As an example, it's open to anyone to use.
        // To get the "message" itself we join the `args` back into a string with spaces:
        let channel = message.mentions.channels.first();
        let sayMessage = "Nill";
        if (!channel) {
            channel = message.channel;
            sayMessage = args.join(" ");
        } else {
            sayMessage = args.slice(1).join(' ');
        }
        // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley
        // And we get the bot to say the thing:
        channel.send(sayMessage);
    }

    if (command === "role") {
        if (message.member.hasPermission('MANAGE_ROLES'))
            message.delete();
        const sayMessage = args.slice(1).join(' ');
        if (!sayMessage) {
            return message.channel.send("Please mention a role, for correct usage use `!help role`")
        }
        let role = message.guild.roles.find("name", `${sayMessage}`);
        let roled = message.mentions.members.first();
        if (!roled) {
            roled = message.author
        }
        if (!role) return message.channel.send("Role not found");
        let memberrole = message.member.highestRole;
        if (role.position > memberrole.position) {
            return await message.channel.send("Your role is below that role, nice try though.")
        }
        if (role.position === memberrole.position) {
            return await message.channel.send("Your role is equal to that role, you can't give that role.")
        }
        roled.addRole(role.id);
        message.channel.send(`Sucesfully added role ${sayMessage} to ${roled.user.tag}`)
    }


    if (command === "removerole") {
        if (message.member.hasPermission('MANAGE_ROLES'))
            message.delete();
        const sayMessage = args.slice(1).join(' ');
        if (!sayMessage) {
            return message.channel.send("Please mention a role, for correct usage use `!help removerole`")
        }
        let role = message.guild.roles.find("name", `${sayMessage}`);
        let roled = message.mentions.members.first();
        if (!role) return message.channel.send("Role not found");
        let memberrole = message.member.highestRole;
        if (role.position > memberrole.position) {
            return await message.channel.send("Your role is below that role, nice try though.")
        }
        if (role.position === memberrole.position) {
            return await message.channel.send("Your role is equal to that role, you can't remove that role.")
        }
        message.mentions.members.first().removeRole(role.id);
        message.channel.send(`Sucesfully removed role ${sayMessage} from ${roled.user.tag}`)
    }
	
	
	if (command === "nick") {
	message.delete()
	let nick = "none"
	if(!message.member.hasPermission('CHANGE_NICKNAME')) return message.channel.send("You don't have permissions to nick yourself")
	let nickedperson = message.mentions.members.first()
    if(!!nickedperson && !message.member.hasPermission('MANAGE_NICKNAMES')) return message.channel.send("You don't have permissions to change others nicknames")
    if(!nickedperson) {
	nickedperson = message.member
	nick = args.slice(1).join(' ');
	}
    if(!nick) {nick = nickedperson.user.username}
	if(!!nickedperson) {
	nick = args.slice(1).join(' ');
	}
    nickedperson.setNickname(`${nick}`);
    message.channel.send(`${nickedperson.user.username}'s nickname changed to ${nick}`)
    }


    if (command === "kick") {
        // This command must be limited to the roles we wanna choose. In this example we just hardcode the role names.
        // Please read on Array.some() to understand this bit: 
        // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/some?
        if (!message.member.hasPermission('KICK_MEMBERS'))
            return message.reply("Sorry, you don't have permissions to use this!");

        // Let's first check if we have a member and if we can kick them!
        // message.mentions.members is a collection of people that have been mentioned, as GuildMembers.
        // We can also support getting the member by ID, which would be args[0]
        let member = message.mentions.members.first() || message.guild.members.get(args[0]);
        if (!member)
            return message.reply("Please mention a valid member of this server");
        if (!member.kickable)
            return message.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");

        // slice(1) removes the first part, which here should be the user mention or ID
        // join(' ') takes all the various parts to make it a single string.
        let reason = args.slice(1).join(' ');
        if (!reason) reason = "No reason provided";

        let role = message.member.highestRole;
        let memberrole = member.highestRole;
        if (role.position < memberrole.position) {
            return await message.channel.send("Can't kick them, they are more powerful than you are!")
        }
        if (role.position === memberrole.position) {
            return await message.channel.send("Can't kick them, they are as powerful as you are!")
        }

        // Now, time for a swift kick in the nuts!
        await member.kick(reason)
            .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
        message.reply(`${member.user.tag} has been kicked by ${message.author.tag} because: ${reason}`);

    }

    if (command === "hug") {
        if (message.mentions.members.size === 1) {
			message.delete()
            let member = message.mentions.members.first();
            message.channel.send(`${message.author} gave ${member} a hug!`, {
                file: "https://media.giphy.com/media/CZpro4AZHs436/giphy.gif" //DO NOT CHANGE THIS!!!!
            });
        }
    }


    if (command === "ban") {
        if (!message.member.hasPermission('BAN_MEMBERS'))
            return message.reply("Sorry, you don't have permissions to use this!");

        let member = message.mentions.members.first();
        if (!member)
            return message.reply("Please mention a valid member of this server");
        if (!member.bannable)
            return message.reply("I cannot ban this user! Do they have a higher role? Do I have ban permissions?");

        let role = message.member.highestRole;
        let memberrole = member.highestRole;
        if (role.position < memberrole.position) {
            return await message.channel.send("Can't ban them, they are more powerful than you are!")
        }
        if (role.position === memberrole.position) {
            return await message.channel.send("Can't ban them, they are as powerful as you are!")
        }

        let reason = args.slice(1).join(' ');
        if (!reason) reason = "No reason provided";

        await member.ban(reason)
            .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}.`));
        message.reply(`${member.user.tag} has been banned by ${message.author.tag} because: ${reason}.`);
    }


    if (command === "mute") {
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("No can do.");
        let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if (!tomute) return message.reply("Couldn't find user.");
        if (tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("Can't mute them!");
        let reason = args.slice(2).join(" ");
        if (!reason) return message.reply("Usage is !mute (user) (time in minutes) (reason)");

        let muterole = message.guild.roles.find(`name`, "muted");
        //start of create role
        if (!muterole) {
            try {
                muterole = await message.guild.createRole({
                    name: "muted",
                    color: "#000000",
                    permissions: []
                });
                message.guild.channels.forEach(async (channel, id) => {
                    await channel.overwritePermissions(muterole, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false
                    });
                });
            } catch (e) {
                console.log(e.stack);
            }
        }
        //end of create role
        let mutetime = args[1];
        let muteminutes = mutetime * 60000;
        timeInt = parseInt(muteminutes);

        message.delete().catch(O_o => {
        });

        try {
            await tomute.send(`Hi! You've been muted for ${mutetime} minute(s). Sorry!`)
        } catch (e) {
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
        if (!channel) return message.reply("Please create a logs channel first!");
        channel.send(muteembed);

        await (tomute.addRole(muterole.id));

        setTimeout(function () {
            tomute.removeRole(muterole.id);
        }, timeInt);

//end of module
    }

    module.exports.help = {
        name: "tempmute"
    }
});

client.login(process.env.token);
