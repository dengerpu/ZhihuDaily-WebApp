import React from 'react';
import ReactDOM from 'react-dom/client';

/* REDUX */
import { Provider } from 'react-redux';
import store from './store';

/* ANTD-MOBILE */
import { ConfigProvider } from 'antd-mobile';
import zhCN from 'antd-mobile/es/locales/zh-CN';

import App from './App';
import 'lib-flexible';
import './index.less';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ConfigProvider locale={zhCN}>
    <Provider store={store}>
      <App />
    </Provider>
  </ConfigProvider>
);
