
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from '../redux/user/userManagmentSlice.js'; 
// import { useState } from 'react';

export default function AdminHeader() {
    const dispatch = useDispatch(); // Initialize dispatch
    const navigate = useNavigate(); // Initialize navigate for redirection
    const userState = useSelector((state) => state.user); // Get the whole user state
    const currentUser = userState?.currentUser; // Use optional chaining to safely access currentUser
    const userCount = useSelector((state) => state.userManagement.userCount);

    const handleLogout = () => {
        dispatch(signOut()); // Dispatch the signOut action
        localStorage.removeItem('authToken'); // Remove token from local storage if applicable
        navigate('/admin/signin'); // Redirect to home or login page after logout
    };
  
    return (
        <div className='bg-slate-600 text-white'>
            <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
                <Link to='/admin/home'>
                    <h1 className='font-bold uppercase'>Dashboard</h1>
                </Link>
                <h1 >user count: {userCount} </h1>
                {currentUser && currentUser.isAdmin && (
                    <ul className='flex gap-4'>
                        <button 
                            onClick={handleLogout} 
                            className='bg-red-500 text-white px-4 py-2 rounded-lg'
                        >
                            Sign Out
                        </button>
                    </ul>
                )}
            </div>
        </div>
    );
}
