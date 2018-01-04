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
  has_many :dm_memberships
  has_many :dms, through: :dm_memberships, source: :dm

  def readings
    #fix later
    user_dms = self.dms.includes(:messages)
    user_dms.map{ |dm| dm.messages }.flatten
  end

  def some_readings
    user_dms = self.dms.includes(:messages)
    user_dms.map{ |dm| dm.messages[-50..-1] }.flatten
  end

  def session_payload
    payload = {}
    payload[:messages] = self.some_readings
    payload[:directMessages] = self.dms.includes(:users, :messages)

    return payload
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

end
