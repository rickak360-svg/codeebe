import PDFDocument from 'pdfkit';
import type { SRSDocument, MarketComparison } from '../leads/srs.generator';
import type { EstimateResult } from '../leads/types/lead.types';
import { formatInr } from '../leads/estimate.utils';

export interface QuotationPdfInput {
  fullName: string;
  projectType: string;
  timeline: string;
  estimate: EstimateResult;
  srs: SRSDocument;
  marketComparison: MarketComparison;
  createdAt: string;
}

export async function buildQuotationPdf(input: QuotationPdfInput): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 50, size: 'A4' });
    const chunks: Buffer[] = [];

    doc.on('data', (chunk: Buffer) => chunks.push(chunk));
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.on('error', reject);

    const orange = '#FF6600';

    doc.fillColor(orange).fontSize(22).text('Codeebe', { continued: true });
    doc.fillColor('#333').fontSize(14).text('  · Project Quotation');
    doc.moveDown(0.5);
    doc.fillColor('#666').fontSize(10).text(`Generated ${new Date(input.createdAt).toLocaleDateString('en-IN')}`);
    doc.moveDown(1);

    doc.fillColor('#111').fontSize(16).text(`Prepared for ${input.fullName}`);
    doc.fontSize(12).fillColor('#444').text(`${input.projectType} · ${input.timeline}`);
    doc.moveDown(1);

    doc.fillColor(orange).fontSize(12).text('ESTIMATED INVESTMENT');
    doc.fillColor('#111').fontSize(20).text(
      `${formatInr(input.estimate.minPrice)} – ${formatInr(input.estimate.maxPrice)}`,
    );
    doc.fillColor('#666').fontSize(10).text(input.estimate.summary);
    doc.moveDown(1);

    section(doc, 'Overview', input.srs.overview);
    section(doc, 'Scope included', input.srs.scope.included.map((s) => `• ${s}`).join('\n'));
    section(
      doc,
      'Functional requirements',
      input.srs.functionalRequirements
        .slice(0, 8)
        .map((r) => `• ${r.title} (${r.priority})`)
        .join('\n'),
    );
    section(
      doc,
      'Delivery phases',
      input.srs.phases.map((p) => `Phase ${p.phase}: ${p.name} (${p.duration})`).join('\n'),
    );
    section(doc, 'Why Codeebe', input.marketComparison.whyCodeebe.map((w) => `• ${w}`).join('\n'));

    doc.moveDown(1);
    doc.fillColor('#888').fontSize(9).text(
      'This is an indicative estimate. Final scope and pricing are confirmed after a discovery call.',
      { align: 'center' },
    );

    doc.end();
  });
}

function section(doc: InstanceType<typeof PDFDocument>, title: string, body: string) {
  if (!body.trim()) return;
  doc.moveDown(0.5);
  doc.fillColor('#FF6600').fontSize(11).text(title.toUpperCase());
  doc.fillColor('#333').fontSize(10).text(body, { lineGap: 4 });
}
