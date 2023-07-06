import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useYoutube } from "../contexts/YoutubeContext";
import VideoCard from "./VideoCard";

let q;
setInterval(() => {
	let path = window.location.search.slice(1, window.location.search.length);
	if (q !== path) q = path;
}, 0);

export default function Search() {
	const [keyword, setKeyword] = useState(q);
	setInterval(() => {
		if (q !== keyword) {
			setKeyword(q);
		}
	}, 500);

	const youtube = useYoutube();
	const {
		data: videos,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["search", keyword],
		queryFn: () => {
			return youtube.getSearchingData(keyword);
		},
		staleTime: 1000 * 60 * 10,
		refetchOnMount: true,
		refetchOnWindowFocus: false,
	});
	return (
		<>
			{isLoading && <h1>Loading..</h1>}
			{error && <h1>error : {error}</h1>}
			<ul className=" w-full mt-10">
				{videos
					? videos.map((video) => (
							<VideoCard
								key={video.id.videoId || video.id}
								video={video}
								search={true}
							/>
					  ))
					: null}
			</ul>
		</>
	);
}
