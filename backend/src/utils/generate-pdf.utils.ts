import * as PdfPrinter from 'pdfmake';
import { convertNumberToUSFormatLocalString, getUserS3LogoPath } from 'src/utils/functions';
import * as moment from 'moment';
import { uploadCalculationToS3 } from './helper';
import axios, { AxiosResponse } from 'axios';
import { ChartJSNodeCanvas } from 'chartjs-node-canvas';

const width = 300; //px
const height = 250; //px

const chartJSNodeCanvas = new ChartJSNodeCanvas({
  width,
  height,
  chartCallback: Chart => {
    Chart.defaults.global.defaultFontColor = 'black';
    Chart.defaults.global.defaultFontFamily = "'Helvetica'";
  },
});

chartJSNodeCanvas.registerFont('./public/fonts/Helvetica.ttf', { family: 'Helvetica' });

/* eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types */
export const generatePieChartPdf = async (
  chartData: any,
  calculateType: string,
  loanOfficerDetails: any,
  loanOfficerUser: any,
  disclaimer: unknown,
): Promise<string> => {
  try {
    let dataUrl = '';

    const first_name = loanOfficerUser?.first_name || 'Not-available';
    const last_name = loanOfficerUser?.last_name || 'Not-available';

    const uniqueID = Date.parse(`${new Date()}`);

    const file_name = `${calculateType}_Calculation_PDF_${uniqueID}.pdf`;

    const pstDate = moment()
      .set({
        hour: moment()
          .utc()
          .hour(),
        minute: moment()
          .utc()
          .minute(),
      })
      .subtract(7, 'hour')
      .format(`MMMM Do YYYY, hh:mm:ss a`);

    const chart_data = {
      ...chartData,
    };

    const data = {
      labels: [
        `Principal & Interest: $${convertNumberToUSFormatLocalString(chart_data.breakdown.principal)}`,
        `Hazard Insurance: $${convertNumberToUSFormatLocalString(chart_data.breakdown.hazard_insurance)}`,
        `Taxes & HOA: $${convertNumberToUSFormatLocalString(chart_data.breakdown.taxes)}`,
        `MI: $${convertNumberToUSFormatLocalString(chart_data.breakdown.mortgage_insurance)}`,
      ],
      datasets: [
        {
          data: [
            chart_data.breakdown.principal,
            chart_data.breakdown.hazard_insurance,
            chart_data.breakdown.taxes,
            chart_data.breakdown.mortgage_insurance,
          ],
          backgroundColor: ['rgb(135,206,250)', 'rgb(0,0,0)', 'rgb(173,255,47)', 'rgb(255,165,0)'],
          borderWidth: 1,
        },
      ],
    };
    const plugin = {
      id: 'custom_canvas_background_color',
      beforeDraw: chart => {
        const ctx = chart.canvas.getContext('2d');
        ctx.save();
        ctx.globalCompositeOperation = 'destination-over';
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, chart.width, chart.height);
        ctx.restore();
      },
    };

    const configuration = {
      type: 'pie',
      plugins: [plugin],
      data: data,
      options: {
        devicePixelRatio: 3.5,
        legend: {
          display: true,
          position: 'bottom' as const,
          labels: {
            fontSize: 8,
            usePointStyle: true,
            boxWidth: 5,
          },
        },
        title: {
          display: true,
          text: `$${convertNumberToUSFormatLocalString(
            chart_data.breakdown.total_monthly_payment,
          )} Total payment Amount`,
          fontSize: 10,
        },
      },
    };

    dataUrl = await chartJSNodeCanvas.renderToDataURL(configuration);

    const fonts = {
      Helvetica: {
        normal: 'Helvetica',
        bold: 'Helvetica-Bold',
        italics: 'Helvetica-Oblique',
        bolditalics: 'Helvetica-BoldOblique',
      },
    };
    const printer = new PdfPrinter(fonts);
    let logo: string = getUserS3LogoPath(loanOfficerDetails.logo);

    logo = logo ?? process.env.S3_URL + 'images/logo.png';

    let image: AxiosResponse<any> = await axios(logo, { responseType: 'arraybuffer' });

    let raw: string = Buffer.from(image.data).toString('base64');

    let base64Image: string = 'data:' + image.headers['content-type'] + ';base64,' + raw;

    const docDefinition = {
      styles: {
        header: {
          fontSize: 14,
          bold: true,
          alignment: 'right',
          margin: [0, 190, 0, 80],
        },
        subheader: {
          fontSize: 12,
        },
        footer: {
          fontSize: 8,
          color: '#808080',
        },
      },
      content: [
        {
          columns: [
            {
              image: base64Image,
              width: 100,
              margin: [0, 0, 0, 20],
            },
            {
              stack: [
                first_name + ' ' + last_name,
                {
                  text: loanOfficerDetails?.designation ? loanOfficerDetails?.designation : 'Not-available',
                  style: 'subheader',
                },
              ],
              style: 'header',
              margin: [200, 0, 0, 20],
            },
          ],
        },
        {
          columns: [
            {
              image: dataUrl,
              width: 250,
            },
            {
              table: {
                body: chart_data.details.map(value => [
                  {
                    text: value.name,
                    alignment: 'left',
                    border: [false, false, false, false],
                    margin: [0, 0, 50, 5],
                  },
                  {
                    text: `${value.value}`,
                    alignment: 'right',
                    border: [false, false, false, false],
                  },
                ]),
              },
              margin: [25, 0, 0, 0],
            },
          ],
        },
        {
          // Replace text with calculation date
          text: `Calculation Run at ${pstDate} PST`,
          alignment: 'center',
          margin: [0, 20, 0, 20],
        },
        {
          // Replace text with LO's disclaimer
          alignment: 'justify',
          style: 'footer',
          text: disclaimer,
        },
      ],
      defaultStyle: {
        font: 'Helvetica',
      },
    };

    const options = {};

    const pdfDoc = printer.createPdfKitDocument(docDefinition, options);

    let chunks = [];

    pdfDoc.on('data', chunk => {
      chunks.push(chunk);
    });

    pdfDoc.on('end', () => {
      const result = Buffer.concat(chunks);
      uploadCalculationToS3(file_name, result, process.env.AWS_S3_BUCKET_CALCULATION_DOCUMENTS);
    });

    // PDFDoc Process Kill
    pdfDoc.end();

    return file_name;
  } catch (error) {
    console.log('ERROR GENERATE PDF: ', error);
  }
  return '';
};
