// OK
//http://api.weatherstack.com/current?access_key=41850987af7b6f6cb6c8cf07660f164d&query=Kiev

// export default function fetchWeather(query) {
//   const baseUrl = 'http://api.weatherstack.com';
//   const sectionUrl = '/current';
//   const access_key = '?access_key=41850987af7b6f6cb6c8cf07660f164d';
//   const querySeearch = `&query=${query}`;

//   return new Promise((resolve, reject) => {
//       fetch(baseUrl + sectionUrl + access_key + querySeearch).
//       then(response => {
//           if(response.ok){
//               return response.json();
//           }
//           throw new Error(response.statusText)

//       }).
//       then(resolve).
//       catch(error => console.log(error));
//   })
// }
