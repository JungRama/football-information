import axios from 'axios';

export const HTTP = axios.create({
  baseURL: `http://api.football-data.org/v2/`,
  headers: {
    'X-Auth-Token' : '710569450d5e4212a936b3c8c2beb2f8',
    'X-API-Version' : 'v2',
    'X-Authenticated-Client' : 'anonymous',
    'X-RequestCounter-Reset' : 23,
    'X-Requests-Available-Minute' : 28
  }
})