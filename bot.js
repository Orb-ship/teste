const { Client, Intents, Collection } = require('discord.js');
const fs = require('fs')
const Discord = require("discord.js")
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
require('dotenv').config();

client.commands = new Collection();


const functions = fs.readdirSync("./src/functions").filter(file => file.endsWith(".js"))
const eventFiles = fs.readdirSync("./src/events").filter(file => file.endsWith(".js"))
const commandFolders = fs.readdirSync("./src/commands").filter(file => file.endsWith(".js"))

client.on('ready', () =>{
    console.log('Le bot est connecté!')
    
});


(async () => {
    for (file of functions) {
        require(`./functions/${file}`)(client);
    }
})


client.on('messageCreate', (message) =>{
    if(message.author.bot) return;
        if(message.content){
            const embed = new Discord.MessageEmbed()
                .setTitle("Aller au message")
                .setColor("WHITE")
                .setURL(message.url)
                .setDescription(message.content)
                .setAuthor(message.author.tag)
                client.channels.cache.get('915664579667820625').send({ embeds: [embed] })
        }
    }
)

const { SlashCommandBuilder } = require('@discordjs/builders');
const ping = new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Renvoie pong');


client.on("interactionCreate", interaction => {
    if(interaction.isCommand()) {
        if(interaction.commandName === "ping"){
            interaction.reply("pong")
        }
    }
});


const renforts = new SlashCommandBuilder()
    .setName('renforts')
    .setDescription("J'ai besoin de renforts'")
    .addStringOption(option => option
    .setName("troupe")
    .setDescription("Que voulez vous ?")
    .setRequired(true)
    .addChoices([
        ["Barbare(s)", "Barbare"],
        ["Archer(s)", "Archer"],
        ["Geant(s)", "Geant"],
        ["Goblin(s)", "Goblin"],
        ["Sapeur(s)", "Sapeur"],
        ["Ballon(s)", "Ballon"],
        ["Sorcier(s)", "Sorcier"],
        ["Guerisseuses", "Guerisseuse"],
        ["Dragon(s)", "Dragon"],
        ["Pekka(s)", "Pekka"],
        ["Bébé dragon(s)", "Bébé dragon"],
        ["Mineur(s)", "Mineur"],
        ["Electro dragon", "Electro dragon"],
        ["Yeti(s)", "Yeti"],
        ["Dragon rider", "Dragon rider"],

        ["Minion(s)", "Minion"],
        ["Chevaucheur(s) de cochon", "Chevaucheur"],
        ["Valkyrie(s)", "Valkyrie"],
        ["Golem", "Golem"],
        ["Sorciere(s)", "Sorciere"],
        ["Molosse de lave", "Molosse de lave"],
        ["Bouliste(s)", "Bouliste"],
        ["Golem de glace", "Golem de glace"],
        ["Chasseuse(s) de tête", "Chasseuse de tête"],
      ]))
      .addNumberOption(option => option
        .setName("nombre")
        .setDescription("Combien voulez vous de troupes ?")
        .setRequired(true)
        )
        .addStringOption(option => option
            .setName("cause")
            .setDescription("Pour quelle raison voulez vous des troupes ?")
            .setRequired(true)
            .addChoices([
                ["Attaquer une base sur la map gobelins", "Attaque contre les gobelins"],
                ["Attaquer en farm", "Attaque de farm"],
                ["Attaquer en rush", "Attaque de rush"],
                ["Attaquer une base de guerre ennemie", "Attaque en GDC/LDC"],
                ["Defendre sur le village", "Defense"],
                ["Defendre sur la base de guerre", "Defendre la base de guerre"]
              ]))
    


client.on("interactionCreate", interaction => {
    if(interaction.isCommand()){
        if(interaction.commandName === "renforts"){
            let troupe = interaction.options.getString("troupe")
            let nombre = interaction.options.getNumber("nombre")
            let cause = interaction.options.getString("cause")

            if(troupe != undefined){
                interaction.reply("Vous avez demandé : " + nombre + " " + troupe + " Pour: " + cause)
                client.channels.cache.get('916005689560809522').send("``` ```Nouvelle demande de renforts! \n Demande de: **<@" + interaction.user + ">** \n Renfort demandé: **" + troupe + "** \n Quantité: **" + nombre + "** \n Cause: **" + cause + "**")
            } else {
                interaction.reply("Erreur")
            }
        }
    }
})

