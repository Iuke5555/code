// Import necessary modules and components from Discord.js and other files
const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Guild } = require('discord.js');
const { hogwarts_crest } = require('../config.json');
const { main_logo } = require('../config.json');

// Create an embed for introducing Hogwarts houses
const embedSorting = new EmbedBuilder()
    .setColor('Default')
    .setThumbnail(main_logo)
    .setFooter({ text: 'Potter Bot' })
    .setTitle("House Sorting!")
    .setDescription("Welcome to Hogwarts School of Witchcraft and Wizardry! We are delighted to have you join us on this magical journey. Before we commence the Sorting Ceremony, let's familiarize ourselves with the four distinguished houses of Hogwarts:")
    .setTimestamp()
    .addFields(
        { name: 'Gryffindor', value: 'Bravery: Gryffindors are known for their courage in the face of adversity. They never back down from a challenge and stand up for what is right, even in the most perilous situations. \nChivalry: They value honor, fairness, and protecting those in need. Gryffindors are often seen as noble and valiant individuals. ' },
        { name: 'Hufflepuff', value: 'Loyalty: Hufflepuffs are fiercely loyal to their friends, family, and ideals. They prioritize relationships and strive to create a supportive community where everyone feels valued. \n Hard Work: Known for their diligence and dedication, Hufflepuffs are willing to put in the effort to achieve their goals. They believe in the importance of perseverance and determination.' },
        { name: 'Ravenclaw', value: 'Intelligence: Ravenclaws are highly intelligent and value knowledge above all else. They have a thirst for learning and are constantly seeking to expand their understanding of the world. \n Creativity: Known for their imaginative minds, Ravenclaws approach problems from unique perspectives and embrace innovation in all aspects of life.' },
        { name: 'Slytherin', value: 'Ambition: Slytherins are driven by their ambition to succeed and excel in every endeavor. They are determined individuals who are willing to do whatever it takes to achieve their goals. \n Cunning: Known for their resourcefulness and strategic thinking, Slytherins are adept at navigating complex situations and often excel in leadership roles.' }
    );

// Create embeds for questions
const embedQuestionOne = new EmbedBuilder()
    .setColor('Default')
    .setThumbnail(hogwarts_crest)
    .setFooter({ text: 'Potter Bot' })
    .setTitle("Question 1!")
    .setTimestamp()
    .addFields(
        { name: 'In a challenging situation, what trait would you rely on the most?', value: 'Choose the answer that best reflects your personality and values.' }
    );

const embedQuestionTwo = new EmbedBuilder()
    .setColor('Default')
    .setThumbnail(hogwarts_crest)
    .setFooter({ text: 'Potter Bot' })
    .setTitle("Question 2!")
    .setTimestamp()
    .addFields(
        { name: 'What kind of environment do you thrive in?', value: 'Choose the answer that resonates with you the most.' }
    );

// Define button components for interactions
const start = new ButtonBuilder()
    .setCustomId('start123')
    .setLabel('start')
    .setStyle(ButtonStyle.Primary);

const q1Ans1 = new ButtonBuilder()
    .setCustomId('q1An1')
    .setLabel('Courage.')
    .setStyle(ButtonStyle.Primary);

const q1Ans2 = new ButtonBuilder()
    .setCustomId('q1An2')
    .setLabel('Loyalty.')
    .setStyle(ButtonStyle.Primary);

const q1Ans3 = new ButtonBuilder()
    .setCustomId('q1An3')
    .setLabel('Intelligence.')
    .setStyle(ButtonStyle.Primary);

const q1Ans4 = new ButtonBuilder()
    .setCustomId('q1An4')
    .setLabel('Ambition.')
    .setStyle(ButtonStyle.Primary);

const question2Answer1 = new ButtonBuilder()
    .setCustomId('q2An1G')
    .setLabel('Adrenaline-filled and adventurous.')
    .setStyle(ButtonStyle.Primary);

const q2 = new ButtonBuilder()
    .setCustomId('q2An2S')
    .setLabel('Competitive and ambitious.')
    .setStyle(ButtonStyle.Primary);

const button3ForQustion2 = new ButtonBuilder()
    .setCustomId('q2An3R')
    .setLabel('Stimulating and intellectually engaging.')
    .setStyle(ButtonStyle.Primary);

const q4 = new ButtonBuilder()
    .setCustomId('q2An4H')
    .setLabel('Supportive and friendly.')
    .setStyle(ButtonStyle.Primary);

// Define action rows for grouping buttons
const start1 = new ActionRowBuilder()
    .addComponents(start);

const question1 = new ActionRowBuilder()
    .addComponents(q1Ans1, q1Ans2, q1Ans3, q1Ans4);

const question2 = new ActionRowBuilder()
    .addComponents(question2Answer1, q2, button3ForQustion2, q4);

module.exports = {
    data: new SlashCommandBuilder()
        .setName('get-sorted')
        .setDescription('Get sorted into your Hogwarts house!'),
    async execute(interaction) {
        // Create a collector for message components
        const collector = interaction.channel.createMessageComponentCollector({ time: 300000 });
        const guild = interaction.guild;
        const member = interaction.member;

        // Define the mapping of house names to button IDs
        const houses = {
            'Gryffindor': 'q2An1G',
            'Slytherin': 'q2An2S',
            'Ravenclaw': 'q2An3R',
            'Hufflepuff': 'q2An4H'
        };

        // Listen for button clicks
        collector.on('collect', async collected => {
            await collected.deferUpdate(); // Defer the interaction to avoid timeout
            // Identify the house based on the clicked button
            const house = Object.keys(houses).find(key => houses[key] === collected.customId);
            if (house) {
                // Remove previous house role, assign new house role, and send messages
                await removePreviousHouse(member);
                await collected.followUp(`Better be ${house}!`);
                await interaction.followUp(`Congratulations and welcome to ${house}!`);
                await member.roles.add(guild.roles.cache.find(role => role.name === house));
            } else if (collected.customId === 'start123') {
                // Present the first question when start button is clicked
                await collected.editReply({ embeds: [embedQuestionOne], components: [question1] });
            } else {
                // Present the second question for other button clicks
                await collected.editReply({ embeds: [embedQuestionTwo], components: [question2] });
            }
        });

        // Send the initial embed and button for starting the sorting process
            await interaction.reply({ embeds: [embedSorting], components: [start1] });
    
            // Function to remove any previous Hogwarts house role from the member
            async function removePreviousHouse(member) {
                const rolesToRemove = ['Gryffindor', 'Slytherin', 'Ravenclaw', 'Hufflepuff'];
                for (const roleName of rolesToRemove) {
                    if (member.roles.cache.some(role => role.name === roleName)) {
                        await member.roles.remove(guild.roles.cache.find(role => role.name === roleName));
                        break; // Stop after removing the first matching role
                    }
                }
            }
        }
    };
    
