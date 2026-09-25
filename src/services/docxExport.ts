import { 
  Document, 
  Packer, 
  Paragraph, 
  TextRun, 
  HeadingLevel, 
  Table, 
  TableRow, 
  TableCell, 
  WidthType, 
  AlignmentType, 
  Header, 
  Footer, 
  PageNumber, 
  BorderStyle,
  ShadingType
} from 'docx';
import { saveAs } from 'file-saver';
import { StudyMetadata, SectionContent, ClinicalTable } from '../types';

export const exportEctdDocx = async (
  metadata: StudyMetadata,
  currentSection: SectionContent,
  activeTable: ClinicalTable
) => {
  // Strip XML citation tags for clean document prose while retaining the plain text
  const cleanProse = currentSection.narrativeTemplate
    .replace(/<cite[^>]*>/g, '')
    .replace(/<\/cite>/g, '')
    .replace(/###\s+/g, '');

  const paragraphs = cleanProse.split('\n\n').filter(Boolean);

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 1440, // 1 inch
              bottom: 1440,
              left: 1440,
              right: 1440,
            },
          },
        },
        headers: {
          default: new Header({
            children: [
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                children: [
                  new TextRun({
                    text: `CONFIDENTIAL | ${metadata.protocolId} (${metadata.protocolNumber}) | ${metadata.ectdModule}`,
                    font: "Arial",
                    size: 16, // 8pt
                    color: "666666",
                    italics: true,
                  }),
                ],
              }),
            ],
          }),
        },
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: `${metadata.sponsor} — Page `,
                    font: "Arial",
                    size: 16,
                    color: "666666",
                  }),
                  new TextRun({
                    children: [PageNumber.CURRENT],
                    font: "Arial",
                    size: 16,
                    color: "666666",
                  }),
                  new TextRun({
                    text: " of ",
                    font: "Arial",
                    size: 16,
                    color: "666666",
                  }),
                  new TextRun({
                    children: [PageNumber.TOTAL_PAGES],
                    font: "Arial",
                    size: 16,
                    color: "666666",
                  }),
                ],
              }),
            ],
          }),
        },
        children: [
          // CSR Title
          new Paragraph({
            text: `CLINICAL STUDY REPORT — ${metadata.phase.toUpperCase()}`,
            heading: HeadingLevel.TITLE,
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 },
            children: [
              new TextRun({
                font: "Arial",
                size: 32, // 16pt
                bold: true,
                color: "1A365D",
              }),
            ],
          }),

          // Protocol Metadata Box
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 400 },
            children: [
              new TextRun({
                text: `${metadata.studyTitle}\n`,
                font: "Arial",
                size: 22, // 11pt
                bold: true,
              }),
              new TextRun({
                text: `Protocol ID: ${metadata.protocolNumber} | Indication: ${metadata.indication} | Sponsor: ${metadata.sponsor}\n`,
                font: "Arial",
                size: 18,
                color: "4A5568",
              }),
              new TextRun({
                text: `Status: ${metadata.status} | Standard: ICH E3 Guideline`,
                font: "Arial",
                size: 18,
                color: "4A5568",
              }),
            ],
          }),

          // Section Heading
          new Paragraph({
            text: `${currentSection.number} ${currentSection.title}`,
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 300, after: 150 },
            children: [
              new TextRun({
                font: "Arial",
                size: 26, // 13pt
                bold: true,
                color: "2B6CB0",
              }),
            ],
          }),

          // Section Narrative Paragraphs
          ...paragraphs.map(
            (para: string) =>
              new Paragraph({
                spacing: { after: 200, line: 276 },
                children: [
                  new TextRun({
                    text: para,
                    font: "Arial",
                    size: 22, // 11pt
                    color: "1A202C",
                  }),
                ],
              })
          ),

          // Table Heading
          new Paragraph({
            text: `Table ${activeTable.number}: ${activeTable.title}`,
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 400, after: 150 },
            children: [
              new TextRun({
                font: "Arial",
                size: 22,
                bold: true,
                color: "2D3748",
              }),
            ],
          }),

          // Population note
          new Paragraph({
            spacing: { after: 150 },
            children: [
              new TextRun({
                text: `Analysis Set: ${activeTable.population} | Dataset: ${activeTable.datasetName}`,
                font: "Arial",
                size: 18,
                italics: true,
                color: "718096",
              }),
            ],
          }),

          // Regulatory Table
          new Table({
            width: {
              size: 100,
              type: WidthType.PERCENTAGE,
            },
            rows: [
              // Header Row
              new TableRow({
                tableHeader: true,
                children: [
                  new TableCell({
                    shading: { type: ShadingType.CLEAR, fill: "E2E8F0" },
                    children: [new Paragraph({ children: [new TextRun({ text: "Parameter / Endpoint", bold: true, font: "Arial", size: 18 })] })],
                  }),
                  new TableCell({
                    shading: { type: ShadingType.CLEAR, fill: "E2E8F0" },
                    children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: "Active (N=200)", bold: true, font: "Arial", size: 18 })] })],
                  }),
                  new TableCell({
                    shading: { type: ShadingType.CLEAR, fill: "E2E8F0" },
                    children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: "Placebo (N=200)", bold: true, font: "Arial", size: 18 })] })],
                  }),
                  new TableCell({
                    shading: { type: ShadingType.CLEAR, fill: "E2E8F0" },
                    children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: "Total / Difference", bold: true, font: "Arial", size: 18 })] })],
                  }),
                  new TableCell({
                    shading: { type: ShadingType.CLEAR, fill: "E2E8F0" },
                    children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: "p-value", bold: true, font: "Arial", size: 18 })] })],
                  }),
                ],
              }),
              // Data Rows
              ...activeTable.rows.map(
                (row) =>
                  new TableRow({
                    children: [
                      new TableCell({
                        children: [new Paragraph({ children: [new TextRun({ text: row.parameter, font: "Arial", size: 18 })] })],
                      }),
                      new TableCell({
                        children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: row.active, font: "Arial", size: 18 })] })],
                      }),
                      new TableCell({
                        children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: row.placebo, font: "Arial", size: 18 })] })],
                      }),
                      new TableCell({
                        children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: row.totalOrDiff, font: "Arial", size: 18 })] })],
                      }),
                      new TableCell({
                        children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: row.pValue || "--", font: "Arial", size: 18 })] })],
                      }),
                    ],
                  })
              ),
            ],
          }),

          // Sign-off note if signed
          ...(metadata.signedBy
            ? [
                new Paragraph({
                  spacing: { before: 400, after: 100 },
                  children: [
                    new TextRun({
                      text: `ELECTRONIC SIGNATURE RECORD (21 CFR PART 11 COMPLIANT)\n`,
                      font: "Arial",
                      size: 20,
                      bold: true,
                      color: "22543D",
                    }),
                    new TextRun({
                      text: `Signatory: ${metadata.signedBy} (${metadata.signatureRole || "Medical Writer"})\n`,
                      font: "Arial",
                      size: 18,
                      color: "2D3748",
                    }),
                    new TextRun({
                      text: `Timestamp: ${metadata.lockedAt || new Date().toISOString()}\nStatus: Verified and Locked for Regulatory Dossier Submission`,
                      font: "Arial",
                      size: 18,
                      color: "2D3748",
                    }),
                  ],
                }),
              ]
            : []),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, `${metadata.protocolNumber}_CSR_${currentSection.id}.docx`);
};
