import { StyleSheet } from 'react-native'

const basicTextStyle = {
    fontSize: 26,
    color: '#E5E5E5',
    paddingLeft: 10, 
    textShadowColor: '#000000',
    textShadowOffset: {width: 1, height: 2},
    textShadowRadius: 13
}

export default styles = StyleSheet.create({
    textStyle: basicTextStyle,
    buttonTextStyle: {...basicTextStyle, paddingLeft: 5},
    textInputStyle: {
        marginTop:10, 
        marginLeft: 5, 
        marginRight: 5, 
        color: '#404040',
        backgroundColor: '#eaeaea', 
        fontSize: 26,
        paddingLeft: 10, 
        paddingRight: 10, 
        borderRadius: 7
    },
    buttonStyle: {
        marginTop: 10, 
        marginLeft: 5, 
        width: 105, 
        backgroundColor: '#696969', 
        borderWidth: 1, 
        borderColor:'#696969', 
        borderRadius: 7
    },
    rootElementStyle: {
        marginLeft: 15, 
        marginRight: 15, 
        marginTop: 20, 
        backgroundColor: '#a0a0a0', 
        borderWidth: 2, 
        borderColor:'#696969', 
        borderRadius: 7, 
        paddingLeft: 10, 
        paddingRight: 10, 
        paddingBottom: 10
    }
})