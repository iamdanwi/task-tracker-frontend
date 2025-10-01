import { NextResponse } from "next/server";
import api from "@/lib/axios";
import { cookies } from "next/headers";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { data, status } = await api.post("/api/auth/register", body);


        const cookieStore = await cookies();
        cookieStore.set("token", data.token);

        return NextResponse.json(data, { status });
    } catch (error: unknown) {
        const err = error as { response?: { data?: { message?: string }, status?: number } };
        return NextResponse.json(
            { message: err.response?.data?.message || "Server error" },
            { status: err.response?.status || 500 }
        );
    }
}
