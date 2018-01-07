export const fetchUser = (userId) => {
  return $.ajax({
    url: `api/session/user/${userId}`,
    method: 'GET'
  });
};
