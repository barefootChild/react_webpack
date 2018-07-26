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
        const { uploadFiles } = this.state
        if (uploadFiles.length < 1) {
            message.warning('file is empty!')
            return false
        }
        const xhr = new XMLHttpRequest()
        const formData = new FormData()
        for (let i = 0; i < uploadFiles.length; i++) {
            formData.append(`file${i}`, uploadFiles[i])
        }
        xhr.open('post', "http://localhost:8888/imgs/uploads")
        xhr.onload = () => {
            if (xhr.status === 200) {
                message.success('Have Done!')
            }
        }
        xhr.send(formData)
    }

    previewPicture = () => {
        const newFiles = [...Array.from(this.file.files)]
        this.producePreviewImg(newFiles)
    }

    producePreviewImg = (arr) => {
        for (let i = 0; i < arr.length; i++) {
            const reader = new FileReader()
            const currentFile = arr[i]
            reader.onload = (e) => {
                currentFile.result = e.target.result
                this.setState({uploadFiles: [...this.state.uploadFiles, currentFile]})
            }
            reader.readAsDataURL(arr[i])
        }
    }

    deletePicture = (index) => {
        const self = this
        return () => {
            const fileList = this.state.uploadFiles
            fileList.splice(index, 1)
            this.setState({uploadFiles: fileList})
            this.file.value = null
        }
    }

    selfFileBtnClick = () => {
        this.file.click()
    }

    render() {
        const imgs = this.state.uploadFiles.map((item, i) => {
            return (<div className="img-item" style={{backgroundImage: `url(${item.result})`}} key={item.name} onClick={this.deletePicture(i)}>
                <div className="img-item-mask"><Icon type="delete" /></div>
            </div>)
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
        </div>)
    }
}

render(<App />, document.getElementById('app'));
