import consumer from './consumer';
import ActionCable from 'actioncable';

class ActionCableManager{
  constructor(actions){
    this.actions = actions;
    this.consumer = ActionCable.createConsumer();
    window.consumer = this.consumer;
  }

  subscribe() {
    this.subscription = consumer.subscriptions.create({channel: 'DirectChannel'}, {
      received: ({ command, options })=> {
        switch (command){
          case 'fetch_session_payload':
            this.actions.fetchSessionPayload();
            break;
          case 'fetch_message':
            this.actions.fetchMessage(options.messageId);
            break;
          case 'print':
            console.log(options.message);
            break;
          case 'force_logout':
            this.subscription.unsubscribe();
            this.actions.forceLogout(() => {
              console.log('force called');
            });
            break;
          default:
            console.log(`Unknown Command Received: ${command}`);
        }
      }
    });
  }
}
export default ActionCableManager;
