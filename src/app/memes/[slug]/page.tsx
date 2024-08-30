"use client";

import { NextPage } from "next";
import { useSearchParams } from 'next/navigation';
import Image from "next/image";
import { useState, createRef, RefObject, useEffect } from "react";
import { exportComponentAsJPEG } from "react-component-export-image";

import Text from "@/components/text";

const Page: NextPage = () => {
    const searchParams = useSearchParams();
    const search = searchParams.get('url') as string | null;
    const [count, setCount] = useState(0);
    const memeref: RefObject<HTMLDivElement> = createRef();

    const addText = () => {
        setCount(count + 1);
    };

    const handleExport = () => {
        if (typeof window !== 'undefined') {
            exportComponentAsJPEG(memeref);
        }
    };

    return (
        <div className="flex flex-col items-center space-y-4 p-4 bg-gray-100 min-h-screen">
            <div ref={memeref} className="relative w-full max-w-lg bg-white p-4 shadow-lg rounded-lg">
                {search && (
                    <Image
                        src={search}
                        alt="meme"
                        width={400}
                        height={300}
                        className="rounded-lg"
                    />
                )}
                {Array(count).fill(0).map((_, index) => (
                    <Text key={index} />
                ))}
            </div>
            <div className="flex space-x-4">
                <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                    onClick={addText}
                >
                    Add Text
                </button>
                <button
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                    onClick={handleExport}
                >
                    Save as JPEG
                </button>
            </div>
        </div>
    );
};

export default Page;