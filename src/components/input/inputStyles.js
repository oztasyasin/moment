import { StyleSheet } from "react-native";
import { getAdaptedWidth } from "../../helper/sizeAdapter";

export const inputStyles = StyleSheet.create({
    frame: {
        width: getAdaptedWidth(358),
        height: 56,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#D1D1D6',
        borderStyle: 'solid',
        maxWidth: 500,
        flexDirection: 'row',
        overflow: 'hidden',
        paddingHorizontal: 16,
        paddingVertical: 8,
        alignItems: 'center'
    },
    input: {
        flex: 1,
        fontSize: 16,
        fontWeight: '500',
        minHeight: 30,
        textAlignVertical: 'center',
        margin:'auto',
        flexDirection:'row',
        alignItems:'center'
    },
    smallText: {
        position: 'absolute',
        top: 0,
        left: 16
    }
})