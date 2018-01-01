App.cable.subscriptions.create { channel: "DirectChannel" },
  received: (data) ->
    console.log(data);
