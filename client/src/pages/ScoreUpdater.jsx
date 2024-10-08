import React, { useEffect, useState } from "react";
import ScoreTicker from "../components/ScoreTicker";
import Scoreboard from "../components/ScoreboardBatter";
import edit from "/images/edit.svg";
import del from "/images/delete.svg";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BaseURLMatch, BaseURL } from "../utils/BaseURL";
import { formatName } from "../utils/NameFormatter";
import { toast } from "react-hot-toast";

import { io } from "socket.io-client";

const socket = io(`${BaseURL}`);

const ScoreUpdater = () => {
    const { id } = useParams();

    const [matchData, setMatchData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [run, setRun] = useState(0);
    const [desc, setDesc] = useState("");

    const [nextBatsman, setNextBatsman] = useState("");
    const [nextBowler, setNextBowler] = useState("");

    const [currentBowler, setCurrentBowler] = useState({
        name: "",
        id: "",
    });

    const [currentBatsman, setCurrentBatsman] = useState({
        name: "",
        id: "",
    })



    const updateScore = (runString) => {
        if (runString === "") return;

        const run = parseInt(runString);

        if (isNaN(run)) return;

        switch (run) {
            case 1:
                setRun((prev) => prev + run);
                break;
            case 2:
                setRun((prev) => prev + run);
                break;
            case 3:
                setRun((prev) => prev + run);
                break;
            case 4:
                setRun((prev) => prev + run);
                break;
            case 5:
                setRun((prev) => prev + run);
                break;
            case 6:
                setRun((prev) => prev + run);
                break;
            case 7:
                setRun((prev) => prev + run);
                break;
        }

        // MatchScoreUpdater(run);
    };

    useEffect(() => {
        const fetchMatchData = async () => {
            try {
                const response = await axios.get(`${BaseURLMatch}/${id}`);
                setMatchData(response.data.match);
                setRun(response.data.match.innings[0].teamScore);
                setCurrentBowler({
                    name: response.data.match.innings[0].teamBowlers[10].name,
                    id: response.data.match.innings[0].teamBowlers[10]._id,
                });
                setCurrentBatsman({
                    name: response.data.match.innings[0].teamBatsmen[0].name,
                    id: response.data.match.innings[0].teamBatsmen[0]._id,
                });
            } catch (err) {
                setError(
                    err.response ? err.response.data.message : "Error fetching match data"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchMatchData();

    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error)
        return (
            <div>
                Error: {error} {id}
            </div>
        );

    socket.on("scoreUpdated", (msg) => {
        updateScore(parseInt(msg.run));
    });

    // console.log(matchData.team1Players[0].name);
    // console.log(matchData.innings[0].teamBatsmen[0].name);

    const isFirstInningOver = (inning) => {
        return (
            inning.teamWickets === 10 || inning.oversDetails.length >= matchData.overs
        );
    };

    const handleStartSecondInning = async () => {
        try {
            const response = await axios.post(
                `/api/matches/${id}/start-second-inning`
            );
            setMatch(response.data.match); // Update match with second inning details
        } catch (err) {
            console.error("Failed to start second inning", err);
        }
    };

    console.log(matchData.currentInning)
    const currentInning = matchData.innings[matchData.currentInning - 1];

    return (
        <main className="my-6 relative">
            <div className=" bg-white p-6 rounded-lg">
                <ScoreTicker matchData={matchData} />
            </div>
            <div className="flex gap-4 items-start">
                <div className="w-[60%]">
                    <table className="min-w-full bg-white shadow-md rounded-lg mt-4 overflow-hidden">
                        <thead className="bg-blue-100">
                            <tr>
                                <th className="text-left px-4 py-2 border-l-0 border-r-0">
                                    Batsman
                                </th>
                                <th className="text-center px-2 py-2 border-l-0 border-r-0">
                                    R
                                </th>
                                <th className="text-center px-2 py-2 border-l-0 border-r-0">
                                    B
                                </th>
                                <th className="text-center px-2 py-2 border-l-0 border-r-0">
                                    4s
                                </th>
                                <th className="text-center px-2 py-2 border-l-0 border-r-0">
                                    6s
                                </th>
                                <th className="text-center px-2 py-2 border-l-0 border-r-0">
                                    SR
                                </th>
                                <th className="text-center px-2 py-2 border-l-0 border-r-0">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {matchData.innings[0].teamBatsmen.map((player, index) => (
                                <tr key={index}>
                                    <td className="border-t px-4 py-2 border-l-0 border-r-0">
                                        <p>{player.name}</p>
                                        <span className="text-sm text-gray-500">
                                            {player.isOut
                                                ? "Out"
                                                : player.onStrike
                                                    ? "Not Out"
                                                    : "Yet to Bat"}
                                        </span>
                                    </td>
                                    <td className="border-t text-center border-l-0 border-r-0">
                                        {player.runs}
                                    </td>
                                    <td className="border-t text-center border-l-0 border-r-0">
                                        {player.ballsFaced}
                                    </td>
                                    <td className="border-t text-center border-l-0 border-r-0">
                                        {player.fours}
                                    </td>
                                    <td className="border-t text-center border-l-0 border-r-0">
                                        {player.sixes}
                                    </td>
                                    <td className="border-t text-center border-l-0 border-r-0">
                                        {player.strikeRate}
                                    </td>
                                    <td className="border-t text-center border-l-0 border-r-0">
                                        <button
                                            onClick={() => editName(player._id)}
                                            className=" bg-green-200 rounded-md p-1 hover:bg-green-600 transition-all duration-150 ease-linear"
                                        >
                                            <img src={edit} alt="edit" />
                                        </button>
                                        {/* <button className=" bg-red-200 rounded-md p-1 ml-2 hover:bg-red-600 transition-all duration-150 ease-linear">
                                            <img src={del} alt="delete" />
                                        </button> */}
                                    </td>
                                </tr>
                            ))}

                            <tr className="font-semibold text-1xl">
                                <td className="border-t px-4 py-2 border-l-0 border-r-0">
                                    Extras
                                </td>
                                <td
                                    colSpan="6"
                                    className="border-t text-center text-sm border-l-0 border-r-0"
                                >
                                    0 B, 0 LB, 0 WD, 0 NB, 0 P
                                </td>
                            </tr>
                            <tr className="font-bold text-2xl">
                                <td className="border-t px-4 py-2 border-l-0 border-r-0">
                                    Total
                                </td>
                                <td
                                    colSpan="6"
                                    className="border-t text-center border-l-0 border-r-0"
                                >
                                    {matchData.innings[0].teamScore} - 4 ({matchData.overs})
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <table className="min-w-full bg-white shadow-md rounded-lg mt-4 overflow-hidden">
                        <thead className="bg-blue-100">
                            <tr>
                                <th className="text-left px-4 py-2 border-l-0 border-r-0">
                                    Bowler
                                </th>
                                <th className="text-center px-2 py-2 border-l-0 border-r-0">
                                    O
                                </th>
                                <th className="text-center px-2 py-2 border-l-0 border-r-0">
                                    M
                                </th>
                                <th className="text-center px-2 py-2 border-l-0 border-r-0">
                                    R
                                </th>
                                <th className="text-center px-2 py-2 border-l-0 border-r-0">
                                    W
                                </th>
                                <th className="text-center px-2 py-2 border-l-0 border-r-0">
                                    ER
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border-t px-4 py-2 border-l-0 border-r-0">Ss</td>
                                <td className="border-t text-center border-l-0 border-r-0">
                                    0.0
                                </td>
                                <td className="border-t text-center border-l-0 border-r-0">
                                    0
                                </td>
                                <td className="border-t text-center border-l-0 border-r-0">
                                    0
                                </td>
                                <td className="border-t text-center border-l-0 border-r-0">
                                    0
                                </td>
                                <td className="border-t text-center border-l-0 border-r-0">
                                    0.00
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className=" bg-white shadow-lg w-[40%] mt-4 rounded-lg p-4 ">
                    <div className="flex gap-3">
                        <div className="flex gap-1 ">
                            <input type="checkbox" />
                            <label htmlFor="checkbox">Wide</label>
                        </div>
                        <div className="flex gap-1">
                            <input type="checkbox" />
                            <label htmlFor="checkbox">No Ball</label>
                        </div>
                        <div className="flex gap-1">
                            <input type="checkbox" />
                            <label htmlFor="checkbox">Leg Bye</label>
                        </div>
                        <div className="flex gap-1">
                            <input type="checkbox" />
                            <label htmlFor="checkbox">Bye</label>
                        </div>
                    </div>
                    <div className="flex justify-center items-center gap-2">
                        <input
                            className="w-full border-2 outline-none border-gray-300 rounded-md p-2 mt-4 focus:border-blue-500"
                            type="text"
                            placeholder="Enter Match Description"
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                        />
                        <button className="p-2 bg-yellow-400 mt-4 rounded-md border-2 border-yellow-400">
                            Update
                        </button>
                    </div>
                    <div className="flex gap-3 flex-wrap mt-4">
                        {[0, 1, 2, 3, 4, 5, 6, 7].map((run, index) => {
                            return (
                                <button
                                    key={index}
                                    onClick={() =>
                                        socket.emit("update-score", {
                                            run: run.toString(),
                                            ballsFaced: 1,
                                            matchId: id,
                                            currentBowler: currentBowler,
                                            currentBatsman: currentBatsman,
                                        })
                                    }
                                    className="border-blue-500 border-2 px-5 py-1 rounded-md  text-xl hover:bg-blue-500 hover:text-white transition-all duration-200 ease-in-out"
                                >
                                    {run}
                                </button>
                            );
                        })}

                        <button className="border-blue-500 border-2 px-5 py-1 rounded-md  text-xl bg-blue-500 text-white transition-all duration-200 ease-in-out">
                            Undo
                        </button>
                        <button className="border-blue-500 border-2 px-5 py-1 rounded-md  text-xl bg-blue-500 text-white transition-all duration-200 ease-in-out">
                            Retire
                        </button>
                        <button className="border-blue-500 border-2 px-5 py-1 rounded-md  text-xl bg-blue-500 text-white transition-all duration-200 ease-in-out">
                            Swap Batsman
                        </button>
                        <div className=" border-2  border-gray-300 rounded-md p-2  focus:border-blue-500 flex flex-col">
                            <select
                                name=""
                                id=""
                                className="outline-none bg-zinc-200 p-1 rounded-md transition-all duration-200 ease-linear cursor-pointer"
                            >
                                <option value="Catch Out">Catch Out</option>
                                <option value="Bowled">Bowled</option>
                                <option value="Run Out striker">Run out striker</option>
                                <option value="Run Out non-triker">Run out non-Striker</option>
                                <option value="stumping">stumping</option>
                                <option value="LBW">LBW</option>
                                <option value="Hit-wicket">Hit wicket</option>
                            </select>
                            <button
                                className="
                            bg-blue-500 text-white rounded-md mt-2
                            "
                            >
                                Wicket
                            </button>
                        </div>
                        <div className=" border-2  border-gray-300 rounded-md p-2  focus:border-blue-500 flex flex-col">
                            <select
                                className="outline-none bg-zinc-200 p-1 rounded-md"
                                onChange={(e) => {
                                    setNextBatsman(e.target.value);
                                }}
                            >
                                {matchData.innings[0].teamBatsmen.map((player, index) => (
                                    <option
                                        value={player._id}
                                        key={index}
                                    >
                                        {
                                            // formatName(player.name)
                                            player.name
                                        }
                                    </option>
                                ))}
                            </select>
                            <button
                                onClick={() => console.log(nextBatsman)}
                                className="bg-blue-500 text-white rounded-md mt-2 px-4 hover:bg-blue-700"
                            >
                                Next Batsman
                            </button>
                        </div>
                        <div className=" border-2  border-gray-300 rounded-md p-2  focus:border-blue-500 flex flex-col">
                            <select
                                onChange={(e) => setNextBowler(e.target.value)}
                                className="outline-none bg-zinc-200 p-1 rounded-md"
                            >
                                {matchData.innings[0].teamBowlers.map((player, index) => (
                                    <option value={player._id} key={index}>
                                        {/* {formatName(player.name)} */}
                                        {player.name}
                                    </option>
                                ))}
                            </select>
                            <button
                                onClick={() => console.log(nextBowler)}
                                className="bg-blue-500 text-white rounded-md mt-2 px-4 hover:bg-blue-700"
                            >
                                Next Bowler
                            </button>
                        </div>
                    </div>
                    {matchData.currentInning === 1 && isFirstInningOver(currentInning) && (
                        <button onClick={handleStartSecondInning}>Start Second Inning</button>
                    )}
                </div>
            </div>
            {/* <Scoreboard /> */}
        </main>
    );
};

export default ScoreUpdater;
