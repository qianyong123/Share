
import React from 'react';
import Loadable from 'loadable-components';
import {Spin } from 'antd'

//通用的过场组件
const loadingComponent =()=>{
    return (
        <div style={{width:'100%',height:300,textAlign: 'center',lineHeight:300}}>
           <Spin>加载中...</Spin>
        </div>
    ) 
}

//过场组件默认采用通用的，若传入了loading，则采用传入的过场组件
export default (loader,loading = loadingComponent)=>{
    return Loadable(
        loader,{
        LoadingComponent:loading
    });
}