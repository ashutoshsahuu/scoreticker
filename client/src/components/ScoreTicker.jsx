import React, { useContext, useEffect, useState } from 'react'
import { MatchContext } from '../context/MatchDataContext';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { BaseURLMatch } from '../utils/BaseURL';

const ScoreTicker = ({ matchData }) => {

    // const { matchData } = useContext(MatchContext)
    // console.log(matchData.matches)
    const formatName = (name) => {
        // const parts = name.split(' ');
        // if (parts.length > 1) {
        //     return `${parts[0]} ${parts[1][0]}.`;
        // }
        return name;
    };

    const { id } = useParams();

    const [matchDataFromID, setMatchDataFromID] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchMatchData = async () => {
            try {
                const response = await axios.get(`${BaseURLMatch}/${id}`);
                setMatchDataFromID(response.data.match);
            } catch (err) {
                setError(err.response ? err.response.data.message : 'Error fetching match data');
            } finally {
                setLoading(false);
            }
        };

        fetchMatchData();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error} {id}</div>;
    console.log(matchDataFromID.innings[0].teamBatsmen[0].onStrike)
    console.log(matchDataFromID.team1.logo)


    return (

        <div className='flex items-center justify-evenly gap-4 bg-slate-50 rounded-[50px] px-8 py-2 bg-gradient-to-b from-white to-zinc-200 shadow-xl'>
            <div>
                <img
                    className="w-20 h-16 object-contain"
                    src={matchDataFromID.team1.logo}
                    alt="Team Logo"
                />
            </div>
            <div className='w-[250px] text-xl'>
                <div className='flex justify-between'>
                    <h4> {formatName(matchDataFromID.innings[0].teamBatsmen[0].name)}
                        {matchDataFromID.innings[0].teamBatsmen[0].onStrike ? <span className='text-red-700 text-2xl ml-1'>*</span> : null} </h4>
                    <p className='font-bold'>24(8)</p>
                </div>
                <div className='flex justify-between'>
                    <h4>{formatName(matchDataFromID.innings[0].teamBatsmen[1].name)} {matchDataFromID.innings[0].teamBatsmen[2].onStrike ? <span className='text-red-700 text-2xl'>*</span> : null}</h4>
                    <p className=' font-bold'>2(4)</p>
                </div>
            </div>
            <div className=' bg-violet-950 rounded-xl text-white overflow-hidden'>
                <div className='flex gap-2 px-10 py-2 items-center justify-between border-b-2 border-white pb-2 bg-gradient-to-b from-sky-500 to-indigo-500'>
                    <p>{matchDataFromID.team1.name}</p>
                    <div className='flex items-end bg-gradient-to-b from-fuchsia-500 to-pink-500  px-3 rounded-lg '>
                        <p className='text-2xl font-semibold'>{matchDataFromID.innings[0].teamScore} - {matchDataFromID.innings[0].teamWickets}</p>
                        <span className='text-md ml-3'>2.1({matchDataFromID.overs})</span>
                    </div>
                    <p>{matchDataFromID.team2.name}</p>
                </div>
                <div className='text-center my-1'>
                    Run Rate: 6.5
                </div>
            </div>
            <div className=''>
                <div className='flex justify-between items-end min-w-[250px]'>
                    <h4 className='text-xl'>
                        {formatName(matchDataFromID.innings[0].teamBowlers[0].name)}
                    </h4>
                    <div className='flex gap-2 font-bold'>
                        <p>
                            <span>20</span>
                            -
                            <span>0</span>
                        </p>
                        <span>(1.3)</span>
                    </div>
                </div>
                <div className="flex mt-2 text-sm font-medium gap-2">
                    <div className="w-7 h-7 bg-indigo-800 text-white flex justify-center items-center rounded-full">2</div>
                    <div className="w-7 h-7 bg-indigo-800 text-white flex justify-center items-center rounded-full">4LB</div>
                    <div className="w-7 h-7 bg-indigo-800 text-white flex justify-center items-center rounded-full">0</div>
                    <div className="w-7 h-7 bg-red-600 text-white flex justify-center items-center rounded-full">W</div>
                    <div className="w-7 h-7 bg-purple-600 text-white flex justify-center items-center rounded-full">4</div>
                    <div className="w-7 h-7 bg-blue-600 text-white flex justify-center items-center rounded-full">6</div>
                </div>
            </div>
            <div>
                <p className='text-2xl font-semibold'>4.5</p>
            </div>
        </div>
    )
}

export default ScoreTicker