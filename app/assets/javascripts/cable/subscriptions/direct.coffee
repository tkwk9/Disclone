App.cable.subscriptions.create { channel: "DirectChannel" },
  received: (command) ->
    console.log(command);
