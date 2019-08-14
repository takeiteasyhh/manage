let BASE_URL = "http://192.168.2.162:8089/";//虚拟机
let IMAGE_URL = "http://192.168.2.114:8000"//虚拟机图片
// let BASE_URL = "http://192.168.2.114:8000/api/web/";//虚拟机
// let BASE_URL = "http://192.168.2.215:8000/api/web/";//本地
// let IMAGE_URL = "http://192.168.2.215:8000"//本地图片
window.SET_UEDITOR_HOME_URL = process.env.NODE_ENV  ===  "production"?"http://47.244.146.9:8000":IMAGE_URL
if(process.env.NODE_ENV  ===  "production"){
    BASE_URL = "http://47.244.146.9:8000/api/web/"
    IMAGE_URL = "http://47.244.146.9:8000"
};
export default{
    BASE_URL,
    IMAGE_URL
}