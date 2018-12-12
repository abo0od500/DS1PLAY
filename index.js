
const Discord = require('discord.js');
const client = new Discord.Client();


// منح رتبه ثابته
client.on('guildMemberAdd', member => { 
    let myRole = member.guild.roles.find(role => role.name === "HL");
    member.addRole(myRole).catch(console.error);});



 // مسح الشات
client.on("message", message => { 
    var prefix = "#"; // غير هنا حط البرفكس
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



 
client.login(process.env.TOKEN);
