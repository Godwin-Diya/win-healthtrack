import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="flex items-center justify-between px-8 py-4 border-b bg-white">
    <Link
        href="/"
        className="text-2xl font-bold text-blue-700">
        🩺 Win HealthTrack
    </Link>

        <div className="flex items-center gap-6">
                <Link
                    href="/app/dashboard/page.tsx"
                    className="text-gray-700 hover:text-blue-600 transition"
                >
                    Home
                </Link>
                
                <Link
                    href="/app/health-check/page.tsx"
                className="text-gray-700 hover:text-blue-600 transition"
                >
                    Quick Health Check
                </Link>

                <Link
                    href="/app/login/page.tsx"
                className="text-gray-700 hover:text-blue-600 transition"
                >
                    Log In
                </Link>

                <Link
                    href="/app/signup/page.tsx"
                    className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition"
                >
                    Create Account
                </Link>

        </div>
        </nav>
    );
}

<button className="bg-blue-600 text-white px-5 py-2 rounded-lg">
        Sign Up
        </button>