NODE7 LOADINGSCREEN
===================

Premium western / liquid-glass RedM loading screen with:
- MP4 background support
- Music playlist support
- Website/store buttons
- Rules, keybinds, community and contributors panels
- Node7 brand logo
- Real Cfx loading progress
- Safe post-load community overlay

REDM DUI HOTFIX (v2.3.1)
------------------------
The previous optional post-load implementation converted a DUI browser to a runtime
texture with CreateRuntimeTextureFromDuiHandle. On affected Cfx/RedM clients that
native can throw 0x23EAF899 in nui-core.dll.

This build removes that native path completely. The same post-load presentation now
uses this resource's normal fullscreen NUI page, so there is no runtime DUI texture,
no DrawSprite loop and no repeated DUI browser creation/destruction.

Compatibility is preserved:

TriggerEvent('node7-loadingscreen:client:showDui')
TriggerEvent('node7-loadingscreen:client:hideDui')

exports['node7-loadingscreen']:ShowDUI()
exports['node7-loadingscreen']:HideDUI()

Those existing calls now safely control the post-load NUI overlay.

New clearer aliases are also available:

TriggerEvent('node7-loadingscreen:client:showOverlay')
TriggerEvent('node7-loadingscreen:client:hideOverlay')

exports['node7-loadingscreen']:ShowOverlay()
exports['node7-loadingscreen']:HideOverlay()

INSTALL
-------
1. Replace the old node7-loadingscreen folder with this one.
2. Keep:
     ensure node7-loadingscreen
3. Recommended:
     setr sv_showBusySpinnerOnLoadingScreen false
4. Restart the resource/server.

MEDIA
-----
html/media/background.mp4
html/media/background.jpg
html/media/brandlogo.png
html/media/music/

Main browser configuration:
html/config.js

Post-load timing configuration:
config.lua
