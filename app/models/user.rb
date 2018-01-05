# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  email           :string           not null
#  username        :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  img_url         :string
#  online          :boolean          not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class User < ApplicationRecord

  validates :email, :username, :password_digest, :session_token, presence: true
  validates :email, uniqueness: true
  validates :online, inclusion: { in: [true, false] }
  validates :password, length: {minimum: 6, allow_nil: true}

  has_many :messages, foreign_key: :author_id

  has_many :friendships, foreign_key: :friend_1_id
  has_many :friends, through: :friendships, source: :friend

  has_many :dm_memberships
  has_many :dms, through: :dm_memberships, source: :dm
  def dm_recipients
    self.dms.map {|dm| dm.recipient(self.id)}
  end

  def readings # TODO: Remove in final project if unnecessary
    #fix later
    user_dms = self.dms.includes(:messages)
    user_dms.map{ |dm| dm.messages }.flatten
  end

  def users
    (self.friends + self.dm_recipients).uniq
  end



  def payload_snippets
    user_dms = self.dms.includes(:messages)
    user_dms.map{ |dm| dm.payload_snippets }.flatten
  end

  def session_payload
    payload = {}
    payload[:messages] = self.payload_snippets
    payload[:directMessages] = self.dms.includes(:users, :messages)
    payload[:friends_list] = self.friends.map(&:id)
    payload[:users] = self.users
    return payload
  end

  def dmTo(id)
    dms = self.dms
    target = User.find_by(id: id);
    if dms.empty?
      return nil
    else
      return findDmTo(dms, target)
    end
  end

  after_initialize :init

  attr_reader :password

  def self.find_by_credentials(email, password)
    user = User.find_by(email: email)
    if user && BCrypt::Password.new(user.password_digest).is_password?(password)
      return user
    else
      nil
    end
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def init
    self.session_token ||= SecureRandom.urlsafe_base64
    self.online ||= false;
  end

  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64
  end

  def reset_session_token!
    self.session_token = SecureRandom.urlsafe_base64
    save!
    self.session_token
  end

  private
  def findDmTo(dms, target)
    dms.find {|dm| dm.users.include?(target)}
  end
end
