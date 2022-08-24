Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  resources :auctions do 
    resources :bids, only: [:create, :destroy]
  end
  resources :users, only: [:create] do
    get :current, on: :collection
  end
  resource :session, only: [:create, :destroy]
  match "*unmatched_route", to: "application#not_found", via: :all
end
