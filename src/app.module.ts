import { Module } from '@nestjs/common';
import { PdfModule } from './modules/pdf/pdf.module';

@Module({
  imports: [PdfModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
