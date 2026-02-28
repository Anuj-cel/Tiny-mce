import { useState } from 'react'
import TinyMceEditor from '../components/CodeEditor.jsx'

export default function ArticleEdit({ article: initial = null, onSaved, onCancel }) {
  const [title, setTitle] = useState(initial?.title || '')
  const [html, setHtml] = useState(initial?.html || '')
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    try {
      // try to save to backend if available
      const method = initial && initial.id ? 'PUT' : 'POST'
      const url = initial && initial.id ? `http://localhost:4000/api/articles/${initial.id}` : 'http://localhost:4000/api/articles'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, html }),
      })
      let saved = { id: initial?.id || 'local-' + Date.now(), title, html }
      if (res.ok) {
        const data = await res.json()
        saved = {
          id: data._id || data.id,
          title: data.title,
          html: data.html,
        }
      }
      onSaved && onSaved(saved)
    } catch (e) {
      onSaved && onSaved({ id: initial?.id || 'local-' + Date.now(), title, html })
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">
          {initial?.id ? 'Edit Article' : 'New Article'}
        </h2>
        <div className="space-x-2">
          <button
            onClick={onCancel}
            className="px-3 py-1 border rounded hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-3 py-1 bg-blue-600 text-white rounded disabled:opacity-50"
          >
            {saving ? 'Saving…' : 'Save'}
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="block text-sm font-medium mb-2">Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border px-3 py-2 mt-1 rounded text-lg font-medium focus:outline-none focus:ring-2 focus:ring-blue-300"
          placeholder="Enter article title"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Content</label>
        <div className="border rounded">
          <TinyMceEditor
            value={html}
            onEditorChange={(v) => setHtml(v)}
            height={400}
          />
        </div>
      </div>
    </div>
  )
}
