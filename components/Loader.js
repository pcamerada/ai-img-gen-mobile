import { ActivityIndicator, View } from 'react-native'
import React from 'react'
import { useStateContext } from '../context/ContextProvider';

const Loader = () => {
    const { isLoading } = useStateContext();

    return (
        <>
            {
                isLoading && (
                    <View style={{
                        width: '100%',
                        height: '100%',
                        position: 'absolute', 
                        backgroundColor: 'rgba(0, 0, 0, 0.6)',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <ActivityIndicator size="large" color="#001F2D" />
                    </View>
                )
            }
        </>
    )
}

export default Loader