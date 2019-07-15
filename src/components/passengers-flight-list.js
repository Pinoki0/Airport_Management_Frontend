import React, { Component } from 'react';
import axios from 'axios';

export default class PassengersFlightList extends Component {

    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            departureDate: new Date(),
            arrivalDate: new Date(),
            touristsList: [],
            tourist:Object};
    }

    componentDidMount() {
        axios.get('http://localhost:5000/api/flight/read/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    departureDate: response.data.departureDate,
                    arrivalDate: response.data.arrivalDate,
                    touristsList:response.data.touristsList
                })
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    onSubmit(e) {
        e.preventDefault();

        const obj = {
            tourist: this.state.tourist,
        };

        axios.all([
            axios.post('http://localhost:5000/api/flight/deleteTourist/'+this.props.match.params.id,obj),
            axios.post('http://localhost:5000/api/tourist/deleteFlight/'+obj.tourist._id,this.props.match.params.id)
        ])
            .then(axios.spread((fRes, tRes) => {

            }));
       /*axios.post('http://localhost:5000/api/flight/deleteTourist/'+this.props.match.params.id,obj)
            .then(res => console.log(res.data));*/

        this.setState ( {
            tourist:Object
        })
        this.props.history.push('/flight/readAll');
    }

    copyTourist = (el) => {
        let tourist=el;
        this.setState({ tourist: tourist });

    }


    render() {
        return (
            <form onSubmit={this.onSubmit} className="FormFields" >
            <div>
                <h3>List of flight passengers from {this.state.departureDate+" - "+this.state.arrivalDate}.</h3>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                    <tr>
                        <th>Full Name</th>
                        <th>Gender</th>
                        <th>Country</th>
                        <th>Remarks</th>
                        <th>Birthdate</th>
                        <th>Delete Tourist</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.touristsList.map(el => (
                        <tr>
                            <td>{el.firstName} {el.lastName}</td>
                            <td>{el.gender}</td>
                            <td>{el.country}</td>
                            <td>{el.remarks}</td>
                            <td>{el.birthDate}</td>
                            <button
                                onClick={this.copyTourist.bind(this, el)}
                                type="submit"
                            >Delete</button>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            </form>
        )
    }
}



