import React from 'react';
import { logout } from '../util/auth'

const AdminPage = () => {
    return (
        <>
            Admin page works!
            <button onClick={logout}>Logout</button>
        </>
    )
}

export default AdminPage