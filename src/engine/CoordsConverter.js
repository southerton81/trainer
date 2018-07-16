export default class CoordsConverter {
  constructor(candles, w, h) {
    this.candles = candles
    let prices = this._calculateMinMaxPrice(candles)
    this._normalizePrices(candles, prices)

    this.priceScale = 1000
    let priceRange = (prices.maxPrice - prices.minPrice) * this.priceScale
    this.candleChartWidth = 10
    this.maxX = candles.length * this.candleChartWidth
    this.maxY = priceRange
    this._setScreenSize(w, h)
    this._setChartVisibleRc(this._calculateChartVisibleRc(0, 150))
  }

  getCandleAtScreenPoint(x, y) {
    let chartPoint = this.convertScreenToChart(x, y)
    let candleIndex = Math.round(chartPoint.x / this.candleChartWidth)
    //  if (candleIndex >= this.from && candleIndex < this.to) {
    //    return this.candles[candleIndex]
    //  }
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
    let fromCandle = Math.max(0, Math.floor(this.chartVisibleRc.x / this.candleChartWidth))
    let toCandle = fromCandle + Math.ceil(this.chartVisibleRc.w / this.candleChartWidth) + 1
    let candlesSpan = this.candles.slice(fromCandle, toCandle)
    let prices = this._calculateMinMaxPrice(candlesSpan)
    let screenCandleWidth = this.screenWidth / (toCandle - fromCandle)

    

    //console.log('chartVisibleRc ' + this.chartVisibleRc.x + ' ' + this.chartVisibleRc.y)
    console.log('fromCandle ' + fromCandle)
    console.log('toCandle ' + toCandle)

    console.log('pricesMin ' + prices.minPrice)

    let chartOffsetX = fromCandle * this.candleChartWidth

    candlesSpan.forEach((candle, i) => {
      let chartX = chartOffsetX + (i * this.candleChartWidth)
      let {x, y} = this.convertChartToScreen(chartX, 0)

      //console.log('chartX ' + chartX)
      //console.log('x ' + x)

      let highPrice = (candle.high - prices.minPrice) * this.priceScale
      let lowPrice = (candle.low - prices.minPrice) * this.priceScale
      let openPrice = (candle.open - prices.minPrice) * this.priceScale
      let closePrice = (candle.close - prices.minPrice) * this.priceScale

      candle.screenHigh = { x: x, y: this._chartToScreenVerticalPos(highPrice) }
      candle.screenLow = { x: x, y: this._chartToScreenVerticalPos(lowPrice) }
      candle.screenOpen = { x: x, y: this._chartToScreenVerticalPos(openPrice) }
      candle.screenClose = { x: x, y: this._chartToScreenVerticalPos(closePrice) }
      candle.screenWidth = screenCandleWidth 
    })

    return candlesSpan
  }

  moveChartRc(dx) {
    let newX = dx > 0 ? this.chartVisibleRc.x - 1 : this.chartVisibleRc.x + 1

    //console.log('newX ' + this.chartVisibleRc.x + ' ' + this.chartVisibleRc.y)

    this._setChartVisibleRc(
      this._calculateChartVisibleRc(newX, newX + this.chartVisibleRc.w)
    )
  }

  _chartToScreenVerticalPos(chartVerticalPos) {
    return chartVerticalPos * this.screenToVisibleChart.y
  }

  _setScreenSize(w, h) {
    this.screenWidth = w
    this.screenHeight = h
  }

  _calculateChartVisibleRc(x1, x2) { 
    let fromCandle = Math.max(0, Math.floor(x1 / this.candleChartWidth))
    let toCandle = fromCandle + Math.ceil((x2 - x1) / this.candleChartWidth) + 1
    
    let candlesSpan = this.candles.slice(fromCandle, toCandle)
    let prices = this._calculateMinMaxPrice(candlesSpan)
    
    return {
      x: x1,
      y: 0,
      w: x2 - x1,
      h: (prices.maxPrice - prices.minPrice) * this.priceScale
    }
  }

  _setChartVisibleRc(rc) {
    this.chartVisibleRc = rc

    console.log('chartVisibleRc ' + this.chartVisibleRc.x + ' ' + this.chartVisibleRc.y)

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
    prices.maxPrice += 0.1
    prices.minPrice -= 0.1
    return prices
  }
}
