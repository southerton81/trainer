import CoordsConverter from "../src/engine/CoordsConverter";
import candles from "../res/Chart.json";

it("converts charts correctly", () => { 
  let coordsConverter = new CoordsConverter(candles, 500,300)
  let screenCandles = coordsConverter.getScreenCandles(10,20)

  console.log(coordsConverter.chartVisibleRc)
  console.log(coordsConverter.minPrice)
 // expect(false).toBe(false)

  console.log(coordsConverter.convertScreenToChart(500, 300))

});
  