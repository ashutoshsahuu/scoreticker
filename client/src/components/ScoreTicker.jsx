import React, { useContext, useEffect, useState } from 'react'
import { MatchContext } from '../context/MatchDataContext';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { BaseURLMatch, BaseURL } from '../utils/BaseURL';
import { io } from 'socket.io-client';
import toast from 'react-hot-toast';

const socket = io(`${BaseURL}`);

const ScoreTicker = () => {

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

    const [newMatchData, setNewMatchData] = useState({
        currentInning: 1,
        teamScore: 0,
        teamWickets: 0,
        teamExtras: {
            wides: 0,
            noBalls: 0,
            byes: 0,
            legByes: 0
        },
        oversDetails: [],
        striker: '',
        strikerRun: 0,
        strikerBallsFaced: 0,
        nonStriker: '',
        nonStrikerRun: 0,
        nonStrikerBallsFaced: 0,
        currBowler: '',
        bowlerRunConceded: 0,
        bowlerWickets: 0,
        bowlerOvers: 0,
        bowlerBalls: 0
    });



    useEffect(() => {
        const fetchMatchData = async () => {
            try {
                const response = await axios.get(`${BaseURLMatch}/${id}`);
                setMatchDataFromID(response.data.match);
                setNewMatchData({

                    currentInning: response.data.match.currentInning,
                    teamScore: response.data.match.innings[0].teamScore,
                    teamWickets: response.data.match.innings[0].teamWickets,
                    teamExtras: {
                        wides: response.data.match.innings[0].teamExtras.wides,
                        noBalls: response.data.match.innings[0].teamExtras.noBalls,
                        byes: response.data.match.innings[0].teamExtras.byes,
                        legByes: response.data.match.innings[0].teamExtras.legByes
                    },
                    oversDetails: response.data.match.innings[0].oversDetails,
                    striker: response.data.match.innings[0].striker,
                    strikerRun: response.data.match.innings[0].teamBatsmen[0].runs,
                    strikerBallsFaced: response.data.match.innings[0].teamBatsmen[0].ballsFaced,
                    nonStriker: response.data.match.innings[0].nonStriker,
                    nonStrikerRun: response.data.match.innings[0].teamBatsmen[1].runs,
                    nonStrikerBallsFaced: response.data.match.innings[0].teamBatsmen[1].ballsFaced,
                    currBowler: response.data.match.innings[0].currBowler,
                    bowlerRunConceded: response.data.match.innings[0].teamBowlers[10].runsGiven,
                    bowlerWickets: response.data.match.innings[0].teamBowlers[10].wickets,
                    bowlerOvers: response.data.match.innings[0].teamBowlers[10].overs,
                    bowlerBalls: response.data.match.innings[0].teamBowlers[10].ballBowled
                })
            } catch (err) {
                setError(err.response ? err.response.data.message : 'Error fetching match data');
                toast.error('Error fetching match data');
            } finally {
                setLoading(false);
            }
        };

        fetchMatchData();
    }, [id]);

    console.log(newMatchData)

    useEffect(() => {
        const handleMatchUpdated = (msg) => {
            console.log("Received score update:", msg);
            // setScore(prevScore => prevScore + parseInt(msg.run));
            // setStrikerRun(prevStrikerRun => prevStrikerRun + parseInt(msg.run));
            // setStrikerBalls(prevStrikerBalls => prevStrikerBalls + parseInt(msg.ballsFaced));

            setNewMatchData((prevMatchData) => ({
                ...prevMatchData,
                teamScore: prevMatchData.teamScore + parseInt(msg.run),
                strikerRun: prevMatchData.strikerRun + parseInt(msg.run),
                strikerBallsFaced: prevMatchData.strikerBallsFaced + parseInt(msg.ballsFaced),
            }));

        };

        socket.on('scoreUpdated', handleMatchUpdated);

        // Clean up the socket listener when the component unmounts
        return () => {
            socket.off('scoreUpdated', handleMatchUpdated);
        };

    }, []);




    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error} {id}</div>;
    // console.log(matchDataFromID.innings[0].teamBatsmen[0].onStrike)

    // console.log(score)
    // console.log(matchDataFromID)
    // console.log(strikerRun)


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
                    <p className='font-bold'>{newMatchData.strikerRun}({newMatchData.strikerBallsFaced})</p>
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
                        <p className='text-2xl font-semibold'>{newMatchData.teamScore} - {newMatchData.teamWickets}</p>
                        <span className='text-md ml-3'> {newMatchData.bowlerOvers}.{newMatchData.bowlerBalls}({matchDataFromID.overs})</span>
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
                        {formatName(newMatchData.currBowler)}
                    </h4>
                    <div className='flex gap-2 font-bold'>
                        <p>
                            <span>{newMatchData.bowlerRunConceded ? newMatchData.bowlerRunConceded : 0}</span>
                            -
                            <span>{newMatchData.bowlerWickets ? newMatchData.bowlerWickets : 0}</span>
                        </p>
                        <span>({newMatchData.bowlerBalls})</span>
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
                <p className='text-2xl font-semibold'>
                    {/* Show number of overs here and balls */}
                    {newMatchData.bowlerOvers}.{newMatchData.bowlerBalls}
                </p>
            </div>
        </div>
    )
}

export default ScoreTicker