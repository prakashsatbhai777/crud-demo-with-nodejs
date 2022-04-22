const FIREBASE_DOMAIN = 'https://react-http-demo-dd5a8-default-rtdb.firebaseio.com';
const HOST = 'http://localhost:5000';

export async function getAllQuotes() {
  const response = await fetch(`${HOST}/quote/getAll`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not fetch quotes.');
  }

  // const transformedQuotes = [];

  // for (const key in data.data) {
  //   const quoteObj = {
  //     id: key,
  //     ...data[key],
  //   };

  //   transformedQuotes.push(quoteObj);
  // }

  return data;
}

export async function getSingleQuote(quoteId) {
  // const response = await fetch(`${FIREBASE_DOMAIN}/quotes/${quoteId}.json`);
  const response = await fetch(`${HOST}/quote/getOne/${quoteId}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not fetch quote.');
  }

  // const loadedQuote = {
  //   id: quoteId,
  //   ...data,
  // };

  return data;
}

export async function addQuote(quoteData) {
  // const url = `${FIREBASE_DOMAIN}/quotes.json`;
  const url = `${HOST}/quote/add`;

  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(quoteData),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not create quote.');
  }

  return null;
}

export async function deleteQuote(quoteId) {
  // const response = await fetch(`${FIREBASE_DOMAIN}/quotes/${quoteId}.json`);
  const response = await fetch(`${HOST}/quote/delete/${quoteId}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not fetch quote.');
  }

  return data;
}

export async function updateQuote(quoteData) {
  // const url = `${FIREBASE_DOMAIN}/quotes.json`;
  const url = `${HOST}/quote/update`;

  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(quoteData),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not update quote.');
  }

  return null;
}

export async function addComment(requestData) {
  const response = await fetch(`${FIREBASE_DOMAIN}/comments/${requestData.quoteId}.json`, {
    method: 'POST',
    body: JSON.stringify(requestData.commentData),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not add comment.');
  }

  return { commentId: data.name };
}

export async function getAllComments(quoteId) {
  const response = await fetch(`${FIREBASE_DOMAIN}/comments/${quoteId}.json`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not get comments.');
  }

  const transformedComments = [];

  for (const key in data) {
    const commentObj = {
      id: key,
      ...data[key],
    };

    transformedComments.push(commentObj);
  }

  return transformedComments;
}