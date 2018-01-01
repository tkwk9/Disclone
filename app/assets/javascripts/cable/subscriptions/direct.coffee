App.cable.subscriptions.create { channel: "DirectChannel" },
  received: (command) ->
    respond(command);
