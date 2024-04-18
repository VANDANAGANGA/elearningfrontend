import React from "react";
import { Outlet } from "react-router-dom";
import StudentCourse from "../components/Student/StudentCourse";
import StudentCourseDetails from "../components/Student/StudentCourseDetails";
import StudentModule from "../components/Student/StudentModule";
import StudentAssignments from "../components/Student/StudentAssignment";
import StudentAboutCourse from "../components/Student/StudentAboutCourse";
import StudentQuiz from "../components/Student/StudentQuiz";
import MyProfile from "../components/Student/Myprofile";
import ChatRoom from "../components/Teacher/ChatRoom";
import Certificate from "../components/Student/Certificate";


function StudentRouter() {
  return (
    <>
      <header>Student Header</header>
      <Outlet />
    </>
  );
}

const studentRoutes = [
    {
        path: "",
        element: <StudentCourse/>,
      },
      {
        path: "coursedetails",
        element: <StudentCourseDetails/>,
        children: [
          {
            path: "",
            element: <StudentAboutCourse/>,
          },
          {
            path: "modules",
            element: <StudentModule/>,
          },
          {
            path: "assignments",
            element: <StudentAssignments/>,
          },
          {
            path: "quiz",
            element: <StudentQuiz/>,
          },
          {
            path: "comments",
            element: <ChatRoom/>,
          },
          {
            path: "certificate",
            element: <Certificate/>,
          },
        ],
      },
      {
          path: "profile",
          element: <MyProfile/>,
        },
      
];

export { StudentRouter, studentRoutes };
