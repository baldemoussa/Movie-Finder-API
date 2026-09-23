import axios from "axios";

export const searchMovies = async (req, res) => {
    const { title } = req.query;

    if (!title) {
        return res.status(400).json({ error: "Title query parameter is required" });
    }

    try {
        const response = await axios.get(process.env.OMDB_BASE_URL, {
            params: {
                s: title,
                apikey: process.env.OMDB_API_KEY,
            },
        });

        res.json(response.data);
    } catch (error) {
        console.error("Error searching movies:", error.message);
        res.status(500).json({ error: "Failed to fetch search results" });
    }
};


export const getMovieDetails = async (req, res) => {
    const { id } = req.params;

    try {
        const response = await axios.get(process.env.OMDB_BASE_URL, {
            params: {
                i: id,
                apikey: process.env.OMDB_API_KEY,
            },
        });

        res.json(response.data);
    } catch (error) {
        console.error("Error fetching movie details:", error.message);
        res.status(500).json({ error: "Failed to fetch movie details" });
    }
};
