import React from "react";
import { ART } from "react-native";

const Rectangle = ({ x, y, width, height, colorBody, colorOutline }) => {

  const body = ART.Path()
    .moveTo(x, y)
    .lineTo(x + width, y)
    .lineTo(x + width, y - height)
    .lineTo(x, y - height)
    .close() 

  return (
    <ART.Group> 
      <ART.Shape fill={colorBody} d={body} />
      <ART.Shape stroke={colorOutline} d={body} />
    </ART.Group>
  )
}

export { Rectangle }