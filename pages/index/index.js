//index.js
//获取应用实例
const app = getApp()
// 引入SDK核心类
var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
var qqmapsdk;
Page({
  data: {
    city: null,
    hasCity: false,
    rankingTypes: {},
    hasRankingTypes: false,
    rankingLists: {},
    hasRankingLists: false,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function (event) {
    let { path, typeid, typename } = event.currentTarget.dataset,
      url = `../${path}/${path}`
    if (typeid === 0 || typeid && typename) {
      url = `${url}?typeid=${typeid}&typename=${typename} `
    }
    wx.navigateTo({
      url: url
    })
  },
  onLoad: function () {
    // 实例化API核心类
    qqmapsdk = new QQMapWX({
      key: 'GVRBZ-OZTWU-V7HV7-4KQJX-2CEIQ-UTFFW'
    });
    wx.getLocation({
      type: 'wgs84',
      success: res => {
        // wx.request({
        //   url: 'https://api.0577xiedu.com/v1/shoes_home/GetRankingList',
        //   method: 'POST',
        //   data: {
        //     latitude: res.latitude,
        //     longitude: res.longitude
        //   },
        //   success: response => {
        //     if (response.data.ret === 1001) {
        //       this.setData({
        //         rankingLists: response.data.data,
        //         hasRankingLists: true
        //       })
        //     }

        //   },
        //   fail(error) {
        //     console.log(error)
        //   }
        // })
        // 调用接口
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          coord_type: 1,
          get_poi: 1,
          // poi_options: address_format = short,
          success: response => {
            // console.log(response)
            this.setData({
              city: response.result.ad_info.city,
              hasCity: true
            })
          },
          fail: error => {
            console.log(error);
          },
          // complete: function (response) {
          //   console.log(response);
          // }
        });
      }
    })
    wx.request({
      url: 'https://api.0577xiedu.com/v1/shoes_home/GetRankingType',
      method: 'POST',
      success: response => {
        if (response.data.ret === 1001) {
          this.setData({
            rankingTypes: response.data,
            hasRankingTypes: true
          })
        }

      },
      fail(error) {
        console.log(error)
      }
    })
    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    // } else if (this.data.canIUse) {
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   }
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //     }
    //   })
    // }
  },
  // getUserInfo: function (e) {
  //   console.log(e)
  //   app.globalData.userInfo = e.detail.userInfo
  //   this.setData({
  //     userInfo: e.detail.userInfo,
  //     hasUserInfo: true
  //   })
  // }
})
