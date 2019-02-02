import React, {Component } from 'react';
import Axios from 'axios';

class Aboutme extends Component {

    constructor(props) {
        super(props);
        this.state = {'description': '', 'editingDesc': false, 'dataLoaded': false, 'skills': [], 'exps': [], 'editingSkills': false, 'editingExp': false};
        this.getDescription = this.getDescription.bind(this);
        this.editDescription = this.editDescription.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.saveDescription = this.saveDescription.bind(this);
        Axios.get('/api/getAbout').then(response => {
            console.log(response.data);
            this.setState({'description': response.data.description});
            this.setState({'skills': JSON.parse(response.data.skills)});
            this.setState({'exps': JSON.parse(response.data.exp)});
            this.setState({'dataLoaded': true});
        });
        this.editSkills = this.editSkills.bind(this);
        this.saveSkill = this.saveSkill.bind(this);
        this.getExps = this.getExps.bind(this);
        this.editExp = this.editExp.bind(this);
        this.saveExp = this.saveExp.bind(this);
    }

    componentWillMount() {
        document.title = 'About me';
    }

    editDescription() {
        this.setState({'editingDesc': !this.state.editingDesc});
    }

    onTextChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    saveDescription(e) {
        Axios.put('/api/saveinfo', {'description': this.state.description});
        this.setState({'editingDesc': false});
    }

    editSkills(e) {
        this.setState({'editingSkills': !this.state.editingSkills});

    }

    saveSkill(e) {
        let skill = this.skillInput.value;
        if(skill) {
            const skills = this.state.skills;
            this.skillInput.value = "";
            Axios.put('/api/saveSkill', {'name': skill}).then(response => {
                skills.push({'name': skill, 'id': response.data});
                this.setState({'skills': skills});
            });
        }
        this.editSkills(e);
    }

    deleteSkill(id) {
        Axios.post('/api/deleteSkill', {'id': id});
        let skills = this.state.skills.filter((el) => {
            return el.id != id;
        });
        console.log(JSON.stringify(skills));
        this.setState({'skills': skills});
    }

    editExp() {
        this.setState({'editingExp': !this.state.editingExp});
    }

    saveExp() {
        let companyName = this.companyName.value;
        let startDate = this.startDate.value;
        let endDate = this.endDate.value;
        let desc = this.workDesc.value;
        if(companyName && startDate && endDate && desc) {
            let exp = {"name": companyName, "from": startDate, "to": endDate, "description": desc};
            let exps = this.state.exps;
            Axios.put('/api/saveExp', exp).then(response => {
                exp.id = response.data;
                exps.push(exp);
                this.setState({'exps': exps});
            });
        }
        this.editExp();
    }

    deleteExp(id) {
        Axios.post('/api/deleteExp', {'id': id});
        let exps = this.state.exps.filter((el) => el.id != id);
        this.setState({'exps': exps});
    }

    getDescription() {
        const descriptions = this.state.description.trim().split('\n');
        if(descriptions.length > 0) {
            if(this.props.edit) {
                if(this.state.editingDesc) {
                    return(
                        <div className="row col-12">
                            <div className="col-8 col-sm-7">
                                <div className="form-group">
                                    <textarea name="description" value={this.state.description} onChange={this.onTextChange} className="form-control"></textarea>
                                </div>
                            </div>
                            <div className="col-2 col-sm-4">
                                <button className='btn btn-outline-light' onClick={this.saveDescription}><i className="fas fa-check"></i></button>
                            </div>
                        </div>
                    );
                } else {
                    return(
                        <div className="row col-12">
                            <div className="col-8 col-sm-7">
                                {descriptions.map((desc, key) => {
                                    if(desc)
                                        return (
                                            <p className="display-5" key={key}>{desc}</p>
                                        );
                                })}
                            </div>
                            <div className="col-2 col-sm-4">
                                <button className='btn btn-outline-light' onClick={this.editDescription}><i className="fas fa-edit"></i></button>
                            </div>
                        </div>
                    );
                }
            } else {
                console.log(this.props.edit);
                return(
                    <div className="row col-12">
                        <div className="col-12">
                            {descriptions.map((desc, key) => {
                                if(desc) return (
                                    <p className="display-5" key={key}>{desc}</p>
                                );
                            })}
                        </div>
                    </div>
                );
            }
            
        } else {
            if(this.props.edit) {
                if(this.state.editingDesc) {
                        <div className="row col-12">
                            <div className="col-8 col-sm-7">
                                <div className="form-group">
                                    <textarea name="description" value={this.state.description} onChange={this.onTextChange} className="form-control"></textarea>
                                </div>
                            </div>
                            <div className="col-2 col-sm-4">
                                <button className='btn btn-outline-light' onClick={this.saveDescription}><i className="fas fa-check"></i></button>
                            </div>
                        </div>
                } else {
                    return (
                        <div className="row col-12">
                            <div className="col-8 col-sm-7">
                                <p className='display-5'>{this.state.description}</p>
                            </div>
                            <div className="col-2 col-sm-4">
                                <button className='btn btn-outline-light' onClick={this.editDescription}><i className="fas fa-edit"></i></button>
                            </div>
                        </div>
                    );
                }
            }
            return (
                <div className="row col-12">
                    <div className="col-12">
                        <p className='display-5'>{this.state.description}</p>
                    </div>
                </div>
            );
        }
    }


    getSkills() {
        if(this.props.edit) {
            if(this.state.editingSkills) {
                return (
                    <div className="row col-12">
                        <div className="row col-12 align-items-center">
                            <div className="col-8 col-sm-7">
                                <p className="display-5">Skills:</p>
                            </div>
                            <div className="col-12 row">
                                <div className="col-8 col-sm-7">
                                    <div className="form-group">
                                        <input type="text" className="form-control" ref={ref => this.skillInput = ref}/>
                                    </div>
                                </div>
                                <div className="col-2 col-sm-4">
                                    <button className="btn btn-outline-light" onClick={this.saveSkill}><i className="fas fa-check"></i></button>
                                </div>
                            </div>
                        </div>
                        <div className="col-12">
                            {this.state.skills.length > 0 ?
                            <ol>
                                {
                                    this.state.skills.map((skill, key) => {
                                        return (
                                        <li key={key} className='col-12'>
                                            <div className="row">
                                                <div className="col-8 col-sm-7">
                                                    <p className='display-7'>{skill.name}</p>
                                                </div>
                                                <div className="col-2 col-sm-4">
                                                    <button className='btn btn-danger' onClick={() => this.deleteSkill(skill.id)}><i className="far fa-trash-alt"></i></button>
                                                </div>
                                            </div>
                                        </li>
                                        );
                                    })
                                } 
                                </ol> :
                            <h2 className='display-5'>Add skills here</h2>
                            }
                        </div>
                    </div>
                );
            } else {
                return (
                    <div className="row col-12">
                        <div className="row col-12 align-items-center">
                            <div className="col-8 col-sm-7">
                                <p className="display-5">Skills:</p>
                            </div>
                            <div className="col-2 col-sm-4">
                                <button className="btn btn-outline-light" onClick={this.editSkills}><i className="fas fa-edit"></i></button>
                            </div>
                            
                        </div>
                        <div className="col-12 row">
                            {this.state.skills.length > 0 ?
                            <ol>
                                {
                                    this.state.skills.map((skill, key) => {
                                        return (
                                        <li key={key} className='col-12'>
                                            <div className="row">
                                                <div className="col-8 col-sm-7">
                                                    <p className='display-7'>{skill.name}</p>
                                                </div>
                                                <div className="col-2 col-sm-4">
                                                    <button className='btn btn-danger' onClick={() => this.deleteSkill(skill.id)}><i className="far fa-trash-alt"></i></button>
                                                </div>
                                            </div>
                                        </li>
                                        );
                                    })
                                }
                            </ol> :
                            <h2 className='display-5'>Add skills here</h2>
                            }
                        </div>
                    </div>
                );
            }
        } else {
            return (
                <div className="row col-12">
                    <div className="row col-12">
                        <div className="col-8 col-sm-7">
                            <p className="display-5">Skills:</p>
                        </div>
                    </div>
                    <div className="col-12">
                        {this.state.skills.length > 0 ?
                        <ol>
                            {
                                this.state.skills.map((skill, key) => {
                                    return (
                                        <li key={key}><p className='display-7'>{skill.name}</p></li>
                                    );
                                })
                            }
                        </ol> :
                        <h2 className='display-5'>Add skills here</h2>
                        }
                    </div>
                </div>
            );

        }
    }

    getExps() {
        if(this.props.edit) {
            if(this.state.editingExp) {
                return (
                    <div className="row col-12">
                        <div className="row col-12">
                            <div className="col-8 col-sm-7">
                                <p className="display-5">Work Experience:</p>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="form-group">
                                <label htmlFor="company_name">Company name</label>
                                <input type="text" className="form-control" ref={ref => this.companyName = ref} name="company_name"/>
                            </div>
                            <div className="form-group row">
                                <div className="col-6">
                                    <label htmlFor="from">Start Date</label>
                                    <input type="text" className="form-control" name="startDate" ref={ref => this.startDate = ref}/>
                                </div>
                                <div className="col-6">
                                    <label htmlFor="from">End Date</label>
                                    <input type="text" className="form-control" name="endDate" ref={ref => this.endDate = ref}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <textarea name="description" placeholder="Work description" className="form-control" ref={ref => this.workDesc = ref}></textarea>
                            </div>
                            <div className="form-group">
                                <button className="btn btn-outline-light" onClick={this.saveExp}>Add Experience</button>
                            </div>
                        </div>
                        <div className="col-12">
                            {this.state.exps.length > 0 ?
                            <ol>
                                {
                                    this.state.exps.map((exp, key) => {
                                        return (
                                            <div className="col-12" key={key}>
                                                <li>
                                                    <div className="row col-12">
                                                        <div className="col-sm-7 col-8">
                                                            <p className='display-6'>{exp.name} From {exp.from} To {exp.to}</p>
                                                        </div>
                                                        <div className="col-2 col-sm-4">
                                                            <button className='btn btn-danger' onClick={() => this.deleteExp(exp.id)}><i className="fa fa-trash-alt"></i></button>
                                                        </div>
                                                    </div>
                                                    <ul>
                                                        {this.getExpDescrp(exp.description)}
                                                    </ul>
                                                </li>
                                            </div>
                                        );
                                    })
                                }
                            </ol> :
                            <h2 className='display-5'>Add Experience here</h2>
                            }
                        </div>
                    </div>
                );
            } else {
                return (
                    <div className="row col-12">
                        <div className="row col-12">
                            <div className="col-8 col-sm-7">
                                <p className="display-5">Work Experience:</p>
                            </div>
                            <div className="col-2 col-sm-4">
                                    <button className="btn btn-outline-light" onClick={this.editExp}><i className="fas fa-edit"></i></button>
                            </div>
                        </div>
                        <div className="col-12">
                            {this.state.exps.length > 0 ?
                            <ol>
                                {
                                    this.state.exps.map((exp, key) => {
                                        return (
                                            <div className="col-12" key={key}>
                                                <li>
                                                    <div className="row col-12">
                                                        <div className="col-sm-7 col-8">
                                                            <p className='display-6'>{exp.name} From {exp.from} To {exp.to}</p>
                                                        </div>
                                                        <div className="col-2 col-sm-4">
                                                            <button className='btn btn-danger' onClick={() => this.deleteExp(exp.id)}><i className="fa fa-trash-alt"></i></button>
                                                        </div>
                                                    </div>
                                                    <ul>
                                                        {this.getExpDescrp(exp.description)}
                                                    </ul>
                                                </li>
                                            </div>
                                        );
                                    })
                                }
                            </ol> :
                            <h2 className='display-5'>Add Experience here</h2>
                            }
                        </div>
                    </div>
                );
            }
        } else {
            return (
                <div className="row col-12">
                    <div className="row col-12">
                        <div className="col-8 col-sm-7">
                            <p className="display-5">Work Experience:</p>
                        </div>
                    </div>
                    <div className="col-12">
                        {this.state.exps.length > 0 ?
                        <ol>
                            {
                                this.state.exps.map((exp, key) => {
                                    return (
                                        <div className="col-12">
                                        <li key={key}>
                                            <p className='display-6'>{exp.name} From {exp.from} To {exp.to}</p>
                                            <ul>
                                                {this.getExpDescrp(exp.description)}
                                            </ul>
                                        </li>
                                        </div>
                                    );
                                })
                            }
                        </ol> :
                        <h2 className='display-5'>Add Experience here</h2>
                        }
                    </div>
                </div>
            );

        }
    }

    getExpDescrp(description) {
        let desc = description.split('\n');
        return desc.map((de, key) => {
            if(de)
            return <li key={key}><p className="display-7">{de}</p></li>;
        });
    }

    render() {
        return (
            <div className="container">
                <div className="row dash-div">
                    <div className="info col-12">
                        <div className="col-12">
                            <h1 className='display-4'>About <span className="second-name">Me</span></h1>
                        </div>
                        {this.getDescription()}
                        <div className="row col-12">
                        {this.getSkills()}
                        {this.getExps()}
                        </div>
                    </div>
                </div>
          </div>  
        );
    }
}

export default Aboutme;
