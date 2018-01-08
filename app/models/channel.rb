# == Schema Information
#
# Table name: channels
#
#  id         :integer          not null, primary key
#  name       :integer          not null
#  server_id  :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Channel < ApplicationRecord
  validates :name, :server_id, presence: true

  has_many :messages, as: :messageable, dependent: :destroy
  has_many :channel_memberships, dependent: :destroy
  belongs_to :server
  has_many :users, through: :channel_memberships, source: :user

end
