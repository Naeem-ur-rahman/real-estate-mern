import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { apiClient } from '../lib/api-client'
import { SIGNIN_ROUTE } from '../utils/constants'

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const handleChange = e => {
    setFormData({ ...formData, [e?.target?.id]: e?.target?.value })
  }
  const validateForm = () => {
    const { email, password } = formData
    if (email === '' || password === '') {
      setError('All fields are required')
      return false
    }
    if (email.indexOf('@') === -1) {
      setError('Please enter a valid email')
      return false
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long')
      return false
    }
    return true
  }
  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    if (!validateForm()) {
      setLoading(false)
      return
    }
    await apiClient.post(SIGNIN_ROUTE, formData)
      .then(() => {
        setError(null)
        setLoading(false)
        navigate('/')
      })
      .catch(err => {
        setError(err?.response?.data?.message)
        setLoading(false)
      })
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input
          type='email'
          placeholder='Email'
          className='border p-3 rounded-lg'
          id='email'
          onChange={handleChange}
        />
        <input
          type='password'
          placeholder='Password'
          className='border p-3 rounded-lg'
          id='password'
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
        >
          {loading ? 'Loading...' : 'Sign In'}
        </button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Don&apos;t have an account?</p>
        <Link to={'/signup'}>
          <span className='text-blue-700'>Sign Up</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}

export default SignIn
