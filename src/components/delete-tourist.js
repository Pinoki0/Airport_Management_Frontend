import React, { Component } from 'react';
import axios from 'axios';

export default class DeleteTourist extends Component {

    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            firstName:'',
            lastName: ''

        }
    }
    componentDidMount() {
        axios.get('http://localhost:5000/api/tourist/read/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,

                })
            })
            .catch(function (error) {
                console.log(error);
            })
    }


    render() {
        return (

            <div style={{display: 'flex', justifyContent: 'center',alignItems:'center'}}>
                <form onSubmit={this.onSubmit}>
                    <p style={{ color: 'red' }}>
                        Do you want to remove a tourist named "{this.state.firstName+" "+this.state.lastName}"? You will not be able to restore it.</p>
                    <div className="form-group" style={{display: 'flex', justifyContent: 'center'}}>
                        <input type="submit" value="Delete Tourist" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }

    onSubmit(e) {
        e.preventDefault();
        const obj = {
            firstName: this.state.firstName,
            lastName: this.state.lastName

        };
        console.log(obj);
        axios.delete('http://localhost:5000/api/tourist/delete/'+this.props.match.params.id, obj)
            .then(res => console.log(res.data));

        this.props.history.push('/');
    }





}
