import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  UnderlineType,
} from 'docx';
import { saveAs } from 'file-saver';
import type { DocumentSection, SpecDocument } from '../types/document';

function createParagraphsFromContent(content: string): Paragraph[] {
  const lines = content.split('\n');
  return lines.map(
    (line) =>
      new Paragraph({
        children: [
          new TextRun({
            text: line || ' ',
            size: 22,
          }),
        ],
        spacing: {
          after: 100,
        },
      })
  );
}

function createSectionParagraphs(
  section: DocumentSection,
  paragraphs: Paragraph[] = []
): Paragraph[] {
  const headingLevel =
    section.level === 1 ? HeadingLevel.HEADING_1 : HeadingLevel.HEADING_2;

  paragraphs.push(
    new Paragraph({
      text: `${section.id}. ${section.title}`,
      heading: headingLevel,
      spacing: {
        before: section.level === 1 ? 400 : 200,
        after: 200,
      },
    })
  );

  const contentParagraphs = createParagraphsFromContent(section.content);
  paragraphs.push(...contentParagraphs);

  if (section.subsections && section.subsections.length > 0) {
    section.subsections.forEach((subsection) => {
      createSectionParagraphs(subsection, paragraphs);
    });
  }

  return paragraphs;
}

export async function exportToDocx(document: SpecDocument): Promise<void> {
  const docType =
    document.doc_type === 'functional' ? 'Functional' : 'Technical';

  const paragraphs: Paragraph[] = [];

  paragraphs.push(
    new Paragraph({
      children: [
        new TextRun({
          text: document.title,
          bold: true,
          size: 32,
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: {
        after: 400,
      },
    })
  );

  paragraphs.push(
    new Paragraph({
      children: [
        new TextRun({
          text: `${docType} Specification`,
          size: 24,
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: {
        after: 600,
      },
    })
  );

  document.content.forEach((section) => {
    createSectionParagraphs(section, paragraphs);
  });

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: paragraphs,
      },
    ],
  });

  const blob = await Packer.toBlob(doc);

  const fileName = `${document.title.replace(/[^a-z0-9]/gi, '_')}_${new Date().toISOString().split('T')[0]}.docx`;

  saveAs(blob, fileName);
}
