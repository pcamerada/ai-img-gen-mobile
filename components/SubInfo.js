import { View, Text } from 'react-native'
import React from 'react'
import { COLORS, FONTS, SIZES } from '../constants'

const SubInfo = ({ item }) => {
  return (
    <View style={{
        width: '100%',
        minHeight: SIZES.extraLarge,
        paddingHorizontal: SIZES.font,
        paddingVertical: SIZES.base,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }}>
        <View style={{
            maxWidth: '80%'
        }}>
            <Text numberOfLines={2} >{ item.prompt }</Text>
        </View>
        <View style={{
            marginTop: -SIZES.medium,
            paddingHorizontal: SIZES.small,
            paddingVertical: SIZES.base,
            backgroundColor: COLORS.white,
            borderRadius: 5,
            width: 70,
        }}>
            <Text numberOfLines={2}
                style={{
                    fontSize: SIZES.small,
                    color: COLORS.primary
                }}>{ item.name }</Text>
        </View>
    </View>
  )
}

export default SubInfo