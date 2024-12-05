import {parseBlob} from "music-metadata";

export async function extractMetadata(file) {
    const metadata = await parseBlob(file);

    return {
        basicInfo: {
            duration: Math.round(metadata.format.duration) || 0, // in seconds
            format: metadata.format.container || "Unknown", // e.g., "FLAC"
            bitrate: Math.round(metadata.format.bitrate) || 0, // in bits per second
        },
        tags: {
            title: metadata.common.title || "Unknown",
            artist: metadata.common.artist || "Unknown",
            album: metadata.common.album || "Unknown",
            albumArtist: metadata.common.albumartist || "Unknown",
            genre: metadata.common.genre[0] || "Unknown",
            year: metadata.common.year || 0,
            trackNumber: metadata.common.track?.no || 0,
            discNumber: metadata.common.disk?.no || 0,
        },
        // artwork: {
        //     data: metadata.common.picture?.[0]?.data || null, // Binary data
        //     format: metadata.common.picture?.[0]?.format || null, // Image format (e.g., "image/jpeg")
        // },
    };
}

// <artwork>
//     <data>${song.artwork.data ? "Embedded" : "None"}</data>
//     <format>${song.artwork.format || "Unknown"}</format>
// </artwork>

export function XMLToObj(xmlContent) {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlContent, "text/xml");
    const songs = xmlDoc.getElementsByTagName("song");
    const importedData = [];
    for (let song of songs) {
        const basicInfo = song.getElementsByTagName("basicInfo")[0];
        const tags = song.getElementsByTagName("tags")[0];

        importedData.push({
            basicInfo: {
                duration: basicInfo.getElementsByTagName("duration")[0].textContent || 0,
                format: basicInfo.getElementsByTagName("format")[0].textContent || "Unknown",
                bitrate: basicInfo.getElementsByTagName("bitrate")[0].textContent || 0,
            },
            tags: {
                title: tags.getElementsByTagName("title")[0].textContent || "Unknown",
                artist: tags.getElementsByTagName("artist")[0].textContent || "Unknown",
                album: tags.getElementsByTagName("album")[0].textContent || "Unknown",
                albumArtist: tags.getElementsByTagName("albumArtist")[0].textContent || "Unknown",
                genre: tags.getElementsByTagName("genre")[0].textContent || "Unknown",
                year: tags.getElementsByTagName("year")[0].textContent || 0,
                trackNumber: tags.getElementsByTagName("trackNumber")[0].textContent || 0,
                discNumber: tags.getElementsByTagName("discNumber")[0].textContent || 0,
            },
        });
    }
    return importedData;
}