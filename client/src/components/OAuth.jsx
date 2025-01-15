import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { app } from '../firebase'
import { apiClient } from '../lib/api-client'
import { GOOGLE_AUTH } from '../utils/constants'
import { useDispatch } from 'react-redux'
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider()
      const auth = getAuth(app)

      const result = await signInWithPopup(auth, provider)

      apiClient
        .post(GOOGLE_AUTH, {
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL
        })
        .then((res) => {
          dispatch(signInSuccess(res.data));
          navigate('/');
        })
    } catch (error) {
      console.log("Couldn't signin with the google: ", error)
    }
  }
  return (
    <button
      type='button'
      onClick={handleGoogleClick}
      className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-90'
    >
      Continue with google
    </button>
  )
}

export default OAuth
