import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useYoutube } from "../contexts/YoutubeContext";

export default function ChannelIcon({ channelId, channelPage, search }) {
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
					className={` rounded-full ${
						channelPage ? "w-40 h-40" : "w-10 h-10"
					} ${search ? "mr-3 " : "mx-3"}`}
				></div>
			) : null}
		</>
	);
}
