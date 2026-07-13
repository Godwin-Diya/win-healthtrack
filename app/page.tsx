import Link from "next/link";
import loginPage from "./login/page";

export default function Home()  {
  return ( 
    <>
    

    <main className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
      <h1 className="text-5xl md:text-6xl font-extrabold text-center text-gray-900">
          Welcome to Win HealthTrack</h1>
        

      <p className="text-center text-lg text-gray-600 mt-6 max-w-2xl">
          Track your health, understand your body and make informed decisions with confidence.
      </p>
        
        <Link href="/health-check"
        className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
        Start Quick Health Check
        </Link>
        
    </main> 
    </>
  ); 
}




