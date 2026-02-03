import axios from 'axios';

// const BASE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://biisal.codeltix.com") + "/api";
const BASE_URL = '/api';

const api = axios.create({
	baseURL: BASE_URL,
});

export default api;
