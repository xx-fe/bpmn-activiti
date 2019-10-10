import React, { Component, Fragment } from 'react';
import BpmnViewer from 'bpmn-js';
import { Table } from 'antd';
import camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda';
import './index.css';
import detailList from './mock.json'
import { async } from 'q';
class Bpmn extends Component {

    constructor(props) {
        super(props)
        this.state = {
            x: 0, y: 0, selectedId: ""
        }

        this.columns = [{
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
        },]
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
                    // console.info("划入")
                    const { clientX, clientY } = e.originalEvent
                    const arr = detailList.filter(li => li.activityId == e.element.id)
                    // console.log(e.element.id, arr);
                    if (arr.length >= 1) {
                        that.setState({
                            x: clientX,
                            y: clientY,
                            selectedId: e.element.id
                        })
                    } else {
                        that.setState({
                            selectedId: ""
                        })
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
        let xml = "", xmlDoc, doc, ele;
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

                doc = xmlhttp.responseXML
                ele = doc.getElementsByTagName("bpmndi:BPMNShape")
                console.log(ele)

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
        console.log(detailArr.length >= 1 && selectedId)
        return (
            <div style={{ display: "flex", justifyContent: "space-between" }} >
                <div id="canvas" style={{ height: '100%', position: "relative", width: "100%" }} >
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

                    {/* <div style={{ position: "absolute", right: 0, top: 0, zIndex: 9 }}>
                    
                    </div> */}
                </div>
                <Table
                    columns={this.columns}
                    pagination={false}
                    dataSource={detailList} />
            </div>
        );
    }
}
export default Bpmn;

