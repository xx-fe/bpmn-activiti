import React, {Component} from 'react';
import {connect} from 'dva';
import {formatMessage, FormattedMessage} from 'umi/locale';
import {Alert} from 'antd';
import Login from '@/components/Login';
import styles from './Login.less';
import {getPhoneValue} from '@/utils/funcUtils';

const {Mobile, Password, Submit} = Login;

/**
 * @description 登录页面
 * @author bge
 * @date 2019-03-22
 * @class LoginPage
 * @extends {Component}
 */

@connect(({login, loading}) => ({
    login,
    submitting: loading.effects['login/login'],
}))
class LoginPage extends Component {
    state = {
        type: 'account',
    };

    handleSubmit = (err, values) => {
        if (!err) {
            const {dispatch} = this.props;
            dispatch({
                type: 'login/login',
                payload: {
                    ...values,
                    opt: 'login',
                },
            });
        }
    };

    renderMessage = content => (
        <Alert style={{marginBottom: 24}} message={content} type="error" showIcon />
    );

    render() {
        const {login, submitting} = this.props;
        const {type} = this.state;
        return (
            <div className={styles.main}>
                <Login
                    defaultActiveKey={type}
                    onSubmit={this.handleSubmit}
                    ref={form => {
                        this.loginForm = form;
                    }}
                >
                    {!login.status && login.msg && !submitting && this.renderMessage(login.msg)}

                    <Mobile
                        name="account"
                        placeholder={formatMessage({id: 'form.phone-number.placeholder'})}
                        rules={[
                            {
                                required: true,
                                whitespace: true,
                                message: formatMessage({
                                    id: 'validation.phone-number.required',
                                }),
                            },
                            {
                                pattern: /^1\d{10}$/,
                                message: formatMessage({
                                    id: 'validation.phone-number.wrong-format',
                                }),
                            },
                        ]}
                        maxLength={11}
                        getValueFromEvent={e => getPhoneValue(e)}
                    />

                    <Password
                        name="password"
                        placeholder={`${formatMessage({
                            id: 'app.login.password',
                        })}`}
                        rules={[
                            {
                                required: true,
                                message: formatMessage({id: 'validation.password.required'}),
                            },
                            {
                                pattern: /^[\w_-]{6,16}$/,
                                message: formatMessage({id: 'validation.password.strength.msg'}),
                            },
                        ]}
                        onPressEnter={e => {
                            e.preventDefault();
                            this.loginForm.validateFields(this.handleSubmit);
                        }}
                    />
                    <Submit loading={submitting}>
                        <FormattedMessage id="app.login.login" />
                    </Submit>
                </Login>
            </div>
        );
    }
}

export default LoginPage;
