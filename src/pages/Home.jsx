import React from "react";
import { Outlet } from "react-router";
import Header from "../components/Header";

export default function Home() {
	return (
		<>
			<Header />
			<div className="px-3 pt-20 z-0">
				<Outlet />
			</div>
		</>
	);
}
