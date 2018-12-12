
const Discord = require('discord.js');
const client = new Discord.Client();

client.on('guildMemberAdd', member => {
    let myRole = member.guild.roles.find(role => role.name === "HL");
    member.addRole(myRole).catch(console.error);});

 
client.login(process.env.TOKEN);
