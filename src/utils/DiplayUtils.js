import { Dimensions } from "react-native"

const Sizing = {
    getChartSize() {
        let { height, width } = Dimensions.get("window")
        height -= height / 4
        return { height, width }
    },

    getVolumeChartSize() {
        let { height, width } = Dimensions.get("window")
        height = height / 4
        return { height, width }
    }
};


export { Sizing };