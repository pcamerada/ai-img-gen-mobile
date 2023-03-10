import { useEffect, useState } from 'react'
import { View, SafeAreaView, FlatList, Text } from 'react-native'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { COLORS, assets, SIZES, FONTS } from '../constants';
import { Card, FocusedStatusBar, HomeHeader, CircleButton } from "../components";
import { useStateContext } from '../context/ContextProvider';

const Home = () => {
    const { openAlert, startLoad, stopLoad, imageList, setImageDataList, searching, setSearching } = useStateContext();
    const navigation = useNavigation();
    const isFocused = useIsFocused();

    const [pagination, setPagination] = useState(1);

    useEffect(() => {
        fetchDataList()
    }, [pagination,])

    useEffect(() => {
        if(isFocused) fetchDataList()
    }, [isFocused])

    const handleInfiniteScrolling = () => {
        if (!searching && imageList && imageList.length === pagination * 10 ) {
            setPagination(pagination+1)
        }
    }

    const fetchDataList = async () => {
        setSearching(false)
        startLoad();
        try {
            const response = await fetch(`http://192.168.1.6:8080/api/v1/post?page=${ pagination }`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            if(response.ok) {
                const result = await response.json();
                setImageDataList(prevData =>{
                    const newData = result.data.filter(item => !prevData.some(prevItem => prevItem._id === item._id));
                    return [...prevData, ...newData]
                });
            }
        } catch (error) {
            openAlert(error.message)
        } finally {
            stopLoad()
        }
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <FocusedStatusBar background={COLORS.primary} />

            <View style={{ flex: 1 }}>
                <View style={{ zIndex: 0}}>
                    { imageList ? (
                        <FlatList data={imageList} 
                            renderItem={({ item }) => <Card data={item} />} 
                            keyExtractor={(item) => item.id} 
                            showsVerticalScrollIndicator={false} 
                            ListHeaderComponent={<HomeHeader />} 
                            onEndReached={handleInfiniteScrolling}/>
                    ) : (
                        <>
                            <HomeHeader />
                            <View style={{
                                justifyContent: 'center', alignItems:'center'
                            }}>
                                <Text style={{
                                    color: COLORS.white, fontFamily: FONTS.bold,
                                    marginTop: SIZES.font
                                }}>No posts found</Text>
                            </View>
                        </>
                    )}
                </View>
                <View style={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    zIndex: -1
                }}>
                    <View style={{ height: 300, backgroundColor: COLORS.primary }} />
                    <View style={{ flex: 1, backgroundColor: COLORS.white }} />
                </View>
            </View>
            <CircleButton imgUrl={assets.add} bottom={10} right={20} width={50} height={50} handlePress={() => navigation.navigate('NewImage')} />
        </SafeAreaView>
    )
}

export default Home