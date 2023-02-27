import React, { createContext, useContext, useState } from 'react';

const StateContext = createContext({});

export const ContextProvider = ({ children }) => {
    const [showAlert, setShowAlert] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [alertMessage, setAlertMessage] = useState('')

    const [inputSearch, setInputSearch] = useState('')
    const [imageList, setImageList] = useState([])

    const openAlert = (message) => {
        setAlertMessage(message)
        setShowAlert(true)
    }

    const closeAlert = () => {
        setShowAlert(false)
        setAlertMessage('')
    }

    const startLoad = () => {
        setIsLoading(true)
    }

    const stopLoad = () => {
        setIsLoading(false)
    }

    const setImageDataList = (dataList) => {
        setImageList(dataList)
    }

    return (
        <StateContext.Provider
            value={{
                openAlert,
                closeAlert,
                alertMessage,
                showAlert,
                inputSearch, setInputSearch,
                isLoading, startLoad, stopLoad,
                imageList, setImageDataList
            }}
        >
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);