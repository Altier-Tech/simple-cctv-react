import React, { useRef, useEffect } from 'react';
import Webcam from "react-webcam";

const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
};

function App() {
    const webcamRef = useRef(null);
    const wsRef = useRef(null);

    useEffect(() => {
        wsRef.current = new WebSocket('ws://localhost:8000/api/video/video');

        const interval = setInterval(() => {
            if (webcamRef.current) {
                const imageSrc = webcamRef.current.getScreenshot();
                if (imageSrc && wsRef.current.readyState === WebSocket.OPEN) {
                    wsRef.current.send(imageSrc);
                }
            }
        }, 100);

        return () => {
            clearInterval(interval);
            if (wsRef.current) {
                wsRef.current.close();
            }
        }
    }, []);

    return (
        <div className="App">
            <Webcam
                audio={false}
                height={720}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={1280}
                videoConstraints={videoConstraints}
            />
        </div>
    );
}

export default App;
