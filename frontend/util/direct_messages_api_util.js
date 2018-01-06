export const fetchDM = (targetId) => {
  return $.ajax({
    url: `api/session/dms/${targetId}`,
    method: 'GET'
  });
};

export const unsubscribeDm = (targetId) => {
  return $.ajax({
    url: `api/session/dms/${targetId}`,
    method: 'DELETE'
  });
};

export const createDm = (targetId) => {
  return $.ajax({
    url: `api/session/dms/${targetId}`,
    method: 'POST'
  });
};

export const toggleRead = (targetId) => {
  return $.ajax({
    url: `api/sessions/dms/read/${targetId}`,
    method: 'POST'
  });
};
