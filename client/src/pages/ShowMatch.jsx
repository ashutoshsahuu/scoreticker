import React from "react";
import ScoreTicker from "../components/ScoreTicker";
import Scoreboard from "../components/ScoreboardBatter";

const ShowMatch = () => {
    return (
        <main className=" relative">
            <iframe
                className="w-full h-[100vh] md:h-[90vh]"
                src="https://www.youtube.com/embed/8ZZ5vesnRPI?si=Cjqg2PMLArUhIELs"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
            ></iframe>
            <div className="absolute w-full bottom-0">
                <ScoreTicker />
            </div>
            <div className="absolute w-full bottom-[-120%]">
                <Scoreboard />
            </div>
        </main>
    );
};

export default ShowMatch;
