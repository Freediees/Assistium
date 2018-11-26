import { StyleSheet } from 'react-native';

export const colors = {
    black: '#1a1917',
    gray: '#888888',
    background1: '#B721FF',
    background2: '#21D4FD'
};

export default StyleSheet.create({
    slider: {
        overflow: 'visible', // for custom animations
        borderRadius:30
        
    },
    sliderContentContainer: {
        paddingVertical: 10, // for custom animation
        borderRadius:30
    },
    paginationContainer: {
        paddingVertical: 3,
        backgroundColor:'#ecf0f1',
        height:50,
        borderTopLeftRadius:150,
        borderTopRightRadius:150,
        opacity:.8
    },
    paginationDot: {
        width: 15,
        height: 15,
        borderRadius: 30,
    }
});
