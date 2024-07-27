import { Suspense } from "react";
import { Mask, DotLoading } from "antd-mobile";
import { Routes, Route, useNavigate, useLocation, useParams, useSearchParams } from "react-router-dom";
import routes from "./routes";

const Element = (props) => {
    let { component: Component, meta } = props;

    // 其他权限信息的验证


    // 修改页面的TITLE
    let { title = "知乎日报-WebApp" } = meta || {};
    document.title = title;

    const navigate = useNavigate(),
        location = useLocation(),
        params = useParams(),
        [usp] = useSearchParams();

    // 获取路由信息,基于属性传递给组件
    return <Component
        navigate={navigate}
        location={location}
        params={params}
        usp={usp}
    />;
}

const RouterView = () => {
    return <Suspense fallback={
        <Mask visible={true}>
            <DotLoading color="white" />
        </Mask>
    }>
        <Routes>
            {
            routes.map((item) => {
                let {path, name} = item
                return <Route 
                    key={name} 
                    path={path} 
                    element={<Element {...item} />} 
                />;
            })
            }
        </Routes>
    </Suspense>
};

export default RouterView;