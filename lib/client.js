const setupDevtools = (numCols = 14) => {
    const styleToApply = /* css */`.debug-cols {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        height: 100%;
        z-index: 10000;
        pointer-events: none;
        display: grid;
        grid-template-columns: repeat(${numCols}, minmax(0, 1fr));
        visibility: hidden;
        outline: none!important;
    }
    .debug-cols * {
        outline: none!important;
    }
    .debug-cols.active {
        visibility: visible;
    }
    .debug-cols div {
        width: 100%;
        border: solid 1px rgba(85, 189, 234, 0.3);
        color: rgba(85, 189, 234, 0.3);
        border-bottom: none;
        border-top: none;
        outline: none;
        pointer-events: none;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 16px;
        padding-bottom: -16px;
        justify-content: space-between;
        outline: none!important;
    }
    .debug-cols div:first-child {
        border-left: none;
    }
    .debug-cols div:last-child {
        border-right: none;
    }`

    const stylesheet = document.createElement('style')
    stylesheet.innerText = styleToApply
    document.head.appendChild(stylesheet)

    const debugCols = document.createElement('div')
    debugCols.classList.add('debug-cols')

    for (let i = 0; i < numCols; i++) {
        const el = document.createElement('div')
        el.innerHTML = `<span>${i + 1}</span><span>${i + 1}</span>`
        debugCols.appendChild(el)
    }
    document.body.appendChild(debugCols)

    // Persist debug cols active to sessionstorage
    if (sessionStorage.getItem('debugColsActive') === 'true') {
        debugCols.classList.add('active')
    }
    document.addEventListener('keydown', (e) => {
        if (e.key.toLowerCase() === 'g' && (e.ctrlKey || e.shiftKey)) {
            debugCols.classList.toggle('active')
            sessionStorage.setItem('debugColsActive', debugCols.classList.contains('active').toString())
        }
    })

    const hotKey = navigator.userAgent.indexOf('Mac OS X') != -1 ? '^' : '⇧'
    console.log(
        `%c🛠️ Vite columns devtools enabled. Use ${hotKey}+g for grid.%c`,
        'background: #22b34b; color:white; padding: 6px 8px; border-radius: 4px;',
        '',
    )
}

setupDevtools(/* numCols */)