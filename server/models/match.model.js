import mongoose from "mongoose";

// Batsman Schema
const batsmanSchema = new mongoose.Schema({
    name: { type: String, required: false },
    runs: { type: Number, default: 0 },
    ballsFaced: { type: Number, default: 0 },
    fours: { type: Number, default: 0 },
    sixes: { type: Number, default: 0 },
    strikeRate: { type: Number, default: 0 },
    isOut: { type: Boolean, default: false },
    dismissal: {
        by: { type: String },
        type: { type: String },
        fielder: { type: String }
    },
    onStrike: { type: Boolean, default: false },
    onNonStrike: { type: Boolean, default: false },
    yetToBat: { type: Boolean, default: true }
});

// Bowler Schema
const bowlerSchema = new mongoose.Schema({
    name: { type: String, required: false },
    ballBowled: { type: Number, default: 0 },
    overs: { type: Number, default: 0 },
    maidenOvers: { type: Number, default: 0 },
    runsGiven: { type: Number, default: 0 },
    wicketsTaken: { type: Number, default: 0 },
    economyRate: { type: Number, default: 0 },
    isBowling: { type: Boolean, default: false }
});

// Over Schema
const overSchema = new mongoose.Schema({
    overNumber: { type: Number, required: true }, // Over number should be required
    bowlerName: { type: String, required: true },
    balls: [
        {
            ballNumber: { type: Number, required: true },
            runs: { type: Number, default: 0 },
            isWicket: { type: Boolean, default: false },
            bowler: { type: String, required: true },
            dismissal: {
                by: { type: String }, // e.g., Bowler, fielder
                type: { type: String }, // e.g., bowled, caught, etc.
                fielder: { type: String } // Fielder involved in the dismissal (if applicable)
            },
            extras: {
                isWide: { type: Boolean, default: false },
                isNoBall: { type: Boolean, default: false },
                isBye: { type: Boolean, default: false },
                isLegBye: { type: Boolean, default: false }
            }
        }
    ],
    extras: {
        wide: { type: Number, default: 0 },
        noBall: { type: Number, default: 0 },
        bye: { type: Number, default: 0 },
        legBye: { type: Number, default: 0 }
    }
});


// Inning Schema to store details of each inning
const inningSchema = new mongoose.Schema({
    inningNumber: { type: Number, required: true },
    teamBatsmen: [batsmanSchema],
    teamBowlers: [bowlerSchema],
    teamScore: { type: Number, default: 0 },
    teamWickets: { type: Number, default: 0 },
    teamExtras: {
        wides: { type: Number, default: 0 },
        noBalls: { type: Number, default: 0 },
        byes: { type: Number, default: 0 },
        legByes: { type: Number, default: 0 }
    },
    oversDetails: [overSchema],
    striker: { type: String, default: '' },
    nonStriker: { type: String, default: '' },
    currBowler: { type: String, default: '' }
});



// Main Match Schema
const matchSchema = new mongoose.Schema({
    team1: {
        name: { type: String, required: true },
        logo: { type: String, required: false, default: 'https://placehold.co/600x400?text=Team+Logo' }
    },
    team2: {
        name: { type: String, required: true },
        logo: { type: String, required: false, default: 'https://placehold.co/600x400?text=Team+Logo' }
    },

    venue: { type: String, required: true },
    tournamentName: { type: String, required: true },
    tossWinner: { type: String, required: true },
    optedFor: { type: String, required: true },
    overs: { type: Number, required: true },
    matchDescription: { type: String },

    innings: [inningSchema],
    currentInning: { type: Number, default: 1 },

    matchResult: { type: String }
}, { timestamps: true });

const Match = mongoose.model("Match", matchSchema);

export default Match;
