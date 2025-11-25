import { Link } from "react-router-dom";

function Users({users}) {
    return (
        <>
        <h1>Users List</h1>
        <ul>
            {users.map(user => (
                <li key={user.id}>{user.name}  -- <Link to={`/admin/users/${user.id}`}>User Profile</Link></li>
            ))}
        </ul>
        </>
    )
}

export default Users            