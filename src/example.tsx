import G6 from '@antv/g6';
import * as React from 'react';
import './registerShape';

const data: any = {
  nodes: [
    {
      id: '1',
      title: 'Task1',
      error: false,
      nodeType: 'a',
      panels: [
        { title: 'XXX', value: '11%' },
        { title: 'Time', value: '20s' },
        { title: 'Err', value: 'N' }
      ],
      x: 150,
      y: 100
    }
  ],
};


const Example: React.FC = () => {  // 边tooltip坐标

  // 边tooltip坐标
  const [showEdgeTooltip, setShowEdgeTooltip] = React.useState(false);
  const [edgeTooltipX, setEdgeTooltipX] = React.useState(0)
  const [edgeTooltipY, setEdgeTooltipY] = React.useState(0)
  // 节点tooltip坐标
  const [showNodeTooltip, setShowNodeTooltip] = React.useState(false)
  const [nodeTooltipX, setNodeToolTipX] = React.useState(0)
  const [nodeTooltipY, setNodeToolTipY] = React.useState(0)

  // 节点ContextMenu坐标
  const [showNodeContextMenu, setShowNodeContextMenu] = React.useState(false)
  const [nodeContextMenuX, setNodeContextMenuX] = React.useState(0)
  const [nodeContextMenuY, setNodeContextMenuY] = React.useState(0)

  React.useEffect(() => {
    const graph = new G6.Graph({
      container: 'mountNode',
      width: 1200,
      height: 800,
      modes: {
        default: ['drag-canvas', 'drag-node', 'drag-combo', 'zoom-canvas', 'name'],
        edit: ['click-select'],
      },
      defaultNode: {
        type: 'pipeline-node',
      },
      nodeStateStyles: {
        hover: {
          fillOpacity: 0.1,
          lineWidth: 10,
        },
      },
    });

    const bindEvents = () => {
      // 监听edge上面mouse事件
      graph.on('edge:mouseenter', (evt: { item: any; target: any; }) => {
        const { item, target } = evt
        // debugger
        const type = target.get('type')
        if (type !== 'text') {
          return
        }
        const model = item.getModel()
        const { endPoint } = model

        // y=endPoint.y - height / 2，在同一水平线上，x值=endPoint.x - width - 10
        const y = endPoint.y - 35
        const x = endPoint.x - 150 - 10
        const point = graph.getCanvasByPoint(x, y)

        setEdgeTooltipX(point.x)
        setEdgeTooltipY(point.y)
        setShowEdgeTooltip(true)

      })
    }


    graph.data(data);
    graph.render();

    // 监听鼠标进入节点事件
    graph.on('node:mouseenter', (evt: { item: any; }) => {
      const node = evt.item;
      // 激活该节点的 hover 状态
      graph.setItemState(node, 'hover', true);
    });

    // 监听鼠标离开节点事件
    graph.on('node:mouseleave', (evt: { item: any; }) => {
      const node = evt.item;
      // 关闭该节点的 hover 状态
      graph.setItemState(node, 'hover', false);
    });

    graph.on('node:click', (evt: { item: any; }) => {
      const { item } = evt;

      console.log("------------------------------------------------", evt);

      const source = item._cfg.id;
      const target = Number(source) + 1;

      const model = item.getModel()
      const { x, y } = model
      const point = graph.getCanvasByPoint(x, y)
      graph.addItem('node',
        {
          id: target,
          title: 'Task' + target,
          error: true,
          panels: [
            { title: 'Proc', value: '11%' },
            { title: 'Time', value: '20s' },
            { title: 'Err', value: 'N' }
          ],
          x: Number(point.x) + 250,
          y: Number(point.y),
        },
      );


      graph.on('node:marker', (evt: { item: any; }) => {
        console.log('marker---------', evt);
      });


      // graph.addItem('edge', {
      //   source: source,
      //   target: target,
      // });

      const edges = graph.getEdges()
      edges.forEach(edge => {
        const line = edge.getKeyShape()
        const stroke = line.attr('stroke')
        const targetNode = edge.getTarget()
        targetNode.update({
          style: { stroke }
        })
      })
      graph.paint()

      bindEvents();


    });

  });
  return (
    <div id="mountNode"></div>
  );
}


export default Example;




