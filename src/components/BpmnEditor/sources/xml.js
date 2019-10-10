export const diagramXML = `<?xml version="1.0" encoding="UTF-8"?>
<bpmn2:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="sample-diagram" targetNamespace="http://bpmn.io/schema/bpmn" xsi:schemaLocation="http://www.omg.org/spec/BPMN/20100524/MODEL BPMN20.xsd">
  <bpmn2:process id="Process_1" isExecutable="true">
    <bpmn2:startEvent id="StartEvent_1" name="开始">
      <bpmn2:outgoing>SequenceFlow_1ppkpq</bpmn2:outgoing>
    </bpmn2:startEvent>
    <bpmn2:sequenceFlow id="SequenceFlow_1ppkpq" sourceRef="StartEvent_1" targetRef="Task_1lkfsqj" />
    <bpmn2:userTask id="Task_1lkfsqj" name="张三">
      <bpmn2:incoming>SequenceFlow_1ppkpq</bpmn2:incoming>
      <bpmn2:outgoing>Process_2</bpmn2:outgoing>
    </bpmn2:userTask>
    <bpmn2:endEvent id="EndEvent_129o9ek" name="结束">
      <bpmn2:incoming>SequenceFlow_1js3qmv</bpmn2:incoming>
    </bpmn2:endEvent>
    <bpmn2:userTask id="UserTask_03ux4tg" name="李四">
      <bpmn2:incoming>Process_2</bpmn2:incoming>
      <bpmn2:outgoing>SequenceFlow_0l6oqvc</bpmn2:outgoing>
    </bpmn2:userTask>
    <bpmn2:userTask id="UserTask_0ysqtn6" name="王五">
      <bpmn2:incoming>SequenceFlow_0l6oqvc</bpmn2:incoming>
      <bpmn2:outgoing>SequenceFlow_1js3qmv</bpmn2:outgoing>
    </bpmn2:userTask>
    <bpmn2:sequenceFlow id="Process_2" sourceRef="Task_1lkfsqj" targetRef="UserTask_03ux4tg" />
    <bpmn2:sequenceFlow id="SequenceFlow_0l6oqvc" sourceRef="UserTask_03ux4tg" targetRef="UserTask_0ysqtn6" />
    <bpmn2:sequenceFlow id="SequenceFlow_1js3qmv" sourceRef="UserTask_0ysqtn6" targetRef="EndEvent_129o9ek" />
  </bpmn2:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">
      <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1">
        <dc:Bounds x="412" y="240" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="419" y="283" width="22" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="SequenceFlow_1ppkpq3_di" bpmnElement="SequenceFlow_1ppkpq">
        <di:waypoint x="448" y="258" />
        <di:waypoint x="500" y="258" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="UserTask_0abwwwf_di" bpmnElement="Task_1lkfsqj">
        <dc:Bounds x="500" y="218" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="EndEvent_129o9ek_di" bpmnElement="EndEvent_129o9ek">
        <dc:Bounds x="922" y="238" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="930" y="281" width="22" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="UserTask_03ux4tg_di" bpmnElement="UserTask_03ux4tg">
        <dc:Bounds x="640" y="218" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="UserTask_0ysqtn6_di" bpmnElement="UserTask_0ysqtn6">
        <dc:Bounds x="780" y="216" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="SequenceFlow_0absb56_di" bpmnElement="Process_2">
        <di:waypoint x="600" y="258" />
        <di:waypoint x="640" y="258" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="SequenceFlow_0l6oqvc_di" bpmnElement="SequenceFlow_0l6oqvc">
        <di:waypoint x="740" y="258" />
        <di:waypoint x="780" y="258" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="SequenceFlow_1js3qmv_di" bpmnElement="SequenceFlow_1js3qmv">
        <di:waypoint x="880" y="256" />
        <di:waypoint x="922" y="256" />
      </bpmndi:BPMNEdge>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn2:definitions>
`;
