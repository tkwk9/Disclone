module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user

    def connect
      self.current_user = authorize
    end

    private
      def authorize
        if current_user = User.find_by(session_token: cookies.signed[:session_token])
          current_user
        else
          reject_unauthorized_connection
        end
      end
  end
end
