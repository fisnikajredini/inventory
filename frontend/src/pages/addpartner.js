import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import * as AiIcons from 'react-icons/ai';

const Partnerbutton = styled(Link)`
`;

function Addpartner() {
    const [inputFields, setInputFields] = useState ([
        {partnerName: '', partnerContact: ''},  
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

    //Function to duplicate the fields
    const handleAddFields = () => {
        setInputFields([...inputFields, { partnerName: '', partnerContact: ''}])
    }
    
    //Function to remove the fields
    const handleRemoveFields = id => {
        const values  = [...inputFields];
        values.splice(values.findIndex(value => value.id === id), 1);
        setInputFields(values);
    }

    return (
        <>
            <div className="page-name">
                <h3>Shto partner</h3>
            </div>
        <div className='addpartner pt2'>
            <div className="form-container" onSubmit={handleSubmit}>
            { inputFields.map((inputField, index) => (
                <div className="partner-container container input-group" key={index}>
                    <div className="col-sm-4">
                        <label for="tabel" className="form-label">Shifra</label>
                        <input type="number" placeholder="Gjenerim Automatik" className="form-control" id="shifra" aria-describedby="shifra"></input>
                    </div>
                    <div className="col-sm-4">
                        <label for="tabel" className="form-label">Emri partnerit</label>
                        <input type="input" className="form-control" name="partnerName" value={inputField.partnerName} onChange={event => handleChangeInput(index, event)} aria-describedby="shifra"></input>
                    </div>
                    <div className="col-sm-4">
                        <label for="tabel" className="form-label">Nr. Kontakti</label>
                        <input type="number" className="form-control" name="partnerContact" value={inputField.partnerContact} onChange={event => handleChangeInput(index, event)} aria-describedby="shifra"></input>
                    </div>
                    <div className="col-sm-12 pt-2">
                        <button type="button" className="btn btn-danger btn-size-4" disabled={inputFields.length === 1} onClick={() => handleRemoveFields(inputField.id)}>
                        <AiIcons.AiOutlineMinusCircle />
                        </button>
                        <button type="button" className="btn btn-success btn-size-5" onClick={handleAddFields}>
                        <AiIcons.AiOutlinePlusCircle />
                        </button>
                    </div>
                </div>
                )) }
                    <div className="col-sm-12 align-btn-center p2">
                        <div className="col-sm-4">
                            <Partnerbutton type="button" className="btn btn-warning btn-size" to={'./allpartners'} >Shiko partnerët</Partnerbutton>
                        </div>
                        <div className="col-sm-4">
                            <button type="button" className="btn btn-success btn-size" onClick={handleSubmit}>Shto partnerin</button>
                        </div>
                    </div>
            </div>
        </div>
        </>
    )
}

export default Addpartner
