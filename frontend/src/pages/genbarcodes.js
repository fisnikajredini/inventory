import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import * as FiIcons from 'react-icons/fi';
import axios from 'axios';
import Swal from "sweetalert2";
import { saveAs } from 'file-saver';
import JsBarcode from 'jsbarcode';

var Barcode = require('react-barcode');



function GenBarcodes() {

    const [products, setProducts] = useState([]);
    const [productsMatch, setProductMatch] = useState([]);
    const [text, setText] = useState("");
    const [checked, setChecked] = useState("false");
    const [checked2, setChecked2] = useState("false");


    useEffect(() => {
        const loadProducts = async () => {
            const response = await axios.get('/products/get');
            setProducts(response.data.data);
        };
        loadProducts();
    }, []);

    const onChangeText = (text) => {
        let matches = []
        if (text.length > 0) {
            matches = products.filter((product) => {
                const regex = new RegExp(`${text}`, "gi");
                return product.product_name.match(regex) || product.imei.toString().match(regex) || (product.buyer == null ? product.name_surname.match(regex) : product.buyer.match(regex)) || (product.facture_number == null ? product.id_number.match(regex) : product.facture_number.match(regex));
            });
        }
        console.log('macthes', matches)
        setProductMatch(matches);
        setText(text);
    }

    const handleColums = ( e) => {
        const { checked } = e.target;
        // setChecked({checked: !setChecked})
        // console.log("object")
        if (checked === true) {
            setChecked(false)
            // console.log("true")

        } else if (checked === false) {
            // console.log("false")
            setChecked(true)
        }

    }
    const handleColums2 = ( e) => {
        const { checked } = e.target;
        // setChecked({checked: !setChecked})
        // console.log("object")
        if (checked === true) {
            setChecked2(false)
            console.log("true")

        } else if (checked === false) {
            console.log("false")
            setChecked2(true)
        }

    }

    function createAndDownloadBarcode() {
        // let products;
        let pdf_values = { pro: productsMatch }
        console.log(pdf_values)
        axios.post('/create-barcode', pdf_values)
            .then(() => axios.get('fetch-barcode', { responseType: 'blob' }))
            .then((res) => {
                const pdfBlob = new Blob([res.data], { type: 'application/pdf' });

                saveAs(pdfBlob, 'Barcodes.pdf');
            })
    }

    return (
        <>
            <div className="page-name">
                <h3>Paisjet në dispozicion</h3>
            </div>
            <div className='sales pt2'>
                <div className="row col-sm-12">
                    <div className="col-sm-3 checkboxes">
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="checkbox" id="inlineCheckbox1" onChange={handleColums2}></input>
                            <label class="form-check-label" for="inlineCheckbox1">Nr. Kontaktit</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="checkbox" id="inlineCheckbox2" onChange={handleColums}></input>
                            <label class="form-check-label" for="inlineCheckbox2">Nr. Faktures</label>
                        </div>
                    </div>
                    <div className="col-sm-9">
                        <input
                            value={text}
                            type="text"
                            id="myInput"
                            className="form-control search-bar"
                            placeholder="Kërko paisjen..."
                            onChange={(e) => onChangeText(e.target.value)} />
                    </div>
                </div>
                <table class="table table-hover table-sm">
                    <thead class="table-dark">
                        <tr>
                            <th scope="col">Emri produktit</th>
                            <th scope="col">IMEI</th>
                            <th scope="col">Data</th>
                            <th scope="col">Çmimi blerës</th>
                            <th scope="col">Çmimi shitës</th>
                            <th scope="col">Partneri / Personi</th>
                            <th scope="col" hidden={checked}>Nr. Fakturës / Nr. ID</th>
                            <th scope="col" hidden={checked2}>Nr. Kontakti</th>
                            <th scope="col">Kategoria</th>
                        </tr>
                    </thead>
                    {productsMatch && [...productsMatch].reverse().map((product, id) => (
                        <tbody key={id}>
                            <tr>
                                <td>{product.product_name}</td>
                                <td>{product.imei}</td>
                                <td>{product.date}</td>
                                <td>{product.buying_price}</td>
                                <td>{product.selling_price}</td>
                                <td>{product.buyer || product.name_surname}</td>
                                <td hidden={checked}>{product.facture_number || product.id_number}</td>
                                <td hidden={checked2}>{product.tel_num || "Partner"}</td>
                                <td>{product.category}</td>
                            </tr>
                        </tbody>
                    ))}
                </table>
                <div className="align-btn-center p2">
                    <button type="button" class="btn btn-primary" onClick={() => { createAndDownloadBarcode(); }}>Gjenero Barcode</button>
                </div>
            </div>

        </>
    )
}

export default GenBarcodes