# == Schema Information
#
# Table name: messages
#
#  id               :integer          not null, primary key
#  author_id        :integer          not null
#  content          :text             not null
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  messageable_id   :integer          not null
#  messageable_type :string
#

require 'test_helper'

class MessageTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
