// api.ts

import axios from 'axios';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
}

const fetchJobListings = async (query: string): Promise<Job[]> => {
  const url = `https://api.adzuna.com/v1/api/jobs/ca/search/1?app_id=YOUR_APP_ID&app_key=YOUR_API_KEY&what=${query}&content-type=application/json`;
  const response = await axios.get(url);
  return response.data.results;
};

export { fetchJobListings };
