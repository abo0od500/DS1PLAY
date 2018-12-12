
const Discord = require('discord.js');
const client = new Discord.Client();

client.on('guildMemberAdd', member => {
    member.addRole(member.guild.roles.find("name","HL")).catch(console.error);
});

 
client.login(process.env.TOKEN);
