export class Api {
  constructor({ baseUrl, headers }) {
    this._url = baseUrl;
    this._headers = headers;
  }

  _getToken() {
    return localStorage.getItem('jwt');
  }

  _injectBearerToken(headers) {
    if (!this._getToken()) {
      return headers;
    }
    return {
      ...headers, 'Authorization': `Bearer ${this._getToken()}`,
    }
  }

  _returnFetchResult(res) {
    if (res.ok) {
      return res.json();
    }
    return res.json()
      .then((err) => {
        err.statusCode = res.status;
        return Promise.reject(err);
      });
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._injectBearerToken(this._headers),
    })
      .then(this._returnFetchResult);
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._injectBearerToken(this._headers),
    })
      .then(this._returnFetchResult);
  }

  editUserInfo(userName, userInfo) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._injectBearerToken(this._headers),
      body: JSON.stringify({
        name: userName,
        about: userInfo
      })
    })
      .then(this._returnFetchResult);
  }

  addUserCard(data) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._injectBearerToken(this._headers),
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
      .then(this._returnFetchResult);
  }

  changeLikeCardStatus(id, isLiked) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: (isLiked ? "PUT" : "DELETE"),
      headers: this._injectBearerToken(this._headers),
    })
      .then(this._returnFetchResult);
  }

  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: 'DELETE',
      headers: this._injectBearerToken(this._headers),
    })
      .then(this._returnFetchResult);
  }

  editAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._injectBearerToken(this._headers),
      body: JSON.stringify({
        avatar: data,
      })
    })
      .then(this._returnFetchResult);
  }
}

const api = new Api({
  baseUrl: 'https://api.mesto.project.nomoredomains.icu',
  headers: {
    'Content-Type': 'application/json'
  }
});

// const api = new Api({
//   baseUrl: 'http://localhost:4000',
//   headers: {
//     'Content-Type': 'application/json'
//   }
// });

export default api;