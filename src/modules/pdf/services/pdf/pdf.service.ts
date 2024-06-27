import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import * as puppeteer from 'puppeteer';

@Injectable()
export class PdfService implements OnModuleDestroy, OnModuleInit {
  private browser: puppeteer.Browser;
  private page: puppeteer.Page;

  async onModuleInit() {
    await this.initialize();
  }

  private async initialize() {
    try {
      this.browser = await puppeteer.launch({
        executablePath: puppeteer.executablePath(), // Use the downloaded Chrome
        args: ['--no-sandbox', '--disable-setuid-sandbox'], // Add these arguments if needed
      });
      console.log('Launching browser');
      this.page = await this.browser.newPage();
    } catch (error) {
      console.error('Failed to initialize Puppeteer', error);
    }
  }

  async generatePdf(htmlContent: string): Promise<Buffer> {
    try {
      await this.page.setContent(htmlContent, { waitUntil: 'networkidle0' });
      return await this.page.pdf({ format: 'A4', timeout: 60000 }); // Increased timeout to 60 seconds
    } catch (error) {
      console.error('Failed to generate PDF', error);
      throw new Error('PDF generation failed');
    }
  }

  async onModuleDestroy() {
    if (this.browser) {
      try {
        await this.browser.close();
      } catch (error) {
        console.error('Failed to close browser', error);
      }
    }
  }
}
