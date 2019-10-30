import React, { Component } from 'react';
import BpmnViewer from 'bpmn-js';
import { Table } from 'antd';
import camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda';
import './index.css';
import detailList from './mock.json';
import { readXML } from '@/utils/utils'
class Bpmn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            x: 0,
            y: 0,
            selectedId: '',
            XML: "",
            XMLDetail: {},
            historyList: detailList
        };

        this.columns = [
            {
                title: 'startTime',
                dataIndex: 'startTime',
            },
            {
                title: 'activityName',
                dataIndex: 'activityName',
            },
            {
                title: 'activityId',
                dataIndex: 'activityId',
            },
        ];
    }

    setArrow() {
        const strTextNode = `<marker id="sequenceflow-end" viewBox="0 0 20 20" refX="11" refY="10" markerWidth="10" markerHeight="10" orient="auto"><path d="M 1 5 L 11 10 L 1 15 Z" style="fill: green; stroke-width: 1px; stroke-linecap: round; stroke-dasharray: 10000, 1; stroke: green;"></path></marker>`;
        let defs = document.getElementsByTagName('defs')[0];
        defs.innerHTML += strTextNode;
    }

    setElements(XMLDetail) {
        const overlays = this.viewer.get('overlays');
        let color = '';
        // const res = [...XMLDetail.flows, ...XMLDetail.historyActivities];
        const res = ['sid-8AB4A7F3-C5E5-4D64-A5CE-68E97E438550']
        this.elementRegistry.forEach((ele, gfx) => {
            // console.log('ele', ele, gfx);
            // let type = ele.type;
            // let circle = gfx.getElementsByTagName('g')[0].firstElementChild; // ! 控制背景
            // let text1 = gfx.getElementsByTagName('g')[0].getElementsByTagName('tspan')[0];
            // let texts = gfx.getElementsByTagName('g')[0].getElementsByTagName('tspan');

            // if (!res.includes(ele.id)) {
            //     return;
            // }
            // color = 'green';
            // // if (XMLDetail.currentActivities.includes(ele.id)) {
            // //     color = 'red';
            // // } else {
            // //     color = 'green';
            // // }

            // this.setArrow();

            // for (let i = 0; i < texts.length; i++) {
            //     texts[i].style.fill = color;
            // }
            // const dom = circle.cloneNode(true)
            // dom.style.stroke = "red";

            // circle.style.stroke = color;
            // circle.style.markerEnd = 'url("#sequenceflow-end")';
        });

        let contentArr = ['a', 'b', 'c'].map(li => ` <div
                class="box" 
                id="${li}"
                style="
                    margin-right: 20px;
                    width:20px;
                    height: 20px;
                    line-height: 20px;
                    text-align: center;
                    background: greenyellow;
                    color: red;
                    border-radius: 50%;">
                    ${li}
                </div>`)

        let dom = this.parseDom(`<div id="test" style="display:flex;z-index: 998;">
               ${contentArr.reduce((total, string) => total + string)}
            </div>`)
        // overlays.add(res[0], 'note', {
        //     position: {
        //         top: 10,
        //         right: -20
        //     },
        //     html: dom
        // });
        const { historyList } = this.state
        // document.getElementById("test").addEventListener("mouseover", (e) => {
        //     e.preventDefault()
        //     console.log(e, "hover")
        //     const { clientX, clientY } = e
        //     const arr = historyList.filter(li => li.activityId == e.target.id);
        //     if (arr.length >= 1) {
        //         this.setState({
        //             x: clientX,
        //             y: clientY,
        //             selectedId: e.target.id,
        //         });
        //     } else {
        //         this.setState({
        //             selectedId: '',
        //         });
        //     }
        // });
        // document.getElementById("test").addEventListener("mouseout", (e) => {
        //     e.preventDefault()
        //     this.setState({
        //         selectedId: '',
        //     });
        // })

    }

    // UNSAFE_componentWillReceiveProps(nextProps) {
    //     const { XML, XMLDetail, historyList } = nextProps
    //     this.setState({ XML, XMLDetail, historyList }, () => {
    //         this.initBpmn(XML, XMLDetail, historyList)
    //     })
    // }

    componentDidMount() {
        // const { XML, XMLDetail, historyList } = this.props
        const xml = readXML()
        // console.log(xml, XMLDetail, "这两个拿到了么")
        // const { callback } = this.props;
        this.viewer = new BpmnViewer({
            container: '#canvas',
            moddleExtensions: {
                camunda: camundaModdleDescriptor,

            },
            // keyboard: {
            //     bindTo: window
            // },
            height: 1000,
        });

        this.elementRegistry = this.viewer.get('elementRegistry'); // ! 获取所有元素集合
        // let xml = this.readXML();

        this.setState({ xml, XMLDetail: [] }, () => {
            this.initBpmn(xml, [], [])
        })
    }

    initBpmn = (XML, XMLDetail) => {
        const { historyList } = this.state
        // let this = this;
        // console.log(XML, "拿到的 xml 是啥啊")
        this.viewer.importXML(XML, (err) => {
            if (err) {
                console.error('failed to load diagram');
                console.error(err);
                return console.log('failed to load diagram', err);
            }
            // diagram is loaded, add interaction to it
            // Option 1:
            // directly hook into internal diagram events
            // this allows you to access the clicked element directly

            this.setElements(XMLDetail);

            let eventBus = this.viewer.get('eventBus');
            // you may hook into any of the following events
            let events = [
                'element.hover',
                // 'element.out',
                // 'element.click',
                // 'element.dblclick',
                // 'element.mousedown',
                // 'element.mouseup'
            ];
            events.forEach((event) => {
                eventBus.on(event, (e) => {
                    console.log(e.element.id)
                    const { clientX, clientY } = e.originalEvent;
                    const arr = historyList.filter(li => li.activityId == e.element.id);
                    if (arr.length >= 1) {
                        this.setState({
                            x: clientX,
                            y: clientY,
                            selectedId: e.element.id,
                        });
                    } else {
                        this.setState({
                            selectedId: '',
                        });
                    }
                });
            });

            const canvas = this.viewer.get('canvas');
            canvas.zoom('fit-viewport');

            // 删除 bpmn logo
            const bjsIoLogo = document.querySelector('.bjs-powered-by');
            while (bjsIoLogo.firstChild) {
                bjsIoLogo.removeChild(bjsIoLogo.firstChild);
            }


        });
    }

    parseDom = (arg) => {
        let objE = document.createElement("div");
        objE.innerHTML = arg;
        return objE.childNodes[0];
    }

    render() {
        const { x, y, selectedId, historyList } = this.state;
        const detailArr = historyList.filter(v => v.activityId == selectedId);
        // console.log(detailArr.length >= 1 && selectedId);
        return (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div id="canvas" style={{ height: '100%', position: 'relative', width: '100%' }}>
                    <div
                        style={{
                            position: 'fixed',
                            borderRadius: 10,
                            padding: 10,
                            display: detailArr.length >= 1 && selectedId ? 'block' : 'none',
                            opacity: 0.8,
                            left: x,
                            top: y - 270,
                            width: 500,
                            height: 250,
                            backgroundColor: "#fff",
                            boxShadow: "2px 2px 5px #333333",
                            zIndex: 999
                        }}>
                        {detailArr.map((li, index) => {
                            return (
                                <div key={index}>
                                    <div>
                                        <div> <span >{index + 1}.</span> &nbsp;&nbsp;{li.time}</div>
                                        <div>  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{li.fullMessage}</div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div>
                    {historyList.map((li, index) => {
                        return <div ket={index} style={{
                            margin: "10px 0",
                            padding: "5px 10px",
                            minWidth: 300,
                            background: li.activityId == selectedId ? "#E6F7FF" : "",
                            border: li.activityId == selectedId ? "solid #91D5FF 1px" : "",
                            borderRadius: 10
                        }}>
                            <div> <span >{index + 1}.</span> &nbsp;&nbsp;{li.time}</div>
                            <div>  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{li.fullMessage}</div>
                        </div>
                    })}
                </div>
                {/* <Table
                    columns={this.columns}
                    pagination={false}
                    dataSource={detailList} /> */}
            </div>
        );
    }
}
export default Bpmn;
