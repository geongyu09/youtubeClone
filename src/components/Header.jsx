import React from "react";
import { BsYoutube } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Header() {
	const defaultValue = window.location.search.substring(1, 99);
	const nav = useNavigate();
	const [text, setText] = useState(defaultValue);
	const onChange = (event) => {
		setText(event.target.value);
	};
	const onSubmit = (event) => {
		event.preventDefault();
		if (text === "") nav("/");
		else nav(`/search?${text}`);
	};
	return (
		<>
			<header className="w-full flex bg-zinc-800 p-4 items-center justify-between fixed z-50">
				<div
					onClick={() => nav("/")}
					className="flex ml-5 cursor-default"
				>
					<BsYoutube className="text-white text-3xl mr-5" />
					<h1 className="text-xl">Youtube</h1>
				</div>
				<form className="flex w-1/3" onSubmit={onSubmit}>
					<input
						type="text"
						placeholder="Search"
						className="outline-none w-full rounded-l-md px-2 text-black"
						value={text}
						onChange={onChange}
						maxLength={99}
					/>
					<button className="px-4 py-1 bg-slate-900 rounded-r-md">
						🔍
					</button>
				</form>
				<div></div>
			</header>
			<hr className="text-red-300" />
		</>
	);
}
