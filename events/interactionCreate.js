const { User } = require("discord.js")

module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        console.log(`${interaction.user.tag} in #${interaction.user.name} triggered an interaction`)
    }
}