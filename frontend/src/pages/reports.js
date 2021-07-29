import React, { useState, useEffect } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as RiIcons from 'react-icons/ri';
import * as FiIcons from 'react-icons/fi';
import axios from 'axios';
import Swal from "sweetalert2";


function Reports() {

    const [products, setProducts] = useState([]);
    const [productsMatch, setProductMatch] = useState([]);
    const [text, setText] = useState("");
    const [checked, setChecked] = useState("false");
    const [checked2, setChecked2] = useState("false");

    useEffect(() => {
        axios.get('/sales/get').then(res => {
            // partners = data.data.data
            console.log(res.data.data)
            setProducts(res.data.data)
            setProductMatch(res.data.data)
        })
            .catch(err => {
                console.log(err)
            })
        // axios.get("/getpartner").then((response) => {
        // this.setState({company_name: response.data.data });
        // });
    }, []);

    // useEffect(() => {
    //     const loadProducts = async () => {
    //         const response = await axios.get('/sales/get');
    //         setProducts(response.data.data);
    //     };
    //     loadProducts();
    // }, []);

    function removeSale(id) {
        Swal.fire({
            title:
                "Dëshironi të fshini produktin ? ",
            showDenyButton: true,
            confirmButtonText: `PO`,
            denyButtonText: `JO`,
        }).then((result) => {
            if (result.isConfirmed) {
                let route = '/sales/delete/product';
                console.log(id)
                axios.post(route, { id: id }).then(data => {
                    axios.get('/sales/get').then(res => {
                        // partners = data.data.data
                        console.log(res.data.data)
                        setProducts(res.data.data);
                    })
                        .catch(err => {
                            console.log(err)
                        })
                })
                    .catch(err => {
                        console.log(err)
                    })
                Swal.fire("Produkti u fshi!", "", "success").then();
            } else if (result.isDenied) {
                Swal.fire("Produkti nuk u fshi!", "", "error");
            }
        });
    };

    function addToProductsTable(e) {

        let inputs = products;
        inputs[0].product_name = e.product_name;
        inputs[0].imei = e.lastName;
        inputs[0].category = e.category;
        inputs[0].date = e.date;
        inputs[0].buyer = e.buyer;
        inputs[0].buyer = e.buyer;
        inputs[0].buying_price = e.buying_price;
        inputs[0].selling_price = e.selling_price;
        inputs[0].facture_number = e.facture_number;
        inputs[0].buyer = e.buyer;
        inputs[0].name_surname = e.name_surname;
        inputs[0].tel_num = e.tel_num;
        inputs[0].id_number = e.id_number;

        let id_to_del = inputs[0]._id;

        axios.post('/products/add/report', inputs)
            .then(
                // axios.post('/sales/delete/product', { id: id_to_del }).then()
                //     .catch(err => {
                //         console.log(err)
                //     })
            )
            .catch(err => console.log(err))

    }

    const onChangeText = (text) => {
        let matches = []
        if (text.length > 0) {
            matches = products.filter((product) => {
                const regex = new RegExp(`${text}`, "gi");
                return product.product_name.match(regex) || product.imei.toString().match(regex) || product.last_name.match(regex) || product.first_name.match(regex);
            });
        } else {
            matches = products.filter((product) => {
                const regex = new RegExp(`${text}`, "gi");
                return product.product_name.match(regex) || product.imei.toString().match(regex) || product.last_name.match(regex) || product.first_name.match(regex);
            });
        }
        console.log('macthes', matches)
        // setProductMatch(products);
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

    return (
        <>
            <div className="page-name">
                <h3>Raporti i shitjeve</h3>
            </div>
            <div className='reports pt2' onSubmit={(e) => addToProductsTable(e)}>
                <div className="exportButtonContainer">
                    <button id="exportButton1" class="btn btn-lg btn-warning clearfix"><FaIcons.FaFilePdf /> Export to PDF</button>
                    <button id="exportButton2" class="btn btn-lg btn-success clearfix"><RiIcons.RiFileExcel2Fill /> Export to Excel</button>
                </div>
                <div className="row col-sm-12 pb2">
                    <div className="col-sm-3 checkboxes">
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="checkbox" id="inlineCheckbox1" onChange={handleColums2}></input>
                            <label class="form-check-label" for="inlineCheckbox1">Edit</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="checkbox" id="inlineCheckbox2" onChange={handleColums}></input>
                            <label class="form-check-label" for="inlineCheckbox2">Shitësi</label>
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
                <table id="exportTable" class="table table-hover table-sm">
                    <thead class="table-dark">
                        <tr>
                            <th scope="col">Emri produktit</th>
                            <th scope="col">IMEI</th>
                            <th scope="col">Data</th>
                            <th scope="col">Garancion</th>
                            <th scope="col">Blerësi</th>
                            <th scope="col">Partneri</th>
                            <th scope="col">Çmimi shitës</th>
                            <th scope="col" hidden={checked}>Shitësi</th>
                            <th scope="col" hidden={checked2}>Edit/Delete</th>
                        </tr>
                    </thead>
                    {productsMatch && [...productsMatch].reverse().map((product, id) => (
                        <tbody>
                            <tr>
                                <td>{product.product_name}</td>
                                <td>{product.imei}</td>
                                <td>{product.date}</td>
                                <td>{product.garantion_date}</td>
                                <td>{product.first_name} {product.last_name}</td>
                                <td>{product.buyer || product.name_surname}</td>
                                <td>{product.selled_price || product.selling_price}</td>
                                <td hidden={checked}>Irfan Ferati</td>
                                {/* <td>{product.category}</td> */}
                                <td className="edit-delete" hidden={checked2}>
                                    <div className="edit"
                                        onClick={() => { addToProductsTable(product); }}>
                                        <RiIcons.RiArrowGoBackFill /></div>
                                    <div className="delete"
                                        onClick={() => removeSale(product._id)}>
                                        <FiIcons.FiTrash /></div></td>
                            </tr>
                        </tbody>
                    ))}
                </table>
            </div>
        </>
    )
}

export default Reports

