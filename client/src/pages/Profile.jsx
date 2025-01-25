import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserStart, updateUserSuccess, updateUserFailure, deleteUserFailure, deleteUserStart, deleteUserSuccess, signOutUserStart, signOutUserSuccess, signOutUserFailure } from "../redux/user/userSlice";
import { apiClient } from "../lib/api-client";
import { DELETE_USER_ROUTE, SIGNOUT_AUTH, UPDATE_USER_ROUTE } from "../utils/constants";
const Profile = () => {
    const { currentUser, error, loading } = useSelector(state => state.user)
    const fileRef = useRef(null);
    const [file, setFile] = useState(undefined);
    const [formData, setFormData] = useState({});
    const dispatch = useDispatch();
    const [updateSuccess, setUpdateSuccess] = useState(false);

    useEffect(() => {
        if (file) {
            handleFileUpload(file);
        }
    }, [file]);

    const handleFileUpload = async (file) => {
        console.log(file)
        //need to do that using the node server using multer.
    }

    const handleChange = (e) => {
        const { id, value } = e.target;
        if (value.trim() === '') {
            const newFormData = { ...formData };
            delete newFormData[id];
            setFormData(newFormData);
        } else {
            setFormData({ ...formData, [id]: value });
        }
    }

    const validateForm = () => {
        if (Object.keys(formData).length === 0) {
            dispatch(updateUserFailure('Please update at least one field'));
            return false;
        }
        const { username, email, password } = formData;
        if (username !== undefined && username.trim() === '') {
            dispatch(updateUserFailure('Username cannot be empty'));
            return false;
        }
        if (email !== undefined && email.indexOf('@') === -1) {
            dispatch(updateUserFailure('Please enter a valid email'));
            return false;
        }
        if (password !== undefined && password.length < 6) {
            dispatch(updateUserFailure('Password must be at least 6 characters long'));
            return false;
        }
        return true;
    }

    const handleUpdate = async (e) => {
        e.preventDefault();
        dispatch(updateUserStart());
        if (!validateForm()) {
            return;
        }
        await apiClient
            .post(`${UPDATE_USER_ROUTE}/${currentUser._id}`, formData)
            .then((res) => {
                dispatch(updateUserSuccess(res?.data));
                setUpdateSuccess(true);
            })
            .catch((err) => {
                dispatch(updateUserFailure(err?.response?.data?.message));
            });
    }

    const handleDeleteUser = async () => {
        dispatch(deleteUserStart());
        await apiClient.delete(`${DELETE_USER_ROUTE}/${currentUser._id}`)
            .then(res => {
                dispatch(deleteUserSuccess(res?.data));
            })
            .catch(err => {
                dispatch(deleteUserFailure(err?.response?.data?.message));
            });
    }
    
    const handleSignOut = async () => {
        dispatch(signOutUserStart());
        await apiClient.get(SIGNOUT_AUTH)
            .then(res => {
                dispatch(signOutUserSuccess(res?.data));
            })
            .catch(err => {
                dispatch(signOutUserFailure(err?.response?.data?.message));
            });
    }

    return (
        <div className="p-3 max-w-lg mx-auto">
            <h1 className="text-3xl font-semibold text-center m-7">Profile</h1>
            <form onSubmit={handleUpdate} className="flex flex-col gap-4">
                <input type="file" onChange={(e) => setFile(e.target.files[0])} ref={fileRef} hidden accept="image/*" />
                <img src={currentUser.avatar}
                    alt="profile-image"
                    className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
                    onClick={() => fileRef.current.click()}
                />
                <input type="text"
                    placeholder="username"
                    id="username"
                    defaultValue={currentUser?.username}
                    className="border p-3 rounded-lg"
                    onChange={handleChange}
                />
                <input type="text"
                    placeholder="email"
                    id="email"
                    defaultValue={currentUser?.email}
                    className="border p-3 rounded-lg"
                    onChange={handleChange}
                />
                <input type="password"
                    placeholder="password"
                    id="password"
                    className="border p-3 rounded-lg"
                    onChange={handleChange}
                />
                <button
                    disabled={loading}
                    className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80"
                >
                    {loading ? 'Loading...' : 'update'}
                </button>
            </form>

            <div className="flex justify-between mt-5">
                <span className="text-red-700 cursor-pointer" onClick={handleDeleteUser}>Delete Account</span>
                <span className="text-red-700 cursor-pointer" onClick={handleSignOut}>Sign out</span>
            </div>
            {error && <p className='text-red-700 mt-5'>{error}</p>}
            {updateSuccess && <p className='text-green-700 mt-5'>User Updated Successfully!</p>}
        </div>
    );
}

export default Profile;