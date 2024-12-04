import mongoose from "mongoose";

const songSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    basicInfo: {
        duration: { type: Number, default: 0 },  // Duration in seconds
        format: { type: String, default: "Unknown" },  // File format, e.g., "FLAC"
        bitrate: { type: Number, default: 0 },  // Bitrate in bits per second
    },
    tags: {
        title: { type: String, default: "Unknown" },  // Song title
        artist: { type: String, default: "Unknown" },  // Artist name
        album: { type: String, default: "Unknown" },  // Album name
        albumArtist: { type: String, default: "Unknown" },  // Album artist
        genre: { type: String, default: "Unknown" },  // Genre of the song
        year: { type: Number, default: 0 },  // Release year
        trackNumber: { type: Number, default: 0 },  // Track number
        discNumber: { type: Number, default: 0 },  // Disc number for multi-disc albums
    }
});

const Song = mongoose.model('Song', songSchema);

export default Song;