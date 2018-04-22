import React from "react";
import { ART } from "react-native";

const Candle = ({ candleData }) => {
  const candle = ART.Path()
    .moveTo(candleData.x, candleData.high)
    .lineTo(candleData.x, candleData.low);

  let color = candleData.open > candleData.close ? "#008000" : "#FF0000";
  return <ART.Shape stroke={color} d={candle} />;
};

export { Candle };
