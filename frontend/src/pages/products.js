import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import * as FiIcons from 'react-icons/fi';
import axios from 'axios';
import Swal from "sweetalert2";

const EditProduct = styled.nav`
  right: ${({ editproduct }) => (editproduct ? '0px' : '-100%')};
  transition: 100ms;
  z-index: 11;
`;

function Products() {

    const [products, setProducts] = useState([]);
    const [partners, setPartners] = useState([]);
    const [selected, setSelected] = useState("");
    const [editproduct, setEditProduct] = useState(false);
    const showEditProduct = () => setEditProduct(!editproduct);
    const [editItem, setEditItem] = useState([]);
    const [inputFields, setInputFields] = useState([{
        productName: '',
        productImei: '',
        productCategory: '',
        productDate: '',
        productPartner: '',
        productBuyPrice: '',
        productSellPrice: '',
        productRecieptNumber: '',
        productPName: '',
        productPIdNr: ''
    }]);

    useEffect(() => {
        axios.get('/products/get').then(res => {
            // partners = data.data.data
            console.log(res.data.data)
            setProducts(res.data.data)
        })
            .catch(err => {
                console.log(err)
            })
        axios.get('/partners/get').then(res => {
            // partners = data.data.data
            console.log(res.data.data)
            setPartners(res.data.data)
        })
            .catch(err => {
                console.log(err)
            })
    }, []);

    const changeSelectOptionHandler = (event) => {
        setSelected(event.target.value);
    };

    function onEdit(product) {
        Swal.fire({
            title:
                "Dëshironi të ndryshoni produktin? " + product.product_name + " " + product.imei,
            showDenyButton: true,
            confirmButtonText: `PO`,
            denyButtonText: `JO`,
        }).then((result) => {
            if (result.isConfirmed) {
                setEditItem([...editItem, product]);
                setInputFields([{
                    productName: product.product_name,
                    productImei: product.imei,
                    productCategory: product.category,
                    productDate: product.data,
                    productPartner: product.buyer,
                    productBuyPrice: product.buying_price,
                    productSellPrice: product.selling_price,
                    productRecieptNumber: product.facture_number,
                    productPName: product.name_surname,
                    productPIdNr: product.tel_num

                }])
                console.log(editItem)
                // const exist = editItem.find(x => x.id === product._id);
                // if (exist) {
                //     setEditItem(editItem.map(x => x.id === product._id ? { ...exist } : x
                //     )
                //     );
                //     console.log(editItem)
                // } else {
                //     setEditItem([...editItem, { ...product }]);
                //     console.log(editItem)
                // }
            } else if (result.isDenied) {
                Swal.fire("Produkti nuk u selektua!", "", "error");
            }
        });
    };

    const onRemove = (productRemove) => {
        setEditItem(
            editItem.filter((product) => product !== productRemove)
        )
        // const exist = editItem.find((x) => x.id === product._id);
        // if (exist === 1) {
        //     setEditItem(editItem.filter((x) => x.id !== product._id));
        // } else {
        //     setEditItem(editItem.map(x => x.id === product._id ? { ...exist } : x
        //     )
        //     );
        // }
    }

    const handleChangeInput = (index, event) => {
        const values = [...inputFields];
        values[index][event.target.name] = event.target.value;
        setInputFields(values);
    }

    function getByProduct(event) {
        if (selected === "IMEI") {
            getByImeiProduct(event.target.value);
        } else if (selected === "Emri Produktit") {
            getByNameProduct(event.target.value)
        } else if (selected === "Partneri") {
            getByPartnerProduct(event.target.value)
        } else if (selected === "Nr. Faktures") {
            getByFactureProduct(event.target.value)

        } else if (selected === "Të gjithë produktet") {
            axios.get('/products/get').then(res => {
                // partners = data.data.data
                console.log(res.data.data)
                setProducts(res.data.data)
            })
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

    function removeProduct(id) {
        Swal.fire({
            title:
                "Dëshironi të fshini produktin ? ",
            showDenyButton: true,
            confirmButtonText: `PO`,
            denyButtonText: `JO`,
        }).then((result) => {
            if (result.isConfirmed) {
                let route = '/product/delete/product';
                console.log(id)
                axios.post(route, { id: id }).then(data => {
                    axios.get('/products/get').then(res => {
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

    const maxLengthCheck = (object) => {
        if (object.target.value.length > object.target.maxLength) {
            object.target.value = object.target.value.slice(0, object.target.maxLength)
        }
    }

    function updateProduct(id) {
        let changed_inputs = {id: id._id, fields:{
            product_name: inputFields[0].productName,
            imei: inputFields[0].productImei,
            category: inputFields[0].productCategory,
            date: inputFields[0].productDate,
            name_surname: inputFields[0].productPName,
            tel_num: inputFields[0].productPContactNr,
            id_number: inputFields[0].productPIdNr,
            buying_price: inputFields[0].productBuyPrice,
            selling_price: inputFields[0].productSellPrice,
            buyer: inputFields[0].productPartner,
            facture_number: inputFields[0].productRecieptNumber,
        } }
        axios.post('/product/edit', changed_inputs)
            .then(console.log(inputFields[0]))
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <>
            <div className="page-name">
                <h3>Paisjet në dispozicion</h3>
            </div>
            <div className='sales pt2' onEdit={onEdit}>
                <div className="row col-sm-12">
                    <div className="col-sm-3">
                        <select className="form-control" id="exampleFormControlSelect1" onChange={changeSelectOptionHandler}>
                            <option>Të gjithë produktet</option>
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
                            <th scope="col">Edit / Delete</th>
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
                                <td className="edit-delete"><div className="edit" onClick={() => {
                                    onEdit(product);
                                    showEditProduct();
                                }}><FiIcons.FiEdit2 /></div><div className="delete" onClick={() => removeProduct(product._id)}><FiIcons.FiTrash /></div></td>
                            </tr>
                        </tbody>
                    )}
                </table>
            </div>
            <EditProduct editproduct={editproduct} className="garantion-form">
                {editItem.map((product, idx) => (
                    <>
                        <div className="close-form" onClick={() => {
                            onRemove(product);
                            showEditProduct();
                        }}>X</div>
                        <div className="popup-form" key={idx}>
                            <div className="form-group">
                                <h3 className="title pt-2">Ndrysho produktin:</h3>
                            </div>
                            {inputFields.map((inputField, index) => (
                                <div key={index}>
                                    <div className="row garantion-inputs col-sm-12">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label for="tabel" className="form-label">Emri i Produktit</label>
                                                <input type="input" name="productName"
                                                    value={inputField.productName}
                                                    onChange={event => handleChangeInput(index, event)}
                                                    className="form-control"
                                                    aria-describedby="emri-produktit"></input>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label for="tabel" className="form-label">IMEI</label>
                                                <input type="number" name="productImei" maxLength="15"
                                                    onInput={maxLengthCheck}
                                                    value={inputField.productImei}
                                                    onChange={event => handleChangeInput(index, event)}
                                                    className="form-control small-input"
                                                    aria-describedby="imei"></input>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label for="tabel" className="form-label">Kategoria</label>
                                                <select className="form-control" name="productCategory"
                                                    value={inputField.productCategory}
                                                    onChange={event => handleChangeInput(index, event)}
                                                    aria-describedby="shifra">
                                                    <option>Celular</option>
                                                    <option>Tablet</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label for="tabel" className="form-label">Data</label>
                                                <input type="date" className="form-control"
                                                    name="productDate"
                                                    value={inputField.productDate}
                                                    onChange={event => handleChangeInput(index, event)}
                                                    aria-describedby="emri-produktit"></input>
                                            </div>
                                        </div>
                                        {product.name_surname == null ?
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label for="tabel" className="form-label">Blerësi</label>
                                                    <select className="form-control"
                                                        name="productPartner"
                                                        value={inputField.productPartner}
                                                        onChange={event => handleChangeInput(index, event)}
                                                        aria-describedby="shifra">
                                                        <option value="" disabled selected>Zgjidhe Partnerin</option>
                                                        {partners.map(partner => (
                                                            <option key={partner.id}>{partner.company_name}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div> :
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label for="tabel" className="form-label">Blerësi</label>
                                                    <input type="text" className="form-control"
                                                        name="productPName"
                                                        value={inputField.productPName}
                                                        onChange={event => handleChangeInput(index, event)}
                                                        aria-describedby="emri-produktit"></input>
                                                </div>
                                            </div>
                                        }
                                        {product.id_number == null ?
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label for="tabel" className="form-label">Nr. fakturës</label>
                                                    <input type="text" className="form-control"
                                                        name="productRecieptNumber"
                                                        value={inputField.productRecieptNumber}
                                                        onChange={event => handleChangeInput(index, event)}
                                                        aria-describedby="imei"></input>
                                                </div>
                                            </div> :
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label for="tabel" className="form-label">Nr. Letërnjoftimit</label>
                                                    <input type="text" className="form-control"
                                                        name="productPIdNr"
                                                        value={inputField.productPIdNr}
                                                        onChange={event => handleChangeInput(index, event)}
                                                        aria-describedby="imei"></input>
                                                </div>
                                            </div>
                                        }
                                        <div className="col-md-6">
                                            <label for="tabel" className="form-label">Çmimi blerës</label>
                                            <div class="input-group mb-2">
                                                <div class="input-group-prepend">
                                                    <div class="input-group-text">€</div>
                                                </div>
                                                <input type="number" class="form-control" id="inlineFormInputGroup"
                                                    name="productBuyPrice"
                                                    value={inputField.productBuyPrice}
                                                    onChange={event => handleChangeInput(index, event)}
                                                    aria-describedby="shifra"></input>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <label for="tabel" className="form-label">Çmimi shitës</label>
                                            <div class="input-group mb-2">
                                                <div class="input-group-prepend">
                                                    <div class="input-group-text">€</div>
                                                </div>
                                                <input type="number" class="form-control" id="inlineFormInputGroup"
                                                    name="productSellPrice"
                                                    value={inputField.productSellPrice}
                                                    onChange={event => handleChangeInput(index, event)}
                                                    aria-describedby="emri-produktit"></input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className="row garantion-inputs col-sm-12">
                                <div className="form-group">
                                    <button type="button" className="btn btn-success" onClick={() => {
                                        updateProduct(product);
                                        onRemove(product);
                                        showEditProduct();
                                    }}>Ruaj ndryshimet</button>
                                </div>
                            </div>
                        </div>
                    </>
                ))}
            </EditProduct>
        </>
    )
}

export default Products