import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Tourist = props => (
    <tr>
        <td>{props.tourist.firstName} {props.tourist.lastName}</td>
        <td>{props.tourist.gender}</td>
        <td>{props.tourist.country}</td>
        <td>{props.tourist.remarks}</td>
        <td>{props.tourist.birthDate}</td>
        <td>
            <Link to={"/tourist/delete/"+props.tourist._id}>Delete</Link>
        </td>
        <td>
            <Link to={"/tourist/"+props.tourist._id+"/flights/booked"}>Flights</Link>
        </td>
    </tr>
)

export default class ShowTourists extends Component {

    constructor(props) {
        super(props);
        this.state = {tourists: []};
    }

    componentDidMount() {
        axios.get('http://localhost:5000/api/tourist/readAll')
            .then(response => {
                this.setState({ tourists: response.data });
            })
            .catch(function (error){
                console.log(error);
            })
    }

    touristsList() {
        return this.state.tourists.map(function(currentTourist, i){
            return <Tourist tourist={currentTourist} key={i} />;
        })
    }


    render() {
        return (
            <div>
                <h3>Tourists</h3>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                    <tr>
                        <th>Full Name</th>
                        <th>Gender</th>
                        <th>Country</th>
                        <th>Remarks</th>
                        <th>Birthdate</th>
                        <th>Delete</th>
                        <th>Flights</th>
                    </tr>
                    </thead>
                    <tbody>
                    { this.touristsList() }
                    </tbody>
                </table>
            </div>
        )
    }
}