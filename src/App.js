import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Videos from "./components/Videos";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { YoutubeProvider } from "./contexts/YoutubeContext";
import Watch from "./components/Watch";
import Search from "./components/Search";
import ChannelPage from "./components/ChannelPage";

const queryClient = new QueryClient();

const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
		children: [
			{
				index: true,
				element: <Videos />,
			},
			{
				path: "watch/:videoId",
				element: <Watch />,
			},
			{
				path: "search",
				element: <Search />,
			},
			{
				path: "watch/channel/:channelId",
				element: <ChannelPage/>,
			},
		],
	},
]);

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<YoutubeProvider>
				<RouterProvider router={router} />
			</YoutubeProvider>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}

export default App;
