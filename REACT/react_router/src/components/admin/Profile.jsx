import { useParams } from "react-router-dom";

function Profile({users}) {
    const { id } = useParams();
    const user = users.find(u => u.id === parseInt(id));
    return (
        <div>
            <h1>User Profile</h1>
            <ul>
                <li>ID: {id}</li>
                <li>Name : {user.name}</li>
                <li>Email : {user.email}</li>
                <li>Role : {user.role}</li>
            </ul>
        </div>
    );
}

export default Profile