"use client";

import { NextPage } from "next";
import { useState, useEffect } from "react";
import axios from "axios";

import { IMeme } from "@/types/meme.types";

const Home: NextPage = () => {
    const [data, setData] = useState<IMeme[]>([]);

    useEffect(() => {
        onMount().then((memes) => {
            if (memes) {
                setData(memes);
            }
        });
    }, []);

    const onMount = async () => {
        try {
            const response = await axios.get("/api/meme");
            console.log("Memes Fetched", response);
            return response.data.data.memes;
        } catch (error) {
            console.error("Meme fetch failed", error);
        }
    };

    return (
        <div className="row">
            {data.map((meme) => (
                <div key={meme.id} className="meme">
                    <h3>{meme.name}</h3>
                    <img src={meme.url} alt={meme.name} width={meme.width} height={meme.height} />
                </div>
            ))}
        </div>
    );
};

export default Home;