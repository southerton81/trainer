import React from "react";
import { ART } from "react-native";

const Selected = ({ candleData, screenHeight }) => {
  const candle = ART.Path()
    .moveTo(candleData.screenHigh.x + candleData.screenWidth / 2, candleData.screenHigh.y)
    .lineTo(candleData.screenHigh.x + candleData.screenWidth / 2, candleData.screenLow.y)

  let x = candleData.screenHigh.x
  let y = Math.min(candleData.screenOpen.y, candleData.screenClose.y)
  let height = Math.abs(candleData.screenOpen.y - candleData.screenClose.y)

  const body = ART.Path()
    .moveTo(x, y)
    .lineTo(x + candleData.screenWidth, y)
    .lineTo(x + candleData.screenWidth, y + height)
    .lineTo(x, y + height)
    .close()

  let center = x + (candleData.screenWidth / 2)
  const centerLine = ART.Path()
    .moveTo(center, 0)
    .lineTo(center, screenHeight)
    
  let colorBody = candleData.open > candleData.close ? "#FF0000" : "#008000"
  let colorCandle = "#000"

  return (
    <ART.Group>
      <ART.Shape stroke={colorCandle} d={body} />
      <ART.Shape stroke={colorCandle} d={centerLine} />
    </ART.Group>
  )
}

export { Selected };
