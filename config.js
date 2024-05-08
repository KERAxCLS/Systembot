
const config = {}

config.bot = {

    token: "", // dein token
    guildId: "", //Server ID
    clientId: "", //client ID von eurem Bot
    
    teamRoleId: '', //ID eurer Team Rolle

    activitys: [
        {
            name: '', //status name
            type: 'Playing', //Watching, Streaming(url zeile mit link füllen)
            status: 'dnd', // nicht stören
            // url: 'https://www.youtube.com/watch?v=E48Dq7aZH7I', //nur wenn ihr streamen anmacht !
        },
        {
            name: 'Headshot, Roleplay',
            type: 'Playing',
            status: 'dnd'
        },
    ],
    intervall: 10 * 1000, //änder zeiten des Status  //10 Sekunden 
    
    WelcomeChannel: [
        {
            channelId: '',
            title: 'Neuer Bürger',
            color: 'Blue',// Farbe
            image: '',
        
            fields: [
                {
                    name: 'Willkommen auf .... Roleplay Hosted by Tubehosting',
                    value: 'Lese dir bitte das Regelwerk durch und halte dich dran',
                },
            ]
        }
    ],
    TicketSystem:[
        {
            'fraktion': '',
            'support': '',
            'spende': '',
            'team': ''
        }
    ],
    GiveRole:[
        {
            'verifyRoleId': '',
            'infoRoleId': '',
            'giveawayRoleId': '',
            'streamRoleId': ''   
        }
    ]
}

module.exports = config