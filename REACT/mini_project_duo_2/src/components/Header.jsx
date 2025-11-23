import { useState } from "react"
import { useEffect } from "react"
function Header() {
    
    //Component Style
    const className = 'text-center p-3'
    const [time, setTime] = useState(new Date())
    const {h,m,s} = {h:time.getHours().toString().padStart(2,'0'),m:time.getMinutes().toString().padStart(2,'0'),s:time.getSeconds().toString().padStart(2,'0')}
    const {d,M,y} = {d:time.getDate(),M:time.getMonth(),y:time.getFullYear()}
    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date())
        }, 1000)
        return () => clearInterval(timer)
    }, [])
    return (
        <header className={className} style={{backgroundColor:'darkblue'}}>
            <div className="d-flex justify-content-around">
                <span className="lead fw-bolder">{d}/{M}/{y}</span>
                <h1 className="d-inline mx-5 bg-danger rounded px-3">TASKS MANAGER</h1>
                <span className="lead fw-bolder">{h}:{m}:{s}</span>
                
            </div>
        </header>
    )
}

export default Header