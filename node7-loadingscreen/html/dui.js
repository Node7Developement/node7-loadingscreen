(() => {
    'use strict';

    const cfg = window.NODE7_LOADSCREEN || {};
    const panels = Array.isArray(cfg.panels) ? cfg.panels : [];
    const root = document.getElementById('duiRoot');
    const items = document.getElementById('duiItems');
    const progress = document.getElementById('duiProgress');
    let panelIndex = 0;
    let panelTimer = 0;

    const setText = (id, value) => {
        const el = document.getElementById(id);
        if (el && typeof value === 'string') el.textContent = value;
    };

    const renderProgress = () => {
        progress.replaceChildren();
        panels.forEach((_, index) => {
            const dot = document.createElement('i');
            if (index === panelIndex) dot.classList.add('active');
            progress.appendChild(dot);
        });
    };

    const renderPanel = () => {
        if (!panels.length) return;
        const panel = panels[panelIndex] || panels[0];

        setText('duiPanelLabel', panel.label || 'NODE7');
        setText('duiPanelEyebrow', panel.eyebrow || 'COMMUNITY');
        setText('duiPanelTitle', panel.title || 'WELCOME');
        setText('duiPanelIntro', panel.intro || '');
        setText('duiPanelNumber', String(panelIndex + 1).padStart(2, '0'));

        items.replaceChildren();
        const source = Array.isArray(panel.keybinds) ? panel.keybinds : (Array.isArray(panel.items) ? panel.items : []);
        const isKeybind = Array.isArray(panel.keybinds);

        source.slice(0, 6).forEach((entry) => {
            const row = document.createElement('div');
            row.className = `dui-item${isKeybind ? ' keybind' : ''}`;

            const title = document.createElement('strong');
            title.textContent = String(entry?.[0] ?? '');

            const text = document.createElement('span');
            text.textContent = String(entry?.[1] ?? '');

            row.append(title, text);
            items.appendChild(row);
        });

        renderProgress();
    };

    const startPanels = () => {
        window.clearInterval(panelTimer);
        if (panels.length <= 1) return;

        panelTimer = window.setInterval(() => {
            panelIndex = (panelIndex + 1) % panels.length;
            renderPanel();
        }, 2600);
    };

    const show = (data = {}) => {
        panelIndex = 0;
        setText('duiKicker', cfg.brand?.kicker || 'A NODE7 PRODUCTION');
        setText('duiSubtitle', cfg.brand?.subtitle || 'REDM ROLEPLAY FRAMEWORK');
        setText('duiPlayer', data.playerName ? `WELCOME, ${String(data.playerName).toUpperCase()}` : '');

        const title = document.getElementById('duiTitle');
        const brandTitle = String(cfg.brand?.title || 'NODE7');
        if (title) {
            title.textContent = '';
            if (brandTitle.toUpperCase().endsWith('7')) {
                title.append(document.createTextNode(brandTitle.slice(0, -1)));
                const seven = document.createElement('span');
                seven.textContent = '7';
                title.appendChild(seven);
            } else {
                title.textContent = brandTitle;
            }
        }

        renderPanel();
        startPanels();
        root.classList.remove('hiding');
        requestAnimationFrame(() => root.classList.add('visible'));
    };

    const hide = () => {
        window.clearInterval(panelTimer);
        root.classList.add('hiding');
        root.classList.remove('visible');
    };

    window.addEventListener('message', (event) => {
        const data = event.data || {};
        if (data.type === 'node7:show') show(data);
        if (data.type === 'node7:hide') hide();
    });
})();
