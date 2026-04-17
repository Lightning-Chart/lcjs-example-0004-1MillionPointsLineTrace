/*
 * LightningChartJS example that showcases a line series with 1 Million streamed points with animated transitions.
 */
// Import LightningChartJS
const lcjs = require('@lightningchart/lcjs')

// Import xydata
const xydata = require('@lightningchart/xydata')

// Extract required parts from LightningChartJS.
const { lightningChart, Themes, emptyFill } = lcjs

// Import data-generator from 'xydata'-library.
const { createProgressiveTraceGenerator } = xydata

// Create a XY Chart.
const chart = lightningChart({
            resourcesBaseUrl: new URL(document.head.baseURI).origin + new URL(document.head.baseURI).pathname + 'resources/',
        }).ChartXY({
    legend: { visible: false },
    theme: (() => {
    const t = Themes[new URLSearchParams(window.location.search).get('theme') || 'darkGold'] || undefined
    const smallView = window.devicePixelRatio >= 2
    if (!window.__lcjsDebugOverlay) {
        window.__lcjsDebugOverlay = document.createElement('div')
        window.__lcjsDebugOverlay.style.cssText = 'position:fixed;top:0;left:0;background:rgba(0,0,0,0.7);color:#fff;padding:4px 8px;z-index:99999;font:12px monospace;pointer-events:none'
        if (document.body) document.body.appendChild(window.__lcjsDebugOverlay)
        setInterval(() => {
            if (!window.__lcjsDebugOverlay.parentNode && document.body) document.body.appendChild(window.__lcjsDebugOverlay)
            window.__lcjsDebugOverlay.textContent = window.innerWidth + 'x' + window.innerHeight + ' dpr=' + window.devicePixelRatio + ' small=' + (window.devicePixelRatio >= 2)
        }, 500)
    }
    return t && smallView ? lcjs.scaleTheme(t, 0.5) : t
})(),
textRenderer: window.devicePixelRatio >= 2 ? lcjs.htmlTextRenderer : undefined,
})

// Create line series optimized for regular progressive X data.
const series = chart
    .addLineSeries({
        schema: {
            x: { pattern: 'progressive' },
            y: { pattern: null },
        },
        automaticColorIndex: 2,
    })
    .setMaxSampleCount(1_000_000)

// Generate traced points stream using 'xydata'-library.
chart.setTitle('Generating test data...')
createProgressiveTraceGenerator()
    .setNumberOfPoints(1 * 1000 * 1000)
    .generate()
    .toPromise()
    .then((data) => {
        chart.setTitle('1 Million Points Line Trace')
        const dataLen = data.length
        let dataPointsCount = 0
        const addPoints = () => {
            const addDataPointsCount = 20000
            const newDataPoints = data.slice(dataPointsCount, dataPointsCount + addDataPointsCount)
            series.appendJSON(newDataPoints)
            dataPointsCount += addDataPointsCount
            if (dataPointsCount < dataLen) {
                requestAnimationFrame(addPoints)
            }
        }
        addPoints()
    })
