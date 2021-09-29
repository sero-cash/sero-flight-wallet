import {urls} from "./url";

class Common {

    isIosorAndroid(){
        let u = navigator.userAgent;
        let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //判断是否是 android终端
        let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //判断是否是 ios终端
        if (isAndroid) {
            return 'android'
        }else if(isiOS){
            return 'ios'
        }else{
            return ''
        }
    }

    toPage(url){
        urls.go(["#",url].join(""));
    }

    toPageWithTime(url,time){
        setTimeout(
            ()=>{
                urls.go(["#",url].join(""));
            },
            time
        )
    }
    //加密私钥
    secretKey() {
        let secretKey = 'LJkj7hsYGw';
        return secretKey;
    }

    // 获取URL参数
    getUrlParam(name) {
        let queryString = window.location.search.split('?')[1] || '',
            reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"),
            result = queryString.match(reg);
        return result ? decodeURIComponent(result[2]) : null;
    }

    // 本地存储
    setStorage(name, data) {
        var that = this;
        let dataType = typeof data;
        // json对象
        if (dataType === 'object') {
            window.localStorage.setItem(name, JSON.stringify(data));
            that.setCookie(name, JSON.stringify(data));
        }
        // 基础类型
        else if (['number', 'string', 'boolean'].indexOf(dataType) >= 0) {
            window.localStorage.setItem(name, data);
            that.setCookie(name, data);
        }
        // 其他不支持的类型
        else {
            console.info('该类型不能用于本地存储');
        }
    }

    // 取出本地存储内容
    getStorage(name) {
        var that = this;
        let data = window.localStorage.getItem(name);
        if (data) {
            return data;
        } else {
            data = that.getCookie(name);
            if (data){
                return data;
            }
            return '';
        }
    }

    // 删除本地存储
    removeStorage(name) {
        var that = this;
        window.localStorage.removeItem(name);
        that.delCookie(name);
    }

    validate(name, value) {

        if (name == 'email') {
            var reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
            return reg.test(value);
        } else if (name == 'password') {
            var reg = /([a-zA-Z0-9!@#$%^&*()_.?<>{}]){8,18}/;
            return reg.test(value);
        } else if (name === 'address') {
            var reg = /^[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]+$/;
            return reg.test(value);
        }


    }

    //写cookies
    setCookie(name, value) {
        var Days = 30;
        var exp = new Date();
        exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
        document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
    }

    //读取cookies
    getCookie(name) {
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

        if (arr = document.cookie.match(reg))

            return unescape(arr[2]);
        else
            return null;
    }

    //删除cookies
    delCookie(name) {
        var that = this;
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval = that.getCookie(name);
        if (cval != null)
            document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
    }

    getLanguage(){
        var that = this;
        var defaultLan = 'zh_CN';
        if (that.getStorage('language')) {
            return that.getStorage('language');
        } else {
            that.setStorage('language',defaultLan)
            return defaultLan;
        }
    }
}

export default Common;
