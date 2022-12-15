# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

Auction.destroy_all
Bid.destroy_all
User.destroy_all

PASSWORD = "123"
super_user = User.create(
  first_name: "Admin",
  last_name: "User",
  email: "admin@user.com",
  password: PASSWORD,
  admin: true
)

10.times do 
  first_name = Faker::Name.first_name
  last_name = Faker::Name.last_name
  User.create(
    first_name: first_name,
    last_name: last_name,
    email: "#{first_name}@#{last_name}.com",
    password: PASSWORD
  )
end

users = User.all

40.times do
    a = Auction.create(
        title: Faker::FunnyName.name,
        description: Faker::Lorem.paragraph,
        price: Faker::Number.decimal_part(digits: 2),
        end_date: Faker::Time.forward(days: 30, period: :morning),
        user: users.sample
    )
    if a.valid?
        count = a.price
        rand(1..5).times do
            count += 1
            Bid.create(price: count, auction:a, user: users.sample)
            a.update(price: count)
        end
    end
end