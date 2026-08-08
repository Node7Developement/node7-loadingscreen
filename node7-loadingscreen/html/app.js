(() => {
    'use strict';

    const cfg = window.NODE7_LOADSCREEN || {};
    const brand = cfg.brand || {};
    const bg = cfg.background || {};
    const musicCfg = cfg.music || {};
    const links = cfg.links || {};
    const ui = cfg.ui || {};
    const panels = Array.isArray(cfg.panels) && cfg.panels.length ? cfg.panels : [];

    const byId = (id) => document.getElementById(id);

    const screen = byId('loadingScreen');
    const backgroundVideo = byId('backgroundVideo');
    const infoNav = byId('infoNav');
    const infoViewport = byId('infoViewport');
    const panelLabel = byId('panelLabel');
    const panelEyebrow = byId('panelEyebrow');
    const panelIndex = byId('panelIndex');
    const progressFill = byId('progressFill');
    const percentText = byId('percentText');
    const statusText = byId('statusText');
    const phaseText = byId('phaseText');
    const playerName = byId('playerName');

    const audioPanel = byId('audioPanel');
    const musicPlayer = byId('musicPlayer');
    const audioToggle = byId('audioToggle');
    const muteToggle = byId('muteToggle');
    const playIcon = byId('playIcon');
    const pauseIcon = byId('pauseIcon');
    const volumeIcon = byId('volumeIcon');
    const mutedIcon = byId('mutedIcon');
    const volumeSlider = byId('volumeSlider');
    const trackTitle = byId('trackTitle');
    const trackArtist = byId('trackArtist');

    const websiteButton = byId('websiteButton');
    const storeButton = byId('storeButton');

    let currentProgress = 0;
    let closing = false;
    let activePanel = 0;
    let panelViews = [];
    let navButtons = [];
    let trackPosition = 0;

    const tracks = Array.isArray(musicCfg.tracks)
        ? musicCfg.tracks.filter((track) => track && typeof track.src === 'string' && track.src.trim())
        : [];

    function text(id, value, fallback = '') {
        const el = byId(id);
        if (el) el.textContent = value || fallback;
    }

    function setupBrand() {
        text('kicker', brand.kicker, 'A NODE7 PRODUCTION');
        text('brandSubtitle', brand.subtitle, 'REDM ROLEPLAY FRAMEWORK');
        text('brandEdition', brand.edition, 'THE FRONTIER AWAITS');

        const title = String(brand.title || 'NODE7');
        const target = byId('brandTitle');
        target.replaceChildren();

        const match = title.match(/^(.*?)(7)$/);
        if (match) {
            target.append(document.createTextNode(match[1]));
            const accent = document.createElement('span');
            accent.textContent = match[2];
            target.append(accent);
        } else {
            target.textContent = title;
        }
    }

    function setupBackground() {
        if (typeof bg.poster === 'string' && bg.poster) backgroundVideo.poster = bg.poster;

        if (typeof bg.video === 'string' && bg.video) {
            const source = document.createElement('source');
            source.src = bg.video;
            source.type = 'video/mp4';
            backgroundVideo.append(source);
        }

        const rate = Number(bg.playbackRate);
        if (Number.isFinite(rate) && rate > 0) {
            backgroundVideo.playbackRate = Math.min(2, Math.max(.25, rate));
        }
    }

    function createStandardItems(items) {
        const list = document.createElement('div');
        list.className = 'info-list';

        for (const item of Array.isArray(items) ? items : []) {
            const row = document.createElement('div');
            row.className = 'info-row';

            const title = document.createElement('strong');
            title.textContent = Array.isArray(item) ? String(item[0] || '') : '';

            const copy = document.createElement('span');
            copy.textContent = Array.isArray(item) ? String(item[1] || '') : '';

            row.append(title, copy);
            list.append(row);
        }

        return list;
    }

    function createKeybinds(items) {
        const grid = document.createElement('div');
        grid.className = 'keybind-grid';

        for (const item of Array.isArray(items) ? items : []) {
            const row = document.createElement('div');
            row.className = 'keybind-row';

            const key = document.createElement('kbd');
            key.textContent = Array.isArray(item) ? String(item[0] || '') : '';

            const action = document.createElement('span');
            action.textContent = Array.isArray(item) ? String(item[1] || '') : '';

            row.append(key, action);
            grid.append(row);
        }

        return grid;
    }

    function buildPanels() {
        const navFragment = document.createDocumentFragment();
        const viewFragment = document.createDocumentFragment();

        panelViews = panels.map((panel, index) => {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'info-tab';
            button.dataset.index = String(index);
            button.setAttribute('aria-controls', `node7-panel-${index}`);

            const number = document.createElement('span');
            number.className = 'tab-number';
            number.textContent = String(index + 1).padStart(2, '0');

            const label = document.createElement('strong');
            label.textContent = panel.label || `OPTION ${index + 1}`;

            button.append(number, label);
            button.addEventListener('click', () => showPanel(index));
            navFragment.append(button);
            navButtons.push(button);

            const view = document.createElement('article');
            view.id = `node7-panel-${index}`;
            view.className = 'info-panel';

            const title = document.createElement('h2');
            title.textContent = panel.title || panel.label || 'NODE7';
            view.append(title);

            if (panel.intro) {
                const intro = document.createElement('p');
                intro.className = 'panel-intro';
                intro.textContent = String(panel.intro);
                view.append(intro);
            }

            if (Array.isArray(panel.keybinds)) {
                view.append(createKeybinds(panel.keybinds));
            } else {
                view.append(createStandardItems(panel.items));
            }

            viewFragment.append(view);
            return view;
        });

        infoNav.append(navFragment);
        infoViewport.append(viewFragment);

        if (panels.length === 0) return;
        const desired = panels.findIndex((panel) => panel.id === ui.defaultPanel);
        showPanel(desired >= 0 ? desired : 0);
    }

    function showPanel(index) {
        if (closing || panels.length === 0) return;

        const next = Math.max(0, Math.min(panels.length - 1, Number(index) || 0));
        activePanel = next;

        panelViews.forEach((view, i) => view.classList.toggle('is-active', i === activePanel));
        navButtons.forEach((button, i) => {
            const selected = i === activePanel;
            button.classList.toggle('is-active', selected);
            button.setAttribute('aria-selected', selected ? 'true' : 'false');
        });

        const panel = panels[activePanel] || {};
        panelLabel.textContent = panel.label || 'NODE7';
        panelEyebrow.textContent = panel.eyebrow || '';
        panelIndex.textContent = String(activePanel + 1).padStart(2, '0');
    }

    function setProgress(fraction) {
        const value = Number(fraction);
        if (!Number.isFinite(value)) return;

        currentProgress = Math.max(currentProgress, Math.min(1, Math.max(0, value)));
        progressFill.style.transform = `scaleX(${currentProgress})`;
        percentText.textContent = `${Math.round(currentProgress * 100)}%`;
    }

    function setStage(status, phase) {
        if (status) statusText.textContent = status;
        if (phase) phaseText.textContent = phase;
    }

    function setupHandover() {
        const handover = window.nuiHandoverData || {};
        const name = handover.playerName || handover.name;

        if (ui.showPlayerName !== false && typeof name === 'string' && name.trim()) {
            playerName.textContent = `CONNECTING AS ${name.trim().toUpperCase()}`;
        } else {
            playerName.textContent = '';
        }
    }

    function openExternal(url) {
        if (typeof url !== 'string' || !/^https?:\/\//i.test(url)) return;

        if (typeof window.invokeNative === 'function') {
            window.invokeNative('openUrl', url);
            return;
        }

        window.open(url, '_blank', 'noopener,noreferrer');
    }

    function setupLink(button, config, labelId) {
        const fallbackLabel = labelId === 'websiteLabel' ? 'WEBSITE' : 'STORE';
        const configured = config && typeof config.url === 'string' && /^https?:\/\//i.test(config.url);

        text(labelId, config && config.label, fallbackLabel);

        // Keep requested actions visible. Website ships with the known Node7
        // public URL; Store remains visibly disabled until its real URL is set.
        if (!configured) {
            button.hidden = config?.showWhenEmpty !== true;
            button.disabled = true;
            button.setAttribute('aria-disabled', 'true');
            button.classList.add('is-disabled');
            return;
        }

        button.hidden = false;
        button.disabled = false;
        button.removeAttribute('aria-disabled');
        button.classList.remove('is-disabled');
        button.addEventListener('click', () => openExternal(config.url));
    }

    function syncAudioIcons() {
        const paused = musicPlayer.paused;
        playIcon.hidden = !paused;
        pauseIcon.hidden = paused;

        const muted = musicPlayer.muted || musicPlayer.volume === 0;
        volumeIcon.hidden = muted;
        mutedIcon.hidden = !muted;
    }

    function tryPlayMusic() {
        if (closing || tracks.length === 0 || musicCfg.autoplay === false) return;
        if (!musicPlayer.src) return;

        const result = musicPlayer.play();
        if (result && typeof result.then === 'function') {
            result.then(syncAudioIcons).catch(() => {
                // CEF/Chromium may require one user gesture before audible autoplay.
                syncAudioIcons();
            });
        } else {
            syncAudioIcons();
        }
    }

    function loadTrack(index, shouldPlay) {
        if (tracks.length === 0) return;

        trackPosition = ((index % tracks.length) + tracks.length) % tracks.length;
        const track = tracks[trackPosition];
        const source = String(track.src || '').trim();
        if (!source) return;

        trackTitle.textContent = track.title || 'NODE7';
        trackArtist.textContent = track.artist || '';

        // Assigning the resolved local NUI URL and explicitly loading it is more reliable
        // than swapping nested <source> elements after the page has already initialized.
        musicPlayer.pause();
        musicPlayer.src = source;
        musicPlayer.load();

        if (shouldPlay) tryPlayMusic();
    }

    function setupMusic() {
        if (tracks.length === 0) {
            audioPanel.hidden = true;
            return;
        }

        audioPanel.hidden = false;
        musicPlayer.autoplay = musicCfg.autoplay !== false;
        musicPlayer.preload = 'auto';

        const configuredVolume = Number(musicCfg.volume);
        const volume = Number.isFinite(configuredVolume) ? Math.min(1, Math.max(0, configuredVolume)) : .22;
        musicPlayer.volume = volume;
        musicPlayer.muted = false;
        volumeSlider.value = String(Math.round(volume * 100));

        if (musicCfg.shuffle === true && tracks.length > 1) {
            trackPosition = Math.floor(Math.random() * tracks.length);
        }

        audioToggle.addEventListener('click', () => {
            if (musicPlayer.paused) {
                const result = musicPlayer.play();
                if (result && typeof result.catch === 'function') result.catch(syncAudioIcons);
            } else {
                musicPlayer.pause();
            }
        });

        muteToggle.addEventListener('click', () => {
            musicPlayer.muted = !musicPlayer.muted;
            if (!musicPlayer.muted && musicPlayer.paused) tryPlayMusic();
            syncAudioIcons();
        });

        volumeSlider.addEventListener('input', () => {
            musicPlayer.volume = Math.min(1, Math.max(0, Number(volumeSlider.value) / 100));
            if (musicPlayer.volume > 0) musicPlayer.muted = false;
            if (musicPlayer.paused) tryPlayMusic();
            syncAudioIcons();
        });

        musicPlayer.addEventListener('canplay', tryPlayMusic, { passive: true });
        musicPlayer.addEventListener('loadeddata', tryPlayMusic, { passive: true });
        musicPlayer.addEventListener('play', syncAudioIcons);
        musicPlayer.addEventListener('pause', syncAudioIcons);
        musicPlayer.addEventListener('volumechange', syncAudioIcons);
        musicPlayer.addEventListener('ended', () => loadTrack(trackPosition + 1, true));
        musicPlayer.addEventListener('error', syncAudioIcons);

        // If Chromium rejects the initial audible autoplay, the first click/key press
        // anywhere on the loading screen immediately unlocks playback. This also covers
        // users clicking Community / Rules / Keybinds / Contributors first.
        const unlockAudio = () => {
            tryPlayMusic();
            window.removeEventListener('pointerdown', unlockAudio, true);
            window.removeEventListener('keydown', unlockAudio, true);
        };
        window.addEventListener('pointerdown', unlockAudio, true);
        window.addEventListener('keydown', unlockAudio, true);

        loadTrack(trackPosition, musicCfg.autoplay !== false);
        syncAudioIcons();
    }

    function closeLoadingScreen() {
        if (closing) return;
        closing = true;

        setProgress(1);
        setStage('ENTERING THE FRONTIER', 'READY');

        if (!musicPlayer.paused) {
            const startVolume = musicPlayer.volume;
            const started = performance.now();
            const fade = (now) => {
                const t = Math.min(1, (now - started) / 500);
                musicPlayer.volume = startVolume * (1 - t);
                if (t < 1) requestAnimationFrame(fade);
                else musicPlayer.pause();
            };
            requestAnimationFrame(fade);
        }

        requestAnimationFrame(() => screen.classList.add('is-closing'));
    }

    window.addEventListener('message', (event) => {
        const data = event.data || {};

        switch (data.eventName) {
            case 'loadProgress':
                setProgress(data.loadFraction);
                setStage('LOADING THE FRONTIER', 'STREAMING');
                break;
            case 'startDataFileEntries':
                setStage('PREPARING WORLD ASSETS', 'STREAMING');
                break;
            case 'performMapLoadFunction':
                setStage('BUILDING THE WORLD', 'WORLD');
                break;
            case 'startInitFunction':
            case 'startInitFunctionOrder':
                setStage('STARTING RESOURCES', 'RESOURCES');
                break;
            case 'initFunctionInvoking':
            case 'initFunctionInvoked':
                setStage('INITIALIZING NODE7', 'FRAMEWORK');
                break;
            case 'endInitFunction':
                setStage('FINALIZING SESSION', 'FINALIZING');
                break;
            case 'node7:sessionReady':
                setProgress(1);
                setStage('SESSION READY', 'FINALIZING');
                break;
            case 'node7:close':
                closeLoadingScreen();
                break;
        }
    });

    setupBrand();
    setupBackground();
    setupHandover();
    buildPanels();
    setupLink(websiteButton, links.website, 'websiteLabel');
    setupLink(storeButton, links.store, 'storeLabel');
    setupMusic();

    if (!window.nuiHandoverData && window.location.protocol === 'file:') {
        playerName.textContent = 'CONNECTING AS PREVIEW';
        let demo = 0;
        const preview = window.setInterval(() => {
            demo = Math.min(.92, demo + .025);
            setProgress(demo);
            if (demo >= .92) window.clearInterval(preview);
        }, 180);
    }
})();
