# == Schema Information
#
# Table name: channel_memberships
#
#  id           :integer          not null, primary key
#  user_id      :integer          not null
#  channel_id   :integer          not null
#  unread_count :integer          default(0), not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class ChannelMembership < ApplicationRecord
end
