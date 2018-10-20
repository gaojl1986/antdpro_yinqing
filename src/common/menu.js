import { isUrl } from '../utils/utils';

const menuData = [
  {
    name: '注智划小',
    icon: 'slack',
    path: 'unicom',
    children: [
      {
        name: '用户基础信息',
        path: 'echart',
      },
      {
        name: '用户职住信息',
        path: 'zhizhu',
      },
      {
        name: '热卖区域预测',
        path: 'hotsale',
      },
    ],
  },
];

function formatter(data, parentPath = '/', parentAuthority) {
  return data.map(item => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);
