import axios from 'axios';

const peaksApi = axios.create({
    baseURL: 'http://188.68.231.174:3000',
    timeout: 10000
});

export default peaksApi;


// /admin/peaks lista wszystkich peaków, powinno być 1508
// /peak/get/:id by id, najprostrze najszybsze wyszukiwanie
// /peak/get_by_name/:name po name i tylko na name
// /peak/get_by_string/:name po name, asciiname, alternamenames więc pewnie najwolniejsze :wink:
// '/peak/get_by_location/:latitude/:longitude/:dist' szczyty po coordach w obrębie dystansu czyli np. latitude - dist < X < latitude + dist