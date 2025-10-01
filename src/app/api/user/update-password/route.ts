import { NextResponse } from "next/server";
import api from "@/lib/axios";
import { cookies } from "next/headers";

export async function PUT(req: Request) {
    try {
        const body = await req.json();
        const cookieStore = await cookies();
        const token = cookieStore.get("token");
        const { data, status } = await api.put("/api/user/change-password", body, {
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
