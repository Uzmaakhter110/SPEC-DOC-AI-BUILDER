import { FileText, Code } from 'lucide-react';
import type { DocumentType } from '../types/document';

interface TemplateSelectorProps {
  onSelectTemplate: (type: DocumentType, title: string) => void;
}

export function TemplateSelector({ onSelectTemplate }: TemplateSelectorProps) {
  const handleSelect = (type: DocumentType) => {
    const title = type === 'functional'
      ? 'SAP Functional Specification Document'
      : 'SAP Technical Specification Document';
    onSelectTemplate(type, title);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-3">
            SpecDoc AI Builder
          </h1>
          <p className="text-lg text-gray-300">
            Generate SAP specification documents with AI assistance
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <button
            onClick={() => handleSelect('functional')}
            className="group bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 p-8 text-left border-2 border-gray-700 hover:border-purple-500 hover:scale-105"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-purple-900/50 rounded-lg group-hover:bg-purple-800/50 transition-colors">
                <FileText className="w-8 h-8 text-purple-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">
                Functional Spec
              </h2>
            </div>
            <p className="text-gray-300 mb-4">
              Create comprehensive functional specification documents for SAP implementations.
            </p>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-start">
                <span className="mr-2 text-purple-400">•</span>
                <span>Business requirements and objectives</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-purple-400">•</span>
                <span>Process flows and user roles</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-purple-400">•</span>
                <span>Data and integration requirements</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-purple-400">•</span>
                <span>Testing and acceptance criteria</span>
              </li>
            </ul>
            <div className="mt-6 text-purple-400 font-medium group-hover:text-purple-300">
              Create Functional Spec →
            </div>
          </button>

          <button
            onClick={() => handleSelect('technical')}
            className="group bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 p-8 text-left border-2 border-gray-700 hover:border-purple-500 hover:scale-105"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-purple-900/50 rounded-lg group-hover:bg-purple-800/50 transition-colors">
                <Code className="w-8 h-8 text-purple-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">
                Technical Spec
              </h2>
            </div>
            <p className="text-gray-300 mb-4">
              Build detailed technical specification documents for SAP development.
            </p>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-start">
                <span className="mr-2 text-purple-400">•</span>
                <span>Development objects and architecture</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-purple-400">•</span>
                <span>Data models and program specs</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-purple-400">•</span>
                <span>Interface and enhancement details</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-purple-400">•</span>
                <span>Error handling and performance</span>
              </li>
            </ul>
            <div className="mt-6 text-purple-400 font-medium group-hover:text-purple-300">
              Create Technical Spec →
            </div>
          </button>
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-gray-400">
            Both templates include comprehensive sections following SAP best practices
          </p>
        </div>
      </div>
    </div>
  );
}
