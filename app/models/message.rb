# == Schema Information
#
# Table name: messages
#
#  id               :integer          not null, primary key
#  author_id        :integer          not null
#  content          :text             not null
#  messageable_id   :integer          not null
#  messageable_type :string
#  created_at       :datetime         not null
#  updated_at       :datetime         not null

class Message < ApplicationRecord
  validates :author_id, :content, :messageable_id, presence: true

  belongs_to :author, class_name: :User, foreign_key: :author_id
  belongs_to :messageable, polymorphic: true

  def mark_unread(sender_id)
    if messageable.class == Dm
      membership = messageable.recipient_membership(sender_id)
      membership.update(unread_count: membership.unread_count + 1)
    else # TODO: Update for channels

    end
  end

  def mark_read(reader_id)
    if messageable.class == Dm
      messageable.reader_memebership(reader_id).update(unread_count: 0)
    else # TODO: Update for channels

    end
  end

  def readers
    self.messageable.users
  end
end
