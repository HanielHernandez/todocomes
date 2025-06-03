import Link from "next/link";

export default function NotFoundPage() {

   return <div className="container mx-auto p-4 min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-lg">The page you are looking for does not exist.</p>
        <Link href="/" className="text-blue-500 hover:underline mt-4">Go back to Home</Link>
    </div>
 }   