import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import * as BiIcons from 'react-icons/bi';
import * as HiIcons from 'react-icons/hi';

const Company_b = styled(Link)`
`;

function Addproduct_p() {
    //Default Date current day
    var someDate = new Date();
    someDate.setDate(someDate.getDate());
    var date = someDate.toISOString().substr(0, 10);

    const [inputFields, setInputFields] = useState ([
        {productName: '', productImei: '', productCategory:'', productDate: '', productPName: '', productPContactNr: '', productPIdNr: '', productBuyPrice: '', productSellPrice: ''},  
    ]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("InputFields", inputFields);
    };

    const handleChangeInput = (index, event) => {
    const values = [...inputFields];
    values[index][event.target.name] = event.target.value;
    setInputFields(values);
    }
    
    return (
        <>
            <div className="page-name">
                <h3>Shto paisje</h3>
            </div>
            <div className='addproduct'>
                <div className='top-filter-cont'>
                    <div className="filter-product">
                        <Company_b className="company-b-2" to={'./addproduct'}><BiIcons.BiBuildingHouse /> Kompani</Company_b>
                        <div className="person-b-2"> <HiIcons.HiOutlineUserAdd /> Person Fizik</div>
                    </div>
                </div>
                <div className="form-container" onSubmit={handleSubmit} >
                { inputFields.map((inputField, index) => (
                    <div className="product-fields container input-group" key={index}>
                        {/* <div class="col-sm-4">
                            <label for="tabel" className="form-label">Shifra</label>
                            <input type="number" placeholder="Gjenerim Automatik" className="form-control" id="shifra" aria-describedby="shifra"></input>
                        </div> */}
                        <div class="col-sm-4">
                            <label for="tabel" className="form-label">Emri i Produktit</label>
                            <input type="input" name="productName" className="form-control" value={inputField.productName} onChange={event => handleChangeInput(index, event)} aria-describedby="emri-produktit"></input>
                        </div>
                        <div class="col-sm-4">
                            <label for="tabel" className="form-label">IMEI</label>
                            <input type="number" name="productImei" className="form-control" value={inputField.productImei} onChange={event => handleChangeInput(index, event)} aria-describedby="imei"></input>
                        </div>
                        <div class="col-sm-4">
                            <label for="tabel" className="form-label">Kategoria</label>
                            <select className="form-control" name="productCategory" value={inputField.productCategory} onChange={event => handleChangeInput(index, event)} aria-describedby="shifra">
                                <option>Celular</option>
                                <option>Tablet</option>
                            </select>
                        </div>
                        <div class="col-sm-4">
                            <label for="tabel" className="form-label">Data</label>
                            <input type="date" className="form-control" name="productDate" value={inputField.productDate, date} onChange={event => handleChangeInput(index, event)} aria-describedby="emri-produktit"></input>
                        </div>
                        <div class="col-sm-4">
                            <label for="tabel" className="form-label">Emri dhe Mbiemri</label>
                            <input type="input" className="form-control" name="productPName" value={inputField.productPName} onChange={event => handleChangeInput(index, event)} aria-describedby="shifra"></input>
                        </div>
                        <div class="col-sm-4">
                            <label for="tabel" className="form-label">Nr. Kontakti</label>
                            <input type="number" className="form-control" name="productPContactNr" value={inputField.productPContactNr} onChange={event => handleChangeInput(index, event)} aria-describedby="shifra"></input>
                        </div>
                        <div class="col-sm-4">
                            <label for="tabel" className="form-label">Nr. Letërnjoftimit</label>
                            <input type="number" className="form-control" name="productPIdNr" value={inputField.productPIdNr} onChange={event => handleChangeInput(index, event)} aria-describedby="imei"></input>
                        </div>
                        <div class="col-sm-4">
                            <label for="tabel" className="form-label">Çmimi blerës</label>
                            <input type="number" className="form-control" name="productBuyPrice" value={inputField.productBuyPrice} onChange={event => handleChangeInput(index, event)} aria-describedby="shifra"></input>
                        </div>
                        <div class="col-sm-4">
                            <label for="tabel" className="form-label">Çmimi shitës</label>
                            <input type="number" className="form-control" name="productSellPrice" value={inputField.productSellPrice} onChange={event => handleChangeInput(index, event)} aria-describedby="emri-produktit"></input>
                        </div>
                    </div>
                )) }
                        <div className="col-sm-12 align-btn-center pb2">
                            <button type="submit" className="btn btn-success btn-size" onClick={handleSubmit}>Shto Produktin</button>
                        </div>
                </div>
            </div>
        </>
    )
}

export default Addproduct_p
