# == Schema Information
#
# Table name: dm_memberships
#
#  id           :integer          not null, primary key
#  dm_id        :integer          not null
#  user_id      :integer          not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  subscribed   :boolean          not null
#  unread_count :integer          default(0), not null
#

require 'test_helper'

class DmMembershipTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
