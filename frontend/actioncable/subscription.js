import consumer from './consumer';

export default (actions) => {
  consumer.subscriptions.create({channel: 'DirectChannel'}, {
    received: ({ command, options })=> {
      switch (command){
        case 'fetch_session_payload':
          actions.fetchSessionPayload();
          break;
        case 'fetch_message':
          actions.fetchMessage(options.messageId);
          break;
        case 'print':
          console.log(options.message);
          break;
        case 'force_logout':
          actions.logout();
          break;
        default:
          console.log(`Unknown Command Received: ${command}`);
      }
    }
  });
};
