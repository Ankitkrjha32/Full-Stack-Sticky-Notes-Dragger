import React, { useEffect, useState } from 'react';
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
// import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [input, setInput] = useState({
    fullname: '',
    email: '',
    phoneNumber: '',
    password: '',
    // file: '',
  });

  const { loading, user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    // Add logging to check the input values
    console.log('Form input values:', input);

    const formData = new FormData();
    formData.append('fullname', input.fullname);
    formData.append('email', input.email);
    formData.append('phoneNumber', input.phoneNumber);
    formData.append('password', input.password);
    // if (input.file) {
    //   formData.append('file', input.file);
    // }

    try {
        dispatch(setLoading(true));
        const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        });
        console.log('Full response:', res); // Log the full response here
        console.log(res);
        console.log(res.data.data.message);

        if (res.data.data && res.data.data.success) {
            navigate('/login');
            toast.success(res.data.data.message);
        } else if (res.data && !res.data.success) {
            toast.error(res.data.message);
        } else {
            toast.error('Unexpected response structure');
        }
    } catch (error) {
        console.log('Error response:', error.response);
        toast.error(error.response?.data?.message || 'Something went wrong');
    } finally {
        dispatch(setLoading(false));
    }
};


  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div className="relative min-h-screen bg-gray-900 text-white flex flex-col items-center font-sans overflow-x-hidden">
      <Navbar />
      <div className="flex items-center justify-center w-full h-full px-4 sm:px-8 md:px-16">
        <form
          onSubmit={submitHandler}
          className="w-full max-w-md bg-gray-800 bg-opacity-80 border border-gray-700 rounded-lg p-8 shadow-lg my-10"
        >
          <h1 className="font-bold text-3xl mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300">
            Sign Up
          </h1>
          <div className="my-4">
            <Label className="text-sm text-gray-300">Full Name</Label>
            <Input
              type="text"
              value={input.fullname}
              name="fullname"
              onChange={changeEventHandler}
              placeholder="patel"
              className="w-full mt-1 p-2 bg-gray-700 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
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
            <Label className="text-sm text-gray-300">Phone Number</Label>
            <Input
              type="text"
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={changeEventHandler}
              placeholder="8080808080"
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
          {/* <div className="flex flex-col space-y-4"> */}
            {/* <RadioGroup className="flex items-center gap-4 my-5"> */}
              {/* <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === 'student'}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r1" className="text-gray-300">Student</Label>
              </div> */}
            {/* </RadioGroup> */}
            {/* <div className="flex flex-col items-center">
              <Label className="text-sm text-gray-300 mb-1">Profile Pic</Label>
              <label className="cursor-pointer py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                Choose Image
                <Input
                  accept="image/*"
                  type="file"
                  onChange={changeFileHandler}
                  className="hidden"
                />
              </label>
              {input.file && (
                <p className="mt-2 text-sm text-gray-400">
                  Selected: {input.file.name}
                </p>
              )}
            </div> */}
          {/* </div> */}
          {loading ? (
            <Button className="w-full py-3 text-lg bg-blue-600 rounded-lg flex justify-center items-center mt-4">
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full py-3 text-lg bg-yellow-500 hover:bg-yellow-600 rounded-lg transition-colors duration-200 mt-4">
              Signup
            </Button>
          )}
          <div className="text-center mt-4">
            <span className="text-sm text-gray-400">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-400 hover:text-blue-500 transition-colors duration-200">
                Login
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
