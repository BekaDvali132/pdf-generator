import { Module } from '@nestjs/common';
import { PdfController } from './controllers/pdf/pdf.controller';
import { PdfService } from './services/pdf/pdf.service';

@Module({
  controllers: [PdfController],
  providers: [PdfService],
})
export class PdfModule {}
