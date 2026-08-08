local function clean(value)
    return tostring(value or ''):gsub('%^%d', '')
end

AddEventHandler('playerConnecting', function(playerName, _, deferrals)
    -- Intentionally does not read sv_hostname or any server.cfg branding.
    deferrals.handover({
        playerName = clean(playerName or GetPlayerName(source) or 'Player')
    })
end)
