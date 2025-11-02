import { Link } from 'react-router-dom'
import { intro, steps } from '../content/getStarted.js'

function Code({ children }) {
  return (
    <div className="rounded-lg bg-base-200 text-left p-4 overflow-x-auto font-mono text-sm leading-relaxed whitespace-pre">
      {children.split('\n').map((line, i) => (
        <div key={i} className="flex">
          <span className="select-none text-base-content/40 w-8 text-right pr-4">{i + 1}</span>
          <code className="text-base-content/90 whitespace-pre">{line}</code>
        </div>
      ))}
    </div>
  )
}

function GetStarted() {
  return (
    <main className="min-h-screen bg-base-100">
      <div className="max-w-5xl mx-auto px-8 py-20">
        <div className="mb-10">
          <Link
            to="/"
            className="inline-flex underline underline-offset-2   items-center gap-2 text-base-content/70 hover:text-base-content transition-colors"
          >
            Back
          </Link>
        </div>

        <h1 className="text-5xl font-semibold text-base-content mb-6 tracking-tight">Get Started</h1>
        <p className="text-base-content/70 text-lg leading-relaxed mb-12 max-w-3xl">{intro}</p>

        <ol className="list-decimal pl-6 space-y-10 max-w-4xl">
          {steps.map((s) => (
            <li key={s.title}>
              <div className="text-xl font-medium mb-3 text-base-content">{s.title}</div>
              <Code>{s.code}</Code>
            </li>
          ))}
        </ol>
      </div>
    </main>
  )
}

export default GetStarted
