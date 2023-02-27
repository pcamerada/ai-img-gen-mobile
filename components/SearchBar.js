import { View, TextInput, Image, TouchableOpacity } from 'react-native';
import { assets, COLORS, SIZES } from '../constants';
import { useStateContext } from '../context/ContextProvider';

const SearchBar = () => {

    const { inputSearch, setInputSearch } = useStateContext();

    const handleSearch = (e) => {
        const text = e.nativeEvent.text
        setInputSearch(text)
    }

    const submitSearch = () => {
        console.log('FETCH:::', inputSearch)
    }

    return (
        <View style={{ marginTop: SIZES.font }}>
            <View style={{
                width: '100%',
                borderRadius: SIZES.font,
                backgroundColor: COLORS.gray,
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: SIZES.font,
                paddingVertical: SIZES.small -2
            }}>
                <TextInput style={{ flex: 1 }} multiline={true} numberOfLines={2}
                onChange={handleSearch} value={inputSearch}/>
                <TouchableOpacity onPress={submitSearch}>
                    <Image source={assets.search} resizeMode='contain'
                        style={{
                            width: 20, height: 20, marginLeft: SIZES.base
                        }} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default SearchBar