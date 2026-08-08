window.NODE7_LOADSCREEN = {
    brand: {
        kicker: 'A NODE7 PRODUCTION',
        title: 'NODE7',
        subtitle: 'REDM ROLEPLAY FRAMEWORK',
        edition: 'THE FRONTIER AWAITS'
    },

    background: {
        video: 'media/background.mp4',
        poster: 'media/background.jpg',
        playbackRate: 1.0
    },

    panels: [
        {
            id: 'community',
            label: 'COMMUNITY',
            eyebrow: 'WELCOME TO NODE7',
            title: 'BUILT AROUND THE COMMUNITY',
            intro: 'Node7 is focused on immersive roleplay, player-driven stories, and a fair frontier where everyone has room to build something memorable.',
            items: [
                ['ROLEPLAY FIRST', 'Create scenes, give others time to react, and keep interactions focused on story over winning.'],
                ['PLAYER DRIVEN', 'Businesses, crews, law, outlaws and civilians should create opportunities for each other.'],
                ['RESPECT THE SCENE', 'Keep conflict in character and give every player a fair chance to participate.'],
                ['BUILD THE FRONTIER', 'Your choices, reputation and relationships should help shape the world around you.']
            ]
        },
        {
            id: 'rules',
            label: 'RULES',
            eyebrow: 'FRONTIER STANDARDS',
            title: 'KEEP ROLEPLAY FAIR',
            intro: 'These are clean loading-screen reminders. Replace or expand them in html/config.js to match your complete community rules.',
            items: [
                ['STAY IN CHARACTER', 'Keep active scenes in character and avoid unnecessary out-of-character interruptions.'],
                ['NO RANDOM VIOLENCE', 'Conflict should have roleplay context and meaningful interaction behind it.'],
                ['VALUE LIFE', 'Treat serious danger like serious danger. Do not ignore obvious consequences just to win a scene.'],
                ['NO EXPLOITS', 'Do not abuse bugs, scripts, mechanics, desync or unintended game behavior for an advantage.'],
                ['RESPECT PLAYERS', 'No harassment, hate speech, targeted abuse or behavior meant to ruin another player’s experience.'],
                ['USE COMMON SENSE', 'If something clearly damages fair roleplay or the community, do not do it just because it is not written word-for-word.']
            ]
        },
        {
            id: 'keybinds',
            label: 'KEYBINDS',
            eyebrow: 'QUICK CONTROLS',
            title: 'KNOW YOUR CONTROLS',
            intro: 'Keep this list synced with your actual Node7 resources. Edit the entries in html/config.js whenever a bind changes.',
            keybinds: [
                ['U', 'Radial Menu'],
                ['K', 'Makeup / Service Interaction'],
                ['E', 'Primary Interaction'],
                ['T', 'Chat'],
                ['M', 'Map'],
                ['ESC', 'Pause Menu']
            ]
        },
        {
            id: 'contributors',
            label: 'CONTRIBUTORS',
            eyebrow: 'BUILT BY THE COMMUNITY',
            title: 'NODE7 CONTRIBUTORS',
            intro: 'The people contributing to the Node7 project and community experience.',
            items: [
                ['OWNER', 'Node7 Owner']
            ]
        }
    ],

    music: {
        autoplay: true,
        volume: 0.22,
        shuffle: false,
        tracks: [
            { title: 'NODE7 LOADING THEME', artist: 'NODE7', src: 'media/music/your-song-1.mp3' }
        ]
    },

    links: {
        website: {
            label: 'WEBSITE',
            url: 'https://github.com/Node7Developement'
        },
        store: {
            label: 'STORE',
            url: '',
            showWhenEmpty: true
        }
    },

    ui: {
        showPlayerName: true,
        defaultPanel: 'community'
    }
};
