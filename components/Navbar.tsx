import Link from "next/link";

<nav className="flex items-center justify-between px-8 py-4 border-b bg-white">

    <Link
        href="/"
        className="text-2xl font-bold text-blue-700">
        🩺 Win HealthTrack
    </Link>
    
    <div className="flex items-center gap-6">
    

        
    
        Home  className="text-gray-700 hover:text-blue-600 transition"
        Quick Health Check className="text-gray-700 hover:text-blue-600 transition"
        Create Account    
        Log In  className="text-gray-700 hover:text-blue-600 transition"
    </div>
    
    Navigation links

</nav>


export default function Navbar() {
    return (
        <nav className="flex items-center justify-between px-8 py-5 shadow-md">
        <h2 className="text-2xl font-bold text-blue-700">
        Win HealthTrack
        </h2>

        <div className="flex gap-6">
                <a href="#">Home</a>
                
                <a href="#">Health Check</a>

            <a href="#">Login</a>

        <button className="bg-blue-600 text-white px-5 py-2 rounded-lg">
        Sign Up
        </button>
        </div>
        </nav>
    );
}