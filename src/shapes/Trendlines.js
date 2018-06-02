import React from "react";
import { ART } from "react-native";

const Trendlines = ({ trendlines }) => {
    if (trendlines && trendlines.length >= 2) {

      trendlines = trendlines.reduce(
        (previousValue, currentValue, index) => {
          if (index % 2 === 0) {
            previousValue.push(ART.Path().moveTo(currentValue.x, currentValue.y));
          } else {
            let lastPath = previousValue[previousValue.length - 1];
            lastPath = lastPath.lineTo(currentValue.x, currentValue.y);
          }

          return previousValue;
        },
        [])

      return trendlines.map((path, index) => (
        <ART.Group key={"trendline" + index}>
          <ART.Shape stroke={"#000"} d={path} />
        </ART.Group>
      ));
    }

    return <ART.Group />
};

export { Trendlines };