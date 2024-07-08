"use client";
import { flightRouterStateSchema } from 'next/dist/server/app-render/types';
import React, { useState } from 'react';

const SpeedTest = () => {
    const [downloadSpeed, setDownloadSpeed] = useState(null);
    const [loading, setloading] = useState(false);
    const [end, setend] = useState(false);
    const [msg, setmsg] = useState("Click to Test");
    const imageUrl = "https://media.geeksforgeeks.org/wp-content/cdn-uploads/20200714180638/CIP_Launch-banner.png";
    const proxyUrl = "https://cors-anywhere.herokuapp.com/"; // Proxy URL to avoid CORS issues
    const fileSizeInBytes = 147917; // Size of the image file in bytes (approximately)

    const startDownloadTest = () => {
        setDownloadSpeed(null);
        setend(false);
        setloading(true);
        const startTime = performance.now();

        fetch(proxyUrl + imageUrl)
            .then(response => {
                const endTime = performance.now();
                const durationInSeconds = (endTime - startTime) / 1000;
                const bitsLoaded = fileSizeInBytes * 8;
                const speedMbps = (bitsLoaded / durationInSeconds) / (1024 * 1024);
                setDownloadSpeed(speedMbps.toFixed(2));
                setTimeout(() => {
                    setloading(false)
                    setmsg("ReTest");
                    
                }, 3200)
                setTimeout(() => {
                    setend(true);
                }, 3300)
            })
            .catch(error => {
                console.error('Error fetching the image:', error);
                setDownloadSpeed(null);
            });

    };

    return (
        <div className='container font-mono flex flex-col place-items-center'>
            <div className='text-6xl font-bold italic p-5 mt-[5%] block mx-4 px-4 py-2.5 rounded leading-none font-medium bg-white text-black'>NetSpeed</div>
            <div className='text-6xl p-5 mt-[2%]'>Internet Speed Test</div>
            {loading ? (
                <div class="loader">
                <div class="loader__bar"></div>
                <div class="loader__bar"></div>
                <div class="loader__bar"></div>
                <div class="loader__bar"></div>
                <div class="loader__bar"></div>
                <div class="loader__ball"></div>
              </div>
            ) : (
                <button className='flex place-items-center' onClick={startDownloadTest}>{msg}</button>
            )}
            {end ? (
                <div className="absolute bottom-[15%] p-2 text-2xl mt-[5%]">
                    <p>Download Speed: {downloadSpeed} Mbps</p>
                </div>
            ) : (
                <div></div>
            )}
        </div>
    );
};

export default SpeedTest;
