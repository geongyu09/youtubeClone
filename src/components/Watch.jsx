import React from "react";
import { useLocation, useParams } from "react-router-dom";
import ChannelIcon from "./ChannelIcon";
import { useQuery } from "@tanstack/react-query";
import { useYoutube } from "../contexts/YoutubeContext";
import VideoCard from "./VideoCard";

export default function Watch({ search }) {
	const youtube = useYoutube();
	const { state: video } = useLocation();
	const { videoId } = useParams();
	const {
		snippet: { title, channelTitle, description, channelId },
	} = video;
	//id
	let id = video.id.kind
		? video.id.kind === "youtube#video"
			? video.id.videoId
			: video.id.channelId
		: video.id;
	//query
	const {
		data: relatedVideos,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["relatedVideos", id],
		queryFn: () => {
			return youtube.getRelatedVideos(id);
		},
		staleTime: 1000 * 60 * 60,
	});

	return (
		<>
			{isLoading && <h1>Loading...</h1>}
			{error && <h1>error</h1>}
			{video && relatedVideos ? (
				<section className="flex flex-col justify-between lg:flex-row">
					<article className="px-5  w-full">
						<iframe
							title="hi"
							type="text/html"
							width="100%"
							height="520px"
							src={`https://www.youtube.com/embed/${videoId}`}
							frameBorder="0"
							className="rounded-md"
						></iframe>
						<h1 className="font-bold text-xl my-3">{title}</h1>
						<div className="flex items-center">
							<ChannelIcon channelId={channelId} />
							<h1>{channelTitle}</h1>
						</div>
						<pre className="bg-zinc-800 p-5 rounded-xl mt-5 w-full max-w-full whitespace-pre-wrap">
							{description}
						</pre>
					</article>
					<section className="mx-5">
						<ul>
							{relatedVideos.map((video) => (
								<VideoCard
									video={video}
									related={true}
									key={search ? video.id.videoId : video.id}
								/>
							))}
						</ul>
					</section>
				</section>
			) : null}
		</>
	);
}
