class AuctionsController < ApplicationController
    before_action :find_auction, except: [:index, :create]
    before_action :authenticate_user!, except: [:index, :show]

    def index
        @auction = Auction.order(created_at: :desc)
        render(json: @auction) 
    end

    def show
        if @auction
            render(json: @auction)
        else
            render(json: {status: 404}, status: 404)
        end
    end

    def create
        @auction = Auction.new auction_params
        @auction.user = current_user
        if @auction.save#!
            render json: { id: @auction.id }
        else
            render(json: { errors: @auction.errors.messages }, status: 422)
        end
    end

    def update
        if @auction.update auction_params
            render json: { id: @auction.id }
        else
            render(json: { errors: @auction.errors.messages }, status: 422)
        end
    end

    def destroy
        if @auction.destroy
            render(json: { status: 200 }, status: 200)
        else
            render json: {status: 500}
        end
    end

    private

    def find_auction
      @auction ||= Auction.find params[:id]
    end
 
    def auction_params
      params.require(:auction).permit(:title, :description, :price, :end_date, :bids)
    end
end
