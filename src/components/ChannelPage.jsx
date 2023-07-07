import React from "react";
import { useParams } from "react-router-dom";
import { useYoutube } from "../contexts/YoutubeContext";
import { useQuery } from "@tanstack/react-query";
import VideoCard from "./VideoCard";
import ChannelIcon from "./ChannelIcon";

export default function ChannelPage() {
	const { channelId } = useParams();
	const youtube = useYoutube();
	const {
		data: videos,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["channelDetails", channelId],
		queryFn: () => youtube.getVieosWithOwnerId(channelId),
		staleTime: 1000 * 60 * 10,
	});
	return (
		<>
			{isLoading && <h1>Loading...</h1>}
			{error && <h1>{error}</h1>}
			{videos ? (
				<>
					<div className="w-full flex items-center my-5 flex-col">
						<ChannelIcon channelId={channelId} channelPage={true} />
						<h1 className="block font-bold text-4xl my-5">
							{videos[0].snippet.channelTitle}
						</h1>
					</div>
					<ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
						{videos.map((video) => (
							<VideoCard
								video={video}
								related={false}
								search={false}
								key={
									video.id.kind
										? video.id.kind === "youtube#video"
											? video.id.videoId
											: video.id.channelId
										: video.id
								}
							/>
						))}
					</ul>
				</>
			) : null}
		</>
	);
}
