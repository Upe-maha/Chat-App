"use client";

import LoginForm from "@/components/auth/LoginForm";
import AuthModalShell from "@/components/auth/AuthModalShell";
import Link from "next/link";

export default function LoginModal() {
    return (
        <AuthModalShell
            title="Welcome Back"
            description="Please enter your details to sign in."
            footer={
                <p className="text-center text-sm text-muted-foreground">
                    Don&apos;t have an account?{" "}
                    <Link
                        href="/register"
                        className="text-primary font-medium hover:underline"
                    >
                        Sign up
                    </Link>
                </p>
            }
        >
            <LoginForm />
        </AuthModalShell>
    );
}