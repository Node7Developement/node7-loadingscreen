fx_version '2.3.3'
game 'rdr3'

rdr3_warning 'I acknowledge that this is a prerelease build of RedM, and I am aware my resources *will* become incompatible once RedM ships.'

author 'Node7 Development Studios'
description 'Node7 premium western liquid-glass community RedM loading screen with optional post-load DUI'
version '2.3.2'

loadscreen 'html/index.html'
loadscreen_manual_shutdown 'yes'
loadscreen_cursor 'yes'


files {
    'html/index.html',
    'html/style.css',
    'html/config.js',
    'html/app.js',
    'html/dui.html',
    'html/dui.css',
    'html/dui.js',
    'html/media/background.jpg',
    'html/media/background.mp4',
    'html/media/brandlogo.png',
    'html/media/music/*'
}

shared_script 'config.lua'
client_script 'client.lua'
server_script 'server.lua'
