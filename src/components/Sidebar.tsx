import { NavLink, To } from 'react-router-dom';
import { ReactNode } from 'react';
import { AiOutlineDashboard, AiOutlineTeam } from 'react-icons/ai';
import LogoutButton from './LogoutButton';
import logo from '../img/logo.png';

interface SideBarLinkProps {
	to: To,
	children: ReactNode,
}

const SideBarLink = (props: SideBarLinkProps) => (
    <div className="p-1 text-left">
        <NavLink to={props.to} className={({ isActive }) => `p-2 w-full block rounded text-left text-white ${isActive ? 'bg-primary' : 'hover:text-secondary'}`}>{props.children}</NavLink>
    </div>
);

export const Sidebar = () => (
    <div className="bg-gray-800 text-white flex-1 w-40 flex flex-col">
        <div className="w-full p-4 flex h-16">
            <img src={logo} alt="Logo" className="max-w-full max-h-full self-center m-auto" />
        </div>
        <div className="flex flex-col flex-1 p-1">
            <SideBarLink to="/">
                <AiOutlineDashboard className="inline-block mr-1 align-text-bottom" />
                {' '}
                Dashboard
            </SideBarLink>
            <SideBarLink to="/clients">
                <AiOutlineTeam className="inline-block mr-1 align-text-bottom" />
                {' '}
                Clients
            </SideBarLink>
            <SideBarLink to="/users">
                <AiOutlineTeam className="inline-block mr-1 align-text-bottom" />
                {' '}
                Users
            </SideBarLink>

            <div className="mt-auto">
                <LogoutButton />
            </div>
        </div>
    </div>
);

export default Sidebar;
