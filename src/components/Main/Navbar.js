import React, { useState, useEffect } from 'react';
import Avatar from 'react-avatar';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
<<<<<<< HEAD
import { useEffect } from 'react';
=======
>>>>>>> 532dd73d11bdb86b1b550517d541443b0ac3dc8e
import instance from '../../routes/axios';
import { baseUrl } from '../../utils/urls';
import { deleteUser } from '../../Store/authSlice';
import { useDispatch } from 'react-redux';

function Navbar() {
<<<<<<< HEAD
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const [profilePic,setProfilePic]=useState()
  const user = useSelector(state => state.authUser.user); 
  
  const handleLogout = () => {
    const refreshToken = localStorage.getItem('refresh');
    if (refreshToken) {
    instance.post('logout/', { refresh:refreshToken })
      .then(response => {
        console.log('Logged out successfully:', response);
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        dispatch(deleteUser());
        navigate('/login'); 
      })
      .catch(error => {
        console.error('Error logging out:', error);
      });
    }
  };


   useEffect(() => {
=======
  const navigate = useNavigate();
  const [profilePic, setProfilePic] = useState(null);
  const user = useSelector((state) => state.authUser.user); // Accessing user details from Redux store

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  useEffect(() => {
>>>>>>> 532dd73d11bdb86b1b550517d541443b0ac3dc8e
    const fetchProfilePic = async () => {
      if (!user?.id) return;

      try {
        const response = await instance.get('profilepic/', {
<<<<<<< HEAD
          params: { id: user?.id },
=======
          params: { id: user.id },
>>>>>>> 532dd73d11bdb86b1b550517d541443b0ac3dc8e
        });
        setProfilePic(response.data.profile_pic);
      } catch (error) {
        console.error('Error fetching profile picture:', error);
      }
    };

    fetchProfilePic();
  }, [user]); // Correctly set the dependency array

  return (
    <header className="mt-4">
      <nav className="flex justify-between items-center bg-white bg-opacity-20 h-[85px] px-8">
        <div>
<<<<<<< HEAD
            <h1 style={{ margin: '-1', padding: '-1' }}  className="text-gray-500 font-[900] text-[35px] my-0 py-0">SKILLSAGA</h1>
            <span style={{ margin: '-1', padding: '-1' }}  className="text-gray-500 text-[18px] my-0 py-0 ">ONLINE EDUCATION & LEARNING</span>
=======
          <h1 style={{ margin: '-1', padding: '-1' }} className="text-gray-500 font-[900] text-[35px] my-0 py-0">
            SKILLSAGA
          </h1>
          <span style={{ margin: '-1', padding: '-1' }} className="text-gray-500 text-[18px] my-0 py-0">
            ONLINE EDUCATION & LEARNING
          </span>
        </div>
        <div className="flex items-center justify-center h-[85px] w-[300px]">
          <div className="pr-4">
            <h4>Welcome {user?.name?.toUpperCase()}</h4>
>>>>>>> 532dd73d11bdb86b1b550517d541443b0ac3dc8e
          </div>
          <div>
            <Avatar size="60" round={true} src={`${baseUrl}${profilePic}`} />
          </div>
          <div className="pl-4">
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
