import React, { useRef, useEffect } from 'react';
import { View, Text, Button, Animated, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/FontAwesome';
const Screen = () => {
    const navigation = useNavigation();
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(
            fadeAnim,
            {
                toValue: 1,
                duration: 3000,
                useNativeDriver: true,
            }
        ).start();
    }, [fadeAnim]);

    const navigateToHome = () => {
        navigation.navigate('HomeScreen');
    };

    return (
        <View style={styles.background}>
           
                <Animated.Image
                    source={require('/Users/nitish/QUOTE-OF-THE-DAY-APP/assets/four.png')} // Replace with the path to your image file
                    style={{ width: 250, height: 300, opacity: fadeAnim }} // Adjust the width and height as needed
                />
                <Animated.Text style={{ opacity: fadeAnim, fontSize: 24, marginTop: 20 }}></Animated.Text>

                <View style={styles.btn}>
                    

                    <Icon.Button name="star"   backgroundColor="#93B279" onPress={navigateToHome} >

                    Get Started
</Icon.Button>

                </View>
            {/* </LinearGradient> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    background: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'white',
    },
    btn: {
        marginTop: 50,
        borderRadius:30,
    
       
    },
    Lstbtn:{
        backgroundColor:'#93B279', 
    },
});

export default Screen;
