import React, { useEffect } from 'react';
import ReactFlow, { Controls, Background, useNodesState, useEdgesState } from 'react-flow-renderer';
import CustomNodeComponent from './CustomNodeComponent';
import { ReactFlowProvider } from "reactflow";
import { jsonData } from './Data.js';
import dagre from 'dagre';

const nodeTypes = {
    customNode: CustomNodeComponent,
};

function CustomGraph() {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    const yOffset = 1;

    useEffect(() => {
        const g = new dagre.graphlib.Graph();
        g.setGraph({
            rankdir: 'TB',
            marginx: 50,
            marginy: 50
        });
        g.setDefaultEdgeLabel(() => ({}));

        const addNodesAndEdges = (nodesToAdd, edgesToAdd) => {
            nodesToAdd.forEach(node => {
                g.setNode(node.id, { width: 450, height: 200 });
            });
            edgesToAdd.forEach(edge => {
                g.setEdge(edge.source, edge.target);
            });
            return { nodesToAdd, edgesToAdd };
        };

        // Initialize loaded nodes and edges arrays
        const loadedNodes = [];
        const loadedEdges = [];

        // Process each package in the JSON data
        jsonData.forEach((pkg, index) => {
            const pkgId = `pkg-${pkg.name}`;
            loadedNodes.push({
                id: pkgId,
                type: 'customNode',
                position: { x: 100, y: yOffset * index },
                data: { label: `Package: ${pkg.name}`, ...pkg }
            });

            pkg.interfaces.forEach((iface, iIndex) => {
                const ifaceId = `iface-${iface.name}`;
                loadedNodes.push({
                    id: ifaceId,
                    type: 'customNode',
                    position: { x: 300, y: yOffset * (index + 1 + iIndex) },
                    data: { label: `Interface: ${iface.name}`, ...iface }
                });
                loadedEdges.push({
                    id: `e-${pkgId}-${ifaceId}`,
                    source: pkgId,
                    target: ifaceId,
                    type: 'simplebezier',
                    animated: true,
                });

                iface.functions.forEach((func, fIndex) => {
                    const funcId = `func-${iface.name}-${func.name}`;
                    loadedNodes.push({
                        id: funcId,
                        type: 'customNode',
                        position: { x: 500, y: yOffset * (index + 2 + iIndex + fIndex) },
                        data: { label: `${func.name}()`, ...func }
                    });
                    loadedEdges.push({
                        id: `e-${ifaceId}-${funcId}`,
                        source: ifaceId,
                        target: funcId,
                        type: 'simplebezier',
                        animated: true
                    });
                });
            });

            pkg.specifications.forEach((spec, sIndex) => {
                const specId = `spec-${spec.name}`;
                loadedNodes.push({
                    id: specId,
                    type: 'customNode',
                    position: { x: 300, y: yOffset * (index + 1 + sIndex) },
                    data: { label: `Specification: ${spec.name}`, ...spec }
                });

                if (spec.implemented_interface) {
                    const interfaceId = `iface-${spec.implemented_interface}`;
                    loadedEdges.push({
                        id: `e-${interfaceId}-${specId}`,
                        source: interfaceId,
                        target: specId,
                        type: 'simplebezier',
                        animated: true
                    });
                }

                loadedEdges.push({
                    id: `e-${pkgId}-${specId}`,
                    source: pkgId,
                    target: specId,
                    type: 'simplebezier',
                    animated: true,
                    style: { stroke: '#000', strokeWidth: 4 }
                });

                spec.functions.forEach((func, fIndex) => {
                    const funcId = `func-${spec.name}-${func.name}`;
                    loadedNodes.push({
                        id: funcId,
                        type: 'customNode',
                        position: { x: 500, y: yOffset * (index + 2 + sIndex + fIndex) },
                        data: { label: `${func.name}()`, ...func },
                    });

                    if (func.implemented_interface) {
                        const interfaceId = `iface-${func.implemented_interface}`;
                        loadedEdges.push({
                            id: `e-${interfaceId}-${funcId}`,
                            source: interfaceId,
                            target: funcId,
                            type: 'simplebezier',
                            animated: true
                        });
                    }

                    loadedEdges.push({
                        id: `e-${specId}-${funcId}`,
                        source: specId,
                        target: funcId,
                        type: 'simplebezier',
                        animated: true,
                        style: { stroke: '#000', strokeWidth: 4 }
                    });
                });
            });
        });

        // Apply nodes and edges to the dagre graph for layout calculation
        const { nodesToAdd, edgesToAdd } = addNodesAndEdges(loadedNodes, loadedEdges);
        dagre.layout(g);

        // Assign positions to nodes based on dagre layout
        const positionedNodes = nodesToAdd.map(node => ({
            ...node,
            position: {
                x: g.node(node.id).x - g.node(node.id).width / 2,
                y: g.node(node.id).y - g.node(node.id).height / 2
            }
        }));

        setNodes(positionedNodes);
        setEdges(edgesToAdd);
    }, [setNodes, setEdges]);

    return (
        <div style={{ height: '100vh', width: '100%' }}>
            <ReactFlowProvider>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    nodeTypes={nodeTypes}
                    fitView
                >
                    <Controls />
                    <Background />
                </ReactFlow>
            </ReactFlowProvider>
        </div>
    );
}

export default CustomGraph;
