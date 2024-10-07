import Match from "../models/match.model.js";


export const getMatchHistory = async (req, res) => {
    try {
        const matches = await Match.find();
        return res.status(200).json({
            success: true,
            message: 'Matches fetched successfully',
            matches
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch matches',
            error: error.message
        });
    }
};

export const createMatch = async (req, res) => {
    try {
        const {
            team1,
            team2,
            venue,
            tournamentName,
            tossWinner,
            optedFor,
            overs,
            team1Players,
            team2Players,
            striker,
            nonStriker,
            currBowler,
        } = req.body;

        // Prepare team1 players (as batsmen)
        const team1Batsmen = team1Players.map(name => ({
            name: name,
            runs: 0,
            ballsFaced: 0,
            fours: 0,
            sixes: 0,
            strikeRate: 0,
            isOut: false,
            dismissal: {
                by: "",
                type: "",
                fielder: ""
            },
            onStrike: false
        }));

        // Prepare team2 players (as bowlers)
        const team2Bowlers = team2Players.map(name => ({
            name: name,
            overs: 0,
            maidenOvers: 0,
            runsGiven: 0,
            wicketsTaken: 0,
            economyRate: 0
        }));

        // Prepare the first inning schema, where team1 is batting and team2 is bowling
        const firstInning = {
            inningNumber: 1,
            teamBatsmen: team1Batsmen,   // team1 players as batsmen
            teamBowlers: team2Bowlers,   // team2 players as bowlers
            teamScore: 0,
            teamWickets: 0,
            teamExtras: {
                wides: 0,
                noBalls: 0,
                byes: 0,
                legByes: 0
            },
            oversDetails: [], // Overs will be updated as the match progresses
            striker,
            nonStriker,
            currBowler
        };

        // Initialize the match
        const newMatch = new Match({
            team1,
            team2,
            venue,
            tournamentName,
            tossWinner,
            optedFor,
            overs,
            innings: [firstInning], // Add only the first inning initially
            currentInning: 1, // Current inning is 1
            matchResult: '' // Will be updated after match ends
        });

        // Save the match to the database
        const savedMatch = await newMatch.save();

        return res.status(201).json({
            success: true,
            message: 'Match created successfully',
            match: savedMatch
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Failed to create match',
            error: error.message
        });
    }
};

export const getMatchDetails = async (req, res) => {
    try {

        const { matchId } = req.params;
        const match = await Match.findById(matchId);

        if (!match) {
            return res.status(404).json({
                success: false,
                message: 'Match not found'
            });
        }
        return res.status(200).json({
            success: true,
            message: 'Match details fetched successfully',
            match
        });
    } catch (error) {

        return res.status(500).json({
            success: false,
            message: 'Failed to fetch match details',
            error: error.message
        });
    }
};

export const startSecondInning = async (req, res) => {
    try {
        const { matchId } = req.params;

        // Find the match by ID
        const match = await Match.findById(matchId);

        if (!match) {
            return res.status(404).json({
                success: false,
                message: 'Match not found'
            });
        }

        // Check if the first inning is over (e.g., all overs bowled or all wickets down)
        const firstInning = match.innings[0];
        const isFirstInningOver = firstInning.teamWickets === 10 || firstInning.oversDetails.length >= match.overs;

        if (!isFirstInningOver) {
            return res.status(400).json({
                success: false,
                message: 'First inning is not yet over'
            });
        }

        // Ensure teamBowlers and teamBatsman are available
        if (!firstInning.teamBowlers || !firstInning.teamBatsmen) {
            return res.status(400).json({
                success: false,
                message: 'First inning data is incomplete'
            });
        }

        // Prepare team2 as batsmen for second inning
        const team2Batsmen = firstInning.teamBowlers.map(player => ({
            name: player.name,
            runs: 0,
            ballsFaced: 0,
            fours: 0,
            sixes: 0,
            strikeRate: 0,
            isOut: false,
            dismissal: {
                by: "",
                type: "",
                fielder: ""
            },
            onStrike: false
        }));

        // Prepare team1 as bowlers for second inning
        const team1Bowlers = firstInning.teamBatsmen.map(player => ({
            name: player.name,
            overs: 0,
            maidenOvers: 0,
            runsGiven: 0,
            wicketsTaken: 0,
            economyRate: 0
        }));

        // Create second inning
        const secondInning = {
            inningNumber: 2,
            teamBatsmen: team2Batsmen,   // team2 players as batsmen
            teamBowlers: team1Bowlers,   // team1 players as bowlers
            teamScore: 0,
            teamWickets: 0,
            teamExtras: {
                wides: 0,
                noBalls: 0,
                byes: 0,
                legByes: 0
            },
            oversDetails: [], // New overs for second inning
            striker: team2Batsmen[0]?.name,       // Set a new striker from team2
            nonStriker: team2Batsmen[1]?.name,    // Set a new non-striker from team2
            currBowler: team1Bowlers[0]?.name     // Set the first bowler from team1
        };

        // Add second inning to the match
        match.innings.push(secondInning);
        match.currentInning = 2;

        // Save the updated match
        const updatedMatch = await match.save();

        return res.status(200).json({
            success: true,
            message: 'Second inning started successfully',
            match: updatedMatch
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Failed to start second inning',
            error: error.message,
        });
    }
};




export const updateMatchScore = async (req, res) => {

};
