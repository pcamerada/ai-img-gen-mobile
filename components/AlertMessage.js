import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { COLORS } from '../constants';

import { useStateContext } from '../context/ContextProvider';

const AlertMessage = () => {

    const { alertMessage, showAlert, closeAlert } = useStateContext();

    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const timer = setTimeout(() => {
            fadeOut()
            handleCloseAlert()
        }, 4500);
        return () => clearTimeout(timer);
    });

    useEffect(() => {
        if (showAlert) {
            fadeIn()
        } else {
            fadeOut()
        }
    }, [showAlert])

    const handleCloseAlert = () => {
        const timer = setTimeout(() => {
            closeAlert()
        }, 500);
        return () => clearTimeout(timer);
    }

    const fadeIn = () => {
        Animated.timing(fadeAnim, {
        toValue: 0.7,
        duration: 500,
        useNativeDriver: true,
        }).start();
    };

    const fadeOut = () => {
        Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
        }).start();
    };

    if (!showAlert) {
        return null;
    }

    return (
        <Animated.View style={[styles.container, {opacity: fadeAnim}]}>
        <Text style={styles.message}>{alertMessage}</Text>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 100,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignSelf: 'center',
  },
  message: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center'
  },
});

export default AlertMessage;