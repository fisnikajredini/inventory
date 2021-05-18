import React, {Component} from 'react'
import axios from 'axios'


export class newuser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_name: null,
            email: null,
            password: null,
            confirm_password: null,
            role: null
        };
    }

    emailChange = (e) => {
        const change = e.target.value;
        this.setState({
            email: change,
        });
    };

    user_nameChange = (e) => {
        const change = e.target.value;
        this.setState({
            user_name:change,
        })
    }
    passwordChange = (e) => {
        const change = e.target.value;
        this.setState({
            password:change,
        })
    }
    confirmPasswordChange = (e) => {
        const change = e.target.value;
        if (this.state.password === e.target.value)
        this.setState({
            confirm_password:change,
        })
    }
    roleChange = (e) => {
        const change = e.target.value;
        this.setState({
            role:change,
        })
    }

    addUsers = () => {
        axios.post('/users/add', {
            email: this.state.email,
            user_name: this.state.user_name,
            password: this.state.confirm_password,
            role: this.state.role
        })
            .then()
    }


    render() {
        return (
            <div>
                <div className="page-name">
                    <h3>Krijo përdorues të ri</h3>
                </div>
                <div className="newuser pt2">
                    <div className="container input-group">
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label for="tabel" className="form-label">Username</label>
                                <input type="input"
                                       placeholder="mobiphoneuser"
                                       className="form-control"
                                       id="shifra"
                                       aria-describedby="shifra"
                                       onChange={this.user_nameChange} />

                                    {/*</input>*/}
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label for="tabel" className="form-label">Email</label>
                                <input type="email"
                                       name="email"
                                       placeholder="user@gmail.com"
                                       className="form-control"
                                       id="shifra"
                                       aria-describedby="shifra"
                                       onChange={this.emailChange}
                                       autoComplete="new-password" />

                                    {/*</input>*/}
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label for="tabel" className="form-label">Fjalkalimin</label>
                                <input type="password"
                                       placeholder="password"
                                       className="form-control"
                                       id="shifra"
                                       aria-describedby="shifra"
                                       autoComplete="new-password"
                                       onChange={this.passwordChange}/>

                                {/*</input>*/}
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label for="tabel" className="form-label">Komfirmo fjalkalimin</label>
                                <input type="password"
                                       placeholder="password"
                                       className="form-control"
                                       id="shifra"
                                       aria-describedby="shifra"
                                       onChange={this.confirmPasswordChange} />

                                    {/*</input>*/}
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label for="exampleFormControlSelect1">Roli i përdoruesit</label>
                                <select class="form-control" id="exampleFormControlSelect1" onChange={this.roleChange}>
                                    <option hidden>Zgjidhni rolin</option>
                                    <option>Administrator</option>
                                    <option>Kasier</option>
                                    <option>Serviser</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-sm-12 align-btn-center p2">
                            <button type="button" className="btn btn-success btn-size" onClick={this.addUsers}>Ruaj të
                                dhënat
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default newuser
