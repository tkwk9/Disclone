# == Schema Information
#
# Table name: friendships
#
#  id          :integer          not null, primary key
#  friend_1_id :integer          not null
#  friend_2_id :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Friendship < ApplicationRecord
  validates :friend_1_id, :friend_2_id, presence: true

  belongs_to :friend, class_name: :User, foreign_key: :friend_2_id

  def self.create_friendship(id_1, id_2)
    if !self.are_friends(id_1, id_2)
      self.create(friend_1_id: id_1, friend_2_id: id_2)
      self.create(friend_1_id: id_2, friend_2_id: id_1)
      return User.find_by(id: id_2)
    end
    return false
  end

  def self.destroy_friendship(id_1, id_2)
    if self.are_friends(id_1, id_2)
      self.find_by(friend_1_id: id_1, friend_2_id: id_2).destroy
      self.find_by(friend_1_id: id_2, friend_2_id: id_1).destroy
      return User.find_by(id: id_2)
    end
    return false
  end

  def self.get_friendship(id_1, id_2)
    self.find_by(friend_1_id: id_1, friend_2_id: id_2)
  end

  def self.are_friends(id_1, id_2)
    !!(self.get_friendship(id_1, id_2) && self.get_friendship(id_2, id_1))
  end
end
