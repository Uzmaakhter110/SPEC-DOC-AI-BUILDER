export type DocumentType = 'functional' | 'technical';

export interface DocumentSection {
  id: string;
  title: string;
  content: string;
  level: number;
  subsections?: DocumentSection[];
}

export interface SpecDocument {
  id?: string;
  title: string;
  doc_type: DocumentType;
  content: DocumentSection[];
  created_at?: string;
  updated_at?: string;
  user_id?: string;
}

export interface DocumentHistory {
  id: string;
  document_id: string;
  content: DocumentSection[];
  ai_instruction: string | null;
  created_at: string;
  user_id: string;
}
