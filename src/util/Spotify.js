const clientId = '26779370bf7d48fc9cb8127014196126';
const redirectURI = 'http://localhost:3000/'; //'http://peanut-butter-and-jamming.surge.sh';
const authURL = 'https://accounts.spotify.com/authorize';

let userAccessToken = '';
let expiresIn = '';
const Spotify = {
  getAccessToken: () => {
    // If we have user token
    if (userAccessToken !== '') return userAccessToken;

    // If we don't have it, check URL
    const url = window.location.href;
    const foundAccess = url.match(/access_token=([^&]*)/);
    const foundExpiration = url.match(/expires_in=([^&]*)/);

    if (foundAccess && foundExpiration) {
      userAccessToken = foundAccess[1];
      expiresIn = Number(foundExpiration[1]);
      window.setTimeout(() => {
        userAccessToken = '';
      }, expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return userAccessToken;
    } else {
      window.location = `${authURL}?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
    }
  },
  search: async (searchTerm) => {
    const urlToFetch = `https://api.spotify.com/v1/search?type=track&q=${searchTerm}`;
    try {
      const response = await fetch(urlToFetch, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + userAccessToken,
        },
      });
      if (response.ok) {
        const jsonResponse = await response.json();
        console.log(jsonResponse);
        let tracklist = [];
        jsonResponse.tracks.items.forEach((track) => {
          tracklist.push({
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri,
          });
        });
        return tracklist;
      }
    } catch (error) {
      console.log(error);
    }
  },
  savePlaylist: async (playlistName, trackUriList) => {
    let userID;
    let playlistID;
    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userAccessToken,
    };

    try {
      const urlToFetch = 'https://api.spotify.com/v1/me';
      const response = await fetch(urlToFetch, { headers: headers });
      if (response.ok) {
        const jsonResponse = await response.json();
        console.log(`User ID: ${jsonResponse.id}`);
        userID = jsonResponse.id;

        const postResponse = await fetch(
          `https://api.spotify.com/v1/users/${userID}/playlists`,
          {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
              name: playlistName,
            }),
          }
        );
        if (postResponse.ok) {
          const postJsonResponse = await postResponse.json();
          console.log(`Playlist ID: ${postJsonResponse.id}`);
          playlistID = postJsonResponse.id;

          const postPostResponse = await fetch(
            `https://api.spotify.com/v1/playlists/${playlistID}/tracks`,
            {
              method: 'POST',
              headers: headers,
              body: JSON.stringify({
                uris: trackUriList,
              }),
            }
          );
          if (postPostResponse.ok) {
            const postPostJsonResponse = await postPostResponse.json();
            console.log(`Snapshot ID: ${postPostJsonResponse}`);
          } else throw new Error('Playlist Track Update Request Failed!');
        } else throw new Error('Playlist Name Request Failed!');
      } else throw new Error('User ID Request Failed!');
    } catch (error) {
      console.log(error);
    }
  },
};

export { Spotify };
