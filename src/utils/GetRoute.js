/* eslint-disable */

// To get the route from the total URL that we need
export const getroute = (url,existingroute)=>{
    var posofapi = url.search(existingroute);
    var route = url.substr(posofapi+existingroute.length,url.length-posofapi)
    return route;
}