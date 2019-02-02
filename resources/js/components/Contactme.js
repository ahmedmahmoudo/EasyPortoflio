import React, {Component} from 'react';
import Axios from 'axios';

class Contactme extends Component {


    constructor(props){
        super(props);
        this.state = {'email': '', 'phone': '', 'emailTitle': '', 'phoneTitle': '', 'editingEmail': false, 'editingPhone': false}
        this.getEmail = this.getEmail.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.saveEmail = this.saveEmail.bind(this);
        this.editEmail = this.editEmail.bind(this);
        this.getPhone = this.getPhone.bind(this);
        this.editPhone = this.editPhone.bind(this);
        this.savePhone = this.savePhone.bind(this);
    }

    componentWillMount() {
        document.title = 'Contact me';
        Axios.get('/api/getContacts').then(response => {
            console.log(response.data);
            this.setState({
                'emailTitle': response.data.email_title,
                'email': response.data.email,
                'phone': response.data.phone,
                'phoneTitle': response.data.phone_text,
            });
        });
    }

    onTextChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    saveEmail() {
        this.editEmail();
        Axios.put('/api/saveContact', {'type': 'email', 'contact_value': this.state.email, 'title_value': this.state.emailTitle});
    }

    editEmail() {
        this.setState({'editingEmail': !this.state.editingEmail});
    }

    editPhone() {
        this.setState({'editingPhone': !this.state.editingPhone});
    }

    savePhone() {
        this.editPhone();
        Axios.put('/api/saveContact', {'type': 'phone', 'contact_value': this.state.phone, 'title_value': this.state.phoneTitle});
    }

    getEmail() {
        if(this.props.edit) {
            if(this.state.editingEmail) {
                return (
                    <div className="col-12 row">
                        <div className="col-8 col-sm-7 row">
                            <div className="form-group col-12">
                                <label htmlFor="emailTitle">Email Title</label>
                                <input type="text" className='form-control' name="emailTitle" value={this.state.emailTitle} onChange={this.onTextChange} placeholder="Contact me via email at"/>
                            </div>
                            <div className="form-group col-12">
                                <label htmlFor="email">Email</label>
                                <input type="text" className='form-control' name="email" value={this.state.email} onChange={this.onTextChange} placeholder="exmaple@exmaple.com"/>
                            </div>
                        </div>
                        <div className="col-2 col-sm-4">
                            <button className="btn btn-outline-light" onClick={this.saveEmail}><i className="fa fa-check"></i></button>
                        </div>
                    </div>
                )
            } else {
                return (
                    <div className="col-12 row">
                        <div className="col-8 col-sm-7">
                            {this.getEmailTitle()}
                        </div>
                        <div className="col-2 col-sm-4">
                            <button className="btn btn-outline-light" onClick={this.editEmail}><i className="fa fa-edit"></i></button>
                        </div>
                    </div>
                )
            }
        } else {
            return (
                <div className="col-12 row">
                    <div className="col-8 col-sm-7">
                        {this.getEmailTitle()}
                    </div>
                </div>
            )
        }
    }

    getPhone() {
        if(this.props.edit) {
            if(this.state.editingPhone) {
                return (
                    <div className="col-12 row">
                        <div className="col-8 col-sm-7 row">
                            <div className="form-group col-12">
                                <label htmlFor="phoneTitle">Phone Title</label>
                                <input type="text" className='form-control' name="phoneTitle" value={this.state.phoneTitle} onChange={this.onTextChange} placeholder="Contact me via email at"/>
                            </div>
                            <div className="form-group col-12">
                                <label htmlFor="phone">Phone</label>
                                <input type="text" className='form-control' name="phone" value={this.state.phone} onChange={this.onTextChange} placeholder="exmaple@exmaple.com"/>
                            </div>
                        </div>
                        <div className="col-2 col-sm-4">
                            <button className="btn btn-outline-light" onClick={this.savePhone}><i className="fa fa-check"></i></button>
                        </div>
                    </div>
                )
            } else {
                return (
                    <div className="col-12 row">
                        <div className="col-8 col-sm-7">
                            {this.getPhoneTitle()}
                        </div>
                        <div className="col-2 col-sm-4">
                            <button className="btn btn-outline-light" onClick={this.savePhone}><i className="fa fa-edit"></i></button>
                        </div>
                    </div>
                )
            }
        } else {
            return (
                <div className="col-12 row">
                    <div className="col-8 col-sm-7">
                        {this.getPhoneTitle()}
                    </div>
                </div>
            )
        }
    }

    getEmailTitle() {
        let title = this.state.emailTitle;
        let email = this.state.email;
        if(title && email) {
            return <p className='display-5'>{title}: {email}</p>
        } else {
            if(title) {
                return <p className='display-5'>{title}: no email</p>
            } else if(email) {
                return <p className='display-5'>No title: {email}</p>
            } else {
                return <p className='display-5'>no title: no email</p>
            }
        }
    }

    getPhoneTitle() {
        let title = this.state.phoneTitle;
        let phone = this.state.phone;
        if(title && phone) {
            return <p className='display-5'>{title}: {phone}</p>
        } else {
            if(title) {
                return <p className='display-5'>{title}: no phone</p>
            } else if(phone) {
                return <p className='display-5'>No title: {phone}</p>
            } else {
                return <p className='display-5'>no title: no phone</p>
            }
        }
    }

    render() {
        return (
            <div className="container">
            <div className="row dash-div">
                <div className="info col-12">
                    <div className="col-12">
                        <h1 className='display-4'>Contact <span className="second-name">Me</span></h1>
                    </div>
                    {this.getEmail()}
                    {this.getPhone()}
                </div>
            </div>
      </div>  
        );
    }
}

export default Contactme;