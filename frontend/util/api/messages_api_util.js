export const fetchMessage = messageId => {
  return $.ajax({
    url: `api/messages/${messageId}`,
    method: 'GET'
  });
};

export const fetchSnippet = snippet => {
  return $.ajax({
    url: 'api/messages',
    method: 'GET',
    data: {snippet}
  });
};

export const submitMessage = ({ message, messageable }) => {
  return $.ajax({
    url: `api/messages/`,
    method: 'POST',
    data: {
      message,
      messageable
    }
  });
};
