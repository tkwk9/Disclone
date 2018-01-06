// export const fetchFriendship = (targetId) => {
//   return $.ajax({
//     url: `api/session/friends/${targetId}`,
//     method: 'GET'
//   });
// };

export const fetchFriendsList = () => {
  return $.ajax({
    url: `api/session/friends`,
    method: 'GET'
  });
};

export const deleteFriendship = (targetId) => {
  return $.ajax({
    url: `api/session/friends/${targetId}`,
    method: 'DELETE'
  });
};

export const createFriendship = (targetId) => {
  return $.ajax({
    url: `api/session/friends/${targetId}`,
    method: 'POST'
  });
};
