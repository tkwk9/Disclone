export const fetchServer = serverId => {
  return $.ajax({
    url: `api/session/servers/${serverId}`,
    method: 'GET'
  });
};

export const createServer = name => {
  return $.ajax({
    url: `api/session/servers/`,
    method: 'POST',
    data: {
      server: {name}
    }
  });
};

export const updateServer = (serverId, name) => {
  return $.ajax({
    url: `api/session/servers/${serverId}`,
    method: 'PATCH',
    data: {
      server: {name}
    }
  });
};

export const subscribeToServer = (serverId, userId) => {
  return $.ajax({
    url: `api/session/servers/${serverId}/subscribe/${userId}`,
    method: 'POST'
  });
};
export const unsubscribeToServer = (serverId, userId) => {
  return $.ajax({
    url: `api/session/servers/${serverId}/unsubscribe/${userId}`,
    method: 'POST'
  });
};

export const deleteServer = serverId => {
  return $.ajax({
    url: `api/session/servers/${serverId}`,
    method: 'DELETE'
  });
};
