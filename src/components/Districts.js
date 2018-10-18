import React from 'react';

const Districts = props => (
    <div className="feed">

        <div className="tweet">
            <p>Hvilket politidistrikt vil du følge? 🐱</p>
        </div>

        <div className="message" onClick={() => {props.getDistrict('oslopolitiops')}}>
            <p>Oslo politidistrikt 🌆</p>
        </div>
        <div className="message" onClick={() => {props.getDistrict('PolitiTrondelag')}}>
            <p>Trøndelag politidistrikt ☕</p>
        </div>
        <div className="message" onClick={() => {props.getDistrict('politietsorost')}}>
            <p>Sør-Øst politidistrikt 🛥️</p>
        </div>
        <div className="message" onClick={() => {props.getDistrict('politietost')}}>
            <p>Øst politidistrikt 🚗</p>
        </div>
        <div className="message" onClick={() => {props.getDistrict('politivest')}}>
            <p>Vest politidistrikt ⛽</p>
        </div>
        <div className="message" onClick={() => {props.getDistrict('politiagder')}}>
            <p>Agder politidistrikt ⛵</p>
        </div>
        <div className="message" onClick={() => {props.getDistrict('politietsorvest')}}>
            <p>Sør-Vest politidistrikt 🌊</p>
        </div>
        <div className="message" onClick={() => {props.getDistrict('PolitiMRpd')}}>
            <p>Møre og Romsdal politidistrikt 🌄</p>
        </div>
        <div className="message" onClick={() => {props.getDistrict('politiinnlandet')}}>
            <p>Innlandet politidistrikt 👨‍🌾</p>
        </div>
        <div className="message" onClick={() => {props.getDistrict('polititroms')}}>
            <p>Troms politidistrikt ❄️</p>
        </div>
        <div className="message" onClick={() => {props.getDistrict('politinordland')}}>
            <p>Nordland politidistrikt 🐟</p>
        </div>
        <div className="message" onClick={() => {props.getDistrict('politifinnmark')}}>
            <p>Finnmark politidistrikt ⛄</p>
        </div>

    </div>
);

export default Districts;