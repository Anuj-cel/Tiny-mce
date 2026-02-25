import { useEffect, useState } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import Prism from 'prismjs'
import 'prismjs/themes/prism-okaidia.css'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-markup'
import './App.css'

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
    Prism.highlightAll()
  }, [content])

  return (
    <div className="app">
      <h1>TinyMCE + Prism (React)</h1>

      <div className="editor-actions">
        <button onClick={handleSave}>Save to backend</button>
        <button onClick={handleLoad}>Load from backend</button>
      </div>

      <Editor
apiKey='1w86m9qndfgzsthxq78glz5aukdha3vsasg1sbhx2qdx7v03'
value={content}
        init={{
          height: 400,
          menubar: false,
          plugins: 'codesample',
          toolbar:
            'undo redo | bold italic | codesample | alignleft aligncenter alignright | bullist numlist',
          codesample_languages: [
            { text: 'HTML', value: 'markup' },
            { text: 'CSS', value: 'css' },
            { text: 'JavaScript', value: 'javascript' },
            { text: 'TypeScript', value: 'typescript' },
            { text: 'JSON', value: 'json' },
            { text: 'Python', value: 'python' },
          ],
          content_css: [
            'https://cdn.jsdelivr.net/npm/prismjs@1.29.0/themes/prism-okaidia.min.css',
          ],
        }}
        onEditorChange={(newContent) => setContent(newContent)}
      />

      <h2>Preview (Prism-highlighted)</h2>
      <div
        className="preview"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  )
}

export default App
