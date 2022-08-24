class BidsController < ApplicationController
    before_action :authenticate_user!

    def create
        @bid = Bid.new(params.permit(:price))
        @bid.auction = Auction.find(params[:auction_id])
        @bid.user = current_user
        if @bid.save
            render json: {id: params[:auction_id]}
        else
            render json: {errors: @bid.errors}, status: 422
        end
    end

    def destroy
        @bid = Bid.find(params[:id])
        if @bid.destroy
            render json: {status: 200}, status: 200
        else
            render json: {status: 500}
        end
    end
end
