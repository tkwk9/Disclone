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
    server: {name}
  });
};

export const updateServer = (serverId, name) => {
  return $.ajax({
    url: `api/session/servers/${serverId}`,
    method: 'PATCH',
    server: {name}
  });
};

export const subscribeToServer = (serverId, userId) => {
  return $.ajax({
    url: `api/session/servers/${serverId}/subscribe/${userId}`,
    method: 'POST'
  });
};

export const deleteServer = serverId => {
  return $.ajax({
    url: `api/session/servers/${serverId}`,
    method: 'DELETE'
  });
};
