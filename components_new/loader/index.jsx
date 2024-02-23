import React from 'react';
import { connect } from 'react-redux';
import { Spin } from 'antd';
import { withRouter } from "next/router";
import cogWheelGif from "../../public/images/cogwheel.gif";
import {isBrowser, isMobile } from "react-device-detect";

class LoaderComponent extends React.PureComponent {
    
    render() {
        const { loader, children,router } = this.props

        const mainLoader = loader.loader
        const customLoader = loader.customLoader
        
        if (router.pathname=='/products') {
            return (
                <Spin spinning={customLoader} size="large" indicator={<img src={cogWheelGif.src} alt=""/>} style={{marginTop:isMobile ? '150px' : '90px'}}>
                    {children}
                </Spin> 
                
            );
        }else{
            return (
                <Spin spinning={mainLoader} size="large" style={{marginTop:isMobile ? '150px' : '90px'}}>
                    {children}
                </Spin> 
                
            );
        }
    }
}

const mapStateToProps = (state) => {
    const { loader } = state;
    return {
        loader
    };
}

const actionCreators = {
}

export default withRouter(connect(mapStateToProps, actionCreators)(LoaderComponent));