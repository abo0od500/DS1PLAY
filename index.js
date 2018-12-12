
const Discord = require('discord.js');
const client = new Discord.Client();

client.on('guildMemberAdd', member => {
let role = message.guild.roles.find(r => r.name === "Team Mystic");
 member.addRole(member.guild.roles.find(role => role.name === "HL")).catch(console.error);
});

 
client.login(process.env.TOKEN);
