import React, { useEffect, useRef, useState } from "react";
import { Container } from "../../shared/Container";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import AccountDropdownMenu from "./AccountDropdownMenu";
import MobileHeader from "./MobileHeader";
import AdminDashboardRedirect from "./AdminDashboardRedirect";

interface HeaderProps {}

const AdminMenuLink = [
  { title: "Task", link: "/dashboard?tab=task" },
  { title: "Employee", link: "/dashboard?tab=employee" },
];
const UserMenuLink = [
  { title: "Active", link: "/user/dashboard?tab=active" },
  { title: "Pending", link: "/user/dashboard?tab=pending" },
  { title: "Completed", link: "/user/dashboard?tab=completed" },
];

const HeaderAdmin = ({}: HeaderProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const { hash, pathname, search } = location;

  const extractValue = (queryString: any) => {
    const parts = queryString.split("=");
    return parts[1];
  };

  const activeTab = extractValue(location.search);

  // console.log("location.pathname", location.pathname + location.search);
  // console.log("location", location);

  const createHandleMenuClick = (menuItem: string) => {
    return () => {
      console.log(`Clicked on ${menuItem}`);
    };
  };

  const path = location.pathname;
  const isAdmin = path.includes("admin");
  console.log("isAdmin",isAdmin)

  // if (isAdmin) {
  //   console.log("The word 'admin' exists in the string.");
  // } else {
  //   console.log("The word 'admin' does not exist in the string.");
  // }

  if (path == "/" || path == "/signup" || path == "/admin") return null;


//   useEffect(() => {
//     // Check if the current path is /admin/dashboard
//     if (location.pathname == '/admin/dashboard') {
//       // Append the query parameter to the current path
//       const newPath = `${location.pathname}?tab=task`;
//       // Navigate to the new path
//       navigate(newPath, { replace: true });
//       navigate('/admin/dashboard?tab=task');
//     }
//  }, [location]);

  return (
    <div className="11bg-blue-800 11bg-blue-800 bg-blue-default bg-primary  ">
      <AdminDashboardRedirect />
      <Container className="desktop-view">
        <div className="flex gap-20 items-center h-14">
          <div className="text-white text-4xl">LOGO</div>
          <div className="flex gap-6 items-center">
            { AdminMenuLink.map((db: any, index: any) => (
                  <NavLink
                    key={index}
                    className={
                      location.pathname + location.search == db.link
                        ? "border-b-2 border-solid border-white text-white"
                        : "text-white border-b-2 border-solid border-transparent"
                    }
                    to={db.link}
                  >
                    {db.title}
                  </NavLink>
                ))
             }
          </div>
          <div className="ml-auto">
            <AccountDropdownMenu isAdmin={isAdmin} />
          </div>
        </div>
      </Container>

      {/* <div className="mobile-view">
        <MobileHeader
          MenuList={isAdmin ? AdminMenuLink : UserMenuLink}
          path={location.pathname + location.search}
        />
      </div> */}
    </div>
  );
};

export default HeaderAdmin;
