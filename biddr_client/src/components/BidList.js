import BidDetails from './BidDetails'
import React from "react";

export default function BidList(props) {
    return(
        <div>
            <h4>Previous Bids</h4>
            <div className="ui list">
                {props.bids.map(a => (
                    <div className="ui clearing segment" key={a.id}>
                    <BidDetails
                    price={a.price}
                    bidder={a.bidder}
                    created_at={a.created_at}
                    deleteBid={() => props.deleteBid(a.id)}
                    />
                    </div>
                ))}
            </div>
        </div>
    )
}