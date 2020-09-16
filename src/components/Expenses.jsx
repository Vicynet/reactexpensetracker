import React, {Component} from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Moment from 'react-moment';
// import { FormControl, Input, InputLabel, TextField } from '@material-ui/core';


class Expenses extends Component {

    emptyItem = {
        id: 8,
        description: "",
        expenseDate: new Date(),
        category: {id:4, name:'Food'},
        user: {id:2, email:'emelekwa@gmail.com', name:'Eme Lekwa' }
    }

    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            Expenses: [],
            date: new Date(),
            Categories: [],
            item: this.emptyItem
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
    }

    // state = {
    //     isLoading: true,
    //     Expenses: [],
    //     date: new Date(),
    //     Categories: []
    // }

    async handleSubmit(event) {
        event.preventDefault();

        const item = this.state.item;
        console.log(item);
        await fetch('/api/expense', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        });

        this.props.history.push("/");

        console.log(this.state.item);

    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item};
        item[name] = value;
        this.setState({item});
        console.log(this.state);
    }

    handleDateChange(date) {
        let item = {...this.state.item};
        item.expenseDate = date;
        this.setState({item});
        console.log(this.state);
    }

    async removeExpense(id) {
        await fetch(`/api/expense/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedExpense = [...this.state.Expenses].filter( i => i.id !== id);
            this.setState({Expenses: updatedExpense});
        });
    }

    async componentDidMount() {
        const response = await fetch('/api/expenses')        
        const body = await response.json();
        const getCategories = await fetch('/api/categories')
        const categoryData = await getCategories.json()
        this.setState(
            {
                Expenses: body,
                isLoading: false,
                Categories: categoryData
            }
        );
    }

    render() {
        const {
            Expenses,
            isLoading,
            Categories
        } = this.state;

        if(isLoading) {
            return(
                <div>
                    <h3>Loading...</h3>
                </div>
            );
        }

        return(
            <div>
                <div style={{display: 'flex'}}>
                    <h2>Expenses</h2>
                    <button type="button" className="btn btn-primary ml-auto" data-toggle="modal" data-target="#exampleModal">
                    + Add expense
                    </button>
                </div>
                    {/* <!-- Modal --> */}
                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Add Expense</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="description" className="col-form-label">Description:</label>
                                        <input type="text" className="form-control" onChange={this.handleChange} name="description" id="description"/>
                                    </div>
                                   
                                    <div className="form-group">
                                        <label htmlFor="category" className="col-form-label">Category:</label>
                                        <select className="form-control" onChange={this.handleChange}>
                                           {
                                               Categories.map(
                                                   category => 
                                                   <option value={category.id} key={category.id}>
                                                       {category.name}
                                                   </option>
                                               )
                                           }
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="expenseDate" className="col-form-label">Date:</label>
                                        <DatePicker className="form-control" selected={this.state.item.expenseDate} onChange={this.handleDateChange}/>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="submit" className="btn btn-primary">Save changes</button>
                                    </div>
                                </form>
                            </div>
                            </div>
                        </div>
                    </div>
                <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Description</th>
                        <th scope="col">Expense date</th>
                        <th scope="col">Expense category</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                {
                    Expenses.map(
                        expense =>  
                        <tr key={expense.id}>
                            <th scope="row">{expense.id}</th>
                            <td>{expense.description}</td>
                            <td><Moment date={expense.expenseDate} format="YYYY/MM/DD"/></td>
                            <td>{expense.category.name}</td>
                            <td><button type="button" onClick={() => this.removeExpense(expense.id)} className="btn btn-danger">Delete</button></td>
                        </tr>
                        // </div>
                    )
                }
                 </tbody>
                </table>
            </div>
        );
    }
}

export default Expenses;