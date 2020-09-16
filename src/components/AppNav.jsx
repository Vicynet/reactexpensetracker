import React, {Component} from 'react';

class AppNav extends Component {
   
    state = { }
    render() {
        return (
            <div>
                <nav className="navbar navbar-dark bg-dark">
                    <a className="navbar-brand" href="/">
                        ExpenseTrailer
                    </a>
                </nav>
            </div>
        );
    }
}

export default AppNav;