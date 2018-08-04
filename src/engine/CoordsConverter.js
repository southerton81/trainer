export default class CoordsConverter {
  constructor(candles, w, h) {
    this.candles = candles
    let prices = this._calculateMinMaxPrice(candles)
    //this._normalizePrices(candles, prices)

    this.priceScale = 1 
    let priceRange = (prices.maxPrice - prices.minPrice) * this.priceScale
    this.candleChartWidth = 10
    this.maxX = candles.length * this.candleChartWidth
    this.maxY = priceRange
    this._setScreenSize(w, h)
    this._setChartVisibleRc(this._calculateChartVisibleRc(0, 250))
  }

  getCandleAtScreenPoint(x) {
    let chartPoint = this.convertScreenToChart(x)
    let candleIndex = Math.floor(chartPoint.x / this.candleChartWidth)  
    return this.candlesSpan[candleIndex - this.fromCandle]
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
    let screenCandleWidth = this.candleChartWidth * this.screenToVisibleChart.x
    let chartOffsetX = this.fromCandle * this.candleChartWidth

    this.candlesSpan.forEach((candle, i) => {
      let chartX = chartOffsetX + i * this.candleChartWidth
      let x = this.convertChartToScreen(chartX).x
      let highPrice = (this.prices.maxPrice - candle.high) * this.priceScale
      let lowPrice = (this.prices.maxPrice - candle.low) * this.priceScale
      let openPrice = (this.prices.maxPrice - candle.open) * this.priceScale
      let closePrice = (this.prices.maxPrice - candle.close) * this.priceScale

      candle.screenHigh = { x: x, y: this._chartToScreenVerticalPos(highPrice) }
      candle.screenLow = { x: x, y: this._chartToScreenVerticalPos(lowPrice) }
      candle.screenOpen = { x: x, y: this._chartToScreenVerticalPos(openPrice) }
      candle.screenClose = { x: x, y: this._chartToScreenVerticalPos(closePrice)}

      if (Math.abs(candle.screenOpen.y - candle.screenClose.y) < 5) {
        if (candle.screenClose.y <= candle.screenOpen.y) candle.screenClose.y = candle.screenOpen.y - 5
        else candle.screenClose.y = candle.screenOpen.y + 5
      } 
      candle.screenWidth = screenCandleWidth
    })

    return this.candlesSpan
  }

  moveChartRc(dx) {
    let chartDx = dx / this.screenToVisibleChart.x 
    let x1 = this.chartVisibleRc.x + chartDx
    let x2 = x1 + this.chartVisibleRc.w
    if (x1 > 0 && x2 < this.maxX) {
      this._setChartVisibleRc(this._calculateChartVisibleRc(x1, x2))
    }
  }

  zoomChartRc(dx) {
    let chartDx = dx / this.screenToVisibleChart.x 
    let x1 = this.chartVisibleRc.x - chartDx
    let x2 = this.chartVisibleRc.x + this.chartVisibleRc.w + chartDx

    if (Math.abs(x2 - x1) > this.candleChartWidth && (x1 < x2)) {
      if (x1 < 0) x1 = 0
      if (x2 > this.maxX) x2 = this.maxX
      this._setChartVisibleRc(this._calculateChartVisibleRc(x1, x2))
    }
  }

  _chartToScreenVerticalPos(chartVerticalPos) {
    return chartVerticalPos * this.screenToVisibleChart.y
  }

  _setScreenSize(w, h) {
    this.screenWidth = w
    this.screenHeight = h
  }

  _calculateChartVisibleRc(x1, x2) {
    this.fromCandle = Math.max(0, Math.floor(x1 / this.candleChartWidth))
    this.toCandle = this.fromCandle + Math.ceil((x2 - x1) / this.candleChartWidth)
    this.candlesSpan = this.candles.slice(this.fromCandle, this.toCandle)
    this.prices = this._calculateMinMaxPrice(this.candlesSpan)
    return {
      x: x1,
      y: 0,
      w: x2 - x1,
      h: (this.prices.maxPrice - this.prices.minPrice) * this.priceScale
    }
  }

  _setChartVisibleRc(rc) {
    this.chartVisibleRc = rc
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
    let offset = (prices.maxPrice - prices.minPrice) * .2
    prices.maxPrice += offset
    prices.minPrice -= offset
    return prices
  }
}
