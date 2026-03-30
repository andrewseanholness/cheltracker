export default async function handler(req, res) {
    // Grab the query (Gamertag/Club Name) and the type (players, clubs, leaderboard) from the frontend
    const { query, type } = req.query;
    const platform = 'common-gen5';

    // EA requires this Referer header, otherwise they block the request
    const headers = {
        'Referer': 'https://www.ea.com/',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
    };

    try {
        if (type === 'players') {
            const response = await fetch(`https://proclubs.ea.com/api/nhl/members/search?platform=${platform}&searchName=${encodeURIComponent(query)}`, { headers });
            const data = await response.json();
            return res.status(200).json(data);
        } 
        else if (type === 'clubs') {
            const response = await fetch(`https://proclubs.ea.com/api/nhl/clubs/search?platform=${platform}&clubName=${encodeURIComponent(query)}`, { headers });
            const data = await response.json();
            return res.status(200).json(data);
        }
        else if (type === 'leaderboard') {
            const response = await fetch(`https://proclubs.ea.com/api/nhl/clubRankLeaderboard?platform=${platform}`, { headers });
            const data = await response.json();
            return res.status(200).json(data);
        } 
        else {
            return res.status(400).json({ error: "Invalid search type" });
        }
    } catch (error) {
        console.error("API Error:", error);
        return res.status(500).json({ error: "Failed to fetch data from EA Servers" });
    }
}