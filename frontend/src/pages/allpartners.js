import React, {useState, useEffect} from 'react';
import * as FaIcons from 'react-icons/fa';
import * as RiIcons from 'react-icons/ri';
import axios from 'axios';

function Allpartners() {

    const [partners, setPartners] = useState ([])

    useEffect(() => {
        axios.get('/partners/get').then(res=>{
           // partners = data.data.data
            console.log(res.data.data)
            setPartners(res.data.data)
        })
        .catch(err => {
            console.log(err)
        })
        // axios.get("/getpartner").then((response) => {
        // this.setState({company_name: response.data.data });
        // });
    }, []);
    return (
        <>
            <div className="page-name">
                <h3>Partnerët e biznesit</h3>
            </div>
        <div className='allpartners pt6'>
            <table class="table table-hover">
                <thead>
                    <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Partneri</th>
                    <th scope="col">Nr. Kontaktit</th>
                    <th scope="col">Edit/Delete</th>
                    </tr>
                </thead>
                {partners.map(partner => (
                <tbody>
                    <tr>
                    <th scope="row" key={partner.id}>{partner._id}</th>
                    <td key={partner.id}>{partner.company_name}</td>
                    <td key={partner.id}>{partner.phone_number}</td> 
                    <td className="edit-delete"><div className="edit"><FaIcons.FaEdit /></div><div className="delete"><RiIcons.RiDeleteBin6Fill /></div></td>
                    </tr>
                </tbody>
                ))}
            </table>
        </div>
        </>
    )
}

export default Allpartners
