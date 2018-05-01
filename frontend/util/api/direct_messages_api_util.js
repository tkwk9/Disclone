export const fetchDm = targetId => {
  return $.ajax({
    url: `api/session/dms/${targetId}`,
    method: 'GET'
  });
};

export const unsubscribeDm = dmId => {
  return $.ajax({
    url: `api/session/dms/${dmId}`,
    method: 'DELETE'
  });
};

export const createDm = targetId => {
  return $.ajax({
    url: `api/session/dms/${targetId}`,
    method: 'POST'
  });
};

export const toggleRead = directMessageId => {
  return $.ajax({
    url: `api/session/dms/read/${directMessageId}`,
    method: 'POST'
  });
};
