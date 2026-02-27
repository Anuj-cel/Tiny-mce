import { useEffect, useState } from 'react'
    import DOMPurify from 'dompurify'
import TinyMceEditor from './components/CodeEditor.jsx'
import ArticlesDashboard from './pages/ArticlesDashboard.jsx'
import ArticleView from './pages/ArticleView.jsx'
import ArticleEdit from './pages/ArticleEdit.jsx'

function App() {
  const [route, setRoute] = useState({ name: 'dashboard', article: null })

  useEffect(() => {
    // simple keyboard shortcut to go back to dashboard
    const onKey = (e) => {
      if (e.key === 'Escape') setRoute({ name: 'dashboard', article: null })
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div className="flex flex-col gap-4 p-4">
      <header className="flex items-center justify-between">
        <h1>Articles Dashboard</h1>
        <nav className="space-x-2">
          <button onClick={() => setRoute({ name: 'dashboard', article: null })}>
            All articles
          </button>
          <button onClick={() => setRoute({ name: 'editor', article: null })}>
            Editor
          </button>
        </nav>
      </header>

      {route.name === 'dashboard' && (
        <ArticlesDashboard
          onOpen={(article, mode) => setRoute({ name: mode === 'edit' ? 'edit' : 'view', article })}
        />
      )}

      {route.name === 'view' && route.article && (
        <ArticleView
          article={route.article}
          onBack={() => setRoute({ name: 'dashboard', article: null })}
          onEdit={(a) => setRoute({ name: 'edit', article: a })}
        />
      )}

      {route.name === 'edit' && (
        <ArticleEdit
          article={route.article}
          onSaved={(saved) => setRoute({ name: 'view', article: saved })}
          onCancel={() => setRoute({ name: 'dashboard', article: null })}
        />
      )}

      {route.name === 'editor' && (
        <div>
          <p>Standalone editor (save/load demo)</p>
          <TinyMceEditor height={500} />
        </div>
      )}
    </div>
  )
}

export default App