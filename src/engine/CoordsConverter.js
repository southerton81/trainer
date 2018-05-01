export default class CoordsConverter {
    constructor(candles) {
        this.candles = candles;

        let prices = this.calculateMinMaxPrice(candles);
        this.normalizePrices(candles, prices);

        this.priceScale = 1000
        let priceRange = (prices.maxPrice - prices.minPrice) * this.priceScale;
        this.maxPrice = prices.maxPrice;
        this.minPrice = prices.minPrice;
        this.candleWidth = 10;
        this.maxX = candles.length * this.candleWidth;
        this.maxY = priceRange;
        this.setChartVisibleRc();
    }

    setScreenSize(w, h) {
        this.screenWidth = w
        this.screenHeight = h
        this.screenToChart = { x: w / this.chartVisibleRc.w, y : h / this.chartVisibleRc.h}
    }

    getScreenCandles(from = 0, to = this.candles.length) {
        let candlesSpan = this.candles.slice(from, to)
        let screenCandleWidth = this.screenWidth / (to - from)

        candlesSpan.forEach((candle, i) => {

            let x = i * screenCandleWidth
            let highPrice = this.priceToVerticalChartPos(candle.high)
            let lowPrice = this.priceToVerticalChartPos(candle.low)
            let openPrice = this.priceToVerticalChartPos(candle.open)
            let closePrice = this.priceToVerticalChartPos(candle.close)

            console.log(highPrice)

            candle.screenHigh = {x: x, y: this.chartToScreenVerticalPos(highPrice)}    
            candle.screenLow = {x: x, y: this.chartToScreenVerticalPos(lowPrice)}
            candle.screenOpen = {x: x, y: this.chartToScreenVerticalPos(openPrice)}    
            candle.screenClose = {x: x, y: this.chartToScreenVerticalPos(closePrice)}
        });

        return candlesSpan
    }

    setChartVisibleRc(from = 0, to = this.candles.length) {
        let candlesSpan = this.candles.slice(from, to)
        let prices = this.calculateMinMaxPrice(candlesSpan)

        let minPricePos = this.priceToVerticalChartPos(prices.minPrice)
        let x = from * this.candleWidth
        this.chartVisibleRc = {
            x: x,
            y: minPricePos,
            w: (to * this.candleWidth) - x,
            h: this.priceToVerticalChartPos(prices.maxPrice) - minPricePos
        }
    }

    chartToScreenVerticalPos(chartVerticalPos) {
        return chartVerticalPos * this.screenToChart.y
    }

    priceToVerticalChartPos(price) {
       return (price - this.minPrice) * this.priceScale;
    }

    normalizePrices(candles, prices) {
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

    calculateMinMaxPrice(candles) {
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