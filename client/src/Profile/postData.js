import { useAuth0 } from "@auth0/auth0-react";

export const postData = async (url, data) => {
  const { user, getAccessTokenWithPopup, getAccessTokenSilently } = useAuth0();

  const token = await getAccessTokenWithPopup(
    {
      audience: 'react-blog-api',
      scope: "add:posts",
    });
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}