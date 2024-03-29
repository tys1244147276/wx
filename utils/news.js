
let app = getApp();

export default ({ url, data, loadingTop,loadingCenter})=>new Promise((resolve,reject)=>{
  if (loadingTop){
    wx.showNavigationBarLoading()
  } else if (loadingCenter){
    wx.showLoading({
      title: '加载中',
    })
  }
  
  wx.request({
    url: app.globalData.baseUrl+url,
    data: data,
    type: 'post',
    dataType: 'json',
    success:function(res){
      if (loadingTop) {
        wx.hideNavigationBarLoading()
      } else if (loadingCenter) {
        wx.hideLoading({
          title: '加载中',
        })
      }
      resolve(res)
    },
    fail:function(err){
      if (loadingTop) {
        wx.hideNavigationBarLoading()
      } else if (loadingCenter) {
        wx.hideLoading({
          title: '加载中',
        })
      }
      reject(err)
    },
    complete:function(){
      if (loadingTop) {
        wx.hideNavigationBarLoading()
      } else if (loadingCenter) {
        wx.hideLoading({
          title: '加载中',
        })
      }
    }
  })


})