import React, {Component} from 'react';

class AppNav extends Component {
   
    state = { }
    render() {
        return (
            <div>
                <nav className="navbar navbar-dark bg-dark">
                    <a className="navbar-brand" href="/" style={{margin: '1em auto'}}>
                        ExpenseTrailer
                    </a>
                </nav>
            </div>
        );
    }
}

export default AppNav;