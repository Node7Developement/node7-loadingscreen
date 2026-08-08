local loadingClosed = false

local function closeLoadingScreen(reason)
    if loadingClosed then
        return
    end

    loadingClosed = true

    -- Let the existing HTML finish its short fade/audio fade.
    SendLoadingScreenMessage(json.encode({
        eventName = 'node7:close',
        reason = reason or 'ready'
    }))

    Wait(700)

    -- With loadscreen_manual_shutdown enabled, this is the only shutdown call
    -- required for the custom loadingScreen frame.
    ShutdownLoadingScreenNui()
end

RegisterNetEvent('node7-loadingscreen:client:close', function()
    closeLoadingScreen('event')
end)

exports('CloseLoadingScreen', function()
    closeLoadingScreen('export')
end)

CreateThread(function()
    while not NetworkIsSessionStarted() do
        Wait(250)
    end

    SendLoadingScreenMessage(json.encode({
        eventName = 'node7:sessionReady'
    }))

    Wait(850)
    closeLoadingScreen('session')
end)
