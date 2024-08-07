import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { RadioGroup } from '../ui/radio-group';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '../../redux/authSlice';
import { Loader2 } from 'lucide-react';
import { USER_API_END_POINT } from '../../utils/constant';
import { User } from '../Context/UserContext';


const Login = () => {
  const [input, setInput] = useState({
    email: '',
    password: '',
  
  });
  const { loading, user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      
      console.log('Response:', res); // Log the response
      console.log('Response Data:', res.data); // Log the response data
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate('/notes');
        toast.success(res.data.message);
      }
    const user = { name: 'John Doe', profilePicture: 'path/to/profile-picture.jpg' }; 
    setUser(user);
    }
     catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-900 text-white flex flex-col items-center font-sans overflow-x-hidden">
      <Navbar />
      <div className="flex items-center justify-center w-full h-full px-4 sm:px-8 md:px-16">
        <form
          onSubmit={submitHandler}
          className="w-full max-w-md bg-gray-800 bg-opacity-80 border border-gray-700 rounded-lg p-8 shadow-lg my-10"
        >
          <h1 className="font-bold text-3xl mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300">
            Login
          </h1>
          <div className="my-4">
            <Label className="text-sm text-gray-300">Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="patel@gmail.com"
              className="w-full mt-1 p-2 bg-gray-700 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="my-4">
            <Label className="text-sm text-gray-300">Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="Enter your password"
              className="w-full mt-1 p-2 bg-gray-700 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="my-6">
            <RadioGroup className="flex items-center gap-4">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === 'student'}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r1" className="text-gray-300">Student</Label>
              </div>
              {/* <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === 'recruiter'}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r2">Recruiter</Label>
              </div> */}
            </RadioGroup>
          </div>
          {loading ? (
            <Button className="w-full py-3 text-lg bg-blue-600 rounded-lg flex justify-center items-center">
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full py-3 text-lg bg-yellow-500 hover:bg-yellow-600 rounded-lg transition-colors duration-200">
              Login
            </Button>
          )}
          <div className="text-center mt-4">
            <span className="text-sm text-gray-400">
              Don't have an account?{' '}
              <Link to="/signup" className="text-blue-400 hover:text-blue-500 transition-colors duration-200">Signup</Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
