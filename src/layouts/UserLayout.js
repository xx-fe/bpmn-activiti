import React, {Component, Fragment} from 'react';
import {connect} from 'dva';
import Link from 'umi/link';
import {Icon, Row, Col} from 'antd';

import GlobalFooter from '@/components/GlobalFooter';
import DocumentTitle from 'react-document-title';
import styles from './UserLayout.less';
import getPageTitle from '@/utils/getPageTitle';

import {logoUrl, copyRight} from '../defaultSettings';

const copyright = (
    <Fragment>
        Copyright <Icon type="copyright" /> {copyRight}
    </Fragment>
);

class UserLayout extends Component {
    componentDidMount() {
        // const {
        // dispatch,
        //     route: {routes, authority},
        // } = this.props;
        // 这里不需要获取菜单数据
        // dispatch({
        //     type: 'menu/getMenuData',
        //     payload: {routes, authority},
        // });
    }

    render() {
        const {
            children,
            location: {pathname},
            breadcrumbNameMap,
        } = this.props;
        return (
            <DocumentTitle title={getPageTitle(pathname, breadcrumbNameMap)}>
                <div className={styles.container}>
                    <Row className={styles.content} type="flex" justify="center" align="middle">
                        <Col md={12} sm={24}>
                            <div className={styles.top}>
                                <div className={styles.header}>
                                    <Link to="/">
                                        <img alt="logo" className={styles.logo} src={logoUrl} />
                                        <span className={styles.title}>某某管理系统</span>
                                    </Link>
                                </div>
                                <div className={styles.desc}>某某管理系统</div>
                            </div>
                            {children}
                        </Col>
                    </Row>
                    <GlobalFooter copyright={copyright} />
                </div>
            </DocumentTitle>
        );
    }
}

export default connect(({menu: menuModel}) => ({
    menuData: menuModel.menuData,
    breadcrumbNameMap: menuModel.breadcrumbNameMap,
}))(UserLayout);
