import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'
import { BaseURLMatch } from '../utils/BaseURL'

const initialState = {
    matches: [],
}

export const MatchContext = createContext(initialState)

export const MatchContextProvider = ({ children }) => {

    const [matchData, setMatchData] = useState(initialState)

    const getMatchHistory = async () => {
        try {
            const response = await axios.get(
                `${BaseURLMatch}/matchHistory`
            );
            setMatchData((prevState) => ({
                ...prevState,
                matches: response.data.matches,
            }));

        } catch (error) {
            console.error("Error fetching match history:", error);
        }
    }

    // console.log('this is context match data : ', matchData.matches);

    useEffect(() => {
        getMatchHistory();
    }, []);


    return (

        <MatchContext.Provider value={{ matchData, setMatchData }}>
            {children}
        </MatchContext.Provider>
    )
}

