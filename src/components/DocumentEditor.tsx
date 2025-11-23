import { useRef, useEffect } from 'react';
import type { DocumentSection } from '../types/document';

interface DocumentEditorProps {
  sections: DocumentSection[];
  onUpdateSection: (sectionId: string, newContent: string) => void;
}

export function DocumentEditor({ sections, onUpdateSection }: DocumentEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
  }, []);

  const renderSection = (section: DocumentSection): JSX.Element => {
    const headingClass = section.level === 1
      ? 'text-2xl font-bold text-gray-100 mt-8 mb-4 pb-2 border-b-2 border-gray-700'
      : 'text-xl font-semibold text-gray-200 mt-6 mb-3';

    return (
      <div key={section.id} className="section-container">
        <h2 className={headingClass} id={`section-${section.id}`}>
          {section.id}. {section.title}
        </h2>
        <div
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => {
            const newContent = e.currentTarget.textContent || '';
            if (newContent !== section.content) {
              onUpdateSection(section.id, newContent);
            }
          }}
          className="text-gray-300 leading-relaxed whitespace-pre-wrap mb-4 p-3 rounded border border-transparent hover:border-gray-700 focus:outline-none focus:border-purple-500 focus:bg-purple-900/10 transition-colors min-h-[60px]"
        >
          {section.content}
        </div>
        {section.subsections && section.subsections.length > 0 && (
          <div className="ml-6">
            {section.subsections.map(subsection => renderSection(subsection))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      ref={editorRef}
      className="h-full overflow-y-auto bg-gray-850 p-8 lg:p-12"
      style={{
        maxWidth: '900px',
        margin: '0 auto',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}
    >
      <div className="document-content">
        {sections.map(section => renderSection(section))}
      </div>
    </div>
  );
}
