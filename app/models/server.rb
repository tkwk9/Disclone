# == Schema Information
#
# Table name: servers
#
#  id         :integer          not null, primary key
#  name       :string           not null
#  img_url    :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Server < ApplicationRecord
  validates :name, presence: true

  has_many :channels, dependent: :destroy
  has_many :channel_memberships, through: :channels

  has_many :server_memberships
  has_many :users, through: :server_memberships

  has_many :messages, through: :channels

  def members(user_id)
    self.users.select{|user| user.id != user_id}
  end

  def subscribed?(user_id)
    self.users.find_by(id: user_id)
  end

  def self.create_server(creator, name)
    self.transaction do
      Channel.transaction do
        ChannelMembership.transaction do
          ServerMembership.transaction do
            server = self.create(name: name)
            ServerMembership.create(user_id: creator.id, server_id: server.id)
            general = Channel.create(name: 'general', server_id: server.id)
            ChannelMembership.create(user_id: creator.id, channel_id: general.id)
            return server
          end
        end
      end
    end
  end

  def subscribe(user_id)
    ChannelMembership.transaction do
      ServerMembership.transaction do
        self.channels.each do |channel|
          ChannelMembership.create(user_id: user_id, channel_id: channel.id)
        end
        ServerMembership.create(user_id: user_id, server_id: self.id)
      end
      return true
    end
    return false
  end

  def unsubscribe(user_id)
    ChannelMembership.transaction do
      ServerMembership.transaction do
        self.channel_memberships.each do |channel_membership|
          if channel_membership.user_id == user_id.to_i
            channel_membership.destroy
          end
        end
        self.server_memberships.find_by(user_id: user_id).destroy
      end
      return true
    end
    return false
  end

  def create_channel(name)
    Channel.transaction do
      ChannelMembership.transaction do
        channel = Channel.create(name: name, server_id: self.id)
        self.users.each do |user|
          ChannelMembership.create(user_id: user.id, channel_id: channel.id)
        end
        return channel
      end
    end
    return false
  end

  def delete_channel(channel_id)
    Channel.transaction do
      ChannelMembership.transaction do
        return Channel.find_by(id: channel_id).destroy
      end
    end
  end

end
