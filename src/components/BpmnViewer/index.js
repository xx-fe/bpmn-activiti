import React, { Component } from 'react';
import BpmnViewer from 'bpmn-js';
import { Table, Button, Slider } from 'antd';
import camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda';
import modeling from 'bpmn-js/lib/features/modeling'
import './index.scss';
import detailList from './blackListMock.json';
import { readXML } from '@/utils/utils'
class Bpmn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            x: 0,
            y: 0,
            selectedId: '',
            selectedArr: [],
            selectedIndex: 0,
            XML: "",
            XMLDetail: {},
            historyList: detailList,
            speed: 300,
            btn: false
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

    setArrow = () => {
        const strTextNode = `<marker id="sequenceflow-end-white-black-d3snqpn30vjfa9mixcmzzeg8t" viewBox="0 0 20 20" refX="30" refY="10" markerWidth="20" markerHeight="10" orient="auto"><path d="M 1 5 L 11 10 L 1 15 Z" style="fill: black; stroke-width: 1px; stroke-linecap: round; stroke-dasharray: 10000, 1; stroke: black;"></path><circle class="demo2" id="J_progress_bar" cx="20" cy="10" r="9" fill="white" stroke="black" stroke-width="1" <="" marker=""></circle></marker>`;
        let defs = document.getElementsByTagName('defs')[0];
        defs.innerHTML += strTextNode;
    }

    setElements(XMLDetail) {

        this.setArrow()
        // let contentArr = ['a', 'b', 'c'].map(li => `<div
        //         class="box" 
        //         id="${li}"
        //         style="
        //             margin-right: 20px;
        //             width:20px;
        //             height: 20px;
        //             line-height: 20px;
        //             text-align: center;
        //             background: greenyellow;
        //             color: red;
        //             border-radius: 50%;">
        //             ${li}
        //         </div>`)

        // let dom = this.parseDom(`<div id="test" style="display:flex;z-index: 998;">
        //        ${contentArr.reduce((total, string) => total + string)}
        //     </div>`)
        // overlays.add(res[0], 'note', {
        //     position: {
        //         top: 10,
        //         right: -20
        //     },
        //     html: dom
        // });
        // const { historyList } = this.state
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

    componentDidMount() {
        // const { XML, XMLDetail, historyList } = this.props
        const xml = readXML()
        // console.log(xml, XMLDetail, "这两个拿到了么")
        // const { callback } = this.props;
        this.viewer = new BpmnViewer({
            container: '#canvas',
            additionalModules: [modeling],
            // moddleExtensions: {
            //     camunda: camundaModdleDescriptor,
            // },
            // keyboard: {
            //     bindTo: window
            // },
            height: 600,
        });
        //ele 集合
        this.elementRegistry = this.viewer.get('elementRegistry'); // ! 获取所有元素集合

        //更改ele大小 颜色
        this.modeling = this.viewer.get('modeling');
        // console.log(this.modeling, "咋肥四")

        //操作 layout 辅助文本的添加变更
        this.overlays = this.viewer.get('overlays');

        //容器 可以给 ele 标记
        this.canvas = this.viewer.get('canvas');

        //更新 ele
        this.bpmnUpdater = this.viewer.get('bpmnUpdater');

        this.setState({ xml, XMLDetail: [] }, () => {
            this.initBpmn(xml, [], [])
        })
    }

    initBpmn = (XML, XMLDetail) => {
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
                // 'element.hover',
                // 'element.out',
                'element.click',
                // 'element.dblclick',
                // 'element.mousedown',
                // 'element.mouseup'
            ];
            events.forEach((event) => {
                eventBus.on(event, (e) => {
                    console.log(e.element.id)
                    res.map((li, i) => {
                        li.index = i
                    })
                    const arr = res.filter(li => li.id == e.element.id);
                    // console.log(arr, "是个啥")
                    if (arr.length >= 1) {
                        this.setState({
                            selectedIndex: "",
                            selectedArr: arr,
                            btn: false
                        });
                        this.setEleColor(e.element.id)
                    } else {
                        this.setState({
                            selectedArr: [],
                            btn: false
                        });
                    }
                });
            });

            this.canvas.zoom('fit-viewport');
            // canvas.addMarker('L1_AUDIT', 'highlight');

            const elementsToColor = res.map(li => this.elementRegistry.get(li.id))
            elementsToColor.map((li, i) => {
                let color = '';
                if (i == elementsToColor.length - 1) {
                    color = "red";
                } else {
                    color = "green";
                }
                this.modeling.setColor([li], {
                    stroke: color,
                    // fill: 'yellow'
                });
            })


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

    play = () => {
        const { speed } = this.state
        const elementsToColor = res.map(li => this.elementRegistry.get(li.id))
        elementsToColor.map((li, i) => {
            let color = "";
            if (i == elementsToColor.length - 1) {
                color = "red";
            } else {
                color = "green";
            }
            setTimeout(() => {
                this.modeling.setColor([li], {
                    stroke: "yellow",
                    fill: 'lightgreen'
                });
            }, i * speed + 200);
            setTimeout(() => {
                this.modeling.setColor([li], {
                    stroke: color,
                    // fill: 'yellow',
                    fillText: "blue",
                });
            }, (i + 1) * speed + 200);
        })
    }

    setEleColor = (id) => {
        const { speed } = this.state
        const elementsToColor = res.map(li => this.elementRegistry.get(li.id))
        const length = elementsToColor.length
        this.modeling.setColor(elementsToColor, {
            stroke: "green",
            // fill: 'yellow'
        });
        this.modeling.setColor([elementsToColor[length - 1]], {
            stroke: "red",
            // fill: 'yellow'
        });
        const ele = this.elementRegistry.get(id)
        this.modeling.setColor([ele], {
            stroke: "yellow",
            // fill: 'yellow'
        });
    }

    onChange = value => {
        console.log(value)
        this.setState({
            speed: (100 - value) * 4,
        });
    };

    render() {
        const { selectedArr, selectedIndex, btn } = this.state;

        // const detailArr = res.filter(v => v.id == selectedId);
        // console.log(detailArr.length >= 1 && selectedId);
        return <>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div id="canvas" style={{ height: '100%', position: 'relative', width: '100%' }}>
                    <div
                        style={{
                            position: "absolute",
                            bottom: -500,
                            borderRadius: 10,
                            width: 500,
                            minHeight: 500,
                            padding: 10,
                            display: "block",
                            backgroundColor: "#fff",
                            boxShadow: "2px 2px 5px #333333",
                            zIndex: 999
                        }}>
                        <div>
                            {selectedArr.map((li, index) => {
                                return (
                                    <div key={index}>
                                        <div>
                                            <div> <span >{li.index}.</span> &nbsp;&nbsp;{li.time}</div>
                                            <div>  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{li.fullMessage}</div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <div>
                            <Button type="primary" onClick={() => {
                                this.setState({
                                    btn: true
                                })
                                const index = this.state.selectedIndex

                                if (index === 0) {
                                    this.setState({
                                        selectedIndex: 1,
                                        selectedArr: [{
                                            ...res[0], index: 1
                                        }]
                                    })
                                    this.setEleColor(res[index].id)
                                } else if (index === 1) {
                                    this.setState({
                                        selectedArr: [{ ...res[0], index: 1 }]
                                    })
                                    this.setEleColor(res[index - 1].id)
                                } else {
                                    this.setState({
                                        selectedIndex: index - 1,
                                        selectedArr: [{
                                            ...res[index - 1], index: index
                                        }]
                                    })
                                    this.setEleColor(res[index - 1].id)
                                }
                            }}>上一步</Button>
                            <Button type="primary" onClick={() => {
                                this.setState({
                                    btn: true
                                })
                                const index = this.state.selectedIndex
                                if (index === 0) {
                                    this.setState({
                                        selectedIndex: index + 1,
                                        selectedArr: [{
                                            ...res[0], index: 1
                                        }]
                                    })
                                    this.setEleColor(res[index].id)
                                } else if (index === res.length) {
                                    this.setState({
                                        selectedArr: [{
                                            ...res[index - 1], index: index
                                        }]
                                    })
                                    this.setEleColor(res[index - 1].id)
                                } else {
                                    this.setState({
                                        selectedIndex: index + 1,
                                        selectedArr: [{
                                            ...res[index - 1], index: index + 1
                                        }]
                                    })
                                    this.setEleColor(res[index - 1].id)
                                }


                            }}>下一步</Button>
                        </div>
                    </div>
                </div>
                <div>
                    {res.map((li, index) => {
                        let selected;
                        if (btn) {
                            selected = (selectedIndex - 1) == index
                        } else {
                            selected = (selectedArr.filter(item => item.id == li.id).length
                                || (selectedIndex - 1) == index)
                        }

                        return <div ket={index}
                            // onMouseOut={() => {
                            //     // console.log("move")
                            //     this.setState({ selectedId: "" })
                            // }}
                            // onMouseOver={() => {
                            //     this.setState({ selectedId: li.id })
                            //     this.setEleColor(li.id)

                            // }}
                            onClick={() => {
                                this.setState({
                                    selectedArr: [{
                                        ...li,
                                        index: index + 1
                                    }],
                                    selectedIndex: index + 1,
                                    btn: false
                                })
                                this.setEleColor(li.id)
                            }}
                            style={{
                                margin: "10px 0",
                                padding: "5px 10px",
                                minWidth: 300,
                                background: selected ? "#E6F7FF" : "",
                                border: selected ? "solid #91D5FF 1px" : "",
                                borderRadius: 10,
                                transition: "all 200ms",
                                cursor: "pointer"
                            }}>
                            <div> <span >{index + 1}.</span> &nbsp;&nbsp;{li.time}</div>
                            <div>  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{li.fullMessage}</div>
                        </div>
                    })}
                    <Button type="primary" onClick={this.play}>播放</Button>
                    <Slider
                        step={null}
                        defaultValue={25}
                        marks={marks}
                        onChange={this.onChange} />

                </div>
                {/* <Table
                    columns={this.columns}
                    pagination={false}
                    dataSource={detailList} /> */}
            </div>

        </>;
    }
}
export default Bpmn;

const marks = {
    25: '慢',
    50: '中',
    75: '快',
    100: {
        style: {
            color: '#f50',
        },
        label: <strong>极快</strong>,
    },
};

const res = [{
    id: 'START',
    time: "2019-10-10 9:9:10",
    fullMessage: "第一步开始"
}, {
    id: 'SEQ1',
    time: "2019-10-10 9:9:10",
    fullMessage: "第二步干了啥啥啥啥啥啥..."
}, {
    id: 'createBlackListTask2',
    time: "2019-10-10 9:9:10",
    fullMessage: "第三步干了啥啥啥啥啥啥..."
}, {
    id: 'sid-787EDF98-CF0D-4AAC-A302-05C32567F090',
    time: "2019-10-10 9:9:10",
    fullMessage: "第四步干了啥啥啥啥啥啥..."
},
{
    id: 'L1_AUDIT',
    time: "2019-10-10 9:9:10",
    fullMessage: "第五步干了啥啥啥啥啥啥..."
}, {
    id: 'sid-B8959B94-53A4-435B-B408-4DA8FFB3B87C',
    time: "2019-10-10 9:9:10",
    fullMessage: "干了啥啥啥啥啥啥..."
}, {
    id: 'CON1',
    time: "2019-10-10 9:9:10",
    fullMessage: "干了啥啥啥啥啥啥..."
}, {
    id: 'sid-CC5AD9DE-37B4-40AE-B7CB-2F66E5A20DF7',
    time: "2019-10-10 9:9:10",
    fullMessage: "干了啥啥啥啥啥啥..."
}, {
    id: 'L1_REVIEW',
    time: "2019-10-10 9:9:10",
    fullMessage: "干了啥啥啥啥啥啥..."
}, {
    id: 'sid-5EF32400-BB8D-4DD8-99B9-705E6C461F4F',
    time: "2019-10-10 9:9:10",
    fullMessage: "干了啥啥啥啥啥啥..."
}, {
    id: 'sid-6FE1C297-EE0C-4A68-8336-7B3FDFD95C23',
    time: "2019-10-10 9:9:10",
    fullMessage: "干了啥啥啥啥啥啥..."
}, {
    id: 'sid-C7803D10-41ED-4901-A41A-770FB49A3D91',
    time: "2019-10-10 9:9:10",
    fullMessage: "干了啥啥啥啥啥啥..."
}, {
    id: 'L1_AUDIT',
    time: "2019-10-10 9:9:10",
    fullMessage: "干了啥啥啥啥啥啥..."
}, {
    id: 'sid-B8959B94-53A4-435B-B408-4DA8FFB3B87C',
    time: "2019-10-10 9:9:10",
    fullMessage: "干了啥啥啥啥啥啥..."
}, {
    id: 'CON1',
    time: "2019-10-10 9:9:10",
    fullMessage: "干了啥啥啥啥啥啥..."
}, {
    id: 'sid-CC5AD9DE-37B4-40AE-B7CB-2F66E5A20DF7',
    time: "2019-10-10 9:9:10",
    fullMessage: "干了啥啥啥啥啥啥..."
}, {
    id: 'L1_REVIEW',
    time: "2019-10-10 9:9:10",
    fullMessage: "干了啥啥啥啥啥啥..."
}]
