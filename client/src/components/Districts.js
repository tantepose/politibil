import React from 'react';

// disabling emoji warnings from create-react-app
/* eslint-disable jsx-a11y/accessible-emoji */

// listing of districts, calling getDistrict with corresponding @Twitter-handle
const Districts = props => (
    <div className="feed">

        <div className="tweet">
            <p>Hvilket politidistrikt vil du følge? 🐱</p>
        </div>

        <div className="message" onClick={() => {props.setDistrict('oslopolitiops')}}>
            <p>Oslo politidistrikt 🌆</p>
        </div>
        <div className="message" onClick={() => {props.setDistrict('PolitiTrondelag')}}>
            <p>Trøndelag politidistrikt ☕</p>
        </div>
        <div className="message" onClick={() => {props.setDistrict('politietsorost')}}>
            <p>Sør-Øst politidistrikt 🛥️</p>
        </div>
        <div className="message" onClick={() => {props.setDistrict('politietost')}}>
            <p>Øst politidistrikt 🚗</p>
        </div>
        <div className="message" onClick={() => {props.setDistrict('politivest')}}>
            <p>Vest politidistrikt ⛽</p>
        </div>
        <div className="message" onClick={() => {props.setDistrict('politiagder')}}>
            <p>Agder politidistrikt ⛵</p>
        </div>
        <div className="message" onClick={() => {props.setDistrict('politietsorvest')}}>
            <p>Sør-Vest politidistrikt 🌊</p>
        </div>
        <div className="message" onClick={() => {props.setDistrict('PolitiMRpd')}}>
            <p>Møre og Romsdal politidistrikt 🌄</p>
        </div>
        <div className="message" onClick={() => {props.setDistrict('politiinnlandet')}}>
            <p>Innlandet politidistrikt 👨‍🌾</p>
        </div>
        <div className="message" onClick={() => {props.setDistrict('polititroms')}}>
            <p>Troms politidistrikt ❄️</p>
        </div>
        <div className="message" onClick={() => {props.setDistrict('politinordland')}}>
            <p>Nordland politidistrikt 🐟</p>
        </div>
        <div className="message" onClick={() => {props.setDistrict('politifinnmark')}}>
            <p>Finnmark politidistrikt ⛄</p>
        </div>

    </div>
);

export default Districts;