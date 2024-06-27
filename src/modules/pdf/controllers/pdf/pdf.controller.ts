import { Body, Controller, Post, Res } from '@nestjs/common';
import { GeneratePdfDto } from '../../dtos/GeneratePdf.dto';
import { PdfService } from '../../services/pdf/pdf.service';
import { Response } from 'express';

@Controller('pdf')
export class PdfController {
  constructor(private readonly pdfService: PdfService) {}
  @Post('generate')
  async GeneratePdf(@Body() data: GeneratePdfDto, @Res() res: Response) {
    const pdfBuffer = await this.pdfService.generatePdf(data.html);
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="document.pdf"',
      'Content-Length': pdfBuffer.length,
    });
    res.end(pdfBuffer);
  }
}
