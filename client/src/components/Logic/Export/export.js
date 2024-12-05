
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