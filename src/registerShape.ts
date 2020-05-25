import G6 from '@antv/g6'

const ERROR_COLOR = '#F5222D';

const COLLAPSE_ICON = function COLLAPSE_ICON(x: number, y: any, r: number) {
  return [
    ['M', x - r, y],
    ['a', r, r, 0, 1, 0, r * 2, 0],
    ['a', r, r, 0, 1, 0, -r * 2, 0],
    ['M', x - r + 4, y],
    ['L', x - r + 2 * r - 4, y],
  ];
};
const EXPAND_ICON = function EXPAND_ICON(x: number, y: number, r: number) {
  return [
    ['M', x - r, y],
    ['a', r, r, 0, 1, 0, r * 2, 0],
    ['a', r, r, 0, 1, 0, -r * 2, 0],
    ['M', x - r + 4, y],
    ['L', x - r + 2 * r - 4, y],
    ['M', x - r + r, y - r + 4],
    ['L', x, y + r - 4],
  ];
};
const ICON_MAP: any = {
  a: 'https://gw.alipayobjects.com/mdn/rms_8fd2eb/afts/img/A*0HC-SawWYUoAAAAAAAAAAABkARQnAQ',
  b: 'https://gw.alipayobjects.com/mdn/rms_8fd2eb/afts/img/A*sxK0RJ1UhNkAAAAAAAAAAABkARQnAQ',
}



G6.registerNode('pipeline-node', {
  draw(cfg: any, group: any) {
    const color = cfg.error ? '#F4664A' : '#30BF78'
    const r = 2;
    const shape = group.addShape('rect', {
      attrs: {
        x: 0,
        y: 0,
        width: 200,
        height: 60,
        stroke: color,
        radius: r
      },
      name: 'main-box',
      draggable: true,
    });

    group.addShape('rect', {
      attrs: {
        x: 0,
        y: 0,
        width: 200,
        height: 20,
        fill: color,
        radius: [r, r, 0, 0],
      },
      name: 'title-box',
      draggable: true,
    });

    // 左侧图标
    group.addShape('image', {
      attrs: {
        x: 4,
        y: 2,
        height: 16,
        width: 16,
        cursor: 'pointer',
        img: ICON_MAP[cfg.nodeType || 'app'],
      },
      name: 'node-icon',
    });

    // 标题
    group.addShape('text', {
      attrs: {
        textBaseline: 'top',
        y: 2,
        x: 24,
        lineHeight: 20,
        text: cfg.title,
        fill: '#fff',
      },
      name: 'title'
    });


    // 增加左边 marker
    // group.addShape('marker', {
    //   attrs: {
    //     x: -10,
    //     y: 30,
    //     r: 8,
    //     cursor: 'pointer',
    //     symbol: cfg.collapse ? COLLAPSE_ICON : EXPAND_ICON,
    //     stroke: '#666',
    //     lineWidth: 2,
    //   },
    //   name: 'left-collapse-icon',
    // });

    group.addShape('circle', {
      attrs: {
        x: -10,
        y: 30,
        r: 8,
        stroke: '#666',
        symbol: cfg.collapse ? COLLAPSE_ICON : EXPAND_ICON,
        isCollapseShape: true,
      },
      name: 'left-collapse-icon',
    });

    // collpase text
    // group.addShape('text', {
    //   attrs: {
    //     x: width,
    //     y: height / 2,
    //     width: 16,
    //     height: 16,
    //     textAlign: 'center',
    //     textBaseline: 'middle',
    //     text: collapsed ? '+' : '-',
    //     fontSize: 16,
    //     fill: collapsed ? '#fff' : lightColor,
    //     cursor: 'pointer',
    //     isCollapseShape: true,
    //   },
    // });

    // 增加右边 marker
    group.addShape('circle', {
      attrs: {
        x: 210,
        y: 30,
        r: 8,
        stroke: '#666',
        symbol: cfg.collapse ? '+' : EXPAND_ICON,
        isCollapseShape: true,
      },
      name: 'right-collapse-icon',
    });

    // 增加下边 marker
    group.addShape('marker', {
      attrs: {
        x: 90,
        y: 70,
        r: 8,
        cursor: 'pointer',
        symbol: cfg.collapse ? COLLAPSE_ICON : EXPAND_ICON,
        stroke: '#666',
        lineWidth: 2,
      },
      name: 'collapse-icon',
    });

    // 节点中的内容列表
    cfg.panels.forEach((item: { title: any; value: any; }, index: number) => {
      // 名称
      group.addShape('text', {
        attrs: {
          textBaseline: 'top',
          y: 25,
          x: 24 + index * 60,
          lineHeight: 20,
          text: item.title,
          fill: 'rgba(0,0,0, 0.4)',
        },
        name: `index-title-${index}`
      });

      // 值
      group.addShape('text', {
        attrs: {
          textBaseline: 'top',
          y: 42,
          x: 24 + index * 60,
          lineHeight: 20,
          text: item.value,
          fill: '#595959',
        },
        name: `index-title-${index}`
      });

    });
    return shape;
  },
},
  'single-node'
);
