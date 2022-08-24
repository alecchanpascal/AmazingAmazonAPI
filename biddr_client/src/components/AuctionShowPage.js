import AuctionDetails from './AuctionDetails';
import BidList from "./BidList";
import NewBidForm from './NewBidForm';
import React, { useState, useEffect } from "react";
import {Auction, Bid} from './routes';
import Spinner from './Spinner';

export default function AuctionShowPage(props){
    const [state, setState] = useState({
        auction: null,
        isLoading: true,
        bid: null
    })

    useEffect(() => {
        Auction.one(props.match.params.id).then(auction => {
            setState({auction, isLoading: false, bid: {price: parseFloat((auction.price+0.01).toFixed(2))}})
        })
    }, [state.isLoading])

    const deleteAuction = () => {
        Auction.destroy(state.auction.id).then(() => {
            props.history.push('/auctions');
        })
    }

    const deleteBid = (id) => {
        Bid.destroy(id, state.auction.id).then(() => {
            setState({...state, isLoading: true})
        })
    }

    const onChange = (e) => {
        const { name, value } = e.target
        if (name === 'price'){
            if (parseFloat(value) <= state.auction.price) {
                return
            }
        }
        setState({...state, bid: {...state.bid, [name]: parseFloat(value)}})
    }

    const createBid = (e) => {
        e.preventDefault()
        Bid.create({price: state.bid.price}, state.auction.id).then(bid => {
            if (bid.errors){
                console.log(`Errors: ${bid.errors}`)
                setState({...state, errors: bid.errors})
            } else {
                setState({...state, auction: {...state.auction, price: state.bid.price}})
                Auction.update(state.auction.id, state.auction).then(() => {
                    setState({...state, isLoading: true})
                })
            }
        })
    }

    if (state.isLoading){
        return <Spinner/>
    }
    return(
        <>
        <div className="ui teal clearing segment">
            <AuctionDetails 
            auction={state.auction}
            delete={deleteAuction}
            />
        </div>

        <div className="ui segment">
            <NewBidForm bid={state.bid} onChange={onChange} createBid={createBid}/>
            <br></br>
            <br></br>
        </div>

        <h2 className="ui horizontal divider header">Previous Bids</h2>
        <div className="ui segment">
            <BidList 
            bids={state.auction.bids}
            deleteBid={(id) => deleteBid(id)}
            />
        </div>
        </>
    )
}
