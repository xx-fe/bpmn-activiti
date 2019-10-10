import React, { Component, Fragment } from 'react';

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
        const { xMin, xMax, yMin, yMax } = a
        if (x >= xMin && x <= xMax && y >= yMin && y <= yMax) {
            this.setState({
                x, y, display: true
            })
        } else {
            this.setState({
                display: false
            })
        }
    }

    render() {
        const { x, y, display } = this.state
        return <div style={{ position: "relative" }}>
            <canvas onMouseMove={this.draw} id="test" width="1000" height="300">

            </canvas>
            <div style={{
                position: "absolute",
                opacity: display ? 1 : 0,
                left: x,
                top: y - 220,
                width: 100,
                height: 200,
                border: "red 2px solid",
                backgroundColor: "blue",
                zIndex: 999
            }}>233</div>
        </div>
    }
}


const a = {
    xMin: 100,
    xMax: 300,
    yMin: 100,
    yMax: 300
}