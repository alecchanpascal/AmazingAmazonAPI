import { Link } from 'react-router-dom';

export default function AuctionList(props) {
    return(
        <>
        {props.auctions.map(a => {
            return (
            <div className="ui clearing segment" key={a.id}>
                <h2 className="ui header">
                    <Link to={`/auctions/${a.id}`}>{a.title}</Link>    
                </h2>
                <p>
                {a.description}
                </p>
                <div className="author">By {a.seller_full_name}</div>
                <p>
                    {'$' + a.price.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                </p>
                <p className="date">
                <small>
                Ends: {new Date(a.end_date).toDateString().replace(' ', ', ')} at {new Date(a.end_date).toTimeString()}
                </small>
                </p>
                <button className="ui right floated red button" onClick={() => props.delete(a.id)}>Delete</button>
            </div>
        )})}
        </>
    )
}