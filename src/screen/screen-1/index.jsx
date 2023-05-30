import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { CText, CTouchable } from 'src/components';

const Screen = ()=>{
    const navigation = useNavigation()
    return(
        <View style={styles.container}>
            <CText>Screen1</CText>
            <CTouchable onPress={()=> navigation.navigate('modal1')}>
                <CText>modal1</CText>
            </CTouchable>
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