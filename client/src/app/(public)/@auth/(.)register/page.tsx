"use client";

import RegisterForm from "@/components/auth/RegisterForm";
import AuthModalShell from "@/components/auth/AuthModalShell";
import Link from "next/link";

export default function RegisterModal() {
    return (
        <AuthModalShell
            title="Create Account"
            description="Register to start chatting."
            footer={
                <p className="text-center text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link
                        href="/login"
                        className="text-primary font-medium hover:underline"
                    >
                        Login
                    </Link>
                </p>
            }
        >
            <RegisterForm />
        </AuthModalShell>
    );
}