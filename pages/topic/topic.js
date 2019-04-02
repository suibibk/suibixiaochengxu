// pages/topic/topic.js
const app = getApp();
var url = "https://www.suibibk.com";
Page({
  data: {
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //先从参数获取id
    var id = options.id;
    if (id==undefined){
      //从缓存获取(同步)
      var oldid = wx.getStorageSync("id");
      if (oldid==""){
        //跳走到首页
        wx.navigateTo({
          url: '../sb/sb'
        })
      }else{
        id = oldid;
      }
    }else{
      //放入缓存
      wx.setStorageSync("id", id)
    }
    //获取topicid、menuid、userid
    var strs = id.split("|");
    var topicid= strs[0];
    var menuid = strs[1];
    var userid = strs[2];
    console.log("topicid:" + topicid);
    console.log("menuid:" + menuid);
    console.log("userid:" + userid);
    this.getTopic(userid,menuid,topicid);
    this.getUser(userid);
    this.getMenu(userid,menuid);
  },
  suibibk:function(){
    //跳走到首页
    wx.navigateTo({
      url: '../sb/sb'
    })
  },
  getTopic: function (userid, menuid, topicid){
    wx.request({
      url: url + "/getTopic",
      data: {
        "userid": userid, "menuid": menuid, "topicid": topicid
      },
      method: "POST",
      header: {
        //"Content-Type":"application/json"
        "Content-Type": " application/x-www-form-urlencoded"
      },
      //success: function(res) {
      success: res => {
        console.log(res.data)
        var topic = res.data.obj.topic;
        var content = res.data.obj.tContent;
        var title = topic.title;
        //wx.setNavigationBarTitle({ title: title})
        //将markdown内容转换为towxml数据
        var contentNow = content.content.replace(/\/fileupload\/images/g, url + "/fileupload/images/");
             //这个表情太大了
       // contentNow = contentNow.replace(/\/xheditor\/xheditor_emot/g, url + "/xheditor/xheditor_emot/");
   
        contentNow = contentNow.replace(/\/editormd\/plugins/g, url + "/editormd/plugins/");
        //解析不了#
        contentNow = contentNow.replace(/\#/g,"");
        let contentData = app.towxml.toJson(contentNow, 'markdown');

        //设置文档显示主题，默认'light'
        //contentData.theme = 'dark';
        this.setData({
          title:title,
          time:topic.create_datetime,
          pageview:"阅读:"+topic.pageview,
          reply:"回复:"+topic.replynum,
          hot:"点赞："+topic.hot,
          article: contentData
        });
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },
  getUser: function (userid) {
    wx.request({
      url: url + "/getUser",
      data: {
        "userid": userid
      },
      method: "POST",
      header: {
        //"Content-Type":"application/json"
        "Content-Type": " application/x-www-form-urlencoded"
      },
      //success: function(res) {
      success: res => {
        console.log(res.data)
        var user = res.data.obj;
        this.setData({
            username:user.nickname,
            userimgurl:user.imgurl,
            shu:"|"
        });
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },
  getMenu: function (userid, menuid) {
    wx.request({
      url: url + "/getMenu",
      data: {
        "userid": userid, "menuid": menuid
      },
      method: "POST",
      header: {
        //"Content-Type":"application/json"
        "Content-Type": " application/x-www-form-urlencoded"
      },
      //success: function(res) {
      success: res => {
        console.log(res.data)
        var menu = res.data.obj;
        this.setData({
            menuname:menu.name
        });
      },
      fail: function (err) {
        console.log(err)
      }
    })
  }
})