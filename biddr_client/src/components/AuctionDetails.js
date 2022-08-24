import React from "react";

export default function AuctionDetails(props) {
    return(
      <>
        <h2 className="ui header">{props.auction.title}</h2>
        <p>
          {props.auction.description}
        </p>
        <div className="author">By {props.auction.seller_full_name}</div>
        <p>
            {'$' + props.auction.price.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
        </p>
        <p className="date">
            Ends: {new Date(props.auction.end_date).toDateString().replace(' ', ', ')} at {new Date(props.auction.end_date).toTimeString()}
        </p>
        {(props.user === props.auction.user || props.user.admin) && 
            <button className="ui right floated red button" onClick={props.delete}>Delete</button>
        }
      </>
    )
}