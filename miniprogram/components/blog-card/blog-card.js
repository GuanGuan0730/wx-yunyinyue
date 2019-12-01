import formatTime from './../../utils/format-time.js'

let dataset = {}  // 自定义属性值 

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    blog: Object
  },

  data:{
    playing: false,  // 视频是否自动播放
    isLove: false,  // 是否喜欢，默认false不喜欢
    loveNum: 99
  },

  options: {
    styleIsolation: 'apply-shared'
  },

  lifetimes:{
    ready(){
      let videoReady = wx.createVideoContext('blogVideo')
      videoReady.pause()
      videoReady.stop()
    }
  },
  /**
   * 数据监听器 observers
   */
  observers: {
    ['blog.publishTime'](val) {
      if (val) {
        this.setData({
          _publishTime: formatTime(val, 'yy-MM-dd ww | zz hh:mm')
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    _publishTime: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 预览图片
    onPreviewImg(event){
      dataset = event.target.dataset
      wx.previewImage({
        urls: dataset.images,
        current: dataset.imgsrc
      })
    },

    // 播放视频
    onPlaying(){
      // 获取video实例
      let videoContext = wx.createVideoContext('blogVideo',this) 

      if (!this.data.playing){
        videoContext.play() //开始播放
        videoContext.requestFullScreen() // 进入全屏
        videoContext.seek(0)
        this.setData({
          playing: true
        })
      }else{
        videoContext.pause() //暂停播放
        videoContext.exitFullScreen() // 进入全屏
        videoContext.stop()
        this.setData({
          playing: false
        })
      }
    },
    support(){
      if(!this.data.isLove){
        wx.showToast({
          title: '爱心模式即将上线',
          duration: 2000,
          image: '../../images/show-tip.png'
        },() => {
          wx.hideToast()
        })
      }    
      this.setData({
        isLove: !this.data.isLove
      })
    }
  }
})