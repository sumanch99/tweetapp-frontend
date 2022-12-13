export let baseUrl = {
  apiUrl: "http://3.7.29.64:9000/api/v1.0/tweets",
}

export const environment = {
  production: true,
  apiUrl: baseUrl.apiUrl,
  register: `${baseUrl.apiUrl}/register`,
  login: `${baseUrl.apiUrl}/login`,
  getAllTweet: `${baseUrl.apiUrl}/all`,
  postATweet: `${baseUrl.apiUrl}/`,
  getAllTweetOfUser: `${baseUrl.apiUrl}/`,
  deleteTweet: `${baseUrl.apiUrl}/`,
  forgotPassword: `${baseUrl.apiUrl}/`,
  regex: `${baseUrl.apiUrl}/user/search/`,
  getAllUsers : `${baseUrl.apiUrl}/users/all`
};

