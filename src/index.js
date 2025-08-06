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
    theme: Themes[new URLSearchParams(window.location.search).get('theme') || 'darkGold'] || undefined,
})

// Create line series optimized for regular progressive X data.
const series = chart
    .addLineSeries({
        schema: {
            x: { pattern: 'progressive' },
            y: { pattern: null },
        },
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
