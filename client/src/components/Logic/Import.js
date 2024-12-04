import {parseBlob} from "music-metadata";

export async function extractMetadata(file) {
    const metadata = await parseBlob(file);

    return {
        basicInfo: {
            duration: metadata.format.duration || 0, // in seconds
            format: metadata.format.container || "Unknown", // e.g., "FLAC"
            bitrate: metadata.format.bitrate || 0, // in bits per second
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

export function objToXML(songs) {
    // console.log(songs);
    const xmlContent = `
    <?xml version="1.0" encoding="UTF-8"?>
    <music_library>
      ${songs
        .map(
            (song) => `
        <song>
          <basicInfo>
            <duration>${song.basicInfo.duration || 0}</duration>
            <format>${song.basicInfo.format || "Unknown"}</format>
            <bitrate>${song.basicInfo.bitrate || 0}</bitrate>
          </basicInfo>
          <tags>
            <title>${song.tags.title || "Unknown"}</title>
            <artist>${song.tags.artist || "Unknown"}</artist>
            <album>${song.tags.album || "Unknown"}</album>
            <albumArtist>${song.tags.albumArtist || "Unknown"}</albumArtist>
            <genre>${song.tags.genre || "Unknown"}</genre>
            <year>${song.tags.year || 0}</year>
            <trackNumber>${song.tags.trackNumber || 0}</trackNumber>
            <discNumber>${song.tags.discNumber || 0}</discNumber>
          </tags>
        </song>
      `
        )
        .join("")}
    </music_library>
  `;
    return xmlContent.trim();
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