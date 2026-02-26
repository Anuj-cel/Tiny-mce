import { useEffect, useState } from 'react'
// import { Editor } from '@tinymce/tinymce-react'
import Prism from 'prismjs'
import 'prismjs/themes/prism.css'
import DOMPurify from 'dompurify'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-markup'
import TinyMceEditor from './components/CodeEditor.jsx'

function App() {
  const [content, setContent] = useState('')

  const handleSave = async () => {
    await fetch('http://localhost:4000/api/content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ html: content }),
    })
  }

  const handleLoad = async () => {
    const res = await fetch('http://localhost:4000/api/content')
    const data = await res.json()
    setContent(data.html || '')
  }

  useEffect(() => {
    const preview = document.querySelector('.preview')
    if (preview) {
      Prism.highlightAllUnder(preview)
    }
  }, [content])

  return (
    <div className="flex flex-col gap-4 p-4 ">
      <h1>TinyMCE + Prism (React)</h1>

      <div className="editor-actions">
        <button onClick={handleSave}>Save to backend</button>
        <button onClick={handleLoad}>Load from backend</button>
      </div>

      <TinyMceEditor
        height={500}
        value={content}
        // @ts-ignore
        onEditorChange={(value) => setContent(value)}
      />
      <h2>Preview (Prism-highlighted)</h2>
      <div
        className="preview"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(content),
        }}
      />
    </div>
  )
}

export default App