Config = Config or {}

-- Optional post-load overlay / DUI-compatible presentation.
-- It is intentionally MANUAL by default so it never sits over charselect/spawn
-- or creates a black handoff after the loading screen finishes.
Config.PostLoad = {
    enabled = false,
    delayMs = 1200,
    durationMs = 9000,
    autoHide = true,
    showOnSessionReady = false
}

-- Backwards-compatible alias for scripts already using ShowDUI / HideDUI.
Config.DUI = {
    enabled = false,
    delayMs = 1200,
    durationMs = 9000,
    autoHide = true,
    showOnSessionReady = false
}
