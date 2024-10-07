import React, { useContext, useEffect, useState } from "react";
import ScoretickerHome from "./ScoretickerHome";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BaseURLMatch } from "../utils/BaseURL";
import { MatchContext } from "../context/MatchDataContext";
import toast from "react-hot-toast";

const CreateMatch = () => {
    const [showCreateModel, setShowCreateModel] = useState(false);
    const [matchHistory, setMatchHistory] = useState([]);
    const [filteredMatches, setFilteredMatches] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [timeoutId, setTimeoutId] = useState(null);

    const navigate = useNavigate();

    const { matchData } = useContext(MatchContext);

    const handleCreateMatch = () => {
        setShowCreateModel(true);
    };

    // const getMatchHistory = async () => {
    //     try {
    //         const response = await axios.get(
    //             `${BaseURLMatch}/matchHistory`
    //         );
    //         setMatchHistory(response.data.matches);
    //         setMatchData((prevState) => ({
    //             ...prevState,
    //             matches: response.data.matches,
    //         }));

    //     } catch (error) {
    //         console.error("Error fetching match history:", error);
    //     }
    //     setFilteredMatches(matchData.matches);
    // };


    useEffect(() => {
        setFilteredMatches(matchData.matches);
        setMatchHistory(matchData.matches);
    }, [matchData]);

    // console.log('this is context match data : ', matchData.matches);
    // console.log('this is not match data : ', filteredMatches);


    const handleScoreUpdate = (matchID) => {
        console.log(matchID);
        navigate(`/score-updater/${matchID}`);
        toast.success("Redirected to Score Updater", {
            position: "bottom-right"
        });
    };

    const handleSearch = (value) => {
        setSearchTerm(value);

        if (timeoutId) clearTimeout(timeoutId);

        const newTimeoutId = setTimeout(() => {
            const lowercasedSearchTerm = value.toLowerCase();
            const filtered = matchHistory.filter((match) =>
                match.tournamentName.toLowerCase().includes(lowercasedSearchTerm) ||
                match.venue.toLowerCase().includes(lowercasedSearchTerm) ||
                match.team1.name.toLowerCase().includes(lowercasedSearchTerm) ||
                match.team2.name.toLowerCase().includes(lowercasedSearchTerm)
            );
            setFilteredMatches(filtered);
        }, 500);

        setTimeoutId(newTimeoutId);
    };

    return (
        <main className="flex">
            <aside className="w-[15%] bg-gray-200 min-h-[100vh]">
                <div className="py-4 flex justify-center items-center">
                    <button
                        onClick={handleCreateMatch}
                        className=" bg-indigo-600 px-4 py-2 rounded-md text-white font-semibold hover:bg-indigo-900"
                    >
                        Create Match
                    </button>
                </div>
            </aside>
            <section className="w-[80%] ml-4">
                <div>
                    <h2 className="text-4xl font-semibold py-2">Match history</h2>
                </div>

                <div className="my-2">
                    <input
                        type="text"
                        className=" w-full border-2 outline-none border-gray-300 rounded-md p-2 focus:border-blue-500"
                        placeholder="Search by Tournament , Location , Team Name"
                        value={searchTerm}
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                </div>

                <div className="flex gap-6">
                    {Array.isArray(filteredMatches) && filteredMatches.length > 0 ? (
                        filteredMatches.map((match) => (
                            <div
                                key={match._id}
                                className="bg-white p-6 rounded-lg shadow-2xl transition transform  hover:shadow-3xl flex flex-col gap-4"
                            >
                                <div className="flex justify-between items-center">
                                    <div className="flex flex-col items-center gap-2">
                                        <img
                                            src={match.team1.logo}
                                            alt={match.team1.name}
                                            className="w-16 h-16 object-contain rounded-full border-2 border-gray-300"
                                        />
                                        <p className="text-2xl font-bold">{match.team1.name}</p>
                                    </div>
                                    <p className="text-lg font-semibold text-gray-500">VS</p>
                                    <div className="flex flex-col items-center gap-2">
                                        <img
                                            src={match.team2.logo}
                                            alt={match.team2.name}
                                            className="w-12 h-12 object-cover rounded-full border-2 border-gray-300"
                                        />
                                        <p className="text-2xl font-bold">{match.team2.name}</p>
                                    </div>
                                </div>

                                <div className="flex flex-col justify-between items-center">
                                    <p className="text-lg text-indigo-500 font-semibold">
                                        {match.tournamentName}
                                    </p>
                                    <p className="text-gray-400 italic">{match.venue}</p>
                                </div>

                                <p className="text-sm text-gray-600">
                                    Toss won by{" "}
                                    <span className="font-semibold">{match.tossWinner}</span>,
                                    opted to{" "}
                                    <span className="font-semibold">{match.optedFor}</span>.
                                </p>

                                <p className="text-gray-600">
                                    <span className="font-semibold">Overs:</span> {match.overs}
                                    {/* <span className="font-semibold">Inning:</span> {match.inning} */}
                                </p>

                                <button
                                    onClick={() => handleScoreUpdate(match._id)}
                                    className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-2 rounded-full text-white font-medium transition-all duration-200 ease-linear hover:bg-gradient-to-l mt-4 "
                                >
                                    View Scoreboard
                                </button>
                            </div>
                        ))
                    ) : (
                        <p>No match history available.</p>
                    )}
                </div>
            </section>

            <div
                className={`absolute top-10 left-0 w-[100%] bg-gray-900 bg-opacity-50 z-50 ${showCreateModel ? "block" : "hidden"
                    }`}
            >
                <ScoretickerHome
                    showCreateModel={showCreateModel}
                    setShowCreateModel={setShowCreateModel}
                />
            </div>
        </main>
    );
};

export default CreateMatch;
