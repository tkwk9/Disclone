# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

img_array = [
  'http://res.cloudinary.com/seaside9/image/upload/v1515353636/322c936a8c8be1b803cd94861bdfa868_ura4si.png',
  'http://res.cloudinary.com/seaside9/image/upload/v1515353632/1cbd08c76f8af6dddce02c5138971129_v5cmba.png',
  'http://res.cloudinary.com/seaside9/image/upload/v1515353629/0e291f67c9274a1abdddeb3fd919cbaa_r06lje.png',
  'http://res.cloudinary.com/seaside9/image/upload/v1515353625/dd4dbc0016779df1378e7812eabaa04d_g9g8oc.png'
]

User.all.each do |user|
  user.update(img_url: img_array.sample)
end
