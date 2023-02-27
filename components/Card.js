import { View, Image, Text } from 'react-native'
import { CircleButton } from "../components/Button";

import { COLORS, SIZES, SHADOWS, assets } from "../constants";

import { useStateContext } from '../context/ContextProvider';
import SubInfo from './SubInfo';

const Card = ({ data }) => {
    const { openAlert, setInputSearch } = useStateContext();

    const manageSearch = (imagePrompt) => {
        openAlert('Image prompt was copied on the search!')
        setInputSearch(imagePrompt)
    }

    return (
        <View style={{
            backgroundColor: COLORS.white,
            borderRadius: SIZES.font,
            marginBottom: SIZES.extraLarge,
            margin: SIZES.base,
            ...SHADOWS.dark
        }}>
            <View style={{
                width: '100%', height: 250
            }}>
                <Image source={{ uri: data.photo }}
                resizeMode='cover'
                style={{
                    width: '100%',
                    height: '100%',
                    borderTopRightRadius: SIZES.font,
                    borderTopLeftRadius: SIZES.font
                }} />
                <CircleButton imgUrl={assets.searchblack} right={10} top={10} handlePress={() => manageSearch(data.prompt)} />
            </View>
            <SubInfo item={ data }></SubInfo>
        </View>
    )
}

export default Card