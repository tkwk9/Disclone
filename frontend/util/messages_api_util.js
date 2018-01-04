export const fetchMessage = (id) => {
  return $.ajax({
    url: `api/messages/${id}`,
    method: 'GET'
  });
};

export const fetchSnippet = (snippet) => {
  console.log(snippet);
  return $.ajax({
    url: 'api/messages',
    method: 'GET',
    data: {snippet}
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
