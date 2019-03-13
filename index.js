
const Discord = require('discord.js');
var Jimp = require('jimp');
const client = new Discord.Client();
var request = require('request');
var stringLength = require("string-length");
var fs = require("fs");

let mainChat = process.env.mainChat;
//add Role and Welcomer


// Initialize the invite cache
const invites = {};

// A pretty useful method to create a delay without blocking the whole script.
const wait = require('util').promisify(setTimeout);

client.on('ready', () => {
  // "ready" isn't really ready. We need to wait a spell.
  wait(1000);

  // Load all invites for all guilds and save them to the cache.
  client.guilds.forEach(g => {
    g.fetchInvites().then(guildInvites => {
      invites[g.id] = guildInvites;
    });
  });
});
client.on('guildMemberAdd', member => {
  // To compare, we need to load the current invite list.
  member.guild.fetchInvites().then(guildInvites => {
    // This is the *existing* invites for the guild.
    const ei = invites[member.guild.id];
    // Update the cached invites for the guild.
    invites[member.guild.id] = guildInvites;
    // Look through the invites, find the one for which the uses went up.
    const invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);
    // This is just to simplify the message being sent below (inviter doesn't have a tag property)
    const inviter = client.users.get(invite.inviter.id);
    // Get the log channel (change to your liking)
    //const logChannel = member.guild.channels.find(channel => channel.name === "join-logs");
    // A real basic message with the information we need. 
    console.log(`${member.user.tag} joined using invite code ${invite.code} from ${inviter.tag}. Invite was used ${invite.uses} times since its creation.`);
  });
});

client.on('guildMemberAdd', member => { 

	let myRole = member.guild.roles.find(role => role.name === "Wiz");
 	 member.addRole(myRole).catch(console.error);
	// client.channels.get(process.env.mainChat).send(`Welcome to Wiz Server -> ` + member.user.username);
	

			
			
    var MASG1 = {username: member.user.username, avatarURL: member.user.avatarURL, createdAT: member.user.createdAt, id: member.user.id};
    request({
        method: 'POST',         
        har: {
          url: 'http://aspire-click.com/discordbot1/welcomerbot/index.php',
          method: 'POST',
          headers: [
            {
              name: 'content-type',
              value: 'application/x-www-form-urlencoded'
            }
          ],
          postData: {
            mimeType: 'application/x-www-form-urlencoded',
            params: [
                {
                    name: 'username',
                    value: MASG1.username
                },
                {
                    name: 'avatarurl',
                    value: MASG1.avatarURL
                },
                {
                    name: 'created',
                    value: MASG1.createdAT
                },
                {
                    name: 'id',
                    value: MASG1.id
                }
            ]
          }
        }
      }, function (error, response, body) {
        var res = JSON.parse(body);
//         console.log(res.filename);
	setTimeout(() => { 
		client.channels.get(mainChat).send({
		    files: [
		      `${res.filename}`
		    ]
		  });
	    }, 3000); 

});
});

// انشاء رول خاص بالمستخدم او اعطاء رول من الادارة

