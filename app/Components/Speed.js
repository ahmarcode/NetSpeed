"use client";
import React, { useState } from 'react';

const SpeedTest = () => {
    const [downloadSpeed, setDownloadSpeed] = useState(null);
    const imageUrl = "https://media.geeksforgeeks.org/wp-content/cdn-uploads/20200714180638/CIP_Launch-banner.png";
    const fileSizeInBytes = 147917; // Size of the image file in bytes (approximately)

    const startDownloadTest = () => {
        const startTime = performance.now();

        fetch(imageUrl)
            .then(response => {
                const endTime = performance.now();
                const durationInSeconds = (endTime - startTime) / 1000;
                const bitsLoaded = fileSizeInBytes * 8;
                const speedMbps = (bitsLoaded / durationInSeconds) / (1024 * 1024);
                setDownloadSpeed(speedMbps.toFixed(2));
            })
            .catch(error => {
                console.error('Error fetching the image:', error);
                setDownloadSpeed(null);
            });
    };

    return (
        <div>
            <h1>Internet Speed Test</h1>
            <button onClick={startDownloadTest}>Start Download Test</button>
            {downloadSpeed !== null && (
                <div>
                    <p>Download Speed: {downloadSpeed} Mbps</p>
                </div>
            )}
        </div>
    );
};

export default SpeedTest;
