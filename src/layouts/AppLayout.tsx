import { ReactNode, useContext } from "react";
import Sidebar from "../components/Sidebar";
import AuthContext from "../contexts/AuthContext";
import ProfileButton from "../components/ProfileButton";

interface AppLayoutProps {
	header?: ReactNode,
	children: ReactNode,
}

export const AppLayout = (props: AppLayoutProps) => {
	const { user } = useContext(AuthContext);
	return (
		<div className="flex w-screen h-screen bg-gray-100">
			<aside className="flex-0 flex shadow-sm">
				<Sidebar />
			</aside>
			<div className="flex flex-col flex-1">
				<header className="flex-0 bg-white shadow-sm p-4 h-16 flex items-center">
					<div className="flex-1 mr-auto text-left">
						{props.header}
					</div>
					<div className="flex-1 ml-auto text-right">
						<ProfileButton />
					</div>
				</header>
				<main className="flex-1 overflow-auto">{props.children}</main>
			</div>
		</div>
	);
}

export default AppLayout;