App.cable.subscriptions.create { channel: "DirectChannel" },
  received: (command) ->
    print_me(command);
