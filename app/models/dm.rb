class Dm < ApplicationRecord
  has_many :messages, as: :messageable
  has_many :dm_memberships
  has_many :users, through: :dm_memberships, source: :user
end
