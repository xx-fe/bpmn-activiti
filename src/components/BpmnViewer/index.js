import React, { Component, Fragment } from 'react';
import BpmnViewer from 'bpmn-js';
import { Table } from 'antd';
import camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda';
import './index.css';
import detailList from './mock.json';
import { async } from 'q';

class Bpmn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            x: 0,
            y: 0,
            selectedId: '',
            XML: "",
            XMLDetail: {},
            historyList: []
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
        let color = '';
        const res = [...XMLDetail.flows, ...XMLDetail.historyActivities];
        // console.log(this.elementRegistry); //所有元素

        this.elementRegistry.forEach((ele, gfx) => {
            // console.log('ele', ele, gfx);
            let type = ele.type;
            let circle = gfx.getElementsByTagName('g')[0].firstElementChild; // ! 控制背景
            let text1 = gfx.getElementsByTagName('g')[0].getElementsByTagName('tspan')[0];
            let texts = gfx.getElementsByTagName('g')[0].getElementsByTagName('tspan');

            if (!res.includes(ele.id)) {
                return;
            }
            if (XMLDetail.currentActivities.includes(ele.id)) {
                color = 'red';
            } else {
                color = 'green';
            }

            this.setArrow();

            for (let i = 0; i < texts.length; i++) {
                texts[i].style.fill = color;
            }
            circle.style.stroke = color;
            circle.style.markerEnd = 'url("#sequenceflow-end")';
        });
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const { XML, XMLDetail, historyList } = nextProps
        this.setState({ XML, XMLDetail, historyList }, () => {
            this.initBpmn(XML, XMLDetail, historyList)
        })
    }

    componentDidMount() {
        const { XML, XMLDetail, historyList } = this.props

        // console.log(XML, XMLDetail, "这两个拿到了么")
        // const { callback } = this.props;
        this.viewer = new BpmnViewer({
            container: '#canvas',
            moddleExtensions: {
                camunda: camundaModdleDescriptor,
            },
            height: 800,
        });

        this.elementRegistry = this.viewer.get('elementRegistry'); // ! 获取所有元素集合
        // let xml = this.readXML();

        this.setState({ XML, XMLDetail, historyList }, () => {
            this.initBpmn(XML, XMLDetail, historyList)
        })
    }

    initBpmn = (XML, XMLDetail, historyList) => {
        // const { XML, XMLDetail, historyList } = this.state
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
                    // console.info("划入")
                    const { clientX, clientY } = e.originalEvent;
                    const arr = historyList.filter(li => li.activityId == e.element.id);
                    // console.log(e.element.id, arr);
                    if (arr.length >= 1) {
                        console.log(e.element.id)
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
            // 删除 bpmn logo
            const bjsIoLogo = document.querySelector('.bjs-powered-by');
            while (bjsIoLogo.firstChild) {
                bjsIoLogo.removeChild(bjsIoLogo.firstChild);
            }
        });
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
