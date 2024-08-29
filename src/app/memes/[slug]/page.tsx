"use client";

import { NextPage } from "next";
import { useSearchParams } from 'next/navigation';
import Image from "next/image";

const Page: NextPage = () => {
    const searchParams = useSearchParams();
    const search = searchParams.get('url') as string;

    return (
        <>
            <h1>edit page</h1>
            <Image
                src={search}
                alt="meme"
                width={200}
                height={300}
            />
            <button
                className={'group/button rounded-lg bg-[#222222] text-black'}
            >
                <span
                    className={
                        'block -translate-x-1 -translate-y-1 rounded-lg border-2 border-[#222222] bg-[#ff527a] px-4 py-1 text-sm font-medium tracking-tight transition-all group-hover/button:-translate-y-2 group-active/button:translate-x-0 group-active/button:translate-y-0'
                    }
                >
                    Edit
                </span>
            </button>
        </>
    );
};

export default Page;