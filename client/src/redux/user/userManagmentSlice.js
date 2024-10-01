import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: [],
    totalUser: 0,
    loading: false,
    error: null,
    currentUser: null,
};

const userManagementSlice = createSlice({
    name: 'userManagement',
    initialState,
    reducers: {
        fetchUsersStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchUsersSuccess: (state, action) => {
            state.users = action.payload;
            state.userCount = action.payload.length; 
            state.loading = false;
            state.error = null;
        },
        fetchUsersFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        updateUserStart: (state) => {
            state.loading = true;
            state.error = null; // Reset error on new update
        },
        updateUserSuccess: (state, action) => {
            const index = state.users.findIndex(user => user._id === action.payload._id);
            if (index !== -1) {
                state.users[index] = action.payload; // Update user in the list
            }
            state.loading = false; // Set loading to false after success
        },
        updateUserFailure: (state, action) => {
            state.loading = false; // Set loading to false on failure
            state.error = action.payload; // Capture the error message
        },
        deleteUserStart: (state) => {
            state.loading = true;
            state.error = null; // Reset error on new delete
        },
        deleteUserSuccess: (state, action) => {
            state.users = state.users.filter(user => user._id !== action.payload); // Remove user from list
            state.loading = false; // Set loading to false after success
        },
        deleteUserFailure: (state, action) => {
            state.loading = false; // Set loading to false on failure
            state.error = action.payload; // Capture the error message
        },
        signOut: (state) => {
            state.currentUser = null; // Clear current user on logout
            state.loading = false; // Reset loading state
            state.error = null; // Reset error state
        },
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload; // Set current user on login
            state.loading = false; // Reset loading after setting user
            state.error = null; // Reset error on successful login
        },
    },
});

// Export actions for use in components
export const {
    fetchUsersStart,
    fetchUsersSuccess,
    fetchUsersFailure,
    updateUserStart,
    updateUserSuccess,
    updateUserFailure,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailure,
    signOut,
    setCurrentUser
} = userManagementSlice.actions;

// Export the reducer to be used in the store
export default userManagementSlice.reducer;