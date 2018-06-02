export default class DecoratorsProcessor {
  constructor() {
    this.trendlines = []
  }

  addTrendline(_x, _y) {
    this.trendlines.push({ x: _x, y: _y })
  }

  getScreenTrendlines(coordsConverter) {
    let screenTrendlines = this.trendlines.map(value =>
      coordsConverter.convertChartToScreen(value.x, value.y)
    ) 
    return screenTrendlines
  }
}
