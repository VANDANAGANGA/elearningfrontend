import React from 'react';
import { createBrowserRouter, Outlet,RouterProvider } from "react-router-dom"
import Registration from './components/Main/Registration';
import Home from './components/Main/Home';
import Header from './components/Main/Header';
import Footer from "./components/Main/Footer";
import Login from "./components/Main/Login";
import Category from "./components/Main/Category";
import AdminHome from "./components/Admin/AdminHome";
import Sidebar from "./components/Admin/Sidebar";
import Teachermanagement from "./components/Admin/Teachermanagement";
import { FaCashRegister } from "react-icons/fa";
import DashBoard from "./components/Admin/DashBoard";
import AdminCategory from "./components/Admin/AdminCategory";
import StudentHome from "./components/Student/StudentHome";
import TeacherHome from "./components/Teacher/TeacherHome";
import Studentmanagement from "./components/Admin/Studentmanagement";
import AdminCourses from "./components/Admin/Courses";
import TeacherCourse from "./components/Teacher/TeacherCourse";
import CourseDetails from "./components/Main/CourseDetails";
import Modules from "./components/Teacher/Modules";
import AboutCourse from "./components/Teacher/AboutCourse";
import Assignments from "./components/Teacher/Assignments";
import Course from "./components/Main/Course";
import AllCourses from "./components/Main/AllCourses";
import About from "./components/Main/About";
import Team from "./components/Main/Team";
import Pricing from "./components/Main/Pricing";
import Contact from "./components/Main/Contact";
import TeacherRegistration from "./components/Main/TeacherRegistration";
import StudentRegistration from "./components/Main/StudentRegistration";
import { adminRoutes } from "./routes/AdminRouter";
import { teacherRoutes } from "./routes/TeacherRouter";
import { studentRoutes } from "./routes/StudentRouter";
import { AdminPrivateRoute, StudentPrivateRoute, TeacherPrivateRoute } from "./routes/PrivateRoute";
import ForgotPassword from './components/Main/ForgotPassword';

function App() {
  return (
    <>
      <Header/>  
     <Outlet/>
    </>
  );
}
const appRouter=createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[
      {
        path:"/",
        element:<Home/>,
      },
      {
        path:"register",
        element:<Registration/>
      },
      {
        path:"studentregistration",
        element:<StudentRegistration/>
      },
      {
        path:"teacherregistration",
        element:<TeacherRegistration/>
      },
      {
        path:"login",
        element:<Login/>
      },
      {
        path:"forgotpassword",
        element:<ForgotPassword/>
      },
      {
        path:"courses",
        element:<Course/>
      },
      {
        path:"about",
        element:<About/>
      },
      {
        path:"team",
        element:<Team/>
      },
      {
        path:"pricing",
        element:<Pricing/>
      },
      {
        path:"contact",
        element:<Contact/>
      },
      {
        path:"coursedetails/:courseId",
        element:<CourseDetails/>
      },
     
    ]},
    {
        path:"admin",
        element:<AdminPrivateRoute><AdminHome/></AdminPrivateRoute>,
        children:adminRoutes
      },
      {
        path:"student",
        element: <StudentPrivateRoute><StudentHome/></StudentPrivateRoute>,
        children: studentRoutes
      },
      {
        path:"teacher",
        element:<TeacherPrivateRoute><TeacherHome/></TeacherPrivateRoute>,
        children: teacherRoutes
      }
      
    ]
);
function Root() {
  return (
    <RouterProvider router={appRouter}>
      <App />
    </RouterProvider>
  );
}
export default Root;
