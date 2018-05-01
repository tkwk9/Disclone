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

export const deleteFriendship = strangerId => {
  return $.ajax({
    url: `api/session/friends/${strangerId}`,
    method: 'DELETE'
  });
};

export const createFriendship = friendId => {
  return $.ajax({
    url: `api/session/friends/${friendId}`,
    method: 'POST'
  });
};
