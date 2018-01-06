export const fetchUser = (targetId) => {
  return $.ajax({
    url: `api/session/user/${targetId}`,
    method: 'GET'
  });
};
