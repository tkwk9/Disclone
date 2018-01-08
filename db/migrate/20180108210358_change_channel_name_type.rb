class ChangeChannelNameType < ActiveRecord::Migration[5.1]
  def change
    change_column :channels, :name, :string
  end
end
