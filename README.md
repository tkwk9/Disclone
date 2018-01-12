# Disclone

Disclone is a full-stack live-chat, web application inspired by Discord. Disclone uses the React-Redux architectual framework on the frontend, and the Ruby on Rails paired with a PostgresSQL database on the backend.

## Features & Implementation

### Online Status

When a user subscribes to an ActionCable Channel, that user's online status is updated to online. In addition, that information is then broadcasted to all relevant users (The user's friends, any other users that have direct messages with the user, and those that share a server with the user), and the online status is updated accordingly on the frontend. When a user unsubscrbes to an ActionCable Channel, the sequence of events occur.

### Friendships

A friendship is implemented through a `Friendship` model, which `belongs_to` a `User`. When a particular user chooses to create a friendship, two Friendship models are created:

* Friendship: {friend_1_id: current_user.id, friend_2_id: target_user.id}
* Friendship: {friend_1_id: target_user.id, friend_2_id: current_user.id}

Consequently, when a user decides to remove a friendship, both friendships are deleted.

In addition to creating and deleting relevant `Friendship` models, when a one user creates or deletes a friendship, the other user is immediately notified through an ActionCable subscription, and an appropriate ui changes take effect on the receiver's end. 

### Direct Messages

A `Dm` (Direct Messages) model only has one property: id. This model, however, `has_many` polymorphic association with `Message` models `as: messageable`. In addition, a `Dm` model `has_many` association with `DmMembership` model, which is used to associate `User`s with a `Dm`.

A `DmMembership` model - in addition to `dm_id` and `user_id` - has `unread_count` and `subscribed` property. These properties are used to determine how various DM related react components render (or does not render at all) on the front-end.

This implies that a `Dm` model, as well as all of its `messages` and `dm_memberships` are never deleted. a user simply unsubscribes to it. If a user is unsubscribed to a `Dm`, he or she is subscribed when (a) a user creates a DM with another user for the first time through a UI, (b) a user "creates" a DM that has existed before through a UI, or (c) when a user on the other end of the DM messages the user.

### Servers/Channels

A `Server` model `has_many channels` and a `Channel` model `belongs_to server`.

### Livechat

#### Backend

Messages are stored in the databse with a one-to-one association with a `User` (author), as well as polymorphic association with a `Channel` or `Dm` (Direct Messages) as `messageable`. When a message is sent, the Message controller finds relevant memberships (`ChannelMembership` or `DmMembership`) and updates an unread counter accordingly.



