import { Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { COLORS, FONTS, SHADOWS, SIZES } from '../constants'

export const CircleButton = ({ imgUrl, handlePress, ...props }) => {
  return (
    <TouchableOpacity style={{
        width: props.width ? props.width : 40,
        height: props.height ? props.height : 40,
        backgroundColor: COLORS.white,
        position: 'absolute',
        borderRadius: SIZES.extraLarge,
        alignItems: 'center',
        justifyContent: 'center',
        ...SHADOWS.light,
        ...props
    }}
    onPress={handlePress}>
        <Image source={imgUrl}
        resizeMode='contain'
        style={{ width: 24, height: 24 }} />
    </TouchableOpacity>
  )
}

export const RectangularButton = ({ title, minWidth, fontSize, handlePress, ...props }) => {
    return (
      <TouchableOpacity 
        style={{
        borderRadius: SIZES.medium,
        backgroundColor: COLORS.primary,
        minWidth: minWidth,
        padding: SIZES.small,
        ...props
    }}
    onPress={handlePress}>
        <Text
          style={{
            fontFamily: FONTS.semiBold,
            fontSize: fontSize,
            color: COLORS.white,
            textAlign: 'center'
          }}>
          { title }
        </Text>
    </TouchableOpacity>
    )
  }