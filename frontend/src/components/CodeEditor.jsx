import { Editor } from "@tinymce/tinymce-react";
import { useMemo } from "react";

/**
 * @param {Object} props
 * @param {any} [props.editorRef]
 * @param {number|string} [props.height=500]
 * @param {boolean} [props.disabled=false]
 * @param {string} [props.value]
 * @param {Function} [props.onEditorChange]
 */
export default function TinyMceEditor({
  editorRef = null,
  height = 500,
  disabled = false,
  value,
  onEditorChange,
}) {
  const contentStyle = useMemo(
    () => `
      body {
        font-family: system-ui, sans-serif;
        font-size: 14px;
        line-height: 1.5;
        color: #333;
      }

      img {
        max-width: 100%;
        height: auto;
      }

      pre {
        padding: 12px;
        border-radius: 4px;
        background-color: #f5f5f5;
        overflow-x: auto;
      }

      table {
        width: 100%;
        border-collapse: collapse;
      }

      th, td {
        border: 1px solid #ddd;
        padding: 6px;
      }
    `,
    []
  );

  return (
    <Editor
   apiKey='1w86m9qndfgzsthxq78glz5aukdha3vsasg1sbhx2qdx7v03'
      
      onInit={(_, editor) => {
        // eslint-disable-next-line
        if (editorRef) editorRef.current = editor;
      }}
      value={value}
      disabled={disabled}
      // @ts-ignore - Function type is compatible
      onEditorChange={onEditorChange}
      init={{
        height,
        menubar: false,
        toolbar:
          "undo redo | formatselect | bold italic underline strikethrough | forecolor backcolor | fontselect fontsizeselect | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image media | table | codesample | emoticons charmap | removeformat | preview code fullscreen",
        plugins: [
          "advlist",
          "autolink",
          "lists",
          "link",
          "image",
          "charmap",
          "print",
          "preview",
          "anchor",
          "searchreplace",
          "visualblocks",
          "code",
          "fullscreen",
          "insertdatetime",
          "media",
          "table",
          "help",
          "wordcount",
          "codesample",
          "emoticons",
          "autoresize",
        ],
        codesample_languages: [
          { text: 'HTML', value: 'markup' },
          { text: 'CSS', value: 'css' },
          { text: 'JavaScript', value: 'javascript' },
          { text: 'JSON', value: 'json' },
          { text: 'Bash', value: 'bash' },
          { text: 'Python', value: 'python' },
          { text: 'Java', value: 'java' },
          { text: 'C#', value: 'csharp' },
          { text: 'C++', value: 'cpp' },
          { text: 'C', value: 'c' },
          { text: 'PHP', value: 'php' },
        ],
        toolbar_sticky: true,
        paste_data_images: true,
        branding: false,
        statusbar: false,
        skin: "oxide",
        content_css: "default",
        content_style: contentStyle,
      }}
    />
  );
}