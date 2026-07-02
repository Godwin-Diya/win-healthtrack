import Navbar from
"@/components/Navbar";

export default function Home()  {
  return ( 
    <>
    <Navbar />

    <main className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
      <h1 className="text-5xl md:text-6xl font-extrabold text-center text-gray-900">
        Welcome to Win HealthTrack</h1>

      <p className="text-center text-lg text-gray-600 mt-6 max-w-2xl">
        Track your health, understand your body and make informed decisions with confidence.</p>
    </main> 
    </>
  ); 
}