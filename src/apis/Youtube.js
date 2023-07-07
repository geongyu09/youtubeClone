import axios from "axios";

const MAXRESULT = 20;

export class Youtube {
	constructor(fake) {
		//fake == ture일 시 목데이터 가져올 수 있도록 인스턴스 생성.
		if (fake) {
			this.client = axios.create({
				baseURL: "/data",
			});
			this.fake = true;
		}
		//fake ==false | 실제 서버에서 가져오도록 인스턴스 생성.
		else {
			this.fake = false;
			this.client = axios.create({
				baseURL: "https://www.googleapis.com/youtube/v3",
				params: { key: process.env.REACT_APP_KEY, part: "snippet" },
			});
		}
	}
	getTrandVideos() {
		//this.fake 불린값에 따라 각 주소로 데이터 값을 가져옮 | return : array
		if (this.fake) {
			return this.client
				.get("hotTrandData.json")
				.then((res) => res.data.items);
		} else {
			return this.client
				.get("search", {
					params: {
						maxResults: MAXRESULT,
					},
				})
				.then((res) => res.data.items);
		}
	}
	getChannelIcon(id) {
		if (this.fake) {
			return this.client
				.get("channelDetail.json")
				.then(
					(res) => res.data.items[0].snippet.thumbnails.default.url
				);
		} else {
			let data = this.client
				.get("channels", {
					params: {
						id,
					},
				})
				.then(
					(res) => res.data.items[0].snippet.thumbnails.default.url
				);
			return data;
		}
	}
	getRelatedVideos(relatedToVideoId) {
		if (this.fake) {
			return this.client
				.get("relatedVideo.json")
				.then((res) => res.data.items)
				.then((res) => {
					return res.map((item) => {
						return { ...item, id: item.id.videoId };
					});
				});
		} else {
			return this.client
				.get("search", {
					params: {
						relatedToVideoId,
						type: "video",
						maxResults: 8,
					},
				})
				.then((res) => res.data.items)
				.then((res) => {
					return res.map((item) => {
						return { ...item, id: item.id.videoId };
					});
				});
		}
	}
	getSearchingData(keyword) {
		if (this.fake) {
			return this.client
				.get("searchingData.json")
				.then((res) => res.data.items);
		} else {
			return this.client
				.get("search", {
					params: {
						maxResults: MAXRESULT,
						q: keyword,
					},
				})
				.then((res) => res.data.items);
		}
	}
	getVieosWithOwnerId(channelId) {
		if (this.fake) {
			return this.client
				.get("channeldetails.json")
				.then((res) => res.data.items);
		} else {
			return this.client
				.get("/search", {
					params: {
						maxResults: MAXRESULT,
						channelId,
					},
				})
				.then((res) => res.data.items);
		}
	}
}
