
function Settings({filterByAll, filterByDone, filterByNotDone, toggleDarkMode, darkMode}) {
    const div = 'mt-3 p-2 d-flex justify-content-center gap-3'
    const btn = 'btn btn-primary'
    return (
        <div className={div}>
            <button onClick={filterByAll} className={btn}>All Tasks</button>
            <button onClick={filterByDone} className={btn}>Done Tasks</button>
            <button onClick={filterByNotDone} className={btn}>Not Done Tasks</button>
            <button onClick={toggleDarkMode} className={darkMode ? 'btn btn-block btn-white fs-4' : 'btn btn-block btn-dark fs-4'}>
                {darkMode ? <i className="bi bi-sun text-white"></i> : <i className="bi bi-moon"></i>}
            </button>
        </div>
    )
}

export default Settings