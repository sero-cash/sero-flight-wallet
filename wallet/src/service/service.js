import axios from 'axios';
import CryptoJS from 'crypto-js';
import {Toast} from 'antd-mobile';
import Common from './../common/common.js';
import Language from './../language/language.js';

let _cc = new Common();
let Lang = new Language();

class Axios {
    post(url, token, bizData, callback) {
        let timestamp = new Date().getTime();
        let sign = CryptoJS.HmacSHA256(token + '5MpKFYevAV' + timestamp, _cc.secretKey()).toString();
        axios.post(url, {
            base: {
                token: token,
                timestamp: timestamp,
                sign: sign,
                app_id: '5MpKFYevAV'

            },
            biz: bizData
        }).then(function (response) {
            let data = response.data
            if (callback) {
                callback(data);
            }
        }).catch(function (error) {
            // Toast.success(`Request error = ${error}`, 2);
        })
    }

    postPages(url, token, bizData,pageData, callback) {
        let timestamp = new Date().getTime();
        let sign = CryptoJS.HmacSHA256(token + '5MpKFYevAV' + timestamp, _cc.secretKey()).toString();
        axios.post(url, {
            base: {
                token: token,
                timestamp: timestamp,
                sign: sign,
                app_id: '5MpKFYevAV'

            },
            biz: bizData,
            page:pageData,
        }).then(function (response) {
            let data = response.data
            if (callback) {
                callback(data);
            }
        }).catch(function (error) {
            // Toast.success(`Request error = ${error}`, 2);
        })
    }

}

export default Axios;
