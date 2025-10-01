import { NextResponse } from "next/server";
import api from "@/lib/axios";
import { cookies } from "next/headers";

export async function GET() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token");
        const { data, status } = await api.get("/api/tasks", {
            headers: {
                Authorization: `Bearer ${token?.value}`
            }
        });
        return NextResponse.json(data, { status });
    } catch (error: unknown) {
        const err = error as { response?: { data?: { message?: string }, status?: number } };
        return NextResponse.json(
            { message: err.response?.data?.message || "Server error" },
            { status: err.response?.status || 500 }
        );
    }
}
