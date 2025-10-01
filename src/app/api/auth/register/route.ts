import { NextResponse } from "next/server";
import api from "@/lib/axios";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { data, status } = await api.post("/api/auth/register", body, {
            withCredentials: true, // allow cookie to pass
        });

        // Forward the full response from backend (message, token, user)
        return NextResponse.json(data, { status });
    } catch (error: unknown) {
        const err = error as { response?: { data?: { message?: string }, status?: number } };
        return NextResponse.json(
            { message: err.response?.data?.message || "Server error" },
            { status: err.response?.status || 500 }
        );
    }
}
