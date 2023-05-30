import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { CText, CTouchable } from 'src/components';

const Modal = ()=>{
    const navigation = useNavigation()
    return(
        <View style={styles.container}>
            <CText>Modal1</CText>
            <CTouchable onPress={()=>navigation.goBack()}>
                <CText>BACK</CText>
            </CTouchable>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    }
})
export default Modal