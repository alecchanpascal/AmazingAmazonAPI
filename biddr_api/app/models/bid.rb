class Bid < ApplicationRecord
    belongs_to :auction
    belongs_to :user, optional: true

    validates :price, format: { with: /\A\d+(?:\.\d{0,2})?\z/ }, numericality: {greater_than: 0}
end
