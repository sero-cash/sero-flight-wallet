class Utils {

    convertUTCDate(utcDate){
        //2019-04-03T15:33:02Z
        if(utcDate){
            var utc = Date.UTC(utcDate.substring(0,4),(utcDate.substring(5,7)-1),utcDate.substring(8,10),utcDate.substring(11,13),utcDate.substring(14,16),utcDate.substring(17,19));
            return new Date(utc).toString().substr(0,33);
        }
        return "";
    }

}

export default Utils