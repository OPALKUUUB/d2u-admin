import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Sidebar = styled.div`
  display: flex;
  color: #e1e9fc;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  list-style: none;
  height: 60px;
  text-decoration: none;
  font-size: 18px;

  &:hover {
    background: #252831;
    border-left: 4px solid #632ce4;
    cursor: pointer;
  }
`;

const SidebarLabel = styled.span`
  margin-left: 20px;
`;

const DropdownLink = styled(Link)`
  background: #414757;
  height: 60px;
  padding-left: 3rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #f5f5f5;
  font-size: 18px;

  &:hover {
    background: #632ce4;
    cursor: pointer;
  }
`;

const SubMenu = ({ item }) => {
  const navigate = useNavigate();
  const [subnav, setSubnav] = useState(false);
  const showSubnav = () => setSubnav(!subnav);
  if (item.path === "/logout") {
    return (
      <Sidebar
        onClick={() => {
          localStorage.removeItem("token");
          window.location.reload(false);
        }}
      >
        <div className="flex justify-start items-center"> 
          {item.icon}
          <SidebarLabel>{item.title}</SidebarLabel>
        </div>
      </Sidebar>
    );
  }
  if (item.path === "/dashboard") {
    return (
      <Sidebar onClick={() => navigate("/dashboard")}>
        <div className="flex justify-start items-center">
          {item.icon}
          <SidebarLabel>{item.title}</SidebarLabel>
        </div>
      </Sidebar>
    );
  }
  if (item.path === "/ship/billing") {
    return (
      <Sidebar onClick={() => navigate("/ship/billing")}>
        <div className="flex justify-start items-center">
          {item.icon}
          <SidebarLabel>{item.title}</SidebarLabel>
        </div>
      </Sidebar>
    );
  }
  return (
    <>
      <Sidebar onClick={item.subNav && showSubnav}>
        <div className="flex justify-start items-center">
          {item.icon}
          <SidebarLabel>{item.title}</SidebarLabel>
        </div>
        <div>
          {item.subNav && subnav
            ? item.iconOpened
            : item.subNav
            ? item.iconClosed
            : null}
        </div>
      </Sidebar>
      {subnav &&
        item.subNav.map((item, index) => {
          return (
            <DropdownLink to={item.path} key={index}>
              {item.icon}
              <SidebarLabel>{item.title}</SidebarLabel>
            </DropdownLink>
          );
        })}
    </>
  );
};

export default SubMenu;
