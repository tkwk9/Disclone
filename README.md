# Disclone

Disclone is a full-stack, live-chat, web application inspired by Discord. Disclone uses the React-Redux architectural framework on the frontend, Ruby on Rails paired with a PostgresSQL database on the backend, and ActionCable to integrate WebSockets.

## Features & Implementation

### Online Status

When a user subscribes to an ActionCable Channel, that user's online status is toggled as `true`. In addition, that information is then broadcasted to all relevant users (The user's friends, any other users that have direct messages with the user, and those that share a server with the user), and the online status is updated accordingly on the frontend. When a user unsubscribe to an ActionCable Channel, the sequence of events occur.

### Friendships

A friendship is implemented through a `Friendship` model, which `belongs_to` a `User`. When a particular user chooses to create a friendship, two Friendship models are created:

* Friendship: {friend_1_id: current_user.id, friend_2_id: target_user.id}
* Friendship: {friend_1_id: target_user.id, friend_2_id: current_user.id}

Consequently, when a user decides to remove a friendship, both friendships are deleted.

In addition to creating and deleting relevant `Friendship` models, when a one user creates or deletes a friendship, the other user is immediately notified through an ActionCable subscription, and an appropriate ui changes take effect on the receiver's end.

### Direct Messages

A `Dm` (Direct Messages) model only has one attribute: id. This model, however, `has_many` polymorphic association with `Message` models `as: messageable`. In addition, a `Dm` model `has_many` association with `DmMembership` model, which is used to associate `User`s with a `Dm`.

A `DmMembership` model - in addition to `dm_id` and `user_id` - has `unread_count` and `subscribed` attribute. These properties are used to determine how various DM related react components render (or does not render at all) on the front-end.

This implies that a `Dm` model, as well as all of its `messages` and `dm_memberships` are never deleted; a user simply unsubscribes to it. If a user is unsubscribed to a `Dm`, he or she is subscribed when (a) a user creates a DM with another user for the first time through a UI, (b) a user "creates" a DM that has existed before through a UI, or (c) when a user on the other end of the DM messages the user through an ActionCable subscription.

### Servers/Channels

A `Server` model `has_many channels` and a `Channel` model `belongs_to server`. Similarly to a DM, both channels and servers have memberships. Since a `Channel` `belongs_to` a `Server`, servers and channels were initially implemented without a `ChannelSubscription`; however, it was later introduced in order to track `unread_count` of a channel for a particular user.

This implies the following associations for Servers and Channels:

#### Servers

``` ruby
has_many :channels, dependent: :destroy
has_many :channel_memberships, through: :channels

has_many :server_memberships
has_many :users, through: :server_memberships

has_many :messages, through: :channels
 ```
#### Channels

``` ruby
belongs_to :server

has_many :channel_memberships, dependent: :destroy
has_many :users, through: :channel_memberships, source: :user

has_many :messages, as: :messageable, dependent: :destroy
```

In addition, `Server` model has following methods that manages creation, deletion, subscription and unsubscription of `Server`s and `Channel`s:

``` ruby
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
```

Similar to friendships, when a particular action is taken on a sever or a channel (e.g. renaming a channel, removing a server, inviting a person to a server, etc.), a proper action is taken on the front-end of relevant users (i.e. server members).

### Livechat

#### Basic Backend Implementation

Messages are stored in the database with a one-to-one association with a `User` (author), as well as polymorphic association with a `Channel` or `Dm` (Direct Messages) as `messageable`. Every message model knows who the readers of the message is (i.e. DM participants, Server Members, etc.), and that information is used to determine who to broadcast the message to when a message is created.

#### Unread Counter

When a message is sent, the Message Controller finds relevant memberships (`ChannelMembership` or `DmMembership`) and updates an unread counter accordingly. The unread counter for a particular user is updated once s/he visits the show page of that `messageable` (e.g. `https://disclone-app.herokuapp.com/#/@me/:dm_id` for a dm). If a user is already on the page when a new message is posted, the frontend immediately sets the relevant redux slice of state's unread count to 0, and informs the server to make proper updates in the backend.

#### Message Grouping

In order to improve readability, messages are grouped on the front-end. For a given message, each subsequent messages are grouped with it, if following conditions hold true: (a) the next message has the same author as the last message sent, (b) the next message was sent within 1 minute since the creation of a last message.

The only exception to this rule are embedded youtube links, which gets its own group.

#### Infinite Scrolling

For all DMs and Channels that a user is subscribed to, by default, the frontend only receives the last 50 messages of the entire conversation. When a chat window is scrolled up to the top, if there are additional messages that can be fetched (i.e.)
