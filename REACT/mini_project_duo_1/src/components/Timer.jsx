import { useState, useEffect } from "react";

function Timer() {
    const [time, setTime] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setTime(time => time + 1);
        }, 1000);
        return () => clearInterval(interval);
    }, []);
    return <div style={{fontSize: "2rem", fontWeight: "bold", border: "1px solid lightblue", padding: "10px", borderRadius: "5px", textAlign: "center"}}>Compteur: {time}</div>;
}

export default Timer;
