class AuctionSerializer < ActiveModel::Serializer
  attributes(
    :id,
    :title,
    :description,
    :price,
    :end_date,
    :created_at,
    :updated_at,
    :seller_full_name
  )
  belongs_to :user, key: :seller

  def seller_full_name
    object.user&.full_name
  end

  has_many :bids

  class BidSerializer < ActiveModel::Serializer
    attributes(:id, :price, :bidder, :created_at)
    belongs_to(:user, key: :bidder)

    def bidder
      object.user&.full_name
    end
  end
end
