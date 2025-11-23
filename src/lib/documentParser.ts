import mammoth from 'mammoth';
import type { DocumentSection } from '../types/document';

interface ParsedContent {
  title: string;
  sections: DocumentSection[];
}

export async function parseDocxFile(file: File): Promise<ParsedContent> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.convertToHtml({ arrayBuffer });

    const parser = new DOMParser();
    const doc = parser.parseFromString(result.value, 'text/html');

    const title = extractTitle(doc);
    const sections = extractSections(doc);

    return { title, sections };
  } catch (error) {
    console.error('Error parsing document:', error);
    throw new Error('Failed to parse document. Please ensure it is a valid .docx file.');
  }
}

function extractTitle(doc: Document): string {
  const firstHeading = doc.querySelector('h1');
  if (firstHeading?.textContent) {
    return firstHeading.textContent.trim();
  }
  return 'Uploaded Document';
}

function extractSections(doc: Document): DocumentSection[] {
  const sections: DocumentSection[] = [];
  const headings = doc.querySelectorAll('h1, h2, h3, h4, h5, h6');

  let sectionCounter = 1;
  let currentH1: DocumentSection | null = null;
  let currentH2: DocumentSection | null = null;

  headings.forEach((heading) => {
    const level = parseInt(heading.tagName.substring(1));
    const title = heading.textContent?.trim() || '';
    const content = extractContentAfterHeading(heading);

    const section: DocumentSection = {
      id: `section-${sectionCounter++}`,
      title,
      content,
      level,
    };

    if (level === 1) {
      sections.push(section);
      currentH1 = section;
      currentH2 = null;
    } else if (level === 2 && currentH1) {
      if (!currentH1.subsections) {
        currentH1.subsections = [];
      }
      currentH1.subsections.push(section);
      currentH2 = section;
    } else if (level === 3 && currentH2) {
      if (!currentH2.subsections) {
        currentH2.subsections = [];
      }
      currentH2.subsections.push(section);
    }
  });

  return sections.length > 0 ? sections : createDefaultSection(doc);
}

function extractContentAfterHeading(heading: Element): string {
  const content: string[] = [];
  let sibling = heading.nextElementSibling;

  while (sibling && !sibling.matches('h1, h2, h3, h4, h5, h6')) {
    const text = sibling.textContent?.trim();
    if (text) {
      content.push(text);
    }
    sibling = sibling.nextElementSibling;
  }

  return content.join('\n\n') || 'No content';
}

function createDefaultSection(doc: Document): DocumentSection[] {
  const allText = doc.body.textContent?.trim() || 'No content found';

  return [
    {
      id: 'section-1',
      title: 'Document Content',
      content: allText,
      level: 1,
    },
  ];
}

export function convertSectionsToHtml(sections: DocumentSection[]): string {
  let html = '';

  function renderSection(section: DocumentSection) {
    const headingTag = `h${section.level}`;
    html += `<${headingTag} class="text-${4 - section.level}xl font-bold text-white mb-4 mt-6">${section.title}</${headingTag}>`;

    const paragraphs = section.content.split('\n\n');
    paragraphs.forEach(para => {
      if (para.trim()) {
        html += `<p class="text-gray-300 mb-4 leading-relaxed">${para.trim()}</p>`;
      }
    });

    if (section.subsections) {
      section.subsections.forEach(subsection => renderSection(subsection));
    }
  }

  sections.forEach(section => renderSection(section));
  return html;
}
