"use client";

import { NextPage } from "next";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

import { IMeme } from "@/types/meme.types";

const Home: NextPage = () => {
    const [data, setData] = useState<IMeme[]>([]);
    const router = useRouter();

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
                    <button
                        className={'group/button rounded-lg bg-[#222222] text-black'}
                        onClick={(e: any) => router.push(`/memes/:id?url=${meme.url}`)}
                    >
                        <span
                            className={
                                'block -translate-x-1 -translate-y-1 rounded-lg border-2 border-[#222222] bg-[#ff527a] px-4 py-1 text-sm font-medium tracking-tight transition-all group-hover/button:-translate-y-2 group-active/button:translate-x-0 group-active/button:translate-y-0'
                            }
                        >
                            Edit
                        </span>
                    </button>
                </div>
            ))}
        </div>
    );
};

export default Home;