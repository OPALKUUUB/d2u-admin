import React from "react";
// import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";

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
    path: "/Yahoo",
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
  //   {
  //     title: "Products",
  //     path: "/products",
  //     icon: <FaIcons.FaCartPlus />,
  //   },
  //   {
  //     title: "Team",
  //     path: "/team",
  //     icon: <IoIcons.IoMdPeople />,
  //   },
  //   {
  //     title: "Messages",
  //     path: "/messages",
  //     icon: <FaIcons.FaEnvelopeOpenText />,

  //     iconClosed: <RiIcons.RiArrowDownSFill />,
  //     iconOpened: <RiIcons.RiArrowUpSFill />,

  //     subNav: [
  //       {
  //         title: "Message 1",
  //         path: "/messages/message1",
  //         icon: <IoIcons.IoIosPaper />,
  //       },
  //       {
  //         title: "Message 2",
  //         path: "/messages/message2",
  //         icon: <IoIcons.IoIosPaper />,
  //       },
  //     ],
  //   },
  {
    title: "Logout",
    path: "/logout",
    icon: <IoIcons.IoMdLogOut />,
  },
];
