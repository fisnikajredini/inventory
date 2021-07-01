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
    const [partners, setPartners] = useState([]);
    const [selected, setSelected] = useState("");


    useEffect(() => {
        axios.get('/products/get').then(res => {
            // partners = data.data.data
            // console.log(res.data.data)
            // setProducts(res.data.data)
        })
            .catch(err => {
                console.log(err)
            })
        axios.get('/partners/get').then(res => {
            // partners = data.data.data
            // console.log(res.data.data)
            // setPartners(res.data.data)
        })
            .catch(err => {
                console.log(err)
            })
    }, []);

    const changeSelectOptionHandler = (event) => {
        setSelected(event.target.value);
    };



    function getByProduct(event) {
        if (selected === "IMEI") {
            getByImeiProduct(event.target.value);
        } else if (selected === "Emri Produktit") {
            getByNameProduct(event.target.value)
        } else if (selected === "Partneri") {
            getByPartnerProduct(event.target.value)
        } else if (selected === "Nr. Faktures") {
            getByFactureProduct(event.target.value)
        }
    }

    function getByImeiProduct(event) {
        let route = '/products/get/byimei';
        axios.post(route, { imei: event }).then(data => {
            if (data.data.data !== null) {
                //console.log(data.data.data);
                setProducts([data.data.data]);
            }
        })
    }

    function getByNameProduct(event) {
        let route = '/products/get/byname';
        axios.post(route, { name: event }).then(data => {
            //console.log(data.data.data);
            setProducts(data.data.data);
        })
    }

    function getByPartnerProduct(event) {
        let route = '/products/get/bypartner';
        axios.post(route, { partnername: event }).then(data => {
            //console.log(data.data.data)
            setProducts(data.data.data);
        })

    }
    function getByFactureProduct(event) {
        let route = '/products/get/byfacture';
        axios.post(route, { nrfaktures: event }).then(data => {
            //console.log(data.data.data)
            setProducts(data.data.data);
        })

    }

    function createAndDownloadBarcode() {
        // let products;
        let pdf_values = { pro:products }
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
                    <div className="col-sm-3">
                        <select className="form-control" id="exampleFormControlSelect1" onChange={changeSelectOptionHandler}>
                            <option>IMEI</option>
                            <option>Emri Produktit</option>
                            <option>Nr. Faktures</option>
                            <option>Partneri</option>
                        </select>
                    </div>
                    <div className="col-sm-9">
                        <input
                            type="text"
                            id="myInput"
                            className="form-control search-bar"
                            placeholder="Kërko paisjen..."
                            onChange={getByProduct} />
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
                            <th scope="col">Nr. Fakturës / Nr. ID</th>
                            <th scope="col">Kategoria</th>
                        </tr>
                    </thead>
                    {[...products].reverse().map((product, id, key) =>
                        <tbody key={product._id}>
                            <tr>
                                <td>{product.product_name}</td>
                                <td>{product.imei}</td>
                                <td>{product.date}</td>
                                <td>{product.buying_price}</td>
                                <td>{product.selling_price}</td>
                                <td>{product.buyer || product.name_surname}</td>
                                <td>{product.facture_number || product.id_number}</td>
                                <td>{product.category}</td>
                            </tr>
                        </tbody>
                    )}
                </table>
                <div className="align-btn-center p2">
                    <button type="button" class="btn btn-primary" onClick={() => {createAndDownloadBarcode();}}>Gjenero Barcode</button>
                </div>
            </div>

        </>
    )
}

export default GenBarcodes