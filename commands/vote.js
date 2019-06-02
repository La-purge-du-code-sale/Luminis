const { prefix, Discord, client, config } = require('../require.js');
const { sendError } = require('../lib/functions.js');

module.exports = {
    name: 'vote',
    description: "Propose un vote dans le salon configuré.",
    usage: prefix+'vote <title> <text>',
    exemple: prefix+'vote Promotion On passe @Neshell#8701 modérateur ?',
    access: 'ADMINISTRATOR',
    async execute(message, args){
        if(args[2]) {
            const vote = args.slice(2).join(" ");

            const embed = new Discord.RichEmbed()
                .setAuthor("Nouveau vote proposé", message.guild.iconURL)
                .setColor(0xFFCC00)
                .setTitle(args[1])
                .setDescription(vote);

            if(!config.votes.anonyme) {
                embed.setFooter("Vote proposé par " + message.author.tag, message.author.avatarURL);
            }

            client.channels.get(config.votes.channel).send({embed}).then(async (embedMsg) => {
                await embedMsg.react('✅');
                await embedMsg.react('❌');
                await embedMsg.react('◻');
            }).catch(err => {
                sendError(`Une erreur est survenue ;\n\n${err}`, message);
            });

        } else {
            sendError("Veuillez préciser un vote à proposer.", message);
        }
    }
}