import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SidebarMenuBlocks from "../components/extra/SidebarMenuBlocks";

const DefaultSidebar = ({ isMenuOpen, settings, data }) => {
  //   const { user } = useSelector((state) => state.user);
  const [sideBar, setSidebar] = useState([]);

  const adminSidebarMenu = [
    {
      _id: "1",
      menuTitle: "Statistics & Analytics",
      menuData: [
        {
          _id: 1,
          menuLabel: "Dashboard",
          menuLink: "/admin/dashboard",
          menuIcon: "fa-grid-2",
          menuIconColor: "text-rose-500",
        },
      ],
    },
    {
      _id: "2",
      menuTitle: "Page Managements",
      menuData: [
        {
          _id: 1,
          menuLabel: "Pages",
          menuLink: "/admin/pages",
          menuIcon: "fa-light fa-memo",
          menuIconColor: "text-rose-500",
        },
      ],
    },
  ];

  //   useEffect(() => {
  //     if (getRole(user?.role, roleCode?.admin)) {
  //       setSidebar([...adminSidebarMenu]);
  //     } else if (getRole(user?.role, roleCode?.company_administrator)) {
  //       setSidebar([...administratorSidebarMenu]);
  //     } else if (getRole(user?.role, roleCode?.company_manager)) {
  //       setSidebar([...managerSidebarMenu]);
  //     }
  //   }, [user]);
  //   !siteSetting ? "animate-pulse bg-gray-300 " :

  return (
    <>
      <div className="relative w-full bg-primaryAlt divide-y divide-secondaryColor pt-16 lg:pt-0">
        <div
          className={
            `relative flex items-center gap-4 h-16 transition-all duration-100 ${null} ` +
            (isMenuOpen ? "px-3" : "px-4")
          }
        >
          <Link className="w-auto h-44 min-w-[40px] " to={"/"} replace>
            <img
              className="w-full h-full object-contain"
              src={!isMenuOpen ? data?.logo : data?.fav}
              alt={"Logo"}
            />
          </Link>
        </div>
        <div
          className={
            "relative overflow-auto scroll-smooth scrollbar scrollbar-1 h-[calc(100%-4rem)] transition-all duration-100 divide-y " +
            (isMenuOpen ? " divide-slate-800" : "divide-transparent")
          }
        >
          {Array.isArray(sideBar) &&
            adminSidebarMenu.map((item, index) => (
              <SidebarMenuBlocks
                key={item._id}
                menuTitle={item.menuTitle}
                menuData={item.menuData}
                isMenuOpen={isMenuOpen}
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default DefaultSidebar;
