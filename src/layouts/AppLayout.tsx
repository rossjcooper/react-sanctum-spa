import { ReactNode } from "react";
import Sidebar from "../components/Sidebar";

interface AppLayoutProps {
	children: ReactNode,
}

export const AppLayout = (props: AppLayoutProps) => {

	return (
		<div className="flex w-screen h-screen bg-gray-100">
			<aside className="flex-0 flex shadow-sm">
				<Sidebar />
			</aside>
			<div className="flex flex-col flex-1">
				<header className="flex-0 bg-white shadow-sm p-4 h-16 flex"></header>
				<main className="flex-1 overflow-auto">{props.children}</main>
			</div>
		</div>
	);
}

export default AppLayout;