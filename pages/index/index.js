//index.js
//获取应用实例
const app = getApp()
// 引入SDK核心类
var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
var qqmapsdk;
Page({
  data: {
    RankingList: {},
    hasRankingList: false
  },
  onLoad: function () {
    // 实例化API核心类
    qqmapsdk = new QQMapWX({
      key: 'GVRBZ-OZTWU-V7HV7-4KQJX-2CEIQ-UTFFW'
    });
    wx.getUserInfo({
      success: res => {
        // 调用接口
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: function (res) {
            console.log(res);
          },
          fail: function (res) {
            console.log(res);
          },
          complete: function (res) {
            console.log(res);
          }
        });
      }
    })

  }
})
