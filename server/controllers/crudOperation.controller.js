import Match from "../models/match.model.js";

export const editName = async (req, res) => {
    try {
        const { name, playerId } = req.body;
        const updatedName = await Match.findByIdAndUpdate(playerId, { name }, { new: true });
        return res.status(200).json({
            success: true,
            message: 'Name updated successfully',
            updatedName
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Failed to update name',
            error: error.message
        });
    }
}