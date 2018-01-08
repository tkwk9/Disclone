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
  validates :user_id, :channel_id, presence: true
  
  belongs_to :user
  belongs_to :channel

  after_initialize :init

  def init
    self.unread_count ||= 0
  end
end
