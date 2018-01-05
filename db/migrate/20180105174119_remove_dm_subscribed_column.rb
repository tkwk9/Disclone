class RemoveDmSubscribedColumn < ActiveRecord::Migration[5.1]
  def change
    remove_column :dms, :subscribed
  end
end
