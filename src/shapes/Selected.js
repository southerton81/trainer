import React from "react";
import { ART } from "react-native";

const Selected = ({ pos, screenHeight }) => {
  const centerLine = ART.Path()
    .moveTo(pos.x, 0)
    .lineTo(pos.x, screenHeight)
     
  let colorCandle = "#333"

  return (
    <ART.Group>
      <ART.Shape stroke={colorCandle} strokeDash = {[10, 20]} d={centerLine} />
    </ART.Group>
  )
}

export { Selected };
