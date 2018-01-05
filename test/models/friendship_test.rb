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

require 'test_helper'

class FriendshipTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
