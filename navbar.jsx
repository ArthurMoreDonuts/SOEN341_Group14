import React, { Component } from 'react';

class NavBar extends Component {
    render() { 
        return (
            <nav className="navbar navbar-dark bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Navbar
                        <span className = "badge m-1 badge-pill badge-primary">
                            {this.props.totalCounters}
                        </span>
                        <button class="btn btn-outline-success me-2" type="button">Main Page</button>
                        <button class="btn btn-outline-success me-2" type="button">Profile</button>
                        <button class="btn btn-outline-success me-2" type="button">Questions</button>
                        <button class="btn btn-outline-success me-2" type="button">Answers</button>
                        <button class="btn btn-outline-success me-2" type="button">Ask Questions</button>
                        <button class="btn btn-outline-success me-2" type="button">Login</button>
                        <button class="btn btn-outline-success me-2" type="button">Sign-Up</button>
                    </a>
                    <form className="d-flex">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>
            </nav>
        );
    }
}
 
export default NavBar;