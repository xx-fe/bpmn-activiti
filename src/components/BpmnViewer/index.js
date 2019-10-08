import React, { Component, Fragment } from 'react';
import BpmnViewer from 'bpmn-js';
import camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda';
import diagramXML from './xml.xml';
import './index.css';
import detailList from './mock.json'
import { async } from 'q';
class Bpmn extends Component {

    constructor(props) {
        super(props)
        this.state = {
            x: 0, y: 0, selectedId: ""
        }
    }

    componentDidMount() {
        let that = this;
        const { callback } = this.props;
        let viewer = new BpmnViewer({
            container: '#canvas',
            moddleExtensions: {
                camunda: camundaModdleDescriptor,
            },
            height: 800,
        });

        let xml = this.readXML()
        viewer.importXML(xml, function (err) {
            if (err) {
                console.error('failed to load diagram');
                console.error(err);
                return console.log('failed to load diagram', err);
            }
            // diagram is loaded, add interaction to it
            // Option 1:
            // directly hook into internal diagram events
            // this allows you to access the clicked element directly
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
            events.forEach(function (event) {
                eventBus.on(event, function (e) {
                    console.info("划入")
                    const { clientX, clientY } = e.originalEvent
                    const arr = detailList.filter(li => li.activityId == e.element.id)
                    console.log(e.element.id, arr);
                    if (arr.length >= 1) {
                        clearTimeout(that.handleDisappear)

                        that.setState({
                            x: clientX,
                            y: clientY,
                            selectedId: e.element.id
                        })
                    }
                });
            });

            eventBus.on("element.out", function (e) {
                console.warn("划出")
                that.handleDisappear = setTimeout(() => {
                    that.setState({
                        selectedId: ""
                    })
                }, 100)

            })
            // 删除 bpmn logo
            const bjsIoLogo = document.querySelector('.bjs-powered-by');
            while (bjsIoLogo.firstChild) {
                bjsIoLogo.removeChild(bjsIoLogo.firstChild);
            }
        });



    }

    readXML = () => {
        let xml = "", xmlDoc;
        try {
            let xmlhttp = new window.XMLHttpRequest();
            //创建一个新的http请求，并指定此请求的方法、URL以及验证信息
            xmlhttp.open("GET", "http://192.168.73.48:8009/xml.xml", false);
            // xmlhttp.setRequestHeader("Content-Type", "text/xml");
            xmlhttp.send(null);
            if (xmlhttp.readyState == 4) {
                // xmlhttp.overrideMimeType("text/xml")
                console.log(xmlhttp, "解析成了啥")
                xmlDoc = xmlhttp.responseXML.documentElement;
                // return xmlDoc
                xml = (new XMLSerializer()).serializeToString(xmlDoc)
            }
        } catch (e) {
            console.log(e)
        }
        return xml

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
    }

    render() {
        const { x, y, selectedId } = this.state
        const detailArr = detailList.filter(v => v.activityId == selectedId)

        return (
            <Fragment>
                <div id="canvas" style={{ height: '100%', position: "relative" }} >
                    <div style={{
                        position: "fixed",
                        left: x,
                        top: y - 200,
                        width: 400,
                        height: 200,
                        border: "4px red solid",
                        zIndex: 99,
                        display: (detailArr.length >= 1 && selectedId) ? "block" : "none",
                    }}>
                        {detailArr.map((v, index) => {
                            return (
                                <ul key={index} >
                                    <li>
                                        {v.startTime}&nbsp;&nbsp;&nbsp;&nbsp;{v.activityName}&nbsp;&nbsp;&nbsp;&nbsp;
                                    {v.mark}
                                    </li>
                                </ul>
                            );
                        })}
                    </div>

                    <div style={{ position: "absolute", right: 0, top: 0 }}>
                        {detailList.map((v, index) => {
                            return (
                                <ul style={{
                                    width: 800,
                                    border: `2px red ${detailArr.length >= 1 && (v.activityId == selectedId) ? "solid" : ""}`,
                                    transition: "0.5s all ease"
                                }} key={index} >
                                    <li >
                                        {v.startTime}&nbsp;&nbsp;&nbsp;&nbsp;{v.activityName}&nbsp;&nbsp;&nbsp;&nbsp;
                                    {v.activityId}
                                    </li>
                                </ul>
                            );
                        })}
                    </div>
                </div>


            </Fragment>
        );
    }
}

export default Bpmn;


// const t = [
//     { id: 'Process_2', time: '2019-09-21 10:00:00', user: '张三', mark: '通过' },
//     {
//         id: 'SequenceFlow_0l6oqvc',
//         time: '2019-09-21 10:10:00',
//         user: '李四',
//         mark: '不通过，请修改资料',
//     },
//     {
//         id: 'Process_2',
//         time: '2019-09-21 10:20:00',
//         user: '张三',
//         mark: '通过，资料已修补，请审核',
//     },
//     { id: 'SequenceFlow_0l6oqvc', time: '2019-09-21 10:10:00', user: '李四', mark: '通过' },
//     { id: 'SequenceFlow_1js3qmv', time: '2019-09-21 10:30:00', user: '王五', mark: '通过' },
// ];