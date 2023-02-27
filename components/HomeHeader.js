import { View, TextInput, Image, Text } from 'react-native'
import { COLORS, FONTS, SIZES, assets } from '../constants';

import SearchBar from "./SearchBar";

const HomeHeader = () => {
    
    return (
        <View style={{
            padding: SIZES.font,
            backgroundColor: COLORS.primary
        }}>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <Image source={assets.logo} resizeMode='contain'
                    style={{
                        width: 90, height: 25
                    }}
                />
                <View style={{
                    width: 45, height: 45
                }}>
                    <View style={{ 
                        backgroundColor: 'white', width: '100%', height: '100%', 
                        borderRadius: 50, justifyContent: 'center', alignItems:'center'
                    }}>
                        <Text style={{
                            fontSize: SIZES.large, fontFamily: FONTS.bold
                        }}>PC</Text>
                    </View>
                    <Image source={assets.badge} resizeMode='contain' style={{ position:'absolute', width: 15, height: 15, bottom: 0, right: 0 }} />
                </View>
            </View>
            <View style={{marginVertical: SIZES.font}}>
                <Text style={{ fontFamily: FONTS.regular, fontSize: SIZES.small, color: COLORS.white }}>Hello buddy!</Text>
                <Text style={{ fontFamily: FONTS.bold, fontSize: SIZES.large, color: COLORS.white, marginTop: SIZES.base / 2 }}>Let's find a nice piece of art</Text>
            </View>
            <SearchBar />
        </View>
    )
}

export default HomeHeader