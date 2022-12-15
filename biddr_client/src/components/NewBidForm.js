import React from 'react';

export default function NewBidForm(props) {
    return(
        <>
            <form className="ui large form clearing segement NewProductForm" onSubmit={props.createBid}>
                <div className="field">
                    <input type="number" name="price" id="price" pattern="/\A\d+(?:\.\d{0,2})?\z/" min={props.bid.price} value={props.bid.price} onChange={props.onChange}/>
                </div>
                <div>
                    <input className="ui right floated large orange button" type="submit" value="Bid" />
                </div>         
            </form>
        </>
    )
}