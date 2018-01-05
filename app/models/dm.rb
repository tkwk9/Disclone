class Dm < ApplicationRecord
  has_many :messages, as: :messageable
  has_many :dm_memberships
  has_many :users, through: :dm_memberships, source: :user

  def snippet(msg_id, count)
    arr = self.messages.all.order(:id);
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
