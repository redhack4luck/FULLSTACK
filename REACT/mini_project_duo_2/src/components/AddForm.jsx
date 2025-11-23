function AddForm({ value, handleChange, handleSubmit }) {
  const form = 'text-center mt-3'
  const btn = 'btn btn-success mx-3'
  return (
    <form onSubmit={handleSubmit} className={form}>
      <div className="form-row">
        <input 
          type="text" 
          placeholder='Add new task' 
          value={value} 
          onChange={handleChange} 
        />
        <button type="submit" className={btn}>Add Task</button>
      </div>
    </form>
  )
}

export default AddForm