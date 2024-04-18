import React from "react";
import { Outlet } from "react-router-dom";

import AdminCategory from "../components/Admin/AdminCategory";
import Teachermanagement from "../components/Admin/Teachermanagement";
import AdminCourses from "../components/Admin/Courses";
import Studentmanagement from "../components/Admin/Studentmanagement";
import DashBoard from "../components/Admin/DashBoard";
import Salesreport from "../components/Admin/Salesreport";


function AdminRouter() {
  return (
    <>
      <header>Admin Header</header>
      <Outlet />
    </>
  );
}

const adminRoutes = [
  {
    path: "",
    element: <DashBoard/>,
  },
  {
      path: "coursecategory",
      element: <AdminCategory />,
    },
    {
      path: 'teachermanagement',
      element: <Teachermanagement />,
    },
    {
      path: 'studentmanagement',
      element: <Studentmanagement />,
    },
    {
      path: 'courses',
      element: <AdminCourses />,
    },
    {
      path: 'salesreport',
      element: <Salesreport/>,
    },
   
];

export { AdminRouter, adminRoutes };