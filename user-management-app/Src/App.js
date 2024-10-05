import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import UserDetail from './components/UserDetail';

const App = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingUser, setEditingUser] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            const data = await response.json();
            setUsers(data);
        } catch (err) {
            setError('Failed to fetch users');
        } finally {
            setLoading(false);
        }
    };

    const createUser = async (newUser) => {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser),
            });
            const data = await response.json();
            setUsers([...users, data]);
        } catch (err) {
            setError('Failed to create user');
        }
    };

    const updateUser = async (updatedUser) => {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/users/${editingUser.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedUser),
            });
            const data = await response.json();
            setUsers(users.map(user => (user.id === data.id ? data : user)));
            setEditingUser(null);
        } catch (err) {
            setError('Failed to update user');
        }
    };

    const deleteUser = async (id) => {
        try {
            await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
                method: 'DELETE',
            });
            setUsers(users.filter(user => user.id !== id));
        } catch (err) {
            setError('Failed to delete user');
        }
    };

    const startEditing = (user) => {
        setEditingUser(user);
    };

    const cancelEditing = () => {
        setEditingUser(null);
    };

    return (
        <Router>
            <div>
                <h1>User Management Application</h1>
                {loading && <div>Loading...</div>}
                {error && <div>{error}</div>}
                <Switch>
                    <Route path="/" exact>
                        <UserList users={users} onDelete={deleteUser} />
                        <button onClick={() => startEditing({})}>Add User</button>
                        {editingUser && (
                            <UserForm user={editingUser} onSubmit={createUser} />
                        )}
                    </Route>
                    <Route path="/users/:id" render={({ match }) => {
                        const user = users.find(u => u.id === parseInt(match.params.id));
                        return <UserDetail user={user} />;
                    }} />
                </Switch>
            </div>
        </Router>
    );
};

export default App;
