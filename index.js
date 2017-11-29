const Discord = require('discord.js');
const bot = new Discord.Client();
const request = require('request');
const fs = require('fs');
const ms = require('ms');
var PREF = "-"

var isgay = [
	"This person is gay!",
	"Nah they're straight"
 ];
var fortunes = [
    ":8ball: Yes",
    ":8ball: No",
    ":8ball: Maybe",
    ":8ball: Absolutely",
	":8ball: Absolutely not"]

bot.on("ready", () => {
  cheetahclothing = bot.guilds.find("name", "Cheetah Clothing")
  botonchannel = cheetahclothing.channels.find("name", "cchangout")
	
  botonchannel.send("Bot Online")
  console.log("CheetahBot online.")

  bot.user.setPresence({game:{name: "say ;help", type:0}});

	
 });
bot.on("guildMemberAdd", function(member) {
  member.guild.channels.find("name", "cchangout").send(`<@${member.user.id}> joined.`)
 });
bot.on("guildMemberRemove", function(member) {
  member.guild.channels.find("name", "cchangout").send(`**${member.user.tag}** left.`)
 });

bot.on("message", function(message) {
		let args1 = message.content.split(" ").slice(1);
		var result = args1.join(" ");
  	if (message.author.equals(bot.user)) return;

    if (!message.content.startsWith(PREF)) return;

    var args = message.content.substring(PREF.length).split(" ");

    switch (args[0].toLowerCase()) {

			//hidden commands
			/*case "deleteallroles":
				  if (message.author.id !== "239823359502843904") return;
					message.guild.roles.
				break;*/
		    	case "oof":
				 oofmember = message.guild.member(message.mentions.users.first());
				 if (!oofmember) return message.reply("**YOU MUST CHOOSE SOMEONE TO OOF OR I WILL OOF YOU!**");
				 message.channel.send(`**YOU JUST OOFED <@${oofmember.user.id}>**`);
				break;
			case "eval":
					if (message.author.id !== "239823359502843904") return;
					try {
						var code = args.join(" ")
						var evaled = eval(code)

						if (typeof evaled !== "string") {
							evaled = require("util").inspect(evaled);
						}

						message.channel.sendCode("x1", clean(evaled))
					} catch (err) {
						message.channel.send(`\`ERROR\` \`\`\`x1\n${clean(err)}\n\`\`\``);
					}
				break;
		  //Moderation commands
			case "purge":
					let ROLE = message.guild.roles.find("name", "Server_Moderators");
					if (!message.member.roles.has(ROLE.id)) return message.reply("you don't have the permissions for that.");
					let messagecount = parseInt(result);
					/*if (typeof args !== "number") return message.reply("you must supply a number");*/
					if (messagecount > 100 || messagecount < 1 || messagecount === NaN) return message.channel.send("You must choose a number between 1 and 100.");
					message.channel.fetchMessages({limit: messagecount}).then(messages => message.channel.bulkDelete(messages));
					console.log(`Purged ` + messagecount + ` messages from ${message.channel.name}`);
				break;
			case "mute":
					let member4 = message.mentions.members.first();
					if (!member4) return message.channel.send("You must mention an user to mute.");
					let muRole = message.guild.roles.find("name", "Muted");
					let guildr = message.guild
					if (!guildr.member(bot.user.id).roles.find("name", "Server_Moderators")) return message.reply("I don't have the correct permissions.");
					let parms = message.content.split(" ").slice(1);
					let mutetime = parms[1];
					if (!mutetime) return message.channel.send("Please specify a duration for the mute.");
					member4.addRole(muRole.id);
					message.channel.send(`<@${member4.user.tag}> was muted for ${ms(ms(mutetime), {long: true})}`);
					var mutelog = new Discord.RichEmbed()
						.setColor("#00FFFF")
						.setTimestamp()
						.addField("User:", member4)
						.addField("Action:", "Mute")
						.addField("Duration:", `${ms(ms(mutetime), {long: true})}`)
						.addField("Moderator:", `${message.author.username}#${message.author.discriminator}`);
						bot.channels.find("name", "moderation-logs").sendEmbed(mutelog);
						console.log("Muted" + member4 + ` for ${ms(ms(mutetime), {long: true})} | by: ${message.author.username}#${message.author.discriminator}`);
					setTimeout(function(){
						member4.removeRole(muRole.id);
						var autounmutelog = new Discord.RichEmbed()
							.setColor("#008080")
							.addField("Action:", "AutoUnmute")
							.addField("Duration:", `${ms(ms(mutetime), {long: true})}`)
							.addField("Moderator:", `${bot.user}#${bot.discriminator}`)
						bot.channels.find("name", "moderation-logs")
						}, ms(mutetime));
						console.log("Unmuted" + member4 + ` after ${ms(ms(mutetime), {long: true})} | by: ${message.author.username}#${message.author.discriminator}`);
				break;
			case "unmute":
					let member12 = message.mentions.members.first();
					let mutRole = message.guild.roles.find("name", "Muted");
					member12.removeRole(mutRole.id);
					message.channel.send(`${member12.user.tag} was unmuted.`);
					console.log(`${member12.user.tag} was unmuted. | by: ${message.author.username}$${message.author.discriminator}`);
				break;
			case "kick":
					let modlog = message.channel.guild.channels.find("name", "moderation-logs");
					if (!modlog) return message.reply("There is no channel called #moderation-logs.");
					let kickreason = args.splice(1, args.length).join(" ");
					if (reason.length < 1) return message.reply("You must supply a reason for the kick.");
					let guild = message.guild
					if (!guild.member(bot.user.id).hasPermission("KICK_MEMBERS")) return message.reply("You don't have the correct permissions").catch(error =>
						console.error(error));
						let user1 = message.mentions.users.first();
						if (message.mentions.users.size < 1) return message.reply("You must mention a user.").catch(error => console.error(error));
						if (!message.guild.member(user1).kickable) return message.reply("You cannot kick this user.").catch(error => console.error(error));
						message.guild.member(user1).kick();
						message.channel.send(`${user1.username} was kicked.`);
						var embed = new Discord.RichEmbed()
						.setColor("#FFA500")
						.setTimestamp()
						.addField("Action:", "Kick")
						.addField("User:", user1)
						.addField("Reason:", kickreason)
						.addField("Moderator:", `${message.author.username}#${message.author.discriminator}`);
						bot.channels.get(modlog.id).sendEmbed(embed);
						console.log(user1 + ` was kicked | by: ${message.author.username}#${message.author.discriminator}`);
					break;
			case "ban":
				let modlog1 = message.channel.guild.channels.find("name", "moderation-logs");
				if (!modlog1) return message.reply("There is no channel called #moderation-logs.");
				let banreason = args.splice(1, args.length).join(" ");
				if (banreason.length < 1) return message.reply("You must supply a reason for the ban.");
				if (!message.guild.member(bot.user.id).hasPermission("BAN_MEMBERS")) return message.reply("You don't have the correct permissions").catch(error =>
					console.error(error));
					let user2 = message.mentions.users.first();
					if (message.mentions.users.size < 1) return message.reply("You must mention a user.").catch(error => console.error(error));
					if (!message.guild.member(user2).kickable) return message.reply("You cannot ban this user.").catch(error => console.error(error));
					message.guild.member(user2).ban();
					message.channel.send(`**${user2.username}** was banned.`);
					var embed = new Discord.RichEmbed()
					.setColor("#00FFFF")
					.setTimestamp()
					.addField("Action:", "Ban")
					.addField("User:", user2)
					.addField("Reason:", banreason)
					.addField("Moderator:", `${message.author.username}#${message.author.discriminator}`);
					bot.channels.get(modlog1.id).sendEmbed(embed);
					console.log(user2 + ` was banned. | by: ${message.author.username}#${message.author.discriminator}`);
				break;
			//misc commands
			case "userinfo":
					 var usernameA = message.mentions.members.first()
					 if (!usernameA) return message.reply("Please mention a user.")
					 var userinfo = new Discord.RichEmbed()
					 .setDescription("User info:")
					 .addField("Username", `${message.mentions.members.first()}`)
					 .addField("ID", `${usernameA.id}`)
					 .addField("Account Made", `${usernameA.createdAt}`)
					 .setColor("#9B59B6")
				 	message.channel.sendEmbed(userinfo);
					console.log(`Userinfo command ran | by: ${message.author}`);
			 	break;
			case "membercount":
					let guild3 = message.guild
					message.channel.send("The current membercount is `" + new Number(guild3.memberCount) + "឵` ឵឵members.").catch(console.error);
					console.log(`Membercount command ran | by: ${message.author}`)
				break;
			case "gaytest":
					if (args[0]) message.channel.send(isgay[Math.floor(Math.random() * isgay.length)]);
					console.log(`gaytest command ran | by: ${message.author}`);
				break;
			case "bork":
					message.channel.send("no bork");
					console.log(`bork command ran | by: ${message.author}`);
				break;
			case "fire":
					message.channel.send(":penguin: || fire = penquin || :penguin: ") //a dont mess wit it its de bots kod so delete it all? no
					console.log(`fire command ran | by: ${message.author}`);
				break;
			case "8ball":
					if (args[0]) message.channel.send(fortunes[Math.floor(Math.random() * fortunes.length)]);
 				 	console.log(`8ball command ran | ${message.author}`);
				break;
			case "ping":
				message.channel.send("Pong! `" + `${Date.now() - message.createdTimestamp}` + "ms`");
				console.log(`ping command ran | by: ${message.author}`);
				break;
			case "invite":
					message.channel.send("https://discord.js/SaaJN6A")
				break;
      case "info":
			 	 var info = new Discord.RichEmbed()
			   		.setTitle("CheetahBot information")
			  		 .addField("Name", "Cheetah")
			  		 .addField("Description", "The bot for Cheetah Clothing and Cheetah Airlines (coming soon :wink:)")
			  		 .addField("Main Developer", "TanjimJHynes#0817")
			   		 .addField("Co Developer", "zRetronix#4181")
			   		 .setColor("ff3700")
			   		 .setTimestamp()
				 	 message.channel.sendEmbed(info)
					 console.log(`info command ran | by: ${message.author}`)
      		break;
     		 case "avatar":
				 	let member3 = message.mentions.members.first();
					var avatar = new Discord.RichEmbed()
						.setColor("RANDOM")
						.setThumbnail(message.author.avatarURL)
					let member2 = message.mentions.members.first();
					message.channel.sendEmbed(avatar)
          		break;
			//help commands
			case "help":
					var help = new Discord.RichEmbed()
						.setTitle("CheetahBot help section.")
						.addField("Welcome to the help section", "Hello and welcome to the help section. If you need any kind of help, please DM TanjimJHynes#0817 and wait patienty until he replies.")
						.setColor("04fff9")
						.setFooter("Do ;cmds for a full list of commands.")
					message.channel.sendEmbed(help)
					console.log(`help command ran | by: ${message.author}`);
				break;
			case "faq":
				var faq = new Discord.RichEmbed()
				.setTitle("Frequently Asked Questions.")
				.addField("How do I apply?", "Staff application: http://www.roblox.com/games/908249831/CC-Applications")
				.addField("Who is the owner?", "TanjimJHynes.")
				.addField("When is Payday?", "Payday is every Friday.")
				.setDescription("A list of frequently asked questions.")
				.setTimestamp()
				.setColor("0x04fff9")
				message.channel.sendEmbed(faq);
				break;
				console.log(`faq command ran | by: ${message.author}`);
			case "cmds":
					var cmds = new Discord.RichEmbed()
						.setTitle("List of available commands.")
						.addField("Moderation Commands", ";kick [mention]\n;mute [mention] [duration]\n;ban [mention]\n;unmute [mention]\n;purge [number of messages to purge + 1]")
						.addField("Music commands", ";play [YouTube Link/YouTube Search Keywords]\n;skip\n;stop\n;queue-clear")
						.addField("Misc commands", ";gaytest [mention]\n;bork\n;fire\n;8ball [question]\n;ping\n;avatar [mention]\n;info\n;userinfo [mention]\n;membercount")
						.addField("Help commands", ";help\n;faq\n;cmds")
						.setColor("0x04fff9")
					message.channel.sendEmbed(cmds);
				break;
				console.log(`cmds command ran | by: ${message.author}`);
	 }});


bot.login(process.env.BOT_TOKEN)
