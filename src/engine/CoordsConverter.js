export default class CoordsConverter {
    constructor(candles, w, h) {
        this.candles = candles;

        let prices = this._calculateMinMaxPrice(candles);
        this._normalizePrices(candles, prices);

        this.priceScale = 1000
        let priceRange = (prices.maxPrice - prices.minPrice) * this.priceScale;
        this.candleChartWidth = 10;
        //this.maxX = candles.length * this.candleWidth;
        //this.maxY = priceRange;
        this._setChartVisibleRc()
        this._setScreenSize(w, h)
    }

    convertScreenToChart(x, y) {
        let chartX = this.chartVisibleRc.x + (x / this.screenToVisibleChart.x);
        let chartY = this.chartVisibleRc.y + (y / this.screenToVisibleChart.y);
        return { x: chartX, y: chartY }
    }

    convertChartToScreen(x, y) {
        let scrX = (x - this.chartVisibleRc.x) * this.screenToVisibleChart.x;
        let scrY = (y - this.chartVisibleRc.y) * this.screenToVisibleChart.y;
        return { x: scrX, y: scrY }
    }

    chartToScreenVerticalPos(chartVerticalPos) {
        return chartVerticalPos * this.screenToVisibleChart.y
    }

    priceToVerticalChartPos(price) {
       return (price - this.minPrice) * this.priceScale;
    }

    getScreenCandles(from = 0, to = this.candles.length) {
        this._setChartVisibleRc(from, to);
        let candlesSpan = this.candles.slice(from, to)
        let screenCandleWidth = this.screenWidth / (to - from)

        candlesSpan.forEach((candle, i) => {
            let x = i * screenCandleWidth
            let highPrice = this.priceToVerticalChartPos(candle.high)
            let lowPrice = this.priceToVerticalChartPos(candle.low)
            let openPrice = this.priceToVerticalChartPos(candle.open)
            let closePrice = this.priceToVerticalChartPos(candle.close)

            candle.screenHigh = {x: x, y: this.chartToScreenVerticalPos(highPrice)}    
            candle.screenLow = {x: x, y: this.chartToScreenVerticalPos(lowPrice)}
            candle.screenOpen = {x: x, y: this.chartToScreenVerticalPos(openPrice)}    
            candle.screenClose = {x: x, y: this.chartToScreenVerticalPos(closePrice)}
            candle.screenWidth = screenCandleWidth;
        });

        return candlesSpan
    }

    _setScreenSize(w, h) {
        this.screenWidth = w
        this.screenHeight = h

        this.screenToChart = {
            x: this.screenWidth / this.chartVisibleRc.w, 
            y: this.screenHeight / this.chartVisibleRc.h
        }
    }

    _setChartVisibleRc(from = 0, to = this.candles.length) {
        let candlesSpan = this.candles.slice(from, to)
        let prices = this._calculateMinMaxPrice(candlesSpan)

        this.maxPrice = prices.maxPrice;
        this.minPrice = prices.minPrice;

        let minPricePos = this.priceToVerticalChartPos(prices.minPrice)
        let x = from * this.candleChartWidth
        this.chartVisibleRc = {
            x: x,
            y: minPricePos,
            w: (to * this.candleChartWidth) - x,
            h: this.priceToVerticalChartPos(prices.maxPrice) - minPricePos
        }

        this.screenToVisibleChart = {
            x: this.screenWidth / this.chartVisibleRc.w, 
            y: this.screenHeight / this.chartVisibleRc.h
        }
    }

    _normalizePrices(candles, prices) {
        let minConvertPrice = 10;
        if (prices.minPrice < minConvertPrice || prices.maxPrice > minConvertPrice * 10) {
            let priceMultiplier = minConvertPrice / prices.minPrice;
            candles.forEach(candle => {
                candle.high *= priceMultiplier;
                candle.low *= priceMultiplier;
                candle.open *= priceMultiplier;
                candle.close *= priceMultiplier;
            });

            prices.maxPrice *= priceMultiplier;
            prices.minPrice *= priceMultiplier;
        }
    }

    _calculateMinMaxPrice(candles) {
        let prices = {
            maxPrice : Number.MIN_VALUE,
            minPrice : Number.MAX_VALUE
        }
        candles.forEach(candle => {
          if (candle.high > prices.maxPrice) prices.maxPrice = candle.high;
          if (candle.low < prices.minPrice) prices.minPrice = candle.low;
        });
        return prices
    }
}