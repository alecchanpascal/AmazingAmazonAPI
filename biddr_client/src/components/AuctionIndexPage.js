import AuctionList from './AuctionList';
import React, { useState, useEffect } from 'react';
import {Auction} from './routes';
import Spinner from './Spinner';

export default function AuctionIndexPage() {
    const [state, setState] = useState({
        auctions: null,
        isLoading: true
    })

    useEffect(() => {
        Auction.all().then(auctions => {
            setState({auctions, isLoading: false})
        })
    }, [state.isLoading])

    const deleteAuction = (id) => {
        Auction.destroy(id)
        setState({...state, isLoading: true})
    }

    if (state.isLoading){
        return <Spinner/>
    }
    return(
        <main className="Page">
            <div className="auction-container">
                <h1 className="ui horizontal divider header">Auctions</h1>
                <div className="ui list">
                    <AuctionList 
                    auctions={state.auctions}
                    delete={(id) => deleteAuction(id)}
                    />
                </div>
            </div>
        </main>
    )
}