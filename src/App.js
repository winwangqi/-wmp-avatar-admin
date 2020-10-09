import React, { useState, useEffect } from 'react';
import './App.css';

import axios from 'axios'

function App() {
  const [fetching, setFetching] = useState(true)
  const [userList, setUserList] = useState([])
  const [loginLayerVisible, setLoginLayerVisible] = useState(false)
  const [shareLayerVisible, setShareLayerVisible] = useState(false)
  const [layerUser, setLayerUser] = useState(null)

  useEffect(() => {
    axios({
      url: 'https://api.darkred.vip/wmp-avatar/users',
      // url: 'http://localhost:3000/users',
      method: 'get'
    }).then((res) => {
      setFetching(false)
      setUserList(res.data)
    })
  }, [])

  function handleOpenLoginLayer(user) {
    setLoginLayerVisible(true)
    setLayerUser(user)
  }

  function handleOpenShareLayer(user) {
    setShareLayerVisible(true)
    setLayerUser(user)
  }

  return (
    <div className="App">
      {fetching ? <div>loading...</div> : (
        <table>
          <thead>
          <tr>
            <th>序号</th>
            <th>姓名</th>
            <th>头像</th>
            <th>性别</th>
            <th>国家</th>
            <th>省份</th>
            <th>城市</th>
            <th>语言</th>
            <th>登录次数</th>
            <th>分享次数</th>
          </tr>
          </thead>
          <tbody>
          {userList.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.nickName}</td>
              <td><img width="100" height="100" src={item.avatarUrl} alt=""/></td>
              <td style={{ color: item.gender === 0 ? 'red' : 'black' }}>{item.gender === 0 ? '女' : '男'}</td>
              <td>{item.country}</td>
              <td>{item.province}</td>
              <td>{item.city}</td>
              <td>{item.language}</td>
              <td onClick={handleOpenLoginLayer.bind(this, item)}>{item.loginLogs.length}</td>
              <td onClick={handleOpenShareLayer.bind(this, item)}>{item.shareLogs.length}</td>
            </tr>
          ))}
          </tbody>
        </table>
      )}

      {loginLayerVisible && (
        <div className="layer">
          <div className="mask" onClick={() => setLoginLayerVisible(false)}></div>
          <div className="content">
            <table>
              <thead>
              <tr>
                <th>姓名</th>
                <th>头像</th>
                <th>性别</th>
                <th>国家</th>
                <th>省份</th>
                <th>城市</th>
                <th>语言</th>
                <th>登录次数</th>
                <th>分享次数</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>{layerUser.nickName}</td>
                <td><img width="100" height="100" src={layerUser.avatarUrl} alt=""/></td>
                <td style={{ color: layerUser.gender === 0 ? 'red' : 'black' }}>{layerUser.gender === 0 ? '女' : '男'}</td>
                <td>{layerUser.country}</td>
                <td>{layerUser.province}</td>
                <td>{layerUser.city}</td>
                <td>{layerUser.language}</td>
                <td>{layerUser.loginLogs.length}</td>
                <td>{layerUser.shareLogs.length}</td>
              </tr>
              </tbody>
            </table>

            <table style={{ marginTop: 40 }}>
              <thead>
              <tr>
                <th>序号</th>
                <th>登录时间</th>
              </tr>
              </thead>
              <tbody>
              {layerUser.loginLogs.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item}</td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>

      )}

      {shareLayerVisible && (
        <div className="layer">
          <div className="mask" onClick={() => setShareLayerVisible(false)}></div>
          <div className="content">
            <table>
              <thead>
              <tr>
                <th>姓名</th>
                <th>头像</th>
                <th>性别</th>
                <th>国家</th>
                <th>省份</th>
                <th>城市</th>
                <th>语言</th>
                <th>登录次数</th>
                <th>分享次数</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>{layerUser.nickName}</td>
                <td><img width="100" height="100" src={layerUser.avatarUrl} alt=""/></td>
                <td style={{ color: layerUser.gender === 0 ? 'red' : 'black' }}>{layerUser.gender === 0 ? '女' : '男'}</td>
                <td>{layerUser.country}</td>
                <td>{layerUser.province}</td>
                <td>{layerUser.city}</td>
                <td>{layerUser.language}</td>
                <td>{layerUser.loginLogs.length}</td>
                <td>{layerUser.shareLogs.length}</td>
              </tr>
              </tbody>
            </table>

            <table style={{ marginTop: 40 }}>
              <thead>
              <tr>
                <th>序号</th>
                <th>分享时间</th>
              </tr>
              </thead>
              <tbody>
              {layerUser.shareLogs.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item}</td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>

      )}
    </div>
  )
}

export default App;
