
const Discord = require('discord.js');
var Jimp = require('jimp');
const client = new Discord.Client();
let mainChat = process.env.mainChat;
// رتبة ثابته
client.on('guildMemberAdd', member => { 
	
	let myRole = member.guild.roles.find(role => role.name === "Wiz");
	member.addRole(myRole).catch(console.error);
	
	client.channels.get(process.env.mainChat).send(`Welcome to Wiz Server...`);
	




});





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

// instant Invite
client.on('message', message => {
if(message.content.startsWith('رابط')) {
	
var options = {
unique: true,
maxAge: 86400,
maxUses: 2
};
	
message.channel.createInvite(options)
  .then(invite => message.channel.send(invite.url))
  .catch(console.error);
}
});




// سحب الاعضاء
client.on('message', message => {
    var prefix = "";
if(!message.channel.guild) return;
if(message.content.startsWith(prefix + 'اسحب')) {
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
