class Dm < ApplicationRecord
  has_many :messages, as: :messageable
  has_many :dm_memberships
  has_many :users, through: :dm_memberships, source: :user

  def some_messages(ind)
    mark = (self.messages.all.map(&:id).index(Integer(ind)) - self.messages.all.length)
    self.messages.all[mark - 10...mark]
  end
end
