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
import "prismjs/components/prism-markup-templating"
// import additional languages you expect to display below.  
// After changing these imports restart the Vite dev server so
// the updated dependencies are bundled correctly.
import "prismjs/components/prism-python"      // Python
import "prismjs/components/prism-java"        // Java
import "prismjs/components/prism-c"           // C
import "prismjs/components/prism-cpp"         // C++
import "prismjs/components/prism-csharp"      // C#
import "prismjs/components/prism-php"         // PHP
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