import TaskItem from "./TaskItem";

function TasksList({tasks, handleToggle, handleDelete}) {
    const section = 'mt-3 mx-5'
    const table = 'table table-bordered'
    const tr = 'fw-bold fs-5'
    return (
        <section className={section} style={{minHeight:'49vh'}}>
            {tasks.length === 0 && <p>No tasks found</p>}
            <table className={table}>
                <tr className={tr}>
                    <th>Task Title</th>
                    <th>Task Status</th>
                    <th className="text-center">Toggle Status</th>
                    <th className="text-center">Delete Task</th>
                </tr>
                {
                    tasks.map(t=>(<TaskItem key={t.id} task={t} handleToggle={handleToggle} handleDelete={handleDelete}/>))
                }
            </table>
        </section>
    )
}

export default TasksList
