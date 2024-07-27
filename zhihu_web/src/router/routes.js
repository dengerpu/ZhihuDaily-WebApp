import { lazy } from 'react';
import Home from '@/views/home';

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
        meta: {
            title: '知乎日报-WebApp'
        }
    }, 
    {
        path: '/detail/:id',
        name: 'detail',
        component: lazy(() => import('@/views/detail')),
        meta: {
            title: '新闻详情-知乎日报'
        }
    }, 
    {
        path: '/personal',
        name: 'personal',
        component: lazy(() => import('@/views/person/index')),
        meta: {
            title: '个人中心-知乎日报'
        }
    }, 
    {
        path: '/collection',
        name: 'collection',
        component: lazy(() => import('@/views/collection')),
        meta: {
            title: '我的收藏-知乎日报'
        }
    }, 
    {
        path: '/update',
        name: 'update',
        component: lazy(() => import('@/views/update')),
        meta: {
            title: '修改个人信息-知乎日报'
        }
    }, 
    {
        path: '/login',
        name: 'login',
        component: lazy(() => import('@/views/login')),
        meta: {
            title: '登录/注册-知乎日报'
        }
    }, 
    {
        path: '*',
        name: '404',
        component: lazy(() => import('@/views/404')),
        meta: {
            title: '404页面-知乎日报'
        }
    }
]

export default routes