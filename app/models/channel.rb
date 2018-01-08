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

  def recipients(sender_id)
    self.users.where {|user| user.id != sender_id}
  end

  def recipients_memberships(sender_id)
    self.channel_memberships.where {|membership| membership.user_id != sender_id}
  end

  def reader_membership(reader_id)
    self.channel_memberships.find {|membership| membership.user_id == reader_id}
  end

  # def self.create_dm(id_1, id_2)
  #   if dm = self.dm_between(id_1, id_2)
  #     dm.subscribe(id_1)
  #   else
  #     dm = self.create
  #     DmMembership.create(user_id: id_1, dm_id: dm.id, subscribed: true)
  #     DmMembership.create(user_id: id_2, dm_id: dm.id)
  #   end
  #   return dm
  # end
  #
  # def self.dm_between(id_1, id_2)
  #   Dm.all.find {|dm| ((dm.users.map(&:id)) & [id_1, id_2]).length == 2}
  # end

  def subscribe(user_id)
    true
    # if membership = self.reader_membership(user_id)
    #   membership.update(subscribed: true)
    # else
    #   false
    # end
  end

  def unsubscribe(user_id)
    true
    # if membership = self.reader_membership(user_id)
    #   membership.update(subscribed: false)
    # else
    #   false
    # end
  end

  def snippet(msg_id, count)
    arr = self.messages.all.order(:id);
    return arr if arr.empty?
    mark = (arr.map(&:id).index(Integer(msg_id)) - self.messages.all.length)
    if (((mark-count) + arr.length) < 0 )
      arr[0...mark]
    else
      arr[(mark - count)...mark]
    end
  end

  def payload_snippets()
    arr = self.messages.all.order(:id)
    if (arr.length < 51)
      arr
    else
      arr[-50..-1]
    end
  end

end
