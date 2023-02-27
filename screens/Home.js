import React, { useEffect, useState } from 'react'
import { View, SafeAreaView, FlatList, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { COLORS, assets } from '../constants';
import { Card, FocusedStatusBar, HomeHeader, CircleButton } from "../components";
import { useStateContext } from '../context/ContextProvider';

const Home = () => {
    const { openAlert, startLoad, stopLoad } = useStateContext();
    const navigation = useNavigation();

    const [dataList, setDataList] = useState([]);
    const [pagination, setPagination] = useState(1);

    useEffect(() => {
        fetchDataList()
    }, [])

    const handleInfiniteScrolling = () => {
        if (dataList && dataList.length < pagination * 10 ) {
            console.log('Un altro giro!')
        }
    }

    const fetchDataList = async () => {
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
                setDataList(result.data.reverse());
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
                    <FlatList data={dataList} 
                        renderItem={({ item }) => <Card data={item} />} 
                        keyExtractor={(item) => item.id} 
                        showsVerticalScrollIndicator={false} 
                        ListHeaderComponent={<HomeHeader />} 
                        onEndReached={handleInfiniteScrolling}/>
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
            <CircleButton imgUrl={assets.add} bottom={10} left={20} width={50} height={50} handlePress={() => navigation.navigate('NewImage')} />
        </SafeAreaView>
    )
}

export default Home