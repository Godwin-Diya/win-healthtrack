import Link from "next/link";

export default function HomePage() {
    return (
        <main className="min-h-screen bg-[#F8FAFC]">
            {/* Hero */}
            <section className="mx-auto w-full max-w-7xl px-4 pb-10 pt-10 sm:px-6 sm:pt-14 lg:px-8 lg:pb-16 lg:pt-20">
                <div className="grid items-center gap-10 rounded-3xl border border-blue-100 bg-white px-6 py-10 shadow-sm sm:px-10 lg:grid-cols-2 lg:px-14 lg:py-16">
                    <div className="max-w-2xl">
                        <p className="mb-4 inline-flex rounded-full bg-[#EAF2FF] px-4 py-2 text-sm font-semibold text-[#123B8C]">
                            Your Personal Health Companion
                        </p>

                        <h1 className="text-4xl font-bold leading-tight tracking-tight text-[#0B2559] sm:text-5xl lg:text-6xl">
                            Take Control
                            <br />
                            of Your Health
                        </h1>

                        <p className="mt-5 max-w-xl text-base leading-7 text-[#64748B] sm:text-lg">
                            Track your health metrics, understand your results,
                            and keep your important health information in one
                            simple and reliable place.
                        </p>

                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                            <Link
                                href="/health-check"
                                className="rounded-xl bg-[#123B8C] px-6 py-3 text-center text-sm font-bold text-white shadow-md transition hover:bg-[#0B2559]"
                            >
                                Start Quick Health Check
                            </Link>

                            <Link
                                href="/signup"
                                className="rounded-xl border border-[#123B8C] bg-white px-6 py-3 text-center text-sm font-bold text-[#123B8C] transition hover:bg-[#EAF2FF]"
                            >
                                Create Account
                            </Link>
                        </div>
                    </div>

                    {/* Healthcare visual */}
                    <div className="flex min-h-[280px] items-center justify-center rounded-3xl bg-[#EAF2FF] p-8">
                        <div className="text-center">
                            <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-white text-6xl shadow-md">
                                🩺
                            </div>

                            <h2 className="mt-6 text-2xl font-bold text-[#123B8C]">
                                Healthy Today
                            </h2>

                            <p className="mt-2 text-sm text-[#64748B]">
                                Stronger Tomorrow
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Feature cards */}
            <section className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                    <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EAF2FF] text-2xl">
                            📋
                        </div>

                        <h3 className="mt-5 text-lg font-bold text-[#0B2559]">
                            Quick Assessment
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-[#64748B]">
                            Get useful insights from your basic health
                            measurements in just a few moments.
                        </p>
                    </div>

                    <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EAF2FF] text-2xl">
                            📊
                        </div>

                        <h3 className="mt-5 text-lg font-bold text-[#0B2559]">
                            Understand Your Results
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-[#64748B]">
                            View clear health information and keep track of
                            your previous measurements.
                        </p>
                    </div>

                    <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EAF2FF] text-2xl">
                            🔐
                        </div>

                        <h3 className="mt-5 text-lg font-bold text-[#0B2559]">
                            Private & Secure
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-[#64748B]">
                            Your health information stays in your browser for
                            this portfolio demonstration.
                        </p>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
                <div className="rounded-3xl bg-[#0B2559] px-6 py-10 text-center shadow-lg sm:px-10">
                    <h2 className="text-2xl font-bold text-white sm:text-3xl">
                        Start tracking your health today
                    </h2>

                    <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-blue-100 sm:text-base">
                        Check your blood glucose without an account, or create
                        an account to keep your health records together.
                    </p>

                    <div className="mt-7">
                        <Link
                            href="/health-check"
                            className="inline-flex rounded-xl bg-white px-6 py-3 text-sm font-bold text-[#123B8C] shadow-sm transition hover:bg-[#EAF2FF]"
                        >
                            Get Started
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}




