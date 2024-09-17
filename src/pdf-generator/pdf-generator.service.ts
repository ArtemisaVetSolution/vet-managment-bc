import { Injectable } from '@nestjs/common';
import PdfPrinter from 'pdfmake';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { CatchErrors } from 'src/common/decorators/catch-errors.decorator';

const fonts = {
    Roboto: {
        normal: 'fonts/Roboto-Regular.ttf',
        bold: 'fonts/Roboto-Bold.ttf',
        italics: 'fonts/Roboto-Italic.ttf',
        bolditalics: 'fonts/Roboto-LightItalic.ttf'
    },
}

@Injectable()
@CatchErrors()
export class PdfGeneratorService {
    private printer = new PdfPrinter(fonts);


    async generatePdf(docDefinition: TDocumentDefinitions) {
        return this.printer.createPdfKitDocument(docDefinition)
    }
}
