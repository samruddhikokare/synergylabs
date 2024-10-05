import React from 'react';
import { Link } from 'react-router-dom';

const UserList = ({ users, onDelete }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user, index) => (
                    <tr key={user.id} style={{ backgroundColor: index % 2 === 0 ? '#f2f2f2' : '#ffffff' }}>
                        <td>{user.id}</td>
                        <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                        <td>
                            <button onClick={() => onDelete(user.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default UserList;
