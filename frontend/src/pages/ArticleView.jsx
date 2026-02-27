// import DOMPurify from 'dompurify'

// export default function ArticleView({ article, onBack, onEdit }) {
//   if (!article) return <div>No article selected</div>

//   return (
//     <div>
//       <div className="flex items-center justify-between">
//         <h2>{article.title || 'Untitled'}</h2>
//         <div className="space-x-2">
//           <button onClick={() => onEdit(article)}>Edit</button>
//           <button onClick={onBack}>Back</button>
//         </div>
//       </div>

//       <div className="mt-4" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(article.html || '') }} />
//     </div>
//   )
// }
import { useEffect, useRef } from "react"
import Prism from "prismjs"
import DOMPurify from "dompurify"

import "prismjs/themes/prism-tomorrow.css"

// 🔥 Import only what you need
import "prismjs/components/prism-javascript"
import "prismjs/components/prism-css"
import "prismjs/components/prism-markup"
// remove unused language to avoid MIME type error during development
// import "prismjs/components/prism-python"
export default function ArticleView({ article, onBack, onEdit }) {

  const contentRef = useRef(null)

  useEffect(() => {
    if (contentRef.current) {
      Prism.highlightAllUnder(contentRef.current)
    }
  }, [article])

  if (!article) return <div>No article selected</div>

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2>{article.title || 'Untitled'}</h2>
        <div className="space-x-2">
          <button onClick={() => onEdit(article)}>Edit</button>
          <button onClick={onBack}>Back</button>
        </div>
      </div>

      <div
        ref={contentRef}
        className="mt-4"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(article.html || '')
        }}
      />
    </div>
  )
}