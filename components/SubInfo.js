import { View, Text, TouchableOpacity } from 'react-native'
import { COLORS, SIZES } from '../constants'
import { useStateContext } from '../context/ContextProvider';

const SubInfo = ({ item }) => {

    const { openAlert, setInputSearch } = useStateContext();

    const handleFilterByAuthor = () => {
        setInputSearch(item.name)
        openAlert('Image author was copied on the search!')
    }

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
            <TouchableOpacity onPress={handleFilterByAuthor}>
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
            </TouchableOpacity>
        </View>
    )
}

export default SubInfo