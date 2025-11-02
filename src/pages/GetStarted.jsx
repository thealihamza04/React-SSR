import { intro, steps } from '../content/getStarted.js'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx'
import javascript from 'react-syntax-highlighter/dist/esm/languages/prism/javascript'
import bash from 'react-syntax-highlighter/dist/esm/languages/prism/bash'
import css from 'react-syntax-highlighter/dist/esm/languages/prism/css'
import markup from 'react-syntax-highlighter/dist/esm/languages/prism/markup'
import oneDark from 'react-syntax-highlighter/dist/esm/styles/prism/one-dark'
import json from 'react-syntax-highlighter/dist/esm/languages/prism/json'

SyntaxHighlighter.registerLanguage('jsx', jsx)
SyntaxHighlighter.registerLanguage('javascript', javascript)
SyntaxHighlighter.registerLanguage('bash', bash)
SyntaxHighlighter.registerLanguage('css', css)
SyntaxHighlighter.registerLanguage('markup', markup)
SyntaxHighlighter.registerLanguage('json', json)

function Code({ children, language = 'javascript' }) {
  return (
    <div className="rounded-lg bg-base-200 text-left overflow-x-auto">
      <SyntaxHighlighter
        language={language}
        style={oneDark}
        showLineNumbers
        wrapLongLines
        customStyle={{ margin: 0, background: 'transparent', padding: '1rem' }}
        lineNumberStyle={{ color: 'rgba(127,127,127,0.6)', marginRight: '1rem' }}
      >
        {children}
      </SyntaxHighlighter>
    </div>
  )
}

function GetStarted() {
  return (
    <main className="min-h-screen bg-base-100">
      <div className="max-w-5xl mx-auto px-8 py-20">
        <h1 className="text-5xl font-semibold text-base-content mb-6 tracking-tight">Get Started</h1>
        <p className="text-base-content/70 text-lg leading-relaxed mb-12 max-w-3xl">{intro}</p>

        <ol className="list-decimal pl-6 space-y-10 max-w-4xl">
          {steps.map((s) => (
            <li key={s.title}>
              <div className="text-xl font-medium mb-3 text-base-content">{s.title}</div>
              <Code language={s.lang}>{s.code}</Code>
            </li>
          ))}
        </ol>
      </div>
    </main>
  )
}

export default GetStarted
