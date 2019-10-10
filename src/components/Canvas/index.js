import React, { Component, Fragment } from 'react';
import {
    Popover,
    Row,
    Col,
    Card
} from 'antd';

import eleProList from './proList'
import listData from './Listdata'
export default class Canvas extends Component {
    state = {
        x: 0, y: 0
    }

    componentDidMount() {
        const { src } = this.props
        this.canvas = document.getElementById('test')
        this.ctx = this.canvas.getContext('2d')
        let img = new Image();
        img.onload = () => {
            this.ctx.drawImage(img, 0, 0);
        }
        img.src = src
    }


    mousePos = (e) => {//获取鼠标所在位置的坐标，相对于整个页面  
        let x, y;
        e = e || window.event;
        return {
            x: e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft,
            y: e.clientY + document.body.scrollTop + document.documentElement.scrollTop
        };
    }

    getStyles = (obj) => {//兼容FF，IE10; IE9及以下未测试
        return document.defaultView.getComputedStyle(obj);
    }

    getCanvasPos = (canvas, e) => {//获取鼠标在canvas上的坐标  
        let rect = canvas.getBoundingClientRect();
        let leftB = parseInt(this.getStyles(canvas).borderLeftWidth);//获取的是样式，需要转换为数值
        let topB = parseInt(this.getStyles(canvas).borderTopWidth);

        return {
            x: (e.clientX - rect.left) - leftB,
            y: (e.clientY - rect.top) - topB
        };
    }

    draw = (e) => {
        let c = this.canvas
        let cxt = this.ctx

        console.log(this.getCanvasPos(c, e))
        const { x, y } = this.getCanvasPos(c, e)
        let obj = this.checkSelcet(x, y)
        if (obj.flag) {
            this.setState({
                x, y, display: true, id: obj.id
            })
        } else {
            this.setState({
                display: false,
                id: ""
            })
        }
    }

    checkSelcet = (x, y) => {
        let flag = false, selectId;
        eleProList.some(li => {
            const { xMin, xMax, yMin, yMax, id } = li
            if (x >= xMin && x <= xMax && y >= yMin && y <= yMax) {
                flag = true;
                selectId = id;
                return true
            }
        });

        return { flag, id: selectId }
    }

    render() {
        const { x, y, display, id } = this.state
        // const x = 100, y = 100, display = true;
        const detailArr = listData.filter(v => v.id == id)
        console.log(id, "列表数据是啥")
        // return 
        return <Row gutter={24}>
            <Col span={12} >
                <Card style={{ margin: "10px 0" }}>
                    <div>任务流图片</div>
                    <div style={{ position: "relative" }}>
                        <canvas onMouseMove={this.draw} id="test" width="1200" height="1000">

                        </canvas>
                        <div
                            style={{
                                position: "absolute",
                                borderRadius: 10,
                                padding: 10,
                                display: display ? "block" : "none",
                                opacity: 0.8,
                                left: x,
                                top: y - 270,
                                width: 500,
                                height: 250,
                                backgroundColor: "#fff",
                                boxShadow: "2px 2px 5px #333333",
                                zIndex: 999
                            }}>
                            {detailArr.map((v, index) => {
                                return (
                                    <div key={index} >
                                        <div>
                                            {v.time}&nbsp;&nbsp;&nbsp;&nbsp;{v.fullMessage}&nbsp;&nbsp;&nbsp;&nbsp;
                                        </div>
                                        {v.src && <div>
                                            <img style={{ width: "80%" }} src={v.src} />
                                        </div>}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                </Card>
            </Col>
            <Col span={12}>
                <Card style={{ margin: "10px 0" }}>
                    <h2>历史记录</h2>
                    {listData.map((li, index) => {
                        return <div style={{
                            margin: "10px 0",
                            padding: "5px 10px",
                            background: li.id == id ? "#E6F7FF" : "",
                            border: li.id == id ? "solid #91D5FF 1px" : "",
                            borderRadius: 10
                        }}>
                            <span >{index + 1}.</span> &nbsp;&nbsp;{li.time}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{li.fullMessage}
                        </div>
                    })}
                </Card>
            </Col>
        </Row>
    }
}


