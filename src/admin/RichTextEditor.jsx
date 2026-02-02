import { useRef, useEffect } from 'react';
import './RichTextEditor.css';

/**
 * RichTextEditor - WYSIWYG editor for announcement content
 * Using Quill.js for rich text editing
 * 
 * Note: This is a lightweight implementation without external dependencies
 * For production, consider using react-quill or similar library
 */
const RichTextEditor = ({ value, onChange, placeholder, error }) => {
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  useEffect(() => {
    // Initialize Quill editor
    if (editorRef.current && !quillRef.current) {
      // For now, using a contentEditable div
      // In Phase 2, integrate react-quill or TinyMCE
      const editor = editorRef.current;
      
      // Set initial content
      if (value) {
        editor.innerHTML = value;
      }

      // Handle input changes
      const handleInput = () => {
        const html = editor.innerHTML;
        onChange(html);
      };

      editor.addEventListener('input', handleInput);
      
      return () => {
        editor.removeEventListener('input', handleInput);
      };
    }
  }, []);

  // Update content when value changes externally
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || '';
    }
  }, [value]);

  const handleFormat = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current.focus();
  };

  const handleLink = () => {
    const url = prompt('Enter URL:');
    if (url) {
      handleFormat('createLink', url);
    }
  };

  return (
    <div className={`rich-text-editor ${error ? 'error' : ''}`}>
      <div className="rich-text-editor__toolbar">
        <div className="rich-text-editor__group">
          <button
            type="button"
            className="rich-text-editor__btn"
            onClick={() => handleFormat('bold')}
            title="Bold (Ctrl+B)"
          >
            <strong>B</strong>
          </button>
          <button
            type="button"
            className="rich-text-editor__btn"
            onClick={() => handleFormat('italic')}
            title="Italic (Ctrl+I)"
          >
            <em>I</em>
          </button>
          <button
            type="button"
            className="rich-text-editor__btn"
            onClick={() => handleFormat('underline')}
            title="Underline (Ctrl+U)"
          >
            <u>U</u>
          </button>
        </div>

        <div className="rich-text-editor__separator"></div>

        <div className="rich-text-editor__group">
          <button
            type="button"
            className="rich-text-editor__btn"
            onClick={() => handleFormat('formatBlock', '<h2>')}
            title="Heading 2"
          >
            H2
          </button>
          <button
            type="button"
            className="rich-text-editor__btn"
            onClick={() => handleFormat('formatBlock', '<h3>')}
            title="Heading 3"
          >
            H3
          </button>
          <button
            type="button"
            className="rich-text-editor__btn"
            onClick={() => handleFormat('formatBlock', '<p>')}
            title="Paragraph"
          >
            P
          </button>
        </div>

        <div className="rich-text-editor__separator"></div>

        <div className="rich-text-editor__group">
          <button
            type="button"
            className="rich-text-editor__btn"
            onClick={() => handleFormat('insertUnorderedList')}
            title="Bullet List"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="8" y1="6" x2="21" y2="6"></line>
              <line x1="8" y1="12" x2="21" y2="12"></line>
              <line x1="8" y1="18" x2="21" y2="18"></line>
              <line x1="3" y1="6" x2="3.01" y2="6"></line>
              <line x1="3" y1="12" x2="3.01" y2="12"></line>
              <line x1="3" y1="18" x2="3.01" y2="18"></line>
            </svg>
          </button>
          <button
            type="button"
            className="rich-text-editor__btn"
            onClick={() => handleFormat('insertOrderedList')}
            title="Numbered List"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="10" y1="6" x2="21" y2="6"></line>
              <line x1="10" y1="12" x2="21" y2="12"></line>
              <line x1="10" y1="18" x2="21" y2="18"></line>
              <path d="M4 6h1v4"></path>
              <path d="M4 10h2"></path>
              <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"></path>
            </svg>
          </button>
        </div>

        <div className="rich-text-editor__separator"></div>

        <div className="rich-text-editor__group">
          <button
            type="button"
            className="rich-text-editor__btn"
            onClick={() => handleFormat('justifyLeft')}
            title="Align Left"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="17" y1="10" x2="3" y2="10"></line>
              <line x1="21" y1="6" x2="3" y2="6"></line>
              <line x1="21" y1="14" x2="3" y2="14"></line>
              <line x1="17" y1="18" x2="3" y2="18"></line>
            </svg>
          </button>
          <button
            type="button"
            className="rich-text-editor__btn"
            onClick={() => handleFormat('justifyCenter')}
            title="Align Center"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="10" x2="6" y2="10"></line>
              <line x1="21" y1="6" x2="3" y2="6"></line>
              <line x1="21" y1="14" x2="3" y2="14"></line>
              <line x1="18" y1="18" x2="6" y2="18"></line>
            </svg>
          </button>
          <button
            type="button"
            className="rich-text-editor__btn"
            onClick={() => handleFormat('justifyRight')}
            title="Align Right"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="21" y1="10" x2="7" y2="10"></line>
              <line x1="21" y1="6" x2="3" y2="6"></line>
              <line x1="21" y1="14" x2="3" y2="14"></line>
              <line x1="21" y1="18" x2="7" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="rich-text-editor__separator"></div>

        <div className="rich-text-editor__group">
          <button
            type="button"
            className="rich-text-editor__btn"
            onClick={handleLink}
            title="Insert Link"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
            </svg>
          </button>
          <button
            type="button"
            className="rich-text-editor__btn"
            onClick={() => handleFormat('removeFormat')}
            title="Clear Formatting"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>

      <div
        ref={editorRef}
        className="rich-text-editor__content"
        contentEditable
        data-placeholder={placeholder || 'Start typing...'}
      />

      <div className="rich-text-editor__hint">
        Use the toolbar above to format your content. HTML is supported.
      </div>
    </div>
  );
};

export default RichTextEditor;
