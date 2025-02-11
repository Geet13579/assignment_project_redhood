import Link from 'next/link'

export default function NotFound() {
  return (
    <html>
      <body>
        <div className="flex flex-col items-center justify-center min-h-screen bg-white">
          <h1 className="text-4xl font-bold mb-4">Not Found – 404!</h1>
          <Link href="/" className="text-blue-500 hover:underline">
            Go back to Home
          </Link>
        </div>
      </body>
    </html>
  )
}