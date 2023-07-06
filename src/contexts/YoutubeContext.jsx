import { createContext, useContext } from "react";
import { Youtube } from "../apis/Youtube";

//mock data 여부 | true : mock , false : real data
let fake = false;

const youtubeContext = createContext();

const youtube = new Youtube(fake);

export const YoutubeProvider = ({ children }) => {
	return (
		<youtubeContext.Provider value={youtube}>
			{children}
		</youtubeContext.Provider>
	);
};

export const useYoutube = () => {
	return useContext(youtubeContext);
};
