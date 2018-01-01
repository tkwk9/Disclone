export const fetchMessage = (id) => {
  return $.ajax({
    url: `api/messages/${id}`,
    method: 'GET'
  });
};

export const submitMessage = ({message, messageable}) => {
  return $.ajax({
    url: `api/messages/`,
    method: 'POST',
    data: {
      message,
      messageable
    }
  });
};
