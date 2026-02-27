import { useEffect, useState } from 'react'
import DOMPurify from 'dompurify'

export default function ArticlesDashboard({ onOpen }) {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    const fetchArticles = async () => {
      try {
        const res = await fetch('http://localhost:4000/api/articles')
        if (!res.ok) throw new Error('no articles endpoint')
        const data = await res.json()
        if (mounted)
          setArticles((data || []).map(a => ({
            id: a._id || a.id,
            title: a.title,
            html: a.html,
          })))
      } catch (e) {
        // fallback sample data
        if (mounted)
          setArticles([
            { id: '1', title: 'Welcome', html: '<p>Hello world</p>' },
            { id: '2', title: 'Second article', html: '<p>More content</p>' },
          ])
      } finally {
        if (mounted) setLoading(false)
      }
    }
    fetchArticles()
    return () => (mounted = false)
  }, [])

  if (loading) return <div>Loading articles…</div>

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2>All Articles</h2>
        <button
          onClick={() => onOpen({ id: null, title: '', html: '' }, 'edit')}
        >
          New Article
        </button>
      </div>

      <ul className="space-y-2">
        {articles.map((a) => (
          <li key={a.id} className="p-3 border rounded">
            <div className="flex justify-between items-center">
              <strong className="truncate flex-grow">{a.title}</strong>
              <div className="ml-4 flex-shrink-0 space-x-2">
                <button className="px-2 py-1 bg-blue-500 text-white rounded text-xs" onClick={() => onOpen(a, 'view')}>View</button>
                <button className="px-2 py-1 bg-green-500 text-white rounded text-xs" onClick={() => onOpen(a, 'edit')}>Edit</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
