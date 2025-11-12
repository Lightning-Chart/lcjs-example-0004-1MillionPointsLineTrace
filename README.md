# 1 Million Points JavaScript Line Chart

![1 Million Points JavaScript Line Chart](1mPointsLineTrace-darkGold.png)

This demo application belongs to the set of examples for LightningChart JS, data visualization library for JavaScript.

LightningChart JS is entirely GPU accelerated and performance optimized charting library for presenting massive amounts of data. It offers an easy way of creating sophisticated and interactive charts and adding them to your website or web application.

The demo can be used as an example or a seed project. Local execution requires the following steps:

-   Make sure that relevant version of [Node.js](https://nodejs.org/en/download/) is installed
-   Open the project folder in a terminal:

          npm install              # fetches dependencies
          npm start                # builds an application and starts the development server

-   The application is available at _http://localhost:8080_ in your browser, webpack-dev-server provides hot reload functionality.


## Description

This example plots a million data points in an instant using line series.

## Progressive data optimizations

By default, `LineSeries` can take list of XY coordinates in any order, connecting them with a line stroke.
However, in a lot of applications, the input data comes in a distinct order, for example, X coordinates describe a timestamp which increases between each consecutive data point. We refer to this as a _progressive data pattern_.

`LineSeries` is coupled together with highly sophisticated optimizations that can be enabled in applications where input data follows a _data pattern_. This example showcases the `'ProgressiveX'` _pattern_.

### Enabling data pattern optimizations

_Data pattern_ must be specified when the _series_ is created:

```typescript
// Create LineSeries with 'ProgressiveX' data pattern.
const series = ChartXY.addLineSeries({
    dataPattern: {
        // pattern: 'ProgressiveX' => Each consecutive data point has increased X coordinate.
        pattern: 'ProgressiveX',
        // regularProgressiveStep: true => The X step between each consecutive data point is regular (for example, always `1.0`).
        regularProgressiveStep: true,
    },
})
```

Available _data patterns_ are:

-   `'ProgressiveX'`: Each consecutive data point has increased X coordinate.
-   `'ProgressiveY'`: Each consecutive data point has increased Y coordinate.
-   `'RegressiveX'`: Each consecutive data point has decreased X coordinate.
-   `'RegressiveX'`: Each consecutive data point has decreased Y coordinate.

The pattern of data can be identified even further with the optional `regularProgressiveStep` property.
This can be enabled when the _progressive step_ (for example, `'ProgressiveX'` -> X step) between each data point is regular, leading to even more significant optimizations.

### Side-effects and good to know

When a series is configured with a _data pattern_, the rendering process makes logical deductions and ssumptions on the user input data, according to the _data pattern_ specification. **If the supplied input data does not follow the specification, rendering errors or even crashes can occur.** If you run into strange issues, first see if disabling the _data pattern_ helps, or if your input data is somehow invalid.

## Automatic Axis scrolling

The scrolling of data in progressive series can also be automated and optimized by specifying **_ScrollStrategy_** for both x-axis & y-axis to perform the scrolling efficiently.

-   Select **_AxisScrollStrategies.expansion_**. Automatically increases a scale if some points are out of scale. Retains progressivity/regressivity of used scale.
-   Select **_AxisScrollStrategies.fitting_**. Automatically increases a scale if some points are out of scale and reduces it if there is too much empty space. Retains progressivity/regressivity of used scale.
-   Select **_AxisScrollStrategies.progressive_**. Automatically scrolls a scale in a positive direction.
-   Select **_AxisScrollStrategies.regressive_**. Automatically scrolls a scale to a negative direction.
-   Pass **_undefined_** to disable automatic scrolling. Scale can then be manually set using _setInterval_ method of **_Axis_**


## API Links

* [XY cartesian chart]
* [Scroll strategies]
* [Line series]
* [Data patterns]
* [Progressive trace data generator]


## Support

If you notice an error in the example code, please open an issue on [GitHub][0] repository of the entire example.

Official [API documentation][1] can be found on [LightningChart][2] website.

If the docs and other materials do not solve your problem as well as implementation help is needed, ask on [StackOverflow][3] (tagged lightningchart).

If you think you found a bug in the LightningChart JavaScript library, please contact sales@lightningchart.com.

Direct developer email support can be purchased through a [Support Plan][4] or by contacting sales@lightningchart.com.

[0]: https://github.com/Arction/
[1]: https://lightningchart.com/lightningchart-js-api-documentation/
[2]: https://lightningchart.com
[3]: https://stackoverflow.com/questions/tagged/lightningchart
[4]: https://lightningchart.com/support-services/

© LightningChart Ltd 2009-2025. All rights reserved.


[XY cartesian chart]: https://lightningchart.com/js-charts/api-documentation/v8.1.0/classes/ChartXY.html
[Scroll strategies]: https://lightningchart.com/js-charts/api-documentation/v8.1.0/variables/AxisScrollStrategies.html
[Line series]: https://lightningchart.com/js-charts/api-documentation/v8.1.0/classes/PointLineAreaSeries.html
[Data patterns]: https://lightningchart.com/js-charts/api-documentation/v8.1.0/types/DataPattern.html
[Progressive trace data generator]: https://lightning-chart.github.io/xydata/classes/progressivetracegenerator.html

