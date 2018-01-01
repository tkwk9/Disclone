# == Schema Information
#
# Table name: dm_memberships
#
#  id         :integer          not null, primary key
#  dm_id      :integer          not null
#  user_id    :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class DmMembership < ApplicationRecord
  validates :dm_id, :user_id, presence: true

  belongs_to :user
  belongs_to :dm

end
