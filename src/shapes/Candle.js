import React from "react";
import { ART } from "react-native";

const Candle = ({ candleData }) => {
  const candle = ART.Path()
    .moveTo(candleData.screenHigh.x + candleData.screenWidth / 2, candleData.screenHigh.y)
    .lineTo(candleData.screenHigh.x + candleData.screenWidth / 2, candleData.screenLow.y);

  let x = candleData.screenHigh.x;
  let y = Math.min(candleData.screenOpen.y, candleData.screenClose.y);
  let height = Math.abs(candleData.screenOpen.y - candleData.screenClose.y);

  const body = ART.Path()
    .moveTo(x, y)
    .lineTo(x + candleData.screenWidth, y)
    .lineTo(x + candleData.screenWidth, y + height)
    .lineTo(x, y + height)
    .lineTo(x, y)
    .close();

  let colorBody = candleData.open > candleData.close ? "#008000" : "#FF0000";
  let colorCandle = "#000";

  return (
    <ART.Group>
      <ART.Shape stroke={colorCandle} d={candle} />
      <ART.Shape fill={colorBody} d={body} />
    </ART.Group>
  );
};

export { Candle };
