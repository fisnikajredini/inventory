import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { SidebarData } from './SidebarData';
import SidebarSubM from './SidebarSubM';
import logo from '../logo.png'

const Nav = styled.div`
  background: #15171c;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: #01ced1;
  &:hover{
      color: #fff;
  }
`;

const SidebarNav = styled.nav`
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
  transition: 350ms;
  z-index: 10;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;


const Sidebar = () => {
    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);
    return (
        <>
        <Nav>
        <NavIcon to="#">
            <FaIcons.FaBars onClick={showSidebar}/>
        </NavIcon>
        </Nav>
        <SidebarNav className="SidebarNav" sidebar={sidebar}>
            <SidebarWrap>
                <NavIcon to="#">
                    <AiIcons.AiOutlineClose onClick={showSidebar} />
                </NavIcon>
                <div className="profile">
                    <div className="img-holder">
                        <img src={logo} alt="logo"/>
                    </div>
                    <div className="profile-name">
                        Irfan Ferati
                    </div> <button class="btn btn-danger mt05">Log Out</button>
                </div>
                {SidebarData.map((item, index) => {
                    return <SidebarSubM item={item} key={index}  />;
                })}
            </SidebarWrap>
            <div className="footer"><p>Powered by 2BMedia</p></div>
        </SidebarNav>
        </>
    );
};

export default Sidebar
