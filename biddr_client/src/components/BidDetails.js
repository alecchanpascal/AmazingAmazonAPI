import React from "react";

export default function BidDetails(props){
    const {price, bidder, created_at} = props
    return(
      <div>
        <h2>
          {'$' + price.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
        </h2>
        <div className="author">By {bidder}</div>
        <p className="date">
          Bid Received: {new Date(created_at).toDateString().replace(' ', ', ')} at {new Date(created_at).toTimeString()}
        </p>
        {(props.user === bidder.user || props.user.admin) &&
        <button className="ui right floated red button" onClick={props.deleteBid}>Delete</button>
        }
      </div>
    )
}