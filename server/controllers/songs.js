import Song from '../models/Song.js';
import mongoose from "mongoose";


export const getSongs = async (req, res) => {
    const userID = req.user;
    try {
        // const song = await Song.find();
        const song = await Song.find({user: userID});
        res.status(200).json(song);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const createSong = async (req, res) => {
    const song = req.body;
    const userID = req.user;

    const newSong = new Song({
        ...song,
        user: userID,
    });

    try {
        await newSong.save();

        res.status(201).json(newSong);
    } catch (error) {
        res.status(409).json({message: error.message});
    }
}

export const createMultipleSongs = async (req, res) => {
    // console.log('createMultipleSongs:', req.body);
    const songs = req.body;
    const userID = req.user;

    if (!Array.isArray(songs) || songs.length === 0) {
        return res.status(400).json({error: 'Please provide an array of songs.'});
    }

    try {
        const songsWithUser = songs.map((song) => ({
            ...song,
            user: userID,
        }));

        const createdSongs = await Song.insertMany(songsWithUser);

        return res.status(201).json(createdSongs);
    } catch (error) {
        console.error(error);
        return res.status(409).json({error: 'Something went wrong, please try again later.'});
    }
}

export const updateSong = async (req, res) => {
    const {id: _id} = req.params;
    const song = req.body;
    // console.log('updateSong:', song);

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No song with that id');

    const updatedSong = await Song.findByIdAndUpdate(_id, {...song, _id}, {new: true});

    res.json(updatedSong);
}

export const deleteSong = async (req, res) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No song with that id');

    await Song.findByIdAndDelete(id);

    res.json({message: 'Song deleted successfully'});
}

// export const deleteMultipleSongs = async (req, res) => {
//     console.log('body:', req.body);
//     console.log('params:', req.params);
//
//     try {
//         const { ids } = req.body;
//         if (!ids || !Array.isArray(ids)) {
//             return res.status(400).json({ message: 'Invalid request. IDs array is required.' });
//         }
//
//         const result = await Song.deleteMany({ _id: { $in: ids }, user: req.user.id });
//
//         if (result.deletedCount === 0) {
//             return res.status(404).json({ message: 'No songs found with the provided IDs.' });
//         }
//
//         res.json({ message: `${result.deletedCount} songs deleted successfully.` });
//     } catch (error) {
//         console.error('Error deleting multiple songs:', error);
//         res.status(500).json({ message: 'Error deleting songs', error: error.message });
//     }
// }

export const deleteMultipleSongs = async (req, res) => {
    try {
        let ids;
        if (req.body && req.body.ids) {
            // If IDs are in the request body
            ids = req.body.ids;
        } else if (req.query.ids) {
            // If IDs are in the query string
            ids = req.query.ids.split(',');
        } else {
            return res.status(400).json({ message: 'No IDs provided for deletion.' });
        }

        if (!Array.isArray(ids)) {
            return res.status(400).json({ message: 'Invalid request. IDs must be an array.' });
        }

        const result = await Song.deleteMany({ _id: { $in: ids }, user: req.user.id });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'No songs found with the provided IDs.' });
        }

        res.json({ message: `${result.deletedCount} songs deleted successfully.` });
    } catch (error) {
        console.error('Error deleting multiple songs:', error);
        res.status(500).json({ message: 'Error deleting songs', error: error.message });
    }
}