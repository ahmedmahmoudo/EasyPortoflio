import React, {Component} from 'react';
import Axios from 'axios';

class Projects extends Component {

    constructor(props) {
        super(props);
        this.state = {'projects': [], 'editingProjects': false}
        this.getProjects = this.getProjects.bind(this);
        this.saveProject = this.saveProject.bind(this);
        this.editProjects = this.editProjects.bind(this);
    }

    componentWillMount() {
        Axios.get('/api/getProjects').then(response => {
            this.setState({'projects': response.data});
        });
        document.title = 'My Projects';
    }

    editProjects() {
        this.setState({'editingProjects': !this.state.editingProjects});
    }

    saveProject() {
        this.editProjects();
        let projectName = this.projectName.value;
        let projectDescription = this.projectDescription.value;
        let projectLanguages = this.projectLanguages.value;
        if(projectName && projectDescription && projectLanguages){
            let project = {
                "name": projectName,
                "description": projectDescription,
                "languages": projectLanguages,
            }

            let projects = this.state.projects;
            Axios.put('/api/saveProject', project).then(response => {
                project.id = response.data;
                projects.push(project);
                this.setState({'projects': projects});
            });
        }
    }

    deleteProject(id) {
        Axios.post('/api/deleteProject', {'id': id});
        let projects = this.state.projects.filter((el) => el.id != id);
        this.setState({'projects': projects});
    }


    getProjects() {
        if(this.state.projects.length > 0) {
            if(this.props.edit) {
                if(this.state.editingProjects) {
                    return (
                        <div className="col-12 row">
                            <div className="col-12">
                                <div className="form-group">
                                    <label htmlFor="project_name">Project Name</label>
                                    <input type="text" className="form-control" name="project_name" ref={ref => this.projectName = ref}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="project_description">Project Description</label>
                                    <textarea className="form-control" name="project_description" ref={ref => this.projectDescription = ref}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="project_languages">Project Languages (Seperate by ,)</label>
                                    <input type="text" className="form-control" name="project_description" ref={ref => this.projectLanguages = ref}/>
                                </div>
                                <div className="form-group">
                                    <button className="btn btn-outline-light" onClick={this.saveProject}>Add Project</button>
                                </div>
                            </div>
                            {
                                this.state.projects.map(project => {
                                    return (
                                        <div className="col-12" key={project.id}>
                                            <div className="card mb-3 dark-color">
                                                <div className="card-body">
                                                    <h5 className="card-title">{project.name}</h5>
                                                    {this.getProjectDescription(project.description)}
                                                    <p className="card-text text-muted">Languages used: 
                                                    {this.getProjectLanguages(project.languages)}
                                                    </p>
                                                </div>
                                                <div className="card-footer">
                                                    <button className="btn btn-danger" onClick={() => this.deleteProject(project.id)}><i className="fa fa-trash-alt"></i></button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
    

                        </div>
                       
                    )
                } else {
                    return (
                        this.state.projects.map(project => {
                            return <div className="col-12" key={project.id}>
                                <div className="card col-12 mb-3 dark-color">
                                    <div className="card-body">
                                        <h5 className="card-title">{project.name}</h5>
                                        {this.getProjectDescription(project.description)}
                                        <p className="card-text text-muted">Languages used: 
                                        {this.getProjectLanguages(project.languages)}
                                        </p>
                                    </div>
                                    <div className="card-footer">
                                        <button className="btn btn-danger" onClick={() => this.deleteProject(project.id)}><i className="fa fa-trash-alt"></i></button>
                                    </div>
                                </div>
                            </div>
                        })
                    )
                }
            } else {
                return (
                    this.state.projects.map(project => {
                        return (
                            <div className="col-12" key={project.id}>
                                <div className="card mb-3 dark-color">
                                    <div className="card-body">
                                        <h5 className="card-title">{project.name}</h5>
                                        {this.getProjectDescription(project.description)}
                                        <p className="card-text text-muted">Languages used: 
                                        {this.getProjectLanguages(project.languages)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                )
            }
        } else {
            if(this.props.edit && this.state.editingProjects) {
                return (
                    <div className="col-12 row">
                        <div className="col-12">
                            <div className="form-group">
                                <label htmlFor="project_name">Project Name</label>
                                <input type="text" className="form-control" name="project_name" ref={ref => this.projectName = ref}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="project_description">Project Description</label>
                                <textarea className="form-control" name="project_description" ref={ref => this.projectDescription = ref}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="project_languages">Project Languages (Seperate by ,)</label>
                                <input type="text" className="form-control" name="project_description" ref={ref => this.projectLanguages = ref}/>
                            </div>
                            <div className="form-group">
                                <button className="btn btn-outline-light" onClick={this.saveProject}>Add Project</button>
                            </div>
                        </div>
                        <div className="col-12 text-center">
                            <h1 className='display-5 alert alert-danger'>Start adding projects</h1>
                        </div>
                    </div>
                   
                )
            }
            return (
                <div className="col-12 text-center">
                    <h1 className='display-5 alert alert-danger'>Start adding projects</h1>
                </div>
            )
        }
    }

    getProjectDescription(description) {
        let desc = description.split('\n');
        return desc.map((de, key) => {
            if(de) {
                return (
                    <p className="card-text" key={key}>{de}</p>
                )
            }
        });
    }

    getProjectLanguages(languages) {
        let langs = languages.split(',');
        return langs.map((lang, key) => {
            if(lang)
            return <span className='code-lang mr-1' key={key}>{lang}</span>;
        });
    }
    render() {
        return (
            <div className="container">
            <div className="row dash-div">
                <div className="info col-12">
                    <div className='col-12 row align-items-center'>
                        <div className="col-8 col-sm-7">
                            <h1 className='display-4'>My <span className="second-name">Projects</span></h1>
                        </div>
                        {
                            this.props.edit ? 
                            <div className="col-2 col-sm-4">
                                <button className='btn btn-outline-light' onClick={this.editProjects}><i className="fa fa-edit"></i></button>
                            </div> :
                            ""
                        }
                    </div>
                </div>
                <div className="row col-12">
                {this.getProjects()}
                </div>

            </div>
      </div>    
        );
    }
}

export default Projects;