import React, {Component} from 'react';
import Axios from 'axios';

class Dash extends Component {


    constructor(props) {
        super(props);
        this.state = {'editingName': false, 
        'editingTitle': false, 
        'addingLinks': false, 
        'firstName': '', 
        'lastName': '', 
        'title': '', 
        'links': {'facebook':'', 'twitter':'','github':'','linkedin':''}, 
        'editingLinks': false,
        };
        this.getLinks = this.getLinks.bind(this);
        this.getName = this.getName.bind(this);
        this.editName = this.editName.bind(this);
        this.saveName = this.saveName.bind(this);
        this.getTitle = this.getTitle.bind(this);
        this.editTitle = this.editTitle.bind(this);
        this.saveTitle = this.saveTitle.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.getEditingLinks = this.getEditingLinks.bind(this);
        this.editLinks = this.editLinks.bind(this);
        this.saveLinks = this.saveLinks.bind(this);
        this.onLinkChange = this.onLinkChange.bind(this);
        
    }

    componentDidMount() {
        Axios.get('/api/getinfo').then(response => {
            console.log("---------------------------");
            console.log(`Response is ${JSON.stringify(response.data)}`);
            console.log("---------------------------");
        
            const res = response.data;
            this.setState({"data_loaded": !res.error});
            if(res.error) {
                this.setState({'error_message': res.message});
            } else {
                let info = res;
                if(info.first_name) {
                    this.setState({'firstName': info.first_name});
                }
                if(info.last_name) {
                    this.setState({'lastName': info.last_name});
                }
                if(info.title) {
                    this.setState({'title': info.title});
                }
                this.setState({'links': {
                    'facebook': info.facebook,
                    'twitter': info.twitter,
                    'linkedin': info.linkedin,
                    'github': info.github,
                }});
                document.title = `${info.first_name} ${info.last_name}`;
            }
        });

        document.title = 'My Portoflio';

       
    }

    getLinks() {
        const links = [];
        if(this.state.links.facebook) {
            links.push(
                <a href={this.state.links.facebook} className="link" target="_blank" rel="noopener noreferrer" key={2}>
                        <i className="fab fa-facebook"></i>
                </a>
            );
        }
        if(this.state.links.twitter) {
            links.push(
                <a href={this.state.links.twitter} className="link" target="_blank" rel="noopener noreferrer" key={1}>
                    <i className="fab fa-twitter"></i>
                </a>
            );
        } 
        if(this.state.links.github) {
            links.push(
                <a href={this.state.links.github} className="link" target="_blank" rel="noopener noreferrer" key={4}>
                    <i className="fab fa-github"></i>
                </a>
            );
        } 
        if(this.state.links.linkedin) {
            links.push(
                <a href={this.state.links.linkedin} className="link" target="_blank" rel="noopener noreferrer" key={3}>
                        <i className="fab fa-linkedin"></i>
                </a>
            );
        }
        if(this.props.edit && !this.state.editingLinks) {
            links.push(
                <i className="fas fa-edit link" onClick={this.editLinks} key={-1}></i>
            );
        }
        return links;
    }

    

    getName() {
        if(this.props.edit) {
            if(this.state.editingName) {
                return (
                    <div className='row align-items-center col-12'>
                        <div className="col-sm-7 col-8">
                            <div className='form-group'>
                                <label htmlFor="first_name">First Name</label>
                                <input type="text" className="form-control" id="first_name" value={this.state.firstName} onChange={this.onTextChange} name='firstName'/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor="first_name">Last Name</label>
                                <input type="text" className="form-control" id="last_name" value={this.state.lastName} onChange={this.onTextChange} name='lastName'/>
                            </div>
                        </div>
                        <div className="col-sm-4 col-2">
                            <button className='btn btn-outline-light edit-btn col-4' onClick={this.saveName}><i className="fas fa-check"></i></button>
                        </div>
                        
                    </div>
                );
            } else {
                return (
                    <div className='row align-items-center col-12'>
                        <div className="col-sm-7 col-8">
                            <h1 className='display-4'>{this.state.firstName} <span className="second-name">{this.state.lastName}</span></h1>
                        </div>
                        <div className="col-sm-4 col-2">
                            <button className='btn btn-outline-light' onClick={this.editName}><i className="fas fa-edit"></i></button>
                        </div>
                    </div>
                );
            }
        } else {
            return (
                <div className="col-12">
                    <h1 className='display-4'>{this.state.firstName} <span className="second-name">{this.state.lastName}</span></h1>
                </div>
                
            );
        }
    }


