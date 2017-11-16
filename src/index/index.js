/**
 * Created by zhaoyongsheng on 17/11/16.
 */

import React, {Component} from 'react';
import { render } from 'react-dom';

import { Menu, Icon } from 'antd';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 'default',
        }
    }

    handleClick = (e) => {
        this.setState({
            current: e.key,
        });
    };

    render() {
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
        </div>)
    }
}

render(<App />, document.getElementById('app'));
