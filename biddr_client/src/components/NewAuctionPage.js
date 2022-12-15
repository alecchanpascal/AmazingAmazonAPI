import React, {useState, useEffect} from 'react';
import NewAuctionForm from './NewAuctionForm'
import {Auction} from './routes';
import Spinner from './Spinner';

export default function NewAuctionPage(props){
    const[state, setState] = useState({
        // auction: {
        //     title: '',
        //     description: '',
        //     price: '',
        //     end_date: ''
        // },
        auction: null,
        errors: null,
        isLoading: true
    })

    useEffect(() => {
        setState({auction: {
            title: '',
            description: '',
            price: '',
            end_date: ''
        }, errors: {}, isLoading: false})
    }, [state.isLoading])

    const create = event => {
        event.preventDefault();
        const fd = new FormData(event.currentTarget);
        const newAuction = {
            title: fd.get("title"),
            description: fd.get("description"),
            price: fd.get("price"),
            end_date: fd.get("end_date")
        };
    
        Auction.create(newAuction).then(data => {
            if (!data.errors){
                props.history.push(`/auctions/${data.id}`)
                setState({
                  ...state,
                  auction: {
                    title: '',
                    description: '',
                    price: '',
                    end_date: ''
                  }
                })
            } else {
              setState({
                ...state,
                errors: data.errors
              })
            }
        });
        event.currentTarget.reset();
    };
    
    const onChange = event => {
        const { name, value } = event.target
        if (name === 'price') {
            if (parseInt(value) < 0) {
            return
            }
        }
        setState({...state, auction: {...state.auction, [name]: value}})
    }

    if(state.isLoading){
        return <Spinner/>
    }
    return(
        <main className="Page">
            <div className="ui header">Sell Something</div>
            <NewAuctionForm create={create} auction={state.auction} onChange={onChange} errors={state.errors}/>
        </main>
    );
};