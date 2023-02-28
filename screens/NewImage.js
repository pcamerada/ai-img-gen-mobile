import { Text, TextInput, View, Keyboard, Image, StatusBar, TouchableOpacity } from 'react-native';

import { COLORS, SIZES, SHADOWS, FONTS, assets } from "../constants";
import { FocusedStatusBar, RectangularButton, CircleButton } from "../components";

import { useState } from 'react';
import { useStateContext } from '../context/ContextProvider';

const NewImage = ({ navigation }) => {
  const { openAlert, startLoad, stopLoad } = useStateContext();
  const [inputPrompt, setInputPrompt] = useState('')
  const [image, setImage] = useState(null)

  const handleChangeInput = (e) => {
    const text = e.nativeEvent.text
    setInputPrompt(text)
  }

  const generateImage = async () => {
    Keyboard.dismiss()
    if (inputPrompt) {
      try {
        startLoad()
        const response = await fetch('http://192.168.1.6:8080/api/v1/dalle', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ prompt: inputPrompt })
        })
  
        const data = await response.json()
        setImage(`data:image/jpeg;base64,${data.image}`)
      } catch (error) {
        openAlert(error.message)
      } finally {
        stopLoad()
      }
    } else {
      openAlert('Please enter a prompt')
    }
  }

  const shareWithCommunity = async () => {
    console.log('fi')
    if (inputPrompt && image) {
      try {
        startLoad()
        const response = await fetch('http://192.168.1.6:8080/api/v1/post/upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ prompt: inputPrompt, photo: image, name: 'Current User' })
        })
  
        await response.json()
        navigation.goBack()
      } catch (error) {
        openAlert(error.message)
      } finally {
        stopLoad()
      }
    } else {
      openAlert('Please enter a prompt and generate the image')
    }    
  }

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.light_grey }}>
      <FocusedStatusBar 
        barStyle='dark-content'
        backgroundColor='transparent'
        transLucent={ true }
      />
      <View style={{
        paddingBottom: SIZES.extraLarge,
        marginTop: SIZES.base,
        opacity: 0.7,
        width: '100%',
        height: 370
      }}>
        <Image
          source={image ? {uri: image} : assets.preview}
          resizeMode='cover'
          style={{
            width: '100%', height: '100%'
          }}
        />
        <CircleButton
          imgUrl={assets.left}
          handlePress={() => navigation.goBack()}
          left={15}
          top={StatusBar.currentHeight + 10}
        />
      </View>
      <View style={{ marginTop: SIZES.base, marginHorizontal: SIZES.font }}>
        <View style={{
          padding: SIZES.base
        }}>
          <Text style={{
            fontFamily: FONTS.bold, paddingHorizontal: SIZES.base
          }}>Type any funny idea and see what image AI can generate. Don't like it? Try again!</Text>
        </View>
        <View style={{
            width: '100%',
            borderRadius: SIZES.font,
            backgroundColor: COLORS.primary,
            opacity: 0.7,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: SIZES.font,
            paddingVertical: SIZES.small -2,
            marginTop: SIZES.large
        }}>
            <TextInput style={{ flex: 1 }} multiline={true} numberOfLines={2}
              onChange={handleChangeInput} value={inputPrompt}/>
            <TouchableOpacity onPress={generateImage}>
                <Image source={assets.submit} resizeMode='contain'
                    style={{
                        width: 20, height: 20, marginLeft: SIZES.base
                    }} />
            </TouchableOpacity>
        </View>
      </View>
      <View style={{
        zIndex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: SIZES.font,
        marginTop: SIZES.extraLarge * 6,
        width: '100%'
      }}>
        <RectangularButton minWidth={170} fontSize={SIZES.large} {...SHADOWS.dark} title={'Share With the Community'} handlePress={shareWithCommunity}/>
      </View>
    </View>
  )
}

export default NewImage