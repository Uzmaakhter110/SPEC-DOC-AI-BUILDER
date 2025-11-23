import { useState, useEffect } from 'react';
import { FileText, Download, Menu, X, Home, Upload } from 'lucide-react';
import { Toaster, toast } from 'react-hot-toast';
import { TemplateSelector } from './components/TemplateSelector';
import { DocumentEditor } from './components/DocumentEditor';
import { AIPanel } from './components/AIPanel';
import { UploadModal } from './components/UploadModal';
import { functionalTemplate } from './templates/functionalTemplate';
import { technicalTemplate } from './templates/technicalTemplate';
import { sapMMStockTemplate } from './templates/sapMMStockTemplate';
import { exportToDocx } from './lib/docxExporter';
import { processAIInstruction } from './lib/aiService';
import { parseDocxFile } from './lib/documentParser';
import type { DocumentType, SpecDocument, DocumentSection } from './types/document';

function App() {
  const [currentDocument, setCurrentDocument] = useState<SpecDocument | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const savedDoc = localStorage.getItem('currentDocument');
    if (savedDoc) {
      try {
        const doc = JSON.parse(savedDoc);
        setCurrentDocument(doc);
        const savedTime = localStorage.getItem('lastSaved');
        if (savedTime) {
          setLastSaved(new Date(savedTime));
        }
      } catch (error) {
        console.error('Error loading saved document:', error);
      }
    }
  }, []);

  useEffect(() => {
    if (currentDocument) {
      localStorage.setItem('currentDocument', JSON.stringify(currentDocument));
      const now = new Date();
      localStorage.setItem('lastSaved', now.toISOString());
      setLastSaved(now);
    }
  }, [currentDocument]);

  const handleSelectTemplate = (type: DocumentType, title: string, useSAPTemplate?: boolean) => {
    let template;
    if (useSAPTemplate && type === 'functional') {
      template = sapMMStockTemplate;
    } else {
      template = type === 'functional' ? functionalTemplate : technicalTemplate;
    }
    setCurrentDocument({
      title,
      doc_type: type,
      content: template,
    });
    toast.success('Template loaded successfully!');
  };

  const handleUploadDocument = async (file: File) => {
    setIsUploading(true);
    try {
      toast.loading('Parsing document...');
      const { title, sections } = await parseDocxFile(file);
      setCurrentDocument({
        title,
        doc_type: 'functional',
        content: sections,
      });
      toast.dismiss();
      toast.success('Document uploaded successfully!');
    } catch (error) {
      toast.dismiss();
      toast.error(error instanceof Error ? error.message : 'Failed to parse document');
    } finally {
      setIsUploading(false);
    }
  };

  const handleUpdateSection = (sectionId: string, newContent: string) => {
    if (!currentDocument) return;

    const updateSection = (sections: DocumentSection[]): DocumentSection[] => {
      return sections.map((section) => {
        if (section.id === sectionId) {
          return { ...section, content: newContent };
        }
        if (section.subsections) {
          return {
            ...section,
            subsections: updateSection(section.subsections),
          };
        }
        return section;
      });
    };

    setCurrentDocument({
      ...currentDocument,
      content: updateSection(currentDocument.content),
    });
  };

  const handleApplyChanges = async (instruction: string) => {
    if (!currentDocument) return;

    setIsProcessing(true);
    try {
      const updatedContent = await processAIInstruction(
        instruction,
        currentDocument.content
      );
      setCurrentDocument({
        ...currentDocument,
        content: updatedContent,
      });
    } catch (error) {
      console.error('Error processing AI instruction:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleExport = async () => {
    if (!currentDocument) return;
    await exportToDocx(currentDocument);
  };

  const handleReset = () => {
    if (currentDocument && confirm('Are you sure you want to create a new document? Any unsaved changes will be lost.')) {
      setCurrentDocument(null);
      setSidebarOpen(false);
      localStorage.removeItem('currentDocument');
      localStorage.removeItem('lastSaved');
      setLastSaved(null);
      setShowUploadModal(true);
    } else if (!currentDocument) {
      setShowUploadModal(true);
    }
  };


  if (!currentDocument) {
    return (
      <>
        <Toaster position="top-right" />
        {showUploadModal ? (
          <UploadModal
            onSelectTemplate={handleSelectTemplate}
            onUploadDocument={handleUploadDocument}
            onClose={() => setShowUploadModal(false)}
          />
        ) : (
          <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-6">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-white mb-6">SpecDoc AI Builder</h1>
              <p className="text-lg text-gray-300 mb-8">Generate SAP specification documents with AI assistance</p>
              <button
                onClick={() => setShowUploadModal(true)}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl font-medium hover:from-purple-700 hover:to-purple-800 transition-all shadow-lg hover:shadow-purple-500/50 flex items-center gap-3 mx-auto"
              >
                <Upload className="w-6 h-6" />
                <span className="text-lg">Create New Document</span>
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gray-900">
      <Toaster position="top-right" />
      <nav className="bg-gray-800 shadow-sm border-b border-gray-700 z-10">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <FileText className="w-7 h-7 text-purple-400" />
              <div>
                <h1 className="text-lg font-bold text-white">
                  SpecDoc AI Builder
                </h1>
                <p className="text-xs text-gray-400">
                  {currentDocument.doc_type === 'functional'
                    ? 'Functional Specification'
                    : 'Technical Specification'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {lastSaved && (
                <div className="hidden md:flex items-center gap-2 text-xs text-gray-400">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Auto-saved {formatTimeAgo(lastSaved)}</span>
                </div>
              )}
              <button
                onClick={handleReset}
                className="hidden sm:flex items-center gap-2 px-4 py-2 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <Home className="w-4 h-4" />
                <span className="text-sm">New Document</span>
              </button>
              <button
                onClick={handleExport}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 transition-colors shadow-md shadow-purple-500/20 hover:shadow-lg hover:shadow-purple-500/30"
              >
                <Download className="w-4 h-4" />
                <span className="text-sm font-medium">Save Document</span>
              </button>
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 text-gray-300 hover:bg-gray-700 rounded-lg"
              >
                {sidebarOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex-1 flex overflow-hidden">
        <div
          className={`${
            sidebarOpen ? 'block' : 'hidden'
          } lg:block w-full lg:w-96 xl:w-[420px] border-r border-gray-700 absolute lg:relative h-full z-20 lg:z-0`}
        >
          <AIPanel
            onApplyChanges={handleApplyChanges}
            isProcessing={isProcessing}
          />
        </div>

        <div className="flex-1 overflow-hidden bg-gray-900">
          <DocumentEditor
            sections={currentDocument.content}
            onUpdateSection={handleUpdateSection}
          />
        </div>
      </div>
    </div>
  );
}

function formatTimeAgo(date: Date): string {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return date.toLocaleDateString();
}

export default App;