const renfort = new SlashCommandBuilder()
    .setName('renfort')
    .setDescription("J'ai besoin de renforts'")
    .addStringOption(option => option
    .setName("troupe")
    .setDescription("Que voulez vous ?")
    .setRequired(true)
    .addChoices([
        ["Barbare(s)", "Barbare"],
        ["Archer(s)", "Archer"],
        ["Geant(s)", "Geant"],
        ["Goblin(s)", "Goblin"],
        ["Sapeur(s)", "Sapeur"],
        ["Ballon(s)", "Ballon"],
        ["Sorcier(s)", "Sorcier"],
        ["Guerisseuses", "Guerisseuse"],
        ["Dragon(s)", "Dragon"],
        ["Pekka(s)", "Pekka"],
        ["Bébé dragon(s)", "Bébé dragon"],
        ["Mineur(s)", "Mineur"],
        ["Electro dragon", "Electro dragon"],
        ["Yeti(s)", "Yeti"],
        ["Dragon rider", "Dragon rider"],

        ["Minion(s)", "Minion"],
        ["Chevaucheur(s) de cochon", "Chevaucheur"],
        ["Valkyrie(s)", "Valkyrie"],
        ["Golem", "Golem"],
        ["Sorciere(s)", "Sorciere"],
        ["Molosse de lave", "Molosse de lave"],
        ["Bouliste(s)", "Bouliste"],
        ["Golem de glace", "Golem de glace"],
        ["Chasseuse(s) de tête", "Chasseuse de tête"],
      ]))
      .addNumberOption(option => option
        .setName("nombre")
        .setDescription("Combien voulez vous de troupes ?")
        .setRequired(true)
        )
        .addStringOption(option => option
            .setName("cause")
            .setDescription("Pour quelle raison voulez vous des troupes ?")
            .setRequired(true)
            .addChoices([
                ["Attaquer une base sur la map gobelins", "Attaque contre les gobelins"],
                ["Attaquer en farm", "Attaque de farm"],
                ["Attaquer en rush", "Attaque de rush"],
                ["Attaquer une base de guerre ennemie", "Attaque en GDC/LDC"],
                ["Defendre sur le village", "Defense"],
                ["Defendre sur la base de guerre", "Defendre la base de guerre"]
              ]))


module.exports = {
    name: "ban",
    description: "Bannir un membre",
    permission: "ADMINISTRATOR",
    options: [
        { 
            name: "membre à bannir",
            description: 'Selectionnez une personne à bannir.',
            type: "USER",
            required: true,
        },
        {
            name: "raison",
            description: "Entrez la raison du banissement.",
            type: "STRING",
            required: true,
        },
        {
            name: "messages",
            description: "Selectionnez un choix parmis ces 3 possibilités.",
            type: "STRING",
            required: true,
            choices : [
                {
                    name: "Ne rien supprimer",
                    value: 0
                },
                {
                    name: "Dernier 7 jours",
                    value: 7
                }
            ],
        },
    ],
    /**
     * @param {Client} client
     * @param {Discord.CommandInteraction} interaction
     */
    execute(client, interaction) {
        const target = interaction.options.getMember('target');

        if(target.id === interaction.member.id)
        return interaction.followUp({embeds: [new MessageEmbed().setColor('RED').setDescription('Vous ne pouvez pas vous bannir vous même.')]})

        if(target.permissions.has('ADMINISTRATOR'))
        return interaction.followUp({embeds: [new MessageEmbed().setColor('RED').setDescription('Vous ne pouvez pas bannir un administrateur.')]})
                
        const reason = interaction.options.getString('reason');

        if (reason.lenght > 512)
        return interaction.followUp({embeds: [new MessageEmbed().setColor('RED').setDescription('La raison du banissement ne peut pas être supérieur à 512 charactères.')]})

        const Amount = interaction.options.getString('messages')
        target.ban({days: Amount, reason: reason})

        interaction.followUp({embeds: [new MessageEmbed().setColor("GREEN").setDescription(`**${target.username}** a bien été banni.`)]})

    }
}


module.exports = {
    name: "ban",
    description: "Bannir un membre",
    permission: "ADMINISTRATOR",
    options: [
        { 
            name: "membre à bannir",
            description: 'Selectionnez une personne à bannir.',
            type: "USER",
            required: true,
        },
        {
            name: "raison",
            description: "Entrez la raison du banissement.",
            type: "STRING",
            required: true,
        },
        {
            name: "messages",
            description: "Selectionnez un choix parmis ces 3 possibilités.",
            type: "STRING",
            required: true,
            choices : [
                {
                    name: "Ne rien supprimer",
                    value: 0
                },
                {
                    name: "Dernier 7 jours",
                    value: 7
                }
            ],
        },
    ],
    /**
     * @param {Client} client
     * @param {Discord.CommandInteraction} interaction
     */
    execute(client, interaction) {
        const target = interaction.options.getMember('target');

        if(target.id === interaction.member.id)
        return interaction.followUp({embeds: [new MessageEmbed().setColor('RED').setDescription('Vous ne pouvez pas vous bannir vous même.')]})

        if(target.permissions.has('ADMINISTRATOR'))
        return interaction.followUp({embeds: [new MessageEmbed().setColor('RED').setDescription('Vous ne pouvez pas bannir un administrateur.')]})
                
        const reason = interaction.options.getString('reason');

        if (reason.lenght > 512)
        return interaction.followUp({embeds: [new MessageEmbed().setColor('RED').setDescription('La raison du banissement ne peut pas être supérieur à 512 charactères.')]})

        const Amount = interaction.options.getString('messages')
        target.ban({days: Amount, reason: reason})

        interaction.followUp({embeds: [new MessageEmbed().setColor("GREEN").setDescription(`**${target.username}** a bien été banni.`)]})

    }
}

client.login(process.env.token)