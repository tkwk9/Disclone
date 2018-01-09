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

  has_many :dm_memberships, -> { where subscribed: true }
  has_many :dms, through: :dm_memberships, source: :dm

  has_many :channel_memberships
  has_many :channels, through: :channel_memberships

  has_many :server_memberships
  has_many :servers, through: :server_memberships

  def dm_recipients
    self.dms.map {|dm| dm.recipient(self.id)}
  end

  def channel_recipients
    server = self.servers.includes(:users)
    user_list = [];
    server.each do |server|
      user_list += server.users
    end
    return user_list.uniq
  end

  def subscribed?(messageable)
    if messageable.class == Dm
      self.dms.include?(messageable)
    else
      # TODO: Handle channel
      self.channels.include?(messageable)
    end
  end

  def readings # TODO: Remove in final project if unnecessary
    user_dms = self.dms.includes(:messages)
    user_dms.map{ |dm| dm.messages }.flatten
  end

  def users
    (self.friends + self.dm_recipients + self.channel_recipients).uniq # TODO: Add server people here too
  end

  def payload_snippets
    user_dms = self.dms.includes(:messages)
    user_channels = self.dms.includes(:messages)
    user_dms.map{ |dm| dm.payload_snippets }.flatten + user_channels.map{ |channel| channel.payload_snippets }.flatten
  end

  def friendship_ids
    self.friends.map(&:id)
  end

  def session_payload
    payload = {}
    payload[:messages] = self.payload_snippets
    payload[:directMessages] = self.dms.includes(:users, :messages)
    payload[:channels] = self.channels.includes(:users, :messages)
    payload[:servers] = self.servers.includes(:channels)
    payload[:friendsList] = self.friendship_ids
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
    img_array = [
      'http://res.cloudinary.com/seaside9/image/upload/v1515353636/322c936a8c8be1b803cd94861bdfa868_ura4si.png',
      'http://res.cloudinary.com/seaside9/image/upload/v1515353632/1cbd08c76f8af6dddce02c5138971129_v5cmba.png',
      'http://res.cloudinary.com/seaside9/image/upload/v1515353629/0e291f67c9274a1abdddeb3fd919cbaa_r06lje.png',
      'http://res.cloudinary.com/seaside9/image/upload/v1515353625/dd4dbc0016779df1378e7812eabaa04d_g9g8oc.png'
    ]
    self.session_token ||= SecureRandom.urlsafe_base64
    self.online ||= false;
    self.img_url ||= img_array.sample
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
