import LoginForm from "@/components/auth/login-form";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { toast } from "sonner";

export default async function LoginPage() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (session) {
        redirect("/");
    }
    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-midnightpurple via-midnightpurple to-black">
            <LoginForm />
        </div>
    );
}
