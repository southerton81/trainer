export default class DecoratorsProcessor {
  constructor() {
    this.trendlines = []
    this.selected = null
  }

  addTrendline(_x, _y) {
    this.trendlines.push({ x: _x, y: _y })
  }

  setSelection(_x, _y) {
    this.selected = { x: _x, y: _y }
  }

  removeSelection(_x, _y) {
    this.selected = null
  }

  getScreenTrendlines(coordsConverter) {
    let screenTrendlines = this.trendlines.map(value =>
      coordsConverter.convertChartToScreen(value.x, value.y)
    ) 
    return screenTrendlines
  }

  getScreenSelection(coordsConverter) {
    if (this.selected)
      return coordsConverter.convertChartToScreen(this.selected.x, this.selected.y)
    return null
  }
}
