import React, { useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import { SidebarData } from "./SidebarData";
import SubMenu from "./SubMenu";
import { IconContext } from "react-icons/lib";
import { Bell } from "./Bell";

const Nav = styled.div`
  background: #15171c;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
`;

const NavIcon = styled(Link)`
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  text-decoration: none;
  color: white;
  &:hover {
    color: white;
  }
`;
const NavIconNoLink = styled.div`
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  text-decoration: none;
  color: white;
  &:hover {
    color: white;
  }
`;

const SidebarNav = styled.nav`
  background: #15171c;
  width: 250px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
  transition: 350ms;
  z-index: 10;
`;

const SidebarWrap = styled.div`
  height: 100vh;
  overflow-y: scroll;
  width: 100%;
  &::-webkit-scrollbar {
    width: 1px;
  }
`;

const Sidebar = ({ sidebar, setSidebar }) => {
  const showSidebar = () => setSidebar(!sidebar);
  useEffect(() => {
    const keydownHandler = (e) => {
      if (e.keyCode === 66 && e.ctrlKey) {
        showSidebar();
      }
    };
    document.addEventListener("keydown", keydownHandler);
    return () => {
      document.removeEventListener("keydown", keydownHandler);
    };
  });
  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <SidebarNav sidebar={sidebar}>
          <SidebarWrap>
            <NavIcon to="#" style={{ marginRight: "1rem" }}>
              <AiIcons.AiOutlineClose onClick={showSidebar} />
            </NavIcon>
            {SidebarData.map((item, index) => {
              return <SubMenu item={item} key={index} />;
            })}
          </SidebarWrap>
        </SidebarNav>

        <Nav>
          <NavIcon to="/dashboard">
            <h3>Admin</h3>
          </NavIcon>
          <div style={{ width: "100px", display: "flex", columnGap: "2rem" }}>
            <NavIconNoLink>
              <Bell />
            </NavIconNoLink>
            <NavIcon to="#">
              <FaIcons.FaBars onClick={showSidebar} />
            </NavIcon>
          </div>
        </Nav>
      </IconContext.Provider>
    </>
  );
};

export default Sidebar;
