import logo from "../img/logo.png";
import LogoutButton from "../components/LogoutButton";
import { Link, NavLink, To } from "react-router-dom";
import { ReactNode } from "react";

interface SideBarLinkProps {
	to: To,
	children: ReactNode,
}

const SideBarLink = (props: SideBarLinkProps) => {
	return (
		<div className="p-2 text-left">
			<NavLink to={props.to} className={({ isActive }) => 'p-2 w-full block rounded text-left text-white ' + (isActive ? 'bg-primary' : 'hover:text-secondary')}>{props.children}</NavLink>
		</div>
	);
}

export const Sidebar = () => {

	return (
		<div className="bg-gray-800 text-white flex-1 w-40 flex flex-col">
			<div className="w-full p-4 flex h-16">
				<img src={logo} alt="Logo" className="max-w-full max-h-full self-center m-auto"/>
			</div>
			<div className="flex flex-col flex-1 p-1">
				<SideBarLink to='/'>Dashboard</SideBarLink>
				<SideBarLink to='/clients'>Clients</SideBarLink>
				

				<div className="mt-auto">
					<LogoutButton />
				</div>
			</div>
		</div>
	);
}

export default Sidebar;