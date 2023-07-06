import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useYoutube } from "../contexts/YoutubeContext";

import VideoCard from "./VideoCard";

export default function Videos() {
	const youtube = useYoutube();
	const {
		data: videos,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["hotTrand"],
		queryFn: () => {
			return youtube.getTrandVideos();
		},
		staleTime: 1000 * 60 * 5,
		refetchOnWindowFocus: false,
		refetchOnMount: false,
	});
	return (
		<>
			{isLoading && <h1>Loading...</h1>}
			{error && <h1>error : {error}</h1>}
			{videos ? (
				<ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
					{videos.map((video) => {
						return (
							<VideoCard key={video.id.videoId || video.id} video={video} />
						);
					})}
				</ul>
			) : null}
		</>
	);
}
