// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
export let baseUrl = {
  apiUrl: "http://3.7.29.64:9000/api/v1.0/tweets",
}
export let environment = {
  production: false,
  apiUrl: baseUrl.apiUrl,
  register: `${baseUrl.apiUrl}/register`,
  login: `${baseUrl.apiUrl}/login`,
  getAllTweet: `${baseUrl.apiUrl}/all`,
  postATweet: `${baseUrl.apiUrl}/`,
  getAllTweetOfUser: `${baseUrl.apiUrl}/`,
  deleteTweet: `${baseUrl.apiUrl}/`,
  forgotPassword: `${baseUrl.apiUrl}/`,
  regex: `${baseUrl.apiUrl}/user/search/`,
  getAllUsers : `${baseUrl.apiUrl}/users/all`,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
