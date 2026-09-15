import Link from "next/link";

export default function Home()  {
  return ( 
    <>
    

      <main className="w-full px-4 py-8 sm:px-6 sm:py-10 lg:px-8 min-h-screen flex flex-col items-center justify-center text-center">
        
      <h1 className="text-3xl font-bold sm:text-4xl lg:text-5xl text-blue-700">
          Win HealthTrack
      </h1>
        

        <p className=" mt-3 text-base sm:text-lg lg:text-xl font-medium text-gray-700">
          Your Personal Health Companion
        </p>

        <p className=" mt-3 text-base sm:text-lg lg:text-xl max-w-2xl text-gray-600">
          Take control of your health with quick assessments, understand your results and begin your journey toward healthier living.
        </p>
        
        <Link href="/health-check"
        className="mt-8 rounded-lg bg-blue-600 px-8 py-4 text-white font-semibold hover:bg-blue-700 transition">
        🩺 Start Quick Health Check
        </Link>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border p-6 shadow-sm">
            <h2 className="text-xl font-semibold">
              🩺 Quick Assessment
            </h2>

            <p className="mt-3 text-base sm:text-lg lg:text-xl text-gray-600">
              Check your blood glucose level instantly with our easy-to-use health checker.
            </p>
          </div>
          
          <div className="rounded-xl border p-6 shadow-sm">
            <h2 className="text-xl font-semibold">
              📊 Understand Your Results
            </h2>

            <p className="mt-3 text-base sm:text-lg lg:text-xl text-gray-600">
              Receive simple explanations and helpful health guidance based on your readings.
            </p>
          </div>

          <div className="rounded-xl border p-6 shadow-sm">
            <h2 className="text-xl font-semibold">
              🔒 Private & Secure
            </h2>

            <p className="mt-3 text-base sm:text-lg lg:text-xl text-gray-600">
              Your guest history is stored locally in your browser, helping protect your privacy.
            </p>
          </div>

        </div>
        
    </main> 
    </>
  ); 
}




