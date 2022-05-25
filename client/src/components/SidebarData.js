import React from "react";
// import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";
import * as BiIcons from "react-icons/bi";

export const SidebarData = [
  {
    title: "Overview",
    path: "/overview",
    icon: <AiIcons.AiFillHome />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "Users",
        path: "/overview/users",
        icon: <IoIcons.IoIosPaper />,
      },
      {
        title: "Admins",
        path: "/overview/admins",
        icon: <IoIcons.IoIosPaper />,
      },
    ],
  },
  {
    title: "Yahoo",
    path: "/yahoo",
    icon: <RiIcons.RiAuctionFill />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "Orders",
        path: "/yahoo/orders",
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
      {
        title: "Payments",
        path: "/yahoo/payments",
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
      {
        title: "Trackings",
        path: "/yahoo/trackings",
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
      {
        title: "Historys",
        path: "/yahoo/historys",
        icon: <IoIcons.IoIosPaper />,
      },
      {
        title: "Add",
        path: "/yahoo/add",
        icon: <IoIcons.IoIosAdd />,
      },
    ],
  },
  {
    title: "Tracking",
    path: "/tracking",
    icon: <BiIcons.BiCurrentLocation />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "Shimizu",
        path: "/tracking/shimizu",
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
      {
        title: "Mercari",
        path: "/tracking/mercari",
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
      {
        title: "Fril",
        path: "/tracking/fril",
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
      {
        title: "Web123",
        path: "/tracking/web123",
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
      {
        title: "All",
        path: "/tracking/all",
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
    ],
  },
  {
    title: "Logout",
    path: "/logout",
    icon: <IoIcons.IoMdLogOut />,
  },
];
