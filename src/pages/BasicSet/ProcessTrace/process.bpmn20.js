export const diagramXML =`<?xml version="1.0" encoding="UTF-8"?>
<definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:activiti="http://activiti.org/bpmn" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC" xmlns:omgdi="http://www.omg.org/spec/DD/20100524/DI" typeLanguage="http://www.w3.org/2001/XMLSchema" expressionLanguage="http://www.w3.org/1999/XPath" targetNamespace="http://www.activiti.org/processdef">
  <process id="process" isExecutable="true">
    <startEvent id="sid-435065BE-FDA4-4ACE-BE81-C7A31F746AAF"></startEvent>
    <userTask id="sid-E04AA6EC-89F2-4A00-84DD-AFDBD13737EF"></userTask>
    <sequenceFlow id="sid-95888A5A-06A9-4A22-8677-A2EDC04F40F5" sourceRef="sid-435065BE-FDA4-4ACE-BE81-C7A31F746AAF" targetRef="sid-E04AA6EC-89F2-4A00-84DD-AFDBD13737EF"></sequenceFlow>
    <endEvent id="sid-026BCA54-6A90-4F7F-AE05-D1FDC3FCF24F"></endEvent>
    <sequenceFlow id="sid-67E7C2D1-224B-464E-851E-A410D4DF1483" sourceRef="sid-E04AA6EC-89F2-4A00-84DD-AFDBD13737EF" targetRef="sid-026BCA54-6A90-4F7F-AE05-D1FDC3FCF24F"></sequenceFlow>
  </process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_process">
    <bpmndi:BPMNPlane bpmnElement="process" id="BPMNPlane_process">
      <bpmndi:BPMNShape bpmnElement="sid-435065BE-FDA4-4ACE-BE81-C7A31F746AAF" id="BPMNShape_sid-435065BE-FDA4-4ACE-BE81-C7A31F746AAF">
        <omgdc:Bounds height="30.0" width="30.0" x="64.0" y="59.0"></omgdc:Bounds>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape bpmnElement="sid-E04AA6EC-89F2-4A00-84DD-AFDBD13737EF" id="BPMNShape_sid-E04AA6EC-89F2-4A00-84DD-AFDBD13737EF">
        <omgdc:Bounds height="80.0" width="100.0" x="203.0" y="36.0"></omgdc:Bounds>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape bpmnElement="sid-026BCA54-6A90-4F7F-AE05-D1FDC3FCF24F" id="BPMNShape_sid-026BCA54-6A90-4F7F-AE05-D1FDC3FCF24F">
        <omgdc:Bounds height="28.0" width="28.0" x="348.0" y="62.0"></omgdc:Bounds>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge bpmnElement="sid-95888A5A-06A9-4A22-8677-A2EDC04F40F5" id="BPMNEdge_sid-95888A5A-06A9-4A22-8677-A2EDC04F40F5">
        <omgdi:waypoint x="93.99900921430586" y="74.17240240476214"></omgdi:waypoint>
        <omgdi:waypoint x="203.0" y="75.42528735632183"></omgdi:waypoint>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge bpmnElement="sid-67E7C2D1-224B-464E-851E-A410D4DF1483" id="BPMNEdge_sid-67E7C2D1-224B-464E-851E-A410D4DF1483">
        <omgdi:waypoint x="303.0" y="76.0"></omgdi:waypoint>
        <omgdi:waypoint x="348.0" y="76.0"></omgdi:waypoint>
      </bpmndi:BPMNEdge>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</definitions>`