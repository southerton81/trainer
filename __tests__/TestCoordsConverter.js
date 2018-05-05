import CoordsConverter from "../src/engine/CoordsConverter";
import candles from "../res/Chart.json";

it("converts charts correctly", () => { 
  let coordsConverter = new CoordsConverter(candles)
  coordsConverter.setScreenSize(500,300)
  let screenCandles = coordsConverter.getScreenCandles(0,15)
  console.log(screenCandles)
  expect(false).toBe(false)
});
  