module.exports = ({ inputFields }) => {
    const today = new Date();
    return `
    <!doctype html>
    <html>
       <head> 
          <meta charset="utf-8">
          <title>Facture</title>
          <style>
             
          </style>
       </head>
       <body>
       <table class="table table-hover table-sm">
       <thead class="table-dark">
           <tr>
               <th scope="col">Emri produktit</th>
               <th scope="col">IMEI</th>
               <th scope="col">Data</th>
               <th scope="col">Çmimi blerës</th>
               <th scope="col">Çmimi shitës</th>
               <th scope="col">Partneri / Personi</th>
               <th scope="col">Nr. Fakturës / Nr. ID</th>
               <th scope="col">Kategoria</th>
           </tr>
       </thead>
           <tbody>
           ${inputFields.map((product, key) => `
               <tr ${key = product._id}>
                   <td>${product.product_name}</td>
                   <td>${product.imei}</td>
                   <td>${product.date}</td>
                   <td>${product.buying_price}</td>
                   <td>${product.selling_price}</td>
                   <td>${product.buyer}</td>
                   <td>${product.facture_number}</td>
                   <td>${product.category}</td>
               </tr>
               `).join('')}
           </tbody>
   </table>
       </body>
    </html>
     `;
 };