const authHeader = () => {
    const token = localStorage.getItem('access_token');
    const res = token ? { 'Authorization': `Bearer ${token}` } : {};
    return res;
};

const get = url => fetch(url, { headers: authHeader() }).then(res => res.json());

export default { get };
