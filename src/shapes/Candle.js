import React from "react";
import { ART } from "react-native";

const Candle = ({ candleData }) => {
  const candle = ART.Path()
    .moveTo(candleData.x + candleData.width / 2, candleData.high)
    .lineTo(candleData.x + candleData.width / 2, candleData.low);

  let x = candleData.x;
  let y = Math.min(candleData.open, candleData.close);
  let height = Math.abs(candleData.open - candleData.close);

  const body = ART.Path()
    .moveTo(x, y)
    .lineTo(x + candleData.width, y)
    .lineTo(x + candleData.width, y + height)
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
