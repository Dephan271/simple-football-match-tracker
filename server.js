const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit if MongoDB connection fails
});

// Match Schema and Model
const matchSchema = new mongoose.Schema({
    homeTeam: { type: String, required: true, trim: true },
    awayTeam: { type: String, required: true, trim: true },
    matchDate: { type: Date, required: true },
    homeScore: { type: Number, required: true, min: 0 },
    awayScore: { type: Number, required: true, min: 0 },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comments: { type: String, required: true, trim: true },
    createdAt: { type: Date, default: Date.now }
});

const Match = mongoose.model('Match', matchSchema);

// Routes
app.get('/api/matches', async (req, res) => {
    try {
        const matches = await Match.find().sort({ matchDate: -1 });
        res.json(matches);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching matches', error: error.message });
    }
});

app.post('/api/matches', async (req, res) => {
    try {
        const match = new Match(req.body);
        await match.validate(); // Validate before saving
        const savedMatch = await match.save();
        res.status(201).json(savedMatch);
    } catch (error) {
        res.status(400).json({ message: 'Error saving match', error: error.message });
    }
});

app.get('/api/matches/range', async (req, res) => {
    const { startDate, endDate } = req.query;
    try {
        const matches = await Match.find({
            matchDate: { $gte: new Date(startDate), $lte: new Date(endDate) }
        }).sort({ matchDate: -1 });
        res.json(matches);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching matches', error: error.message });
    }
});

app.get('/api/matches/stats', async (req, res) => {
    try {
        const stats = await Match.aggregate([
            {
                $group: {
                    _id: null,
                    totalMatches: { $sum: 1 },
                    averageRating: { $avg: '$rating' },
                    totalGoals: { $sum: { $add: ['$homeScore', '$awayScore'] } }
                }
            }
        ]);
        res.json(stats[0] || {});
    } catch (error) {
        res.status(500).json({ message: 'Error fetching statistics', error: error.message });
    }
});

// Fallback route for frontend
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
