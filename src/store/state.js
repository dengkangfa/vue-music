import {playMode} from 'common/js/config'
import {loadSearch, loadPlay} from 'common/js/cache'

const state = {
  singer: {},               // 歌手信息
  playing: false,           // 播放状态
  fullScreen: false,        // 播放器是否全屏
  playlist: [],             // 播放列表
  sequenceList: [],
  mode: playMode.sequence,  // 播放模式
  currentIndex: -1,
  disc: {},
  topList: {},
  searchHistory: loadSearch(),
  playHistory: loadPlay()
}

export default state