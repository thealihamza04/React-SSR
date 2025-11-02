import { Link } from 'react-router-dom'

function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-base-100">
      <div className="max-w-5xl mx-auto px-8 py-24 text-center">
        <h1 className="text-6xl md:text-7xl font-semibold text-base-content mb-8 tracking-tight">
          React&nbsp;
          <span className="text-primary">SSR</span>
          &nbsp;Made Simple
        </h1>

        <p className="text-lg md:text-xl text-base-content/70 max-w-2xl mx-auto mb-14 leading-relaxed">
          Fast, elegant server-side rendering built with Vite, React Router, TailwindCSS, and DaisyUI.
        </p>

        <div className="flex items-center justify-center gap-6">
          <a
            href="https://github.com/your-username/react-ssr"
            target="_blank"
            rel="noreferrer"
            className="rounded-full btn btn-outline px-6 py-2.5 text-base font-medium text-base-content/80 hover:bg-base-200 hover:text-base-content transition-all duration-200"
          >
            View on GitHub
          </a>
          <Link
            to="/get-started"
            className="rounded-full bg-primary text-primary-content px-7 py-2.5 text-base font-medium hover:opacity-90 active:scale-95 transition-all duration-200"
          >
            Get Started
          </Link>
        </div>
      </div>
    </main>
  )
}

export default Home
