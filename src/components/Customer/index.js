/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import { Grid, Dialog, Message } from '@alifd/next';
import { Card } from 'antd';
import IceContainer from '@icedesign/container';
import { SEX, IS_IDCARD_ADDRESS, formatAmount } from '@/filter/common';
// import ImageInfo from '../../../../components/ImageInfo'
// import ImageModal from '../../../../components/ImageModal'
import ImageViewer from '@/components/ImageViewer/ImageViewer';
import './index.less';
import { withRouter } from 'react-router-dom';

const { Row, Col } = Grid;
const openAccountReasonType = {
  1: '投资',
  2: '其他',
};
@withRouter
export default class Customer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDialog: false,
      idPicUrl: null,
    };
  }
  viewCard = url => {
    if (typeof url === 'string') {
      this.setState({
        idPicUrl: url,
        showDialog: true,
      });
    } else if (Array.isArray(url) && url.length > 0) {
      this.setState({
        idPicUrl: url,
        showDialog: true,
      });
    } else {
      Message.error('暂无图片');
      this.setState({
        idPicUrl: null,
      });
    }
  };
  renderLandUser = customerInfo => {
    const { idPicUrl } = this.state;
    return (

      <Card style={{ margin: "10px 0" }}>

        <Row getters="24">
          <Col l="6">
            <div style={styles.colItem}>
              <span style={styles.label}>客户ID : </span>
              <span>{customerInfo && customerInfo.userId}</span>
            </div>
          </Col>
          <Col l="6">
            <div style={styles.colItem}>
              <span style={styles.label}>手机号码 : </span>
              <span style={styles.label}>
                {customerInfo && customerInfo.mobileNo}
              </span>
            </div>
          </Col>
          <Col l="6">
            <div style={styles.colItem}>
              <span style={styles.label}>身份证照片 : </span>
              {customerInfo && customerInfo.idFrontPicUrl ? (
                <div
                  style={styles.checkView}
                  onClick={() =>
                    this.viewCard(customerInfo && customerInfo.idFrontPicUrl)
                  }
                >
                  <ImageViewer options={{ url: 'data-src' }}>
                    <img
                      className="img-viewer"
                      src=""
                      data-content="个人信息面>"
                      alt=""
                      data-src={idPicUrl}
                    />
                  </ImageViewer>
                </div>
              ) : null}
            </div>
          </Col>
          <Col l="6">
            <div style={styles.colItem}>
              <span style={styles.label}> </span>
              {customerInfo && customerInfo.idBackPicUrl ? (
                <div
                  style={styles.checkView}
                  onClick={() =>
                    this.viewCard(customerInfo && customerInfo.idBackPicUrl)
                  }
                >
                  <ImageViewer options={{ url: 'data-src' }}>
                    <img
                      className="img-viewer"
                      src=""
                      data-content="身份有效期面>"
                      alt=""
                      data-src={idPicUrl}
                    />
                  </ImageViewer>
                </div>
              ) : null}
            </div>
          </Col>
        </Row>
        <Row getters="24">
          <Col l="6">
            <div style={styles.colItem}>
              <span style={styles.label}>姓 : </span>
              <span>{customerInfo && customerInfo.surname}</span>
            </div>
          </Col>
          <Col l="6">
            <div style={styles.colItem}>
              <span style={styles.label}>名 : </span>
              <span>{customerInfo && customerInfo.givenName}</span>
            </div>
          </Col>
          <Col l="6">
            <div style={styles.colItem}>
              <span style={styles.label}>身份证件号码 : </span>
              <span style={styles.label}>{customerInfo && customerInfo.idNo}</span>
            </div>
          </Col>
          <Col l="6">
            <div style={styles.colItem}>
              <span style={styles.label}>身份证件有效期 : </span>
              <span>{customerInfo && customerInfo.idExpireDate}</span>
            </div>
          </Col>
        </Row>
        <Row getters="24">
          <Col l="6">
            <div style={styles.colItem}>
              <span style={styles.label}>英文姓 : </span>
              <span>{customerInfo && customerInfo.lastName}</span>
            </div>
          </Col>
          <Col l="6">
            <div style={styles.colItem}>
              <span style={styles.label}>英文名 : </span>
              <span>
                {customerInfo &&
                  customerInfo.middleName + customerInfo &&
                  customerInfo.firstName}
              </span>
            </div>
          </Col>
          <Col l="6">
            <div style={styles.colItem}>
              <span style={styles.label}>出生日期 : </span>
              <span style={styles.label}>
                {customerInfo && customerInfo.birthDate}
              </span>
            </div>
          </Col>
          <Col l="6">
            <div style={styles.colItem}>
              <span style={styles.label}>性别 : </span>
              {customerInfo && customerInfo.sex ? (
                <span>{SEX.find(v => v.code === customerInfo.sex).desc}</span>
              ) : null}
            </div>
          </Col>
        </Row>
        <Row getters="24">
          <Col l="24">
            <div style={styles.colItem}>
              <span style={styles.label}>身份证地址 : </span>
              <span>{customerInfo && customerInfo.idAddress}</span>
            </div>
          </Col>
        </Row>
        {customerInfo && customerInfo.usedNameResp &&
          customerInfo.usedNameResp.map((item, index) => {
            return (
              <Row getters="24" key={index}>
                <Col l="6">
                  <div style={styles.colItem}>
                    <span style={styles.label}>曾用姓 : </span>
                    <span>{item.surname}</span>
                  </div>
                </Col>
                <Col l="6">
                  <div style={styles.colItem}>
                    <span style={styles.label}>曾用名 : </span>
                    <span>{item.givenName}</span>
                  </div>
                </Col>
                <Col l="6">
                  <div style={styles.colItem}>
                    <span style={styles.label}>曾用英文姓 : </span>
                    <span>{item.lastName}</span>
                  </div>
                </Col>
                <Col l="6">
                  <div style={styles.colItem}>
                    <span style={styles.label}>曾用英文名 : </span>
                    <span>
                      {(item && item.middleName) || ''}
                      {item.firstName}
                    </span>
                  </div>
                </Col>
              </Row>
            );
          })}
        <Row getters="24">
          <Col l="6">
            <div style={styles.colItem}>
              <span style={styles.label}>国籍 : </span>
              <span>{customerInfo && customerInfo.nationality}</span>
            </div>
          </Col>
          <Col l="6">
            <div style={styles.colItem}>
              <span style={styles.label}>出生国家/地区 : </span>
              <span>{customerInfo && customerInfo.countryArea}</span>
            </div>
          </Col>
          <Col l="6" />
          <Col l="6" />
        </Row>
      </Card>
    );
  };

  render() {
    const { idPicUrl } = this.state;
    const { customerInfo } = this.props;
    return (
      <div className="customer">
        {customerInfo && this.renderLandUser(customerInfo)}

        <Card style={{ margin: "10px 0" }}>
          <Row getters="24">
            <Col l="6">
              <div style={styles.colItem}>
                <span style={styles.label}>常住国家区域 : </span>
                <span>{customerInfo && customerInfo.liveCountryDesc}</span>
              </div>
            </Col>
            <Col l="6">
              <div style={styles.colItem}>
                <span style={styles.label}>常住地区 : </span>
                <span>
                  {customerInfo &&
                    customerInfo.liveProvinceDesc + customerInfo.liveCityDesc}
                </span>
              </div>
            </Col>
            <Col l="12">
              <div style={styles.colItem}>
                <span style={styles.label}>常住地址 : </span>
                <span>{customerInfo && customerInfo.liveAddress}</span>
              </div>
            </Col>
          </Row>
          <Row getters="24">
            <Col l="6">
              <div style={styles.colItem}>
                <span style={styles.label}>居住证明 : </span>
                {customerInfo && customerInfo.addressFileGroupUrl ? (
                  <div
                    style={styles.checkView}
                    onClick={() =>
                      this.viewCard(
                        customerInfo && customerInfo.addressFileGroupUrl
                      )
                    }
                  >
                    <ImageViewer options={{ url: 'data-src' }}>
                      <img
                        className="img-viewer"
                        src=""
                        data-content="点击查看>"
                        alt=""
                        data-src={idPicUrl}
                      />
                    </ImageViewer>
                  </div>
                ) : null}
              </div>
            </Col>
            <Col l="6">
              <div style={styles.colItem}>
                <span style={styles.label}>常住地址是否与身份证住址一致 : </span>
                {customerInfo && customerInfo.isIdcardAddress ? (
                  <span style={styles.label}>
                    {
                      IS_IDCARD_ADDRESS.find(
                        v => v.code === customerInfo.isIdcardAddress
                      ).desc
                    }
                  </span>
                ) : null}
              </div>
            </Col>
          </Row>
        </Card>

        <Card style={{ margin: "10px 0" }}>
          <Row getters="24">
            <Col l="6">
              <div style={styles.colItem}>
                <span style={styles.label}>职业信息 : </span>
                <span>{customerInfo && customerInfo.careerTypeDesc}</span>
              </div>
            </Col>
            <Col l="6">
              <div style={styles.colItem}>
                <span style={styles.label}>工作单位 : </span>
                <span>{customerInfo && customerInfo.workCompany}</span>
              </div>
            </Col>
            <Col l="6">
              <div style={styles.colItem}>
                <span style={styles.label}>职位 : </span>
                <span>{customerInfo && customerInfo.workPosition}</span>
              </div>
            </Col>
            <Col l="6">
              <div style={styles.colItem}>
                <span style={styles.label}>年收入 : </span>
                <span>{customerInfo && customerInfo.netIncome && formatAmount(customerInfo.netIncome)}</span>
              </div>
            </Col>
          </Row>
        </Card>


        {customerInfo && customerInfo.taxInfoResp &&
          <Card  style={{ margin: "10px 0" }}> {customerInfo.taxInfoResp.map((item, index) => {
            return (
              <Row getters="24" key={index}>
                <Col l="6">
                  <div style={styles.colItem}>
                    <span style={styles.label}>纳税国家地区 : </span>
                    <span>{item.taxNationalArea}&nbsp;&nbsp;</span>
                  </div>
                </Col>
                <Col l="6">
                  <div style={styles.colItem}>
                    <span style={styles.label}>纳税人识别号 : </span>
                    <span>{item.taxpayerNo}&nbsp;&nbsp;</span>
                  </div>
                </Col>
              </Row>
            );
          })}</Card>}

        <Card  style={{ margin: "10px 0" }}>
          <Row getters="24">
            <Col l="6">
              <div style={styles.colItem}>
                <span style={styles.label}>开户目的 : </span>
                <span>
                  {customerInfo &&
                    openAccountReasonType[customerInfo.openAccountReasonType]}
                </span>
              </div>
            </Col>
            <Col l="6">
              <div style={styles.colItem}>
                <span style={styles.label}>年收入证明材料 : </span>
                {customerInfo && customerInfo.incomeGroupUrl ? (
                  <div
                    style={styles.checkView}
                    onClick={() =>
                      this.viewCard(customerInfo && customerInfo.incomeGroupUrl)
                    }
                  >
                    <ImageViewer options={{ url: 'data-src' }}>
                      <img
                        className="img-viewer"
                        src=""
                        data-content="点击查看>"
                        alt=""
                        data-src={idPicUrl}
                      />
                    </ImageViewer>
                  </div>
                ) : null}
              </div>
            </Col>
            <Col l="6">
              <div style={styles.colItem}>
                <span style={styles.label}>资金来源材料 : </span>
                {customerInfo && customerInfo.captialSourceGroupUrl ? (
                  <div
                    style={styles.checkView}
                    onClick={() =>
                      this.viewCard(
                        customerInfo && customerInfo.captialSourceGroupUrl
                      )
                    }
                  >
                    <ImageViewer options={{ url: 'data-src' }}>
                      <img
                        className="img-viewer"
                        src=""
                        data-content="点击查看>"
                        alt=""
                        data-src={idPicUrl}
                      />
                    </ImageViewer>
                  </div>
                ) : null}
              </div>
            </Col>
          </Row>
        </Card>
      </div>
    );
  }
}

const styles = {
  colItem: {
    display: 'flex',
    alignItems: 'center',
    height: '40px',
    lineHeight: '40px',
  },
  label: {
    display: 'inline-block',
    marginRight: '5px',
    whiteSpace: 'nowrap',
  },
  checkView: {
    color: '#2B7FFF',
    minWidth: '100px',
  },
};