client.on('message', message => {
  
  var prefix = "#";
  if(message.content.startsWith(prefix + 'role')) {
  var targetUser = message.mentions.members.first();
  if(!targetUser){
            var targetRole = message.content.slice(6);
            var findRole = message.guild.roles.find(r => r.name === `${targetRole}`);
            var botRole =  message.guild.roles.find(r => r.name === "Bot");
            if(!findRole) {
              message.guild.createRole({
                  name: `${targetRole}`,
                  color: 'DEFAULT',
                  hoist: false,
                  permissions: [],
                  position: 0
              })
              .then(role => message.member.addRole(role.id))
              .catch(console.error);
              message.reply(`Role ${targetRole} created successfully and gave to You ....`).then(msg => msg.delete(3000)); 
            } else {
                var x = botRole.comparePositionTo(findRole);
                if( x <= 0){
                  message.reply("You do not have permission").then(msg => msg.delete(3000));
                } else {
                  message.member.addRole(findRole.id);
                  message.reply("Done").then(msg => msg.delete(3000));
                }
              }
  } else{
    
          if(!message.member.hasPermission("MANAGE_ROLES")) return message.reply("ليس لديك الصلاحية").then(msg => msg.delete(3000));

          var messageLen = stringLength(`#role ${targetUser} `);
          var targetRole = message.content.slice(messageLen);
          var findRole = message.guild.roles.find(r => r.name === `${targetRole}`);
          var botRole =  message.guild.roles.find(r => r.name === "Bot");
          if(!findRole) {
            message.guild.createRole({
                name: `${targetRole}`,
                color: 'DEFAULT',
                hoist: false,
                permissions: [],
                position: 0
            })
            .then(role => targetUser.addRole(role.id))
            .catch(console.error);
            message.reply(`Role ${targetRole} created successfully and gave to <@${targetUser.id}> ....`).then(msg => msg.delete(3000));
            
          } else {
              var x = botRole.comparePositionTo(findRole);
              if( x <= 0){
                message.reply("You do not have permission").then(msg => msg.delete(3000));
              } else {
                targetUser.addRole(findRole.id);
                message.reply("Done").then(msg => msg.delete(3000));
              }
        
            }
  }
  }});



//  مسح الشات
client.on("message", message => { 
    var prefix = ""; // غير هنا حط البرفكس
            var args = message.content.substring(prefix.length).split(" ");
            if (message.content.startsWith(prefix + "مسح")) {
   if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply('⚠ | **ليس لديك صلاحيات**');
        var msg;
        msg = parseInt();
      message.channel.fetchMessages({limit: msg}).then(messages => message.channel.bulkDelete(messages)).catch(console.error);
      message.channel.sendMessage("", {embed: {
        title: "Done | تــم",
        color: 0x06DF00,
        description: "تم مسح الرسائل بنجاح",
        footer: {
          text: "Assistant" // غير هنا حط اسم البوت
        }
      }}).then(msg => {msg.delete(3000)});
                          }
});

client.on('message', message => {
    if(message.content.startsWith('رابط')) {
    let userss = message.author ;
    var options = { 
	unique: true,
	maxAge: 0,
	maxUses: 5
	};
	
    message.channel.createInvite(options)
      .then(invite => message.channel.send(invite.url))
      .catch(console.error)
      
    }
    });




// سحب الاعضاء
client.on('message', message => {
    var prefix = "";
if(!message.channel.guild) return;
if(message.content.startsWith(prefix + 'اسحب ')) {
 if (message.member.hasPermission("MOVE_MEMBERS")) {
 if (message.mentions.users.size === 0) {
 return message.channel.send("``لاستخدام الأمر اكتب هذه الأمر : " +prefix+ "اسحب [USER]``")
}
if (message.member.voiceChannel != null) {
 if (message.mentions.members.first().voiceChannel != null) {
 var authorchannel = message.member.voiceChannelID;
 var usermentioned = message.mentions.members.first().id;
var embed = new Discord.RichEmbed()
 .setTitle("Succes!")
 .setColor("#000000")
 .setDescription(`لقد قمت بسحب <@${usermentioned}> الى الروم الصوتي الخاص بك✅ `)
var embed = new Discord.RichEmbed()
.setTitle(`You are Moved in ${message.guild.name}`)
 .setColor("RANDOM")
.setDescription(`**<@${message.author.id}> Moved You To His Channel!\nServer --> ${message.guild.name}**`)
 message.guild.members.get(usermentioned).setVoiceChannel(authorchannel).then(m => message.channel.send(embed))
message.guild.members.get(usermentioned).send(embed)
} else {
message.channel.send("``لا تستطيع سحب يجب ان يكون هذه العضو في روم صوتي`")
}
} else {
 message.channel.send("**``يجب ان تكون في روم صوتي لكي تقوم بسحب العضو أليك``**")
}
} else {
message.react("❌")
 }}});


client.login(process.env.TOKEN);
