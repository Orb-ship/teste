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