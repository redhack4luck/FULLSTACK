function TaskItem({task, handleToggle, handleDelete}) {
    return (
        <tr className="">
            <td>{task.title}</td>
            <td>{task.done ? '✅ Done' : '⏳ Pending'}</td>
            <td className="text-center align-items-center p-1">
                <button onClick={() => handleToggle(task.id)} className={task.done ? 'btn btn-danger border border-danger' : 'btn btn-success border border-success'}>
                    <span className="p-2">{task.done ? 'Undo' : 'Complete'}</span>
                </button>
            </td>
            <td className="text-center">
                <button onClick={() => handleDelete(task.id)} className="btn mx-auto"><i class="bi bi-trash text-danger"></i></button>
            </td>
        </tr>
    )
}

export default TaskItem