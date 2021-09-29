let message;
let member;
let media;
let exchange;

console.log(process.env.NODE_ENV)

if (process.env.NODE_ENV === 'development'){
    message = 'https://daq.web.sero.cash/message';
    member = 'https://daq.web.sero.cash';
    media = 'https://daq.web.sero.cash/media';
    exchange = 'https://daq.web.sero.cash/exchange';
    // //
    // message = '//192.168.50.87:8002/message';
    // member = '//192.168.50.87:8001';
    // media = '//192.168.50.87:8080';
    // exchange = '//192.168.50.87:8003/exchange';

    // message = '//129.211.98.114:8002/message';
    // member = '//129.211.98.114:8001';
    // media = '//129.211.98.114:8080';
    // exchange = '//129.211.98.114:8003/exchange';
    // //
    // message = 'https://daq.web.sero.cash/message';
    // member = 'https://daq.web.sero.cash';
    // media = 'https://daq.web.sero.cash/media';
    // exchange = 'https://daq.web.sero.cash/exchange';
} else {
    // message = '//192.168.1.220:8002/message';
    // member = '//192.168.1.220:8001';
    // media = '//192.168.1.220:8080';
    // exchange = '//192.168.1.220:8003/exchange';

    // message = '//129.211.98.114:8002/message';
    // member = '//129.211.98.114:8001';
    // media = '//129.211.98.114:8080';
    // exchange = '//129.211.98.114:8003/exchange';

    // //
    message = 'https://daq.web.sero.cash/message';
    member = 'https://daq.web.sero.cash';
    media = 'https://daq.web.sero.cash/media';
    exchange = 'https://daq.web.sero.cash/exchange';
}

export default {
  message: message, member: member, media: media, account: exchange
}
