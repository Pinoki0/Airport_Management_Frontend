import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CountryDropdown} from 'react-country-region-selector';

import axios from "axios";

export default class CreateTourist extends Component {

    constructor(props) {
        super(props);

        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeGender = this.onChangeGender.bind(this);
        this.onChangeRemarks= this.onChangeRemarks.bind(this);
        this.onChangeBirthDate= this.onChangeBirthDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);


        this.state = {
            firstName: '',
            lastName: '',
            gender: '',
            country:'',
            remarks: '',
            birthDate:new Date(),
            flightsList: []

        }
    }
    selectCountry (e) {
        this.setState({ country: e });
    }

    onChangeFirstName(e) {
        this.setState({
            firstName: e.target.value
        });
    }

    onChangeLastName(e) {
        this.setState({
            lastName: e.target.value
        });
    }

    onChangeGender(e) {
        this.setState({
            gender: e.target.value
        });
    }
    onChangeRemarks(e) {
        this.setState({
            remarks: e.target.value
        });
    }
    onChangeBirthDate(e) {

        this.setState({
            birthDate: e
        });
    }


    onSubmit(e) {
        e.preventDefault();

        console.log(`Form submitted:`);
        console.log(`First Name: ${this.state.firstName}`);
        console.log(`Last Name: ${this.state.lastName}`);
        console.log(`Gender: ${this.state.gender}`);
        console.log(`Country: ${this.state.country}`);
        console.log(`Remarks: ${this.state.remarks}`);
        console.log(`Birth Date: ${this.state.birthDate}`);
        console.log(`Flights List: ${this.state.flightsList}`);

        this.setState({
            firstName: '',
            lastName: '',
            gender: '',
            country:'',
            remarks: '',
            birthDate:new Date(),
            flightsList: []

        })
        const newTourist = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            gender: this.state.gender,
            country: this.state.country,
            remarks:this.state.remarks,
            birthDate:this.state.birthDate,
            flightsList:this.state.flightsList
        };

        axios.post('http://localhost:5000/api/tourist/create', newTourist)
            .then(res => console.log(res.data))
    }


    render() {
        const { country } = this.state;
        return (
            <div style={{marginTop: 10}}>
                <h3>Create Tourist</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Name: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.firstName}
                                onChange={this.onChangeFirstName}
                        />
                    </div>
                    <div className="form-group">
                        <label>Last Name: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.lastName}
                                onChange={this.onChangeLastName}
                        />
                    </div>

                    <div className="form-group">
                        <label>Birth Date: </label>
                    </div>
                    <div className="form-group">
                        <DatePicker
                            selected={this.state.birthDate}
                            onChange={this.onChangeBirthDate}
                        />

                    </div>
                    <div className="form-group">
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input"
                                    type="radio"
                                    value="Man"
                                    checked={this.state.gender==='Man'}
                                    onChange={this.onChangeGender}
                            />
                            <label className="form-check-label">Man</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input"
                                    type="radio"
                                    value="Woman"
                                    checked={this.state.gender==='Woman'}
                                    onChange={this.onChangeGender}
                            />
                            <label className="form-check-label">Woman</label>
                        </div>
                    </div>
                    <div className="form-group">
                        <CountryDropdown
                            value={country}
                            onChange={(val) => this.selectCountry(val)} />
                    </div>
                    <div className="form-group" >
                        <label>Remarks: </label>
                        <textarea
                            className="form-control"
                            value={this.state.remarks}
                            style={{ height: 200}}
                            onChange={this.onChangeRemarks}
                        />
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Create Tourist" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }

}