import axios from 'axios';

export default axios.create({
    baseURL: 'https://i02a303.p.ssafy.io:8090/WineProject',
    // header: {
    // 	Authorization: 'bearer accessKey'
    // }
});