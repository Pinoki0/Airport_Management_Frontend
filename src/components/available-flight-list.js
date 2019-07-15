import React, { Component } from 'react';
import axios from 'axios';

export default class AvailableFlightList extends Component {

    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {tourists: [],
        tourist:Object};
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


    onSubmit(e) {
        e.preventDefault();

        const obj = {
            tourist: this.state.tourist,
        };
        console.log(obj);
        /*
        does not work, when searching we search for id, when adding, we need the whole object to add it to the database
        sollutions: find by id object on backend or send by frontend object

        axios.all([
            axios.post('http://localhost:5000/api/flight/addTourist/'+this.props.match.params.id,obj),
            axios.post('http://localhost:5000/api/tourist/addFlight/'+obj.tourist._id,this.props.match.params.id)
        ])
            .then(axios.spread((googleRes, appleRes) => {
                // do something with both responses
            }));*/
        axios.post('http://localhost:5000/api/flight/addTourist/'+this.props.match.params.id,obj)
            .then(res => console.log(res.data));

        this.setState ( {
            tourist:Object
        })
        this.props.history.push('/flight/readAll');
    }

    copyFlight = (el) => {
        let tourist=el;
        this.setState({ tourist: tourist });

    }
    render() {
        return (
            <form onSubmit={this.onSubmit} className="FormFields" >
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
                        <th>Add</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.tourists.map(el => (
                        <tr>
                            <td>{el.firstName} {el.lastName}</td>
                            <td>{el.gender}</td>
                            <td>{el.country}</td>
                            <td>{el.remarks}</td>
                            <td>{el.birthDate}</td>
                            <button
                                onClick={this.copyFlight.bind(this, el)}
                                type="submit"
                            >Add</button>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            </form>
        )
    }
}







