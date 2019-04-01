// pages/sb/sb.js
var url = "https://www.suibibk.com";
Page({
  data: {
    motto: 'Hello World',
    new: 1
  },
  //事件处理函数
  getNewTopics: function () {
    this.setData({
      new: 1,
      month: 0,
      year: 0,
      user: 0,
      menu: 0
    });
     wx.request({
       url: url+"/getTopics",
        data: {
          menuid: '0',
          userid: '0',
          page: '1',
          hot : '',
          type: '0'
        },
        method:"POST",
        header: {
          //"Content-Type":"application/json"
          "Content-Type": " application/x-www-form-urlencoded"
          
        },
        success: function (res) {
          console.log(res.data)
        },
        fail: function (err) {
          console.log(err)
        }
      })
  },
  //事件处理函数
  getMonthTopics: function () {
    this.setData({
      new: 0,
      month: 1,
      year: 0,
      user: 0,
      menu: 0
    });
  },
  //事件处理函数
  getYearTopics: function () {
    this.setData({
      new: 0,
      month: 0,
      year: 1,
      user: 0,
      menu: 0
    });
  },
  //事件处理函数
  getHotUsers: function () {
    this.setData({
      new: 0,
      month: 0,
      year: 0,
      user: 1,
      menu: 0
    });
  },
  //事件处理函数
  getHotMenus: function () {
    this.setData({
      new: 0,
      month: 0,
      year: 0,
      user: 0,
      menu: 1
    });
  }
})