import axios, { AxiosResponse } from "axios";
import { NextResponse } from "next/server";

export const runtime = 'edge';

export async function GET() {
    try {
        const response: AxiosResponse = await axios.get(process.env.NEXT_PUBLIC_API as string);
        return NextResponse.json(response.data);
    } catch (error) {
        console.error("Error fetching data:", error);
        return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
    }
}