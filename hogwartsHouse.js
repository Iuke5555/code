// Import necessary modules and components from Discord.js and other files
const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, CompressionMethod } = require('discord.js');
const { main_logo } = require('../config.json')

// creates a function with an embed using the parameters as the data for the embed, and taking advantage of an array to add many feilds of data.
async function createEmbed(colorName, houseicon, title, description, houseInformation, main_logo) {
    const embed = new EmbedBuilder()
        .setColor(colorName)
        .setImage(houseicon)
        .setFooter({ text: 'Potter Bot', iconURL: main_logo })
        .setTitle(title)
        .setDescription(description)
        .setTimestamp()
        .addFields(
            { name: 'History and Foundation', value: houseInformation[0] },
            { name: 'Core Values', value: houseInformation[1] },
            { name: 'House Traits and Characteristics', value: houseInformation[2] },
            { name: 'Group Dynamics', value: houseInformation[3] },
            { name: 'House Symbolism', value: houseInformation[4] },
            { name: 'Heads of House', value: houseInformation[5] },
            { name: 'House Ghost', value: houseInformation[6] },
            { name: 'Elemental Correspondence', value: houseInformation[7] },
            { name: 'Quidditch Team', value: houseInformation[8] }
        );

    return embed;
}

module.exports = {
    // Define slash command data
    data: new SlashCommandBuilder()
        .setName('hogwarts-houses')
        .setDescription('Discovery the meaning behind each hogwarts house.')
        .addStringOption(option =>
            option.setName('house')
                .setDescription('Choose the Hogwarts house you wish to explore!')
                .setRequired(true)
                .addChoices(
                    { name: 'Gryffindor', value: 'gryffindor' },
                    { name: 'Hufflepuff', value: 'hufflepuff' },
                    { name: 'Ravenclaw', value: 'ravenclaw' },
                    { name: 'Slytherin', value: 'slytherin' }
                )),

    // Execute the slash command
    async execute(interaction) {
        const choice = interaction.options.getString('house');

        // Check the selected house and provide relevant information
        // Acuires data from data files in other folders and using them to puplate the array. - Also acuires image from extranl data file. 
        if (choice === 'gryffindor') {
            const { gryffindor1, gryffindor2, gryffindor3, gryffindor4, gryffindor5, gryffindor6, gryffindor7, gryffindor8, gryffindor9 } = require('../data/hogwartsHouseData.json');
            const info = [gryffindor1, gryffindor2, gryffindor3, gryffindor4, gryffindor5, gryffindor6, gryffindor7, gryffindor8, gryffindor9];
            const { g } = require('../Photo/houses.json');
            const embed = await createEmbed('Red', g, 'Gryffindor', 'Information about the house of Godric Gryffindor', info, main_logo);
            await interaction.reply({ embeds: [embed] });
        } else if (choice === 'hufflepuff') {
            const { hufflepuff1, hufflepuff2, hufflepuff3, hufflepuff4, hufflepuff5, hufflepuff6, hufflepuff7, hufflepuff8, hufflepuff9 } = require('../data/hogwartsHouseData.json');
            const info = [hufflepuff1, hufflepuff2, hufflepuff3, hufflepuff4, hufflepuff5, hufflepuff6, hufflepuff7, hufflepuff8, hufflepuff9];
            const { h } = require('../Photo/houses.json');
            const embed = await createEmbed('Yellow', h, 'Hufflepuff', 'Information about the house of Helga Hufflepuff', info, main_logo);
            await interaction.reply({ embeds: [embed] });
        } else if (choice === 'ravenclaw') {
            const { ravenclaw1, ravenclaw2, ravenclaw3, ravenclaw4, ravenclaw5, ravenclaw6, ravenclaw7, ravenclaw8, ravebclaw9 } = require('../data/hogwartsHouseData.json');
            const info = [ravenclaw1, ravenclaw2, ravenclaw3, ravenclaw4, ravenclaw5, ravenclaw6, ravenclaw7, ravenclaw8, ravebclaw9];
            const { r } = require('../Photo/houses.json');
            const embed = await createEmbed('Blue', r, 'Ravenclaw', 'Information about the house of Rowena Ravenclaw', info, main_logo);
            await interaction.reply({ embeds: [embed] });
        } else if (choice === 'slytherin') {
            const { slytherin1, slytherin2, slytherin3, slytherin4, slytherin5, slytherin6, slytherin7, slytherin8, slytherin9 } = require('../data/hogwartsHouseData.json');
            const info = [slytherin1, slytherin2, slytherin3, slytherin4, slytherin5, slytherin6, slytherin7, slytherin8, slytherin9];
            const { s } = require('../Photo/houses.json');
            const embed = await createEmbed('Green', s, 'Sytherin', 'Information about the house of Salazar Slytherin', info, main_logo);
            await interaction.reply({ embeds: [embed] });
        }
    }
};
