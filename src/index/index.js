/**
 * Created by zhaoyongsheng on 17/11/16.
 */

import React, {Component} from 'react';
import { render } from 'react-dom';

import { Menu, Icon, message, Button } from 'antd';
import './index.scss'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 'default',
            percentComplete: 0,
            pictureArr: [],
            uploadFiles: []
        }
    }

    handleClick = (e) => {
        this.setState({
            current: e.key,
        });
        if (process.env.NODE_ENV === 'production') {
            console.error('I am an error')
        }
    }

    submitFile = () => {
        if (this.state.uploadFiles.length < 1) {
            message.warning('file is empty!')
            return false
        }
        const xhr = new XMLHttpRequest()
        const formData = new FormData()
        for (let i = 0; i < this.state.uploadFiles.length; i++) {
            formData.append(`file${i}`, this.file.files[i])
        }
        xhr.open('post', "http://localhost:8888/imgs/uploads")
        xhr.onload = () => {
            if (xhr.status === 200) {
                message.success('Have Done!')
            }
        }
        xhr.upload.onprogress = (event) => {
            if (event.lengthComputable) {
                var percentComplete = (event.loaded / event.total).toFixed(2) * 100
                this.setState({percentComplete})
            }
        }
        xhr.send(formData)
    }

    previewPicture = () => {
        this.setState({uploadFiles: [...this.state.uploadFiles, Array.from(this.file.files)]})
        this.producePreviewImg(this.file.files)
    }

    producePreviewImg = (arr) => {
        for (let i = 0; i < arr.length; i++) {
            const reader = new FileReader()
            reader.onload = (e) => {
                this.setState({pictureArr: [...this.state.pictureArr, e.target.result]})
            }
            reader.readAsDataURL(arr[i])
        }
    }

    deletePicture = (index) => {
        const self = this
        return () => {
            const fileList = this.state.pictureArr
            fileList.splice(index, 1)
            this.setState({pictureArr: fileList})
            //this.producePreviewImg(fileList)
            //self.file.files.splice(index, 1)
        }
    }

    selfFileBtnClick = () => {
        this.file.click()
    }

    render() {
        const imgs = this.state.pictureArr.map((item, i) => {
            return <div className="img-item" style={{backgroundImage: `url(${item})`}} key={item} onClick={this.deletePicture(i)}></div>
        })
        return (<div>
            <Menu
                onClick={this.handleClick}
                selectedKeys={[this.state.current]}
                mode="horizontal">
                <Menu.Item key="game">
                    <a href="../game/index.html"><Icon type="android" />数字游戏</a>
                </Menu.Item>
                <Menu.Item key="app">
                    <a href="#"><Icon type="appstore" />敬请期待</a>
                </Menu.Item>
            </Menu>
            <input ref = {(item) => {this.file = item}} type="file" id="my-file" name="file" multiple onChange={this.previewPicture} />
            <div className="img-item-container">
                {imgs}
                <div className="self-file-btn" onClick={this.selfFileBtnClick}>+</div>
            </div>
            <div><Button onClick={this.submitFile}>确认上传</Button></div>
            <div>上传进度:{this.state.percentComplete}%</div>
        </div>)
    }
}

render(<App />, document.getElementById('app'));
