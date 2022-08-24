class CreateBids < ActiveRecord::Migration[7.0]
  def change
    create_table :bids do |t|
      t.float :price, precision: 15, scale: 2
      t.references :auction, null: false, foreign_key: true
      t.timestamps
    end
  end
end
