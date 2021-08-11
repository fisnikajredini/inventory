module.exports = ({ pro, partner }) => {

    function getTotalSell() {
        let grandTotal = 0;
        const rowTotals = pro.map(
          row => (row.productBuyPrice) || 0
        );
        if (rowTotals.length > 0) {
          grandTotal = rowTotals.reduce((acc, val) => parseInt(acc) + parseInt(val));
        }
        return grandTotal;
      };
    return `
    <!doctype html>
    <html>
    <head>
    <meta charset="utf-8">
    <title>Facture</title>
    <style>
        .align-left {
            text-align: left !important;
        }
        .background-grey {
            background: #eee;
            border-bottom: 1px solid #ddd;
            font-weight: bold;
        }
        .invoice-box {
            max-width: 800px;
            margin: auto;
            padding: 30px;
            border: 1px solid #eee;
            box-shadow: 0 0 10px rgba(0, 0, 0, .15);
            font-size: 14px;
            line-height: 16px;
            font-family: 'Helvetica Neue', 'Helvetica';
            color: #555;
        }
        .margin-top {
            margin-top: 40px;
        }
        .justify-center {
            text-align: center;
        }
        .invoice-box table {
            width: 100%;
            line-height: inherit;
            text-align: left;
        }
        .invoice-box table td {
            padding: 5px;
            vertical-align: top;
        }
        .invoice-box table tr td:nth-child(2) {
            text-align: right;
        }

        .invoice-box table tr.top table td {
            padding-bottom: 20px;
        }
        .invoice-box table tr.top table td.title {
            font-size: 25px;
            line-height: 25px;
            color: #333;
        }
        .invoice-box table tr.information table td {
            padding-bottom: 40px;
        }
        .invoice-box table tr.heading td {
            background: #eee;
            border-bottom: 1px solid #ddd;
            font-weight: bold;
        }
        .invoice-box table tr.details td {
            padding-bottom: 20px;
        }
        .invoice-box table tr.item td {
            border-bottom: 1px solid #eee;
        }
        .invoice-box table tr.item.last td {
            border-bottom: none;
        }
        .invoice-box table tr.total td:nth-child(2) {
            border-top: 2px solid #eee;
            font-weight: bold;
        }
        .item-terms {
            font-size: 9px !important;
        }
        @media only screen and (max-width: 600px) {
            .invoice-box table tr.top table td {
                width: 100%;
                display: block;
                text-align: center;
            }
            .invoice-box table tr.information table td {
                width: 100%;
                display: block;
                text-align: center;
            }
        }
    </style>
    </head>
    <body>
    <div class="invoice-box">
        <h1 class="justify-center">Faktura nr: ${pro[0].productRecieptNumber}</h1>
        <table cellpadding="0" cellspacing="0">
            <tr class="top">
                <td colspan="2">
                <table>
                    <tr>
                        <td class="title"><img src="http://5guardian.store/wp-content/uploads/2021/06/logo.png"
                            style="width:100%; max-width:100px;"></td>
                        <td>
                            Data: ${pro[0].productDate}<br />
                            Partneri: ${pro[0].productPartner}<br />
                        </td>
                    </tr>
                </table>
                </td>
            </tr>
        </table>
        <table>
            <thead>
                <tr class="background-grey">
                    <th>Emri produktit</th>
                    <th>IMEI</th>
                    <th>Çmimi blerës</th>
                </tr>
            </thead>
            <tbody>
            ${pro.map((product, key) => `
                <tr ${key = product._id}>
                    <td class="align-left">${product.productName}</td>
                    <td class="align-left">${product.productImei}</td>
                    <td class="align-left">${product.productBuyPrice}</td>
                </tr>
            `).join('')}
            </tbody>
            <tfoot>
                <tr class="background-grey">
                    <td><strong>Totali:</strong></td>
                    <td></td>
                    <td><strong>${getTotalSell()}</strong></td>
                </tr>
            </tfoot>
        </table>
        <br />
    </div>
    </body>
    </html>
     `;
 };