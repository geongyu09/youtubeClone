import React from "react";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import ChannelIcon from "./ChannelIcon";

export default function VideoCard({ video, related, search }) {
	const {
		snippet: {
			title,
			channelTitle,
			channelId,
			publishedAt,
			thumbnails: {
				medium: { url: thumbnail },
			},
		},
	} = video;

	let key = video.id.videoId
		? video.id.videoId
		: video.id.channelId
		? video.id.channelId
		: video.id;
	console.log(key);

	return (
		<Link
			to={`/watch/${
				video.id.kind
					? video.id.kind === "youtube#channel"
						? `channel/${video.id.channelId}`
						: video.id.videoId
					: video.id
			}`}
			state={video}
		>
			<li
				key={key}
				className={related ? "flex mb-5" : search ? "flex m-10" : ""}
			>
				<img
					alt="thumbnail"
					src={thumbnail}
					className={
						related
							? "w-44 mr-2 rounded-lg"
							: search
							? "w-96 mx-10 rounded-lg"
							: "w-full rounded-lg"
					}
				/>
				<div className={related ? "w-80" : search ? "w-full" : ""}>
					<div>
						<p
							className={` ${
								related
									? "line-clamp-1"
									: search
									? "text-lg"
									: ""
							}`}
						>
							{title}
						</p>
						<div className="flex mt-4">
							{search ? (
								video.id.kind !== "youtube#channel" ? (
									<ChannelIcon
										channelId={channelId}
										search={true}
									/>
								) : null
							) : null}
							<div className="z-0 relative">
								<p className={`opacity-50 z-0`}>
									{channelTitle}
								</p>
								<p className="opacity-50 z-0">
									{format(publishedAt)}
								</p>
							</div>
						</div>
					</div>
				</div>
			</li>
		</Link>
	);
}
