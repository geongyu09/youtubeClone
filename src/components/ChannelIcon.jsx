import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useYoutube } from "../contexts/YoutubeContext";

export default function ChannelIcon({ channelId }) {
	// console.log("channel ID : " + channelId);
	const youtube = useYoutube();
	const {
		data: icon,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["channel", channelId],
		queryFn: () => {
			return youtube.getChannelIcon(channelId);
		},
		staleTime: 1000 * 60 * 60,
	});

	return (
		<>
			{isLoading && <h1>Loading</h1>}
			{error && <h1>{error}</h1>}
			{icon ? (
				<div
					style={{
						backgroundImage: `url(${icon})`,
						backgroundRepeat: "no-repeat",
						backgroundSize: "cover",
					}}
					className="w-10 h-10 rounded-full mx-3"
				></div>
			) : null}
		</>
	);
}
