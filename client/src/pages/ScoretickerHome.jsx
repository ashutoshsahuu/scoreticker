import React from "react";
import close from '/images/close.svg'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BaseURLMatch } from "../utils/BaseURL";
import toast from "react-hot-toast";

const ScoretickerHome = ({ showCreateModel, setShowCreateModel }) => {

    // const navigate = Navigate();
    const navigate = useNavigate();

    const [Teams, setTeams] = React.useState({
        host: "Host Team",
        visitor: "Visitor Team",
    });

    const [tournament, setTournament] = React.useState({
        name: "",
        location: "",
    });

    const [teamLogo, setTeamLogo] = React.useState({
        host: "",
        visitor: "",
    });

    const [striker, setStriker] = React.useState(null);
    const [nonStriker, setNonStriker] = React.useState(null);
    const [bowler, setBowler] = React.useState(null);


    const [tossWonBy, setTossWonBy] = React.useState(null);

    const [choose, setChoose] = React.useState({
        bat: false,
        bowl: false,
    });

    const [overs, setOvers] = React.useState(20);

    const [hostPlayers, setHostPlayers] = React.useState([
        "Player 1",
        "Player 2",
        "Player 3",
        "Player 4",
        "Player 5",
        "Player 6",
        "Player 7",
        "Player 8",
        "Player 9",
        "Player 10",
        "Player 11",
    ]);

    const [visitorPlayers, setVisitorPlayers] = React.useState([
        "Player 1",
        "Player 2",
        "Player 3",
        "Player 4",
        "Player 5",
        "Player 6",
        "Player 7",
        "Player 8",
        "Player 9",
        "Player 10",
        "Player 11",
    ]);

    const ModelClose = () => {
        setShowCreateModel(false)
    }

    const handleTeamChange = (teamType, value) => {
        setTeams(prev => ({ ...prev, [teamType]: value }));
    };

    const handleTossChange = (team) => {
        setTossWonBy(team);
    };

    const handlePlayerChange = (team, index, value) => {
        const updatedPlayers = [...team];
        updatedPlayers[index] = value;
        return updatedPlayers;
    };

    const handleChoiceChange = (choice) => {
        setChoose(choice);
    };

    const matchStartHandler = async () => {
        // setShowCreateModel(false);

        // Check if required fields are filled
        // if (!Teams.host || !Teams.visitor || !tournament.name || !tournament.location || !tossWonBy || !choose.bat && !choose.bowl || !overs ) {
        //     console.error("Please fill all the required fields");
        //     return;
        // }

        const newMatchData = {
            team1: {
                name: Teams.host,
                // logo: teamLogo.host,  // Handle logo upload separately if needed
            },
            team2: {
                name: Teams.visitor,
                // logo: teamLogo.visitor, // Handle logo upload separately if needed
            },
            tournamentName: tournament.name,
            venue: tournament.location,
            tossWinner: tossWonBy,
            optedFor: choose.bat ? 'bat' : 'bowl',
            overs: overs,
            team1Players: hostPlayers,
            team2Players: visitorPlayers,
            striker,
            nonStriker,
            currBowler: bowler,
        };

        console.log("Match Data:", newMatchData);

        try {
            const response = await axios.post(`http://localhost:3000/api/match/createMatch`, newMatchData);
            console.log("Match Created:", response.data);
            console.log("Match ID:", response.data.match._id);
            navigate(`/score-updater/${response.data.match._id}`);
            // navigate('/score-updater');
            toast.success("Match created successfully")
        } catch (error) {
            console.error("Failed to create match:", error.message);
            toast.error(error.message);
        }
    };



    const renderPlayerInputs = (team, setTeam) =>
        team.map((player, idx) => (
            <input
                key={idx}
                type="text"
                placeholder={`Player ${idx + 1}`}
                className="border-gray-200 border-2 outline-none focus:border-blue-800 focus:border-b-2 rounded-md mb-2 p-1"
                // value={player}
                onChange={(e) => setTeam(handlePlayerChange(team, idx, e.target.value))}
            />
        ));

    return (
        <main className="my-10 w-[80%] mx-auto bg-neutral-100 p-6 rounded relative ">

            <div className="flex gap-6">
                <div className="flex-1">

                    <h3 className="text-2xl font-semibold mb-2">Tournamnet Name</h3>
                    <div className="bg-white p-4 rounded-md mb-4 shadow-md">
                        <input
                            onChange={(e) => setTournament({ ...tournament, name: e.target.value })}
                            type="text"
                            className="border-gray-200 w-full border-2 outline-none focus:border-blue-800 focus:border-b-2 rounded-md  p-1"
                            placeholder="Indian Premier League"
                        />
                    </div>
                </div>
                <div className="flex-1">
                    <h3 className="text-2xl font-semibold mb-2">Location</h3>
                    <div className="bg-white p-4 rounded-md mb-4 shadow-md">
                        <input
                            onChange={(e) => setTournament({ ...tournament, location: e.target.value })}
                            type="text"
                            className="border-gray-200 w-full border-2 outline-none focus:border-blue-800 focus:border-b-2 rounded-md  p-1"
                            placeholder="Mumbai"
                        />
                    </div>
                </div>
            </div>

            <div className="flex gap-6 mb-2">
                <div className="flex-1">
                    <h3 className="text-2xl font-semibold mb-2">Teams</h3>
                    <div className="bg-white flex  gap-2 p-4 rounded-md mb-4 shadow-md">
                        {["host", "visitor"].map((teamType) => (
                            <input
                                key={teamType}
                                type="text"
                                className="border-gray-200 flex-1 border-2 outline-none focus:border-blue-800 focus:border-b-2 rounded-md p-1"
                                placeholder={`${teamType.charAt(0).toUpperCase() + teamType.slice(1)} Team`}
                                // value={Teams[teamType]}
                                onChange={(e) => handleTeamChange(teamType, e.target.value)}
                            />
                        ))}
                    </div>
                </div>

                <div className="flex-1">
                    <h3 className="text-2xl font-semibold mb-2">Toss won by?</h3>
                    <div className="bg-white p-4 rounded-md shadow-md flex gap-3">
                        {["host", "visitor"].map((team) => (
                            <div key={team} className="flex items-center justify-center gap-1 border-gray-200 border-2 py-1 px-6 rounded-md">
                                <input
                                    type="radio"
                                    id={team}
                                    name="toss"
                                    checked={tossWonBy === team}
                                    onChange={() => handleTossChange(team)}

                                />
                                <label htmlFor={team}>{Teams[team]}</label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex gap-6">

                <div className="flex-1 ">
                    <h3 className="text-2xl font-semibold mb-2">Choose to?</h3>
                    <div className="bg-white p-4 rounded-md shadow-md flex gap-3">
                        {["bat", "bowl"].map((choice) => (
                            <div key={choice} className="flex items-center justify-center gap-1 border-gray-200 border-2 py-1 px-6 rounded-md">
                                <input
                                    type="radio"
                                    id={choice}
                                    name="choose"
                                    checked={choose === choice}
                                    onChange={() => handleChoiceChange(choice)}
                                />
                                <label htmlFor={choice}>{choice.charAt(0).toUpperCase() + choice.slice(1)}</label>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex-1">
                    <h3 className=" text-2xl font-semibold mb-2">Overs</h3>
                    <div className="bg-white p-4 rounded-md mb-4 shadow-md">
                        <input
                            type="number"
                            className="border-gray-200 border-2 outline-none focus:border-blue-800 focus:border-b-2 rounded-md  p-1"
                            placeholder="20 or 50"
                            value={overs}
                            onChange={(e) => setOvers(e.target.value)}
                        />
                    </div>
                </div>

            </div>

            <section className="flex gap-6">
                {/* Host Players */}
                <div className="flex-1">
                    <h3 className="text-2xl font-semibold mb-2">Team Host Players</h3>
                    <div className="bg-white p-4 rounded-md shadow-md flex flex-col">
                        {renderPlayerInputs(hostPlayers, setHostPlayers)}
                    </div>
                </div>

                {/* Visitor Players */}
                <div className="flex-1">
                    <h3 className="text-2xl font-semibold mb-2">Team Visitor Players</h3>
                    <div className="bg-white p-4 rounded-md shadow-md flex flex-col ">
                        {renderPlayerInputs(visitorPlayers, setVisitorPlayers)}
                    </div>
                </div>

                <div className="flex-1">
                    <div className="">
                        <h3 className="text-1xl font-semibold my-1">Striker Name</h3>
                        <div className="bg-white p-4 rounded-md shadow-md flex flex-col">
                            <input
                                onChange={(e) => setStriker(e.target.value)}
                                type="text"
                                className="border-gray-200 border-2 outline-none focus:border-blue-800 focus:border-b-2 rounded-md p-1"

                            />
                        </div>
                    </div>
                    <div className="">
                        <h3 className="text-1xl font-semibold my-1">Non-striker Name</h3>
                        <div className="bg-white p-4 rounded-md shadow-md flex flex-col">
                            <input
                                onChange={(e) => setNonStriker(e.target.value)}
                                type="text"
                                className="border-gray-200 border-2 outline-none focus:border-blue-800 focus:border-b-2 rounded-md p-1"

                            />
                        </div>
                    </div>
                    <div className="">
                        <h3 className="text-1xl font-semibold my-1">Bowler Name</h3>
                        <div className="bg-white p-4 rounded-md shadow-md flex flex-col">
                            <input
                                onChange={(e) => setBowler(e.target.value)}
                                type="text"
                                className="border-gray-200 border-2 outline-none focus:border-blue-800 focus:border-b-2 rounded-md p-1"
                            />
                        </div>
                    </div>
                    <div>
                        <h3 className="text-1xl font-semibold my-1">Team Logos</h3>
                        <div className="flex gap-2 bg-white p-4 rounded-md shadow-md flex-col">
                            {["host", "visitor"].map((team) => (
                                <div key={team}>
                                    <input
                                        key={team}
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => setTeamLogo({ ...teamLogo, [team]: e.target.files[0] })}
                                        className="text-sm w-fit"
                                    />
                                    <label htmlFor={team}>{Teams[team]}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <button
                        className="bg-blue-800 mt-4 w-full text-white py-2 px-4 rounded-md hover:bg-blue-900"
                        onClick={matchStartHandler}>Save & Next

                    </button>
                </div>
            </section>
            <div>
                <button
                    onClick={ModelClose}
                    className="py-2 px-4 rounded-md absolute top-2 right-2 hover:bg-gray-200"
                >
                    <img src={close} alt="close" />
                </button>
            </div>
        </main>
    );
};

export default ScoretickerHome;
