export const fetchChannel = channelId => {
  return $.ajax({
    url: `api/session/channels/${channelId}`,
    method: 'GET'
  });
};

export const createChannel = (serverId, name) => {
  return $.ajax({
    url: `api/session/servers/${serverId}/channels`,
    method: 'POST',
    channel: {name}
  });
};

export const updateChannel = (channelId, name) => {
  return $.ajax({
    url: `api/session/channels/${channelId}`,
    method: 'PATCH',
    channel: {name}
  });
};

export const deleteChannel = channelId => {
  return $.ajax({
    url: `api/session/channels/${channelId}`,
    method: 'DELETE'
  });
};

export const toggleRead = channelId => {
  return $.ajax({
    url: `api/session/channels/read/${channelId}`,
    method: 'POST'
  });
};
