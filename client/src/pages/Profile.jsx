import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
const Profile = () => {
    const { currentUser } = useSelector(state => state.user)
    const fileRef = useRef(null);
    const [file, setFile] = useState(undefined);

    useEffect(() => {
        if (file) {
            handleFileUpload(file);
        }
    }, [file]);

    const handleFileUpload = async (file) => {
        console.log(file)
        //need to do that using the node server using multer.
    }
    
    return (
        <div className="p-3 max-w-lg mx-auto">
            <h1 className="text-3xl font-semibold text-center m-7">Profile</h1>
            <form className="flex flex-col gap-4">
                <input type="file" onChange={(e) => setFile(e.target.files[0])} ref={fileRef} hidden accept="image/*" />
                <img src={currentUser.avatar}
                    alt="profile-image"
                    className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
                    onClick={() => fileRef.current.click()}
                />
                <input type="text"
                    placeholder="username"
                    id="username"
                    className="border p-3 rounded-lg"
                />
                <input type="text"
                    placeholder="email"
                    id="email"
                    className="border p-3 rounded-lg"
                />
                <input type="text"
                    placeholder="password"
                    id="password"
                    className="border p-3 rounded-lg"
                />
                <button className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80">
                    update
                </button>
            </form>

            <div className="flex justify-between mt-5">
                <span className="text-red-700 cursor-pointer">Delete Account</span>
                <span className="text-red-700 cursor-pointer">Sign out</span>
            </div>
        </div>
    );
}

export default Profile;