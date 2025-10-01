import { NextResponse } from "next/server";
// import api from "@/lib/axios";
import { cookies } from "next/headers";

export async function POST() {
    try {
        // const { data, status } = await api.post("/api/auth/logout");
        const cookieStore = await cookies();
        cookieStore.delete("token");
        return NextResponse.json({ success: true }, { status: 200 });
        // return NextResponse.json(data, { status });
    } catch (error: unknown) {
        const err = error as { response?: { data?: { message?: string }, status?: number } };
        return NextResponse.json(
            { message: err.response?.data?.message || "Server error" },
            { status: err.response?.status || 500 }
        );
    }
}
