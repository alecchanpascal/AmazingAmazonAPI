const baseUrl = "http://localhost:3000"

const Auction = {
    all(){
        return fetch(`${baseUrl}/auctions`, {credentials: "include"}).then(res => res.json());
    },

    one(id){
        return fetch(`${baseUrl}/auctions/${id}`, {credentials: "include"}).then(res => res.json());
    },

    create(params){
        return fetch(`${baseUrl}/auctions`, {credentials: "include", method: "POST", headers: {"Content-type": "application/json"}, body: JSON.stringify(params)}).then(res => res.json());
    },

    update(id, params){
        return fetch(`${baseUrl}/auctions/${id}`, {credentials: "include", method: "PATCH", headers: {"Content-type": "application/json"}, body: JSON.stringify(params)}).then(res => res.json());
    },

    destroy(id) {
        return fetch(`${baseUrl}/auctions/${id}`, {credentials: "include", method: "DELETE"}).then(res => res.json());
    }
};

const Bid = {
    create(params, auction_id){
        return fetch(`${baseUrl}/auctions/${auction_id}/bids`, {credentials: "include", method: "POST", headers: {"Content-type": "application/json"}, body: JSON.stringify(params)}).then(res => res.json());
    },

    destroy(id, auction_id){
        return fetch(`${baseUrl}/auctions/${auction_id}/bids/${id}`, {credentials: "include", method: "DELETE"}).then(res => res.json());
    }
};

const Session = {
    create(params){
        return fetch(`${baseUrl}/session`, {credentials: "include", method: "POST", headers: {"Content-type": "application/json"}, body: JSON.stringify(params)}).then(res => res.json());
    },

    destroy(){
        return fetch(`${baseUrl}/session`, {credentials: "include", method: "DELETE"}).then(res => res.json());
    }
};

const User = {
    current(){
      return fetch(`${baseUrl}/users/current`, {method: "GET", credentials: "include"}).then(res => res.json());
    },

    create(params){
      return fetch(`${baseUrl}/users`, {method: "POST", credentials: "include", headers: {"Content-type": "application/json"}, body: JSON.stringify({user: params})}).then(res => res.json());
    }
};

export {Auction, Bid, Session, User}
