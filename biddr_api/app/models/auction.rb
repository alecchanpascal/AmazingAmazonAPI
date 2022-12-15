class Auction < ApplicationRecord
    before_validation :titleize_title

    belongs_to :user, optional: true
    has_many :bids, dependent: :destroy

    validates :title, presence: {message: "Title Must Be Provided"}, uniqueness: {case_sensitive: false, scope: :description}
    validates :price, format: { with: /\A\d+(?:\.\d{0,2})?\z/ }, numericality: {greater_than: 0}
    validates :description, presence: {message: "Description Must Be Provided"}, length: {minimum: 10, too_short: "Description Must Be 10 Characters Minimum"}
    validates :end_date, presence: {message: "Auction Must Have An End Date"}
    validate :end_date_in_future

    private

    def titleize_title
        self.title.titleize
    end

    def end_date_in_future
        if end_date.present?
            errors.add(:end_date, 'Must Be Past Current Date') if (end_date <= DateTime.now)
        end
    end
end
