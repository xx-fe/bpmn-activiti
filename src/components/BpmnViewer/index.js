import React, {Component, Fragment} from 'react';
import BpmnViewer from 'bpmn-js';
import {Table} from 'antd';
import camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda';
import './index.css';
import detailList from './mock.json';
import {async} from 'q';
import xmlii from './xml1.xml';
const resJson = {
    res_code: 0,
    res_msg: 'success',
    data: {
        historyActivities: ['START', 'createBlackListTask2', 'L1_AUDIT', 'CON1', 'L2_AUDIT'],
        flows: [
            'SEQ1',
            'sid-787EDF98-CF0D-4AAC-A302-05C32567F090',
            'sid-B8959B94-53A4-435B-B408-4DA8FFB3B87C',
            'sid-3C17C1BA-93CA-46B4-99E5-4A5F9B85FD8C',
        ],
        currentActivities: ['L2_AUDIT'],
    },
};

class Bpmn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            x: 0,
            y: 0,
            selectedId: '',
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

    setElements() {
        let color = '';
        const res = [...resJson.data.flows, ...resJson.data.historyActivities];
        console.log(this.elementRegistry); //所有元素

        this.elementRegistry.forEach((ele, gfx) => {
            console.log('ele', ele, gfx);
            let type = ele.type;
            let circle = gfx.getElementsByTagName('g')[0].firstElementChild; // ! 控制背景
            let text1 = gfx.getElementsByTagName('g')[0].getElementsByTagName('tspan')[0];
            let texts = gfx.getElementsByTagName('g')[0].getElementsByTagName('tspan');

            if (!res.includes(ele.id)) {
                return;
            }
            if (resJson.data.currentActivities.includes(ele.id)) {
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
    componentDidMount() {
        let that = this;
        const {callback} = this.props;
        let viewer = new BpmnViewer({
            container: '#canvas',
            moddleExtensions: {
                camunda: camundaModdleDescriptor,
            },
            height: 800,
        });

        this.elementRegistry = viewer.get('elementRegistry'); // ! 获取所有元素集合
        let xml = this.readXML();
        viewer.importXML(xml, function(err) {
            if (err) {
                console.error('failed to load diagram');
                console.error(err);
                return console.log('failed to load diagram', err);
            }
            // diagram is loaded, add interaction to it
            // Option 1:
            // directly hook into internal diagram events
            // this allows you to access the clicked element directly
            that.setElements();
            let eventBus = viewer.get('eventBus');
            // you may hook into any of the following events
            let events = [
                'element.hover',
                // 'element.out',
                // 'element.click',
                // 'element.dblclick',
                // 'element.mousedown',
                // 'element.mouseup'
            ];
            events.forEach(function(event) {
                eventBus.on(event, function(e) {
                    // console.info("划入")
                    const {clientX, clientY} = e.originalEvent;
                    const arr = detailList.filter(li => li.activityId == e.element.id);
                    // console.log(e.element.id, arr);
                    if (arr.length >= 1) {
                        that.setState({
                            x: clientX,
                            y: clientY,
                            selectedId: e.element.id,
                        });
                    } else {
                        that.setState({
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

    readXML = () => {
        let xml = '',
            xmlDoc,
            doc,
            ele;
        try {
            let xmlhttp = new window.XMLHttpRequest();
            //创建一个新的http请求，并指定此请求的方法、URL以及验证信息
            xmlhttp.open('GET', xmlii, false);
            // xmlhttp.setRequestHeader("Content-Type", "text/xml");
            xmlhttp.send(null);
            if (xmlhttp.readyState == 4) {
                // xmlhttp.overrideMimeType("text/xml")
                console.log(xmlhttp, '解析成了啥');
                xmlDoc = xmlhttp.responseXML.documentElement;
                // return xmlDoc
                xml = new XMLSerializer().serializeToString(xmlDoc);

                doc = xmlhttp.responseXML;
                ele = doc.getElementsByTagName('bpmndi:BPMNShape');
                console.log(ele);

                for (i = 0; i < doc.length; i++) {
                    // document.write("<div class='aaaa'>");
                    // document.write(x[i].getElementsByTagName("to")[0].childNodes[0].nodeValue);
                    // document.write("</div>");
                    // document.write("<div class='aaaa'>");
                    // document.write(x[i].getElementsByTagName("heading")[0].childNodes[0].nodeValue);
                    // document.write("</div>");
                    // document.write("<div class='aaaa'>");
                    // document.write(x[i].getElementsByTagName("body")[0].childNodes[0].nodeValue);
                    // document.write("</div>");
                }
            }
        } catch (e) {
            console.log(e);
        }
        return xml;

        //暂时不考虑 IE
        // let xmlDoc;
        // try { //IE浏览器
        //     xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
        // } catch (e) { //firefox,opera...火狐、欧朋等浏览器
        //     xmlDoc = document.implementation.createDocument("", "", null);
        // }
        // try {
        //     xmlDoc.asyc = false; //是否异步调用
        //     xmlDoc.load("./xml.xml"); //文件路径
        // } catch (e) {  //chrome

        // }
    };

    render() {
        const {x, y, selectedId} = this.state;
        const detailArr = detailList.filter(v => v.activityId == selectedId);
        console.log(detailArr.length >= 1 && selectedId);
        return (
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <div id="canvas" style={{height: '100%', position: 'relative', width: '100%'}}>
                    <div
                        style={{
                            position: 'fixed',
                            left: x,
                            top: y - 200,
                            width: 400,
                            height: 200,
                            border: '4px red solid',
                            zIndex: 99,
                            display: detailArr.length >= 1 && selectedId ? 'block' : 'none',
                        }}
                    >
                        {detailArr.map((v, index) => {
                            return (
                                <ul key={index}>
                                    <li>
                                        {v.startTime}&nbsp;&nbsp;&nbsp;&nbsp;{v.activityName}
                                        &nbsp;&nbsp;&nbsp;&nbsp;
                                        {v.mark}
                                    </li>
                                </ul>
                            );
                        })}
                    </div>

                    {/* <div style={{ position: "absolute", right: 0, top: 0, zIndex: 9 }}>

                    </div> */}
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
