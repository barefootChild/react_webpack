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
            current: 'mail',
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
                <Menu.Item key="mail">
                    <Icon type="mail" />Navigation One
                </Menu.Item>
                <Menu.Item key="app">
                    <Icon type="appstore" />Navigation Two
                </Menu.Item>
            </Menu>
        </div>)
    }
}

render(<App />, document.getElementById('app'));
