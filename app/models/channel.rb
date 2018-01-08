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
end
