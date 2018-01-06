# == Schema Information
#
# Table name: dms
#
#  id         :integer          not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Dm < ApplicationRecord
  has_many :messages, as: :messageable
  has_many :dm_memberships
  has_many :users, through: :dm_memberships, source: :user

  def recipient(sender_id)
    self.users.find {|user| user.id != sender_id}
  end

  def recipient_membership(sender_id)
    self.dm_memberships.find {|membership| membership.user_id != sender_id}
  end

  def reader_memebership(reader_id)
    self.dm_memberships.find {|membership| membership.user_id == reader_id}
  end

  def self.create_dm(id_1, id_2)
    if dm = self.dm_between(id_1, id_2)
      dm.subscribe(id_1)
    else
      dm = self.create
      DmMembership.create(user_id: id_1, dm_id: dm.id)
      DmMembership.create(user_id: id_2, dm_id: dm.id)
      dm.subscribe(id_1)
    end
    return dm
  end

  def self.dm_between(id_1, id_2)
    Dm.all.find {|dm| ((dm.users.map(&:id)) & [id_1, id_2]).length == 2}
  end

  def subscribe(user_id)
    membership = self.dm_memberships.find {|membership| membership.user_id == user_id}
    if membership
      membership.update(subscribed: true)
    else
      false
    end
  end

  def unsubscribe(user_id)
    membership = self.dm_memberships.find {|membership| membership.user_id == user_id}
    if membership
      membership.update(subscribed: false)
    else
      false
    end
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
