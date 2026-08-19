import Link from "next/link";

export default function Navbar() {
return (
    <nav className="flex items-center justify-between border-b bg-white px-8 py-4">
        <Link
        href="/"
        className="text-2xl font-bold text-blue-700">
        🩺 Win HealthTrack
        </Link>

    <div className="flex items-center gap-6">
        <Link
            href="/dashboard"
            className="text-gray-700 hover:text-blue-600 transition">
            Home
        </Link>

        <Link
            href="/health-check"
            className="text-gray-700 hover:text-blue-600 transition">
            Quick Health Check
        </Link>

        <Link
            href="/blood-pressure"
            className="text-gray-700 hover:text-blue-600 transition">
            Blood Pressure
        </Link>

        <Link
            href="/bmi"
            className="text-gray-700 hover:text-blue-600 transition">
            BMI
        </Link>

        <Link
            href="/login"
            className="text-gray-700 hover:text-blue-600 transition">
            Log In
        </Link>

        <Link
            href="/signup"
            className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition">
            Create Account
        </Link>
        </div>
    </nav>
);
}