module.exports = ({ pro, partner }) => {
    const today = new Date();

    function getTotalSell() {
        let grandTotal = 0;
        const rowTotals = pro.map(
            row => (row.selled_price == null ? row.selling_price : row.selled_price) || 0
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
    <title>Garantion</title>
    <style>
        .align-right {
            text-align: left !important;
        }
        .invoice-box {
            max-width: 800px;
            margin: auto;
            padding: 30px;
            border: 1px solid #eee;
            box-shadow: 0 0 10px rgba(0, 0, 0, .15);
            font-size: 10px;
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
            border-bottom: 2px solid #dee2e6;
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
        .table-dark {
            color:#fff !important;
            background-color: #343a40;
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
        <h1 class="justify-center">Raporti i shitjeve</h1>
        <table cellpadding="0" cellspacing="0">
            <tr class="information">
            <tr class="heading">
                <td>
                Data:
                </td>
                <td>
                ${`${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`} 
                </td>
            </tr>
            </tr>
        </table>
        <table class="table table-sm">
            <thead class="table-dark">
                <tr>
                    <th scope="col">Emri produktit</th>
                    <th scope="col">IMEI</th>
                    <th scope="col">Data e shitjes</th>
                    <th scope="col">Çmimi shitës</th>
                    <th scope="col">Shitësi</th>
                </tr>
            </thead>
            <tbody>
            ${pro.map((product, key) => `
                <tr ${key = product._id}>
                    <td>${product.product_name}</td>
                    <td class="align-right">${product.imei}</td>
                    <td>${product.date}</td>
                    <td>${product.selled_price || product.selling_price}</td>
                    <td>Irfan Ferati</td>
                </tr>
            `).join('')}
            </tbody>
            <tfoot>
                <tr class="table-dark">
                    <td><strong>Totali:</strong></td>
                    <td></td>
                    <td></td>
                    <td><strong>${getTotalSell()}</strong></td>
                    <td></td>
                </tr>
            </tfoot>
        </table>
        <br />
    </div>
    </body>
    </html>
     `;
};