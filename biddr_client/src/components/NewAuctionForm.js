import FormErrors from './FormErrors'

export default function NewAuctionForm(props){
    return(
    <>
        <form className="ui large form clearing segement NewAuctionForm" onSubmit={props.create}>
            <div className="field">
                <label htmlFor="title">Title</label>
                <br/>
                <input type="text" name="title" id="title" value={props.auction.title} onChange={props.onChange}/>
                <FormErrors field="title" errors={props.errors}/>
            </div>
            <div className="field">
                <label htmlFor="description">Description</label>
                <textarea name="description" id="description" rows="3" value={props.auction.description} onChange={props.onChange}/>
                <FormErrors field="description" errors={props.errors}/>
            </div>
            <div className="field">
                <label htmlFor="price">Price</label>
                <br/>
                <input type="number" name="price" id="price" pattern="/\A\d+(?:\.\d{0,2})?\z/" value={props.auction.price} onChange={props.onChange}/>
                <FormErrors field="price" errors={props.errors}/>
            </div>
            <div className="field">
                <label htmlFor="price">End Date</label>
                <br/>
                <input type="datetime-local" min={Date.now()} max="9999-12-31T00:00" name="end_date" id="end_date" value={props.auction.end_date} onChange={props.onChange}/>
                <FormErrors field="end_date" errors={props.errors}/>
            </div>
            <div>
                <input className="ui right floated large orange button" type="submit" value="Start Auction" />
            </div>         
        </form>
    </>
    )
}