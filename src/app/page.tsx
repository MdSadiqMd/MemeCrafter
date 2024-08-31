"use client";

import { NextPage } from "next";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { IMeme } from "@/types/meme.types";
import Loader from "@/components/loader";

const Home: NextPage = () => {
  const [data, setData] = useState<IMeme[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredData, setFilteredData] = useState<IMeme[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/meme");
        setData(response.data.data.memes);
        setFilteredData(response.data.data.memes);
        setLoading(false);
      } catch (error) {
        console.error("Meme fetch failed", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      setFilteredData(
        data.filter(meme =>
          meme.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredData(data);
    }
  }, [searchQuery, data]);

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8 flex items-center justify-center">
        Meme Crafters
        <Image src='/icon.png' width={50} height={50} alt="brahmanandam" />
      </h1>
      <div className="mb-6 max-w-md mx-auto">
        <input
          type="text"
          placeholder="Search memes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <Loader />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredData.map((meme) => (
            <div key={meme.id} className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105">
              <Image
                src={meme.url}
                alt={meme.name}
                width={meme.width}
                height={meme.height}
                className="object-cover w-full h-40"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{meme.name}</h3>
                <button
                  className="w-full bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                  onClick={() => router.push(`/:id?url=${meme.url}`)}
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;