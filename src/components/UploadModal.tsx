import { X, Upload, FileText, Code } from 'lucide-react';
import { useState, useRef } from 'react';
import type { DocumentType } from '../types/document';

interface UploadModalProps {
  onSelectTemplate: (type: DocumentType, title: string, useSAPTemplate?: boolean) => void;
  onUploadDocument: (file: File) => void;
  onClose: () => void;
}

export function UploadModal({ onSelectTemplate, onUploadDocument, onClose }: UploadModalProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file && file.name.endsWith('.docx')) {
      onUploadDocument(file);
      onClose();
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onUploadDocument(file);
      onClose();
    }
  };

  const handleTemplateSelect = (type: DocumentType, title: string, useSAPTemplate?: boolean) => {
    onSelectTemplate(type, title, useSAPTemplate);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-6">
      <div className="bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full border border-gray-700 max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-700 flex items-center justify-between sticky top-0 bg-gray-800 z-10">
          <div>
            <h2 className="text-2xl font-bold text-white">Create New Document</h2>
            <p className="text-gray-400 text-sm mt-1">Choose a template or upload your own</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors text-gray-400 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Upload className="w-5 h-5 text-purple-400" />
              Upload Your Own Template
            </h3>
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
                isDragging
                  ? 'border-purple-500 bg-purple-500/10'
                  : 'border-gray-600 hover:border-purple-500/50 bg-gray-750'
              }`}
            >
              <Upload className={`w-12 h-12 mx-auto mb-4 ${isDragging ? 'text-purple-400' : 'text-gray-400'}`} />
              <p className="text-white font-medium mb-2">
                Drop your .docx file here, or click to browse
              </p>
              <p className="text-sm text-gray-400 mb-4">
                Supports Word documents (.docx format only)
              </p>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
              >
                Browse Files
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".docx"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-gray-800 text-gray-400">Or start with a template</span>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">SAP Templates</h3>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <button
                onClick={() => handleTemplateSelect('functional', 'SAP Functional Specification Document')}
                className="group bg-gray-750 rounded-xl p-6 text-left border-2 border-gray-600 hover:border-purple-500 hover:bg-gray-700 transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-purple-900/50 rounded-lg">
                    <FileText className="w-6 h-6 text-purple-400" />
                  </div>
                  <h4 className="text-lg font-bold text-white">Functional Spec</h4>
                </div>
                <p className="text-sm text-gray-400 mb-3">
                  General functional specification template for SAP projects
                </p>
                <ul className="space-y-1 text-xs text-gray-500">
                  <li>• Business requirements</li>
                  <li>• Process flows</li>
                  <li>• Testing scenarios</li>
                </ul>
              </button>

              <button
                onClick={() => handleTemplateSelect('technical', 'SAP Technical Specification Document')}
                className="group bg-gray-750 rounded-xl p-6 text-left border-2 border-gray-600 hover:border-purple-500 hover:bg-gray-700 transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-purple-900/50 rounded-lg">
                    <Code className="w-6 h-6 text-purple-400" />
                  </div>
                  <h4 className="text-lg font-bold text-white">Technical Spec</h4>
                </div>
                <p className="text-sm text-gray-400 mb-3">
                  Technical specification template for SAP development
                </p>
                <ul className="space-y-1 text-xs text-gray-500">
                  <li>• Development objects</li>
                  <li>• Data models</li>
                  <li>• Interface details</li>
                </ul>
              </button>
            </div>

            <button
              onClick={() => handleTemplateSelect('functional', 'SAP MM Stock by Storage Location Report - FSD', true)}
              className="w-full group bg-gradient-to-r from-purple-900/30 to-purple-800/30 rounded-xl p-6 text-left border-2 border-purple-500/50 hover:border-purple-500 hover:from-purple-900/50 hover:to-purple-800/50 transition-all"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-purple-600/50 rounded-lg">
                  <FileText className="w-6 h-6 text-purple-300" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white">SAP MM Stock Report FSD</h4>
                  <span className="text-xs text-purple-400 font-medium">Pre-filled Example</span>
                </div>
              </div>
              <p className="text-sm text-gray-300 mb-3">
                Complete functional specification for SAP MM stock by storage location report
              </p>
              <ul className="space-y-1 text-xs text-gray-400">
                <li>• Full document control and approvals</li>
                <li>• Selection criteria and output layout</li>
                <li>• Processing logic and testing scenarios</li>
              </ul>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
