import React from "react";
import TeacherCourse from "../components/Teacher/TeacherCourse";
import CourseDetails from "../components/Teacher/CourseDetails";
import AboutCourse from "../components/Teacher/AboutCourse";
import Modules from "../components/Teacher/Modules";
import Assignments from "../components/Teacher/Assignments";
import Quiz from "../components/Teacher/Quiz";
import AllAssignments from "../components/Teacher/AllAssignments";
import AllQuiz from "../components/Teacher/AllQuiz";
import MasterClass from "../components/Teacher/MasterClass";
import Shedule from "../components/Teacher/Shedule";
import Profile from "../components/Teacher/Profile";
import ChatRoom from "../components/Teacher/ChatRoom";

const teacherRoutes = [
    {
        path: "",
        element: <TeacherCourse/>,
      },
      {
        path: "coursedetails",
        element: <CourseDetails/>,
        children: [
          {
            path: "",
            element: <AboutCourse/>,
          },
          {
            path: "modules",
            element: <Modules/>,
          },
          {
            path: "assignments",
            element: <Assignments/>,
          },
          {
            path: "quiz",
            element: <Quiz/>,
          },
          {
            path: "comments",
            element: <ChatRoom/>,
          },
        ],
      },
      {
        path: "allassignments",
        element: <AllAssignments/>,
      },
      {
        path: "allquiz",
        element: <AllQuiz/>,
      },
      {
        path: "masterclasses",
        element: <MasterClass/>,
      },
      {
        path: "shedule",
        element: <Shedule/>,
      },
      {
        path: "profile",
        element: <Profile/>,
      },
];

export { teacherRoutes };






