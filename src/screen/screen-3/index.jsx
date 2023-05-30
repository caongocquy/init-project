import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { CText } from 'src/components';

const Screen = ()=>{
    return(
        <View style={styles.container}>
            <CText>Screen3</CText>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
export default Screen