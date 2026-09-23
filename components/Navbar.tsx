import Link from "next/link";

export default function Navbar() {
    return (
        <header className="sticky top-0 z-50 border-b border-blue-100 bg-white/95 shadow-sm backdrop-blur">
            <nav className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 py-3 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
                <Link
                    href="/"
                    className="text-center text-2xl font-extrabold tracking-tight text-[#123B8C] transition hover:text-[#0B2559] lg:text-left"
                    >
                    🩺 Win HealthTrack
                </Link>

                <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 sm:gap-x-5">
                    <Link
                        href="/"
                        className="text-sm font-medium text-[#0B2559] transition hover:text-[#123B8C]"
                    >
                        Home
                    </Link>

                    <Link
                        href="/health-check"
                        className="text-sm font-medium text-[#0B2559] transition hover:text-[#123B8C]"
                    >
                        Quick Health Check
                    </Link>

                    <Link
                        href="/blood-pressure"
                        className="text-sm font-medium text-[#0B2559] transition hover:text-[#123B8C]"
                    >
                        Blood Pressure
                    </Link>

                    <Link
                        href="/bmi"
                        className="text-sm font-medium text-[#0B2559] transition hover:text-[#123B8C]"
                    >
                        BMI
                    </Link>

                    <Link
                        href="/login"
                        className="rounded-lg px-3 py-2 text-sm font-semibold text-[#123B8C] transition hover:bg-[#EAF2FF]"
                    >
                        Log In
                    </Link>

                    <Link
                        href="/signup"
                        className="rounded-lg bg-[#123B8C] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0B2559]"
                    >
                        Create Account
                    </Link>
                </div>
            </nav>
        </header>
    );
}