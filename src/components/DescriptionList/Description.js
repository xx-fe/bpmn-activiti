import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {Col} from 'antd';
import styles from './index.less';
import responsive from './responsive';

const Description = ({term, column, children, ellipsis = false, ...restProps}) => (
    <Fragment>
        {/* 自动溢出省略：默认展示 */}
        {ellipsis ? (
            <Col {...responsive[column]} {...restProps} className={styles.ellipsis}>
                {term && <div className={styles.term}>{term}</div>}
                {children !== null && children !== undefined && children}
            </Col>
        ) : (
            <Col {...responsive[column]} {...restProps}>
                {term && <div className={styles.term}>{term}</div>}
                {children !== null && children !== undefined && (
                    <div className={styles.detail}>{children}</div>
                )}
            </Col>
        )}
    </Fragment>
);

Description.defaultProps = {
    term: '',
};

Description.propTypes = {
    term: PropTypes.node,
};

export default Description;
