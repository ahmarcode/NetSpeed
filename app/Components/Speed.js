"use client";
import React, { useState } from 'react';

const SpeedTest = () => {
    const [downloadSpeed, setDownloadSpeed] = useState(null);
    const imageUrl = "https://media.geeksforgeeks.org/wp-content/cdn-uploads/20200714180638/CIP_Launch-banner.png";
    const proxyUrl = "https://cors-anywhere.herokuapp.com/"; // Proxy URL to avoid CORS issues
    const fileSizeInBytes = 147917; // Size of the image file in bytes (approximately)

    const startDownloadTest = () => {
        const startTime = performance.now();

        fetch(proxyUrl + imageUrl)
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
        <div className='container font-mono flex flex-col place-items-center'>
            <div className='text-6xl p-5 mt-[5%] block mx-4 px-4 py-2.5 rounded leading-none font-medium bg-white text-black'>NetSpeed</div>
            <div className='text-6xl p-5 mt-[2%]'>Internet Speed Test</div>
            <button className='flex place-items-center' onClick={startDownloadTest}>Click to Test</button>
            {downloadSpeed !== null && (
                <div className='text-3xl mt-[5%]'>
                    <p>Download Speed: {downloadSpeed} Mbps</p>
                </div>
            )}
        </div>
    );
};

export default SpeedTest;