    editName() {
        this.setState({'editingName': true});
    }

    saveName() {
        this.setState({'editingName': false});
        Axios.put('/api/saveinfo', {
            'first_name': this.state.firstName,
            'last_name': this.state.lastName,
        });

    }

    editTitle() {
        this.setState({'editingTitle': true});
    }

    saveTitle() {
        this.setState({'editingTitle': false});
        Axios.put('/api/saveinfo', {
            'title': this.state.title,
        });
    }

    editLinks() {
        this.setState({'editingLinks': true});
    }

    onTextChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    saveLinks() {
        this.setState({'editingLinks': false});
        Axios.put('/api/saveinfo', this.state.links);
    }

    onLinkChange(e) {
        let links = this.state.links;
        switch(e.target.id) {
            case 'facebook':
                links.facebook = e.target.value;
                break;
            case 'twitter':
                links.twitter = e.target.value;
                break;
            case 'github':
                links.github = e.target.value;
                break;
            case 'linkedin':
                links.linkedin = e.target.value;
                break;                
                
        }
        this.setState({'links': links});
    }

    getTitle() {
        if(this.props.edit) {
            if(this.state.editingTitle) {
                return (
                    <div className="row align-items-center col-12">
                        <div className="col-sm-7 col-8">
                            <div className="form-group">
                                <label htmlFor="title">Job Title</label>
                                <input type="text" className="form-control" id="title" value={this.state.title} onChange={this.onTextChange} name='title'/>
                            </div>
                        </div>
                        <div className="col-sm-4 col-2">
                            <button className='btn btn-outline-light edit-btn col-4' onClick={this.saveTitle}><i className="fas fa-check"></i></button>
                        </div>
                    </div>
                )
            } else {
                return (
                    <div className="row align-items-center col-12">
                        <div className="col-sm-7 col-8">
                            <p className='display-5'>{this.state.title}</p>
                        </div>
                        <div className="col-sm-4 col-2">
                            <button className='btn btn-outline-light' onClick={this.editTitle}><i className="fas fa-edit"></i></button>
                        </div>
                    </div>
                );
            }
        } else {
            return (
                <div className="col-12">
                    <p className='display-5'>{this.state.title}</p>
                </div>
            );
        }
    }

    getEditingLinks() {
        return (
            <div className="col-12">
                <div className="form-group">
                    <label htmlFor="facebook">Facebook</label>
                    <input type="text" className="form-control" placeholder="https://www.facebook.come/john.doe" id="facebook" 
                        value={this.state.links.facebook} onChange={this.onLinkChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="twitter">Twitter</label>
                    <input type="text" className="form-control" placeholder="https://www.twitter.come/john.doe" id="twitter" 
                        value={this.state.links.twitter} onChange={this.onLinkChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="github">Github</label>
                    <input type="text" className="form-control" placeholder="https://www.github.come/john-doe" id="github" 
                        value={this.state.links.github} onChange={this.onLinkChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="linkedin">Linkedin</label>
                    <input type="text" className="form-control" placeholder="https://www.Linkedin.come/john-doe" id="linkedin" 
                        value={this.state.links.linkedin} onChange={this.onLinkChange}/>
                </div>
                <div className="form-group">
                    <button className='btn btn-outline-light edit-btn col-4' onClick={this.saveLinks}><i className="fas fa-check"></i></button>
                </div>
            </div>
        );
    }

    render() {
        return (
          <div className="container">
            <div className="row dash-div ">
                <div className="info row col-12">
                    {this.getName()}
                    {this.getTitle()}
                </div>

                <div className="links col-12 row">
                   
                    <div className="row align-items-center col-12">
                        <div className="col-12 align-items-center">
                            <div>{this.getLinks()} {this.state.editingLinks ? this.getEditingLinks() : ""}</div>
                            <a href="/about" className="btn btn-outline-light" >Know More</a>
                            
                        </div>
                    </div>
                    
                </div>

            </div>
          </div>  
        );
    }
}

export default Dash;