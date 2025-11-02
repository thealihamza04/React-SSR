import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-base-100/70 backdrop-blur-xl border-b border-base-300/70">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">
        <Link
          to="/"
          className="text-2xl font-semibold tracking-tight text-base-content hover:opacity-70 transition-opacity"
        >
          React SSR
        </Link>

        <nav className="flex items-center gap-8">
          <Link
            to="/"
            className="text-base font-medium text-base-content/80 hover:text-base-content transition-colors"
          >
            Home
          </Link>
          <Link
            to="/get-started"
            className="rounded-full bg-base-content text-base-100 px-5 py-2 text-sm font-medium tracking-wide hover:opacity-80 active:scale-95 transition-all duration-200"
          >
            Get Started
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header
