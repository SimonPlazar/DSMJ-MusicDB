import React, { useState } from "react";
import { parseBlob } from "music-metadata-browser";
import { Buffer } from 'buffer';
import process from 'process';
window.Buffer = Buffer;
window.process = process;

const Input = () => {
    const [metadataList, setMetadataList] = useState([]);

    const handleFiles = async (fileList) => {
        const files = Array.from(fileList).filter(file => file.name.endsWith(".flac"));
        const metadataArray = [];

        for (const file of files) {
            try {
                const metadata = await parseBlob(file);
                metadataArray.push({
                    title: metadata.common.title || file.name,
                    artist: metadata.common.artist || "Unknown Artist",
                    album: metadata.common.album || "Unknown Album",
                    duration: metadata.format.duration || "Unknown",
                    path: file.webkitRelativePath, // Keep the relative path for context
                });
            } catch (err) {
                console.error(`Error reading metadata for ${file.name}:`, err);
            }
        }

        setMetadataList(metadataArray); // Update state with all metadata
    };

    return (
        <div>
            <h1>FLAC Metadata Reader</h1>
            <input
                type="file"
                webkitdirectory="true"
                multiple
                onChange={(e) => handleFiles(e.target.files)}
            />

            {/* Display extracted metadata */}
            <ul>
                {metadataList.map((metadata, index) => (
                    <li key={index}>
                        <strong>{metadata.title}</strong> - {metadata.artist} ({metadata.album})
                        <br />
                        Duration: {metadata.duration}s
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Input;
