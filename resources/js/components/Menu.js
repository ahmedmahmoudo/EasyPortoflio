import React, {Component} from 'react';
import Axios from 'axios';


class Menu extends Component {


    constructor(props){
        super(props);
        this.showMenu = this.showMenu.bind(this);
        this.logout = this.logout.bind(this);
        this.state = {'image': '', 'imageToUpload': '', 'menuOpened': false};
        this.editImage = this.editImage.bind(this);
        this.onImagePicked = this.onImagePicked.bind(this);
        this.loadImage = this.loadImage.bind(this);
    }

    componentWillMount() {
        this.loadImage();
    }

    loadImage() {
        Axios.get('/api/info/image').then(response => {
            console.log(response.data);
            if(response.data.image) {
                this.setState({'image': response.data.image});
            }
        });
    }

    showMenu() {
        //this.props.toggleMenu();
        this.setState({'menuOpened': !this.state.menuOpened});
    }

    editImage(e) {
     this.imageInput.click();   
    }

    onImagePicked(e) {
        const data = new FormData();
        data.append('image', e.target.files[0]);
        Axios.post('/api/info/saveImage', data).then(response => {
            this.forceUpdate();
        });
        
    }

    logout(e) {
        e.preventDefault();
        Axios.get('/api/auth/logout').then(response => {
            console.log(response.data);
        });

        window.location.reload();
    } 

    render() {
        return (
          <div className="container-fluid">
            <div className="row">
                <div className={"menu-button " + (this.state.menuOpened ? 'opened': '')} onClick={this.showMenu}>
                    <div className={"menu-btn " + (this.state.menuOpened ? 'opened': '')}></div>
                    <div className={"menu-btn " + (this.state.menuOpened ? 'opened': '')}></div>
                    <div className={"menu-btn " + (this.state.menuOpened ? 'opened': '')}></div>
                </div>
                <header>
                    <div className={"menu " + (this.state.menuOpened ? "show" : '')}>
                        <div className={"col-sm-12 col-md-6 col-lg-6 menu-photo row " + (this.state.menuOpened ? 'show' : '')}>
                            <img src={"/imgs/" + this.state.image + "?d=" + Math.random()} alt="profile" className="img-fluid profile-img"/>
                            {this.props.edit ? 
                            <div>
                                <button className="btn btn-outline-light mt-3" onClick={this.editImage}>Edit</button>
                                <input type="file" accept="image/png,image/jpg,image/jpeg" id="image" ref={image => this.imageInput = image} value={this.state.imageToUpload} onChange={this.onImagePicked}/>
                            </div> :
                            ""
                            }
                        </div>
                        <div className={"col-sm-12 col-md-6 col-lg-6 " + "menu-links " + (this.state.menuOpened ? 'show' : '')} >
                            <ul >
                                <li className="menu-link">
                                    <a href={this.props.edit ? "/edit/index" :"/"} className="display-5">Home</a>
                                </li>
                                <li className="menu-link">
                                    <a href={this.props.edit ? "/edit/about": "/about"} className="display-5">About me</a>
                                </li>
                                <li className="menu-link">
                                    <a href={this.props.edit ? "/edit/projects":"/projects"} className="display-5">My Projects</a>
                                </li>
                                <li className="menu-link">
                                    <a href={this.props.edit ? "/edit/contact":"/contact"} className="display-5">Contact me</a>
                                </li>
                                {this.props.edit ? 
                                <li className="menu-link">
                                    <a href="/logout" className="display-5" onClick={this.logout}>Logout</a>
                                </li> :
                                ""
                                }
                            </ul>
                        </div>
                    </div>
                </header>
               
            </div>
          </div>  
        );
    }
}

export default Menu