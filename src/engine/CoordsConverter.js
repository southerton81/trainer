export default class CoordsConverter {
  constructor(candles, w, h) {
    this.candles = candles
    console.log('3')

    let prices = this._calculateMinMaxPrice(candles)
    this._normalizePrices(candles, prices)

    this.priceScale = 1000
    let priceRange = (prices.maxPrice - prices.minPrice) * this.priceScale
    this.candleChartWidth = 10
    //this.maxX = candles.length * this.candleWidth;
    //this.maxY = priceRange
    this._setScreenSize(w, h)
    this._setChartVisibleRc(0, this.candles.length)
  }

  getCandleAtScreenPoint(x, y) {
    let chartPoint = this.convertScreenToChart(x, y)
    let candleIndex = Math.round(chartPoint.x / this.candleChartWidth)
    if (candleIndex >= this.from && candleIndex < this.to) {
      return this.candles[candleIndex]
    }
  }

  convertScreenToChart(x, y) {
    let chartX = this.chartVisibleRc.x + x / this.screenToVisibleChart.x
    let chartY = this.chartVisibleRc.y + y / this.screenToVisibleChart.y
    return { x: chartX, y: chartY }
  }

  convertChartToScreen(x, y) {
    let scrX = (x - this.chartVisibleRc.x) * this.screenToVisibleChart.x
    let scrY = (y - this.chartVisibleRc.y) * this.screenToVisibleChart.y
    return { x: scrX, y: scrY }
  }

  getScreenCandles() { 
    let candlesSpan = this.candles.slice(this.from, this.to)
    let screenCandleWidth = this.screenWidth / (this.to - this.from)

    candlesSpan.forEach((candle, i) => {
      let x = i * screenCandleWidth
      let highPrice = this._priceToVerticalChartPos(candle.high)
      let lowPrice = this._priceToVerticalChartPos(candle.low)
      let openPrice = this._priceToVerticalChartPos(candle.open)
      let closePrice = this._priceToVerticalChartPos(candle.close)

      candle.screenHigh = { x: x, y: this._chartToScreenVerticalPos(highPrice) }
      candle.screenLow = { x: x, y: this._chartToScreenVerticalPos(lowPrice) }
      candle.screenOpen = { x: x, y: this._chartToScreenVerticalPos(openPrice) }
      candle.screenClose = {
        x: x,
        y: this._chartToScreenVerticalPos(closePrice)
      }
      candle.screenWidth = screenCandleWidth
    })

    return candlesSpan
  }

  _chartToScreenVerticalPos(chartVerticalPos) {
    return chartVerticalPos * this.screenToVisibleChart.y
  }

  _priceToVerticalChartPos(price) {
    return (price - this.minPrice) * this.priceScale
  }

  _setScreenSize(w, h) {
    this.screenWidth = w
    this.screenHeight = h
  }

  _setChartVisibleRc(from, to) {
    this.from = from
    this.to = to
    let candlesSpan = this.candles.slice(from, to)
    let prices = this._calculateMinMaxPrice(candlesSpan)

    this.maxPrice = prices.maxPrice
    this.minPrice = prices.minPrice

    let minPricePos = this._priceToVerticalChartPos(prices.minPrice)
    let x = from * this.candleChartWidth
    this.chartVisibleRc = {
      x: x,
      y: minPricePos,
      w: to * this.candleChartWidth - x,
      h: this._priceToVerticalChartPos(prices.maxPrice) - minPricePos
    }

    this.screenToVisibleChart = {
      x: this.screenWidth / this.chartVisibleRc.w,
      y: this.screenHeight / this.chartVisibleRc.h
    }
  }

  _normalizePrices(candles, prices) {
    let minConvertPrice = 10
    if (
      prices.minPrice < minConvertPrice ||
      prices.maxPrice > minConvertPrice * 10
    ) {
      let priceMultiplier = minConvertPrice / prices.minPrice
      candles.forEach(candle => {
        candle.high *= priceMultiplier
        candle.low *= priceMultiplier
        candle.open *= priceMultiplier
        candle.close *= priceMultiplier
      })

      prices.maxPrice *= priceMultiplier
      prices.minPrice *= priceMultiplier
    }
  }

  _calculateMinMaxPrice(candles) {
    let prices = {
      maxPrice: Number.MIN_VALUE,
      minPrice: Number.MAX_VALUE
    }
    candles.forEach(candle => {
      if (candle.high > prices.maxPrice) prices.maxPrice = candle.high
      if (candle.low < prices.minPrice) prices.minPrice = candle.low
    })
    return prices
  }
}
