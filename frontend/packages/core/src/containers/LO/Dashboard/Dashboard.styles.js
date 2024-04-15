import styled, { createGlobalStyle } from 'styled-components';
import { palette } from 'styled-theme';
import SearchIcon from '@iso/assets/images/icon/search.svg';

export const DashboardGlobalStyles = createGlobalStyle`
body {
  -webkit-overflow-scrolling: touch;
}

html h1,
html h2,
html h3,
html h4,
html h5,
html h6,
html a,
html p,               
html li,
input,
textarea,
span,
div,
html,
body,
html a {
  margin-bottom: 0;
  font-family: 'Heebo', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.004);
}

html ul {
  -webkit-padding-start: 0px;
  list-style: none;
  margin-bottom: 0;
}

.scrollbar-track-y,
.scrollbar-thumb-y {
  width: 5px !important;
}

.scrollbar-track-x,
.scrollbar-thumb-x {
  height: 5px !important;
}

.scrollbar-thumb {
  border-radius: 0 !important;
}

.scrollbar-track {
  background: rgba(222, 222, 222, 0.15) !important;
}

.scrollbar-thumb {
  border-radius: 0 !important;
  background: rgba(0, 0, 0, 0.5) !important;
}

.ant-popover-placement-bottom > .ant-popover-content > .ant-popover-arrow:after,
.ant-popover-placement-bottomLeft
  > .ant-popover-content
  > .ant-popover-arrow:after,
.ant-popover-placement-bottomRight
  > .ant-popover-content
  > .ant-popover-arrow:after,
.ant-popover-placement-top > .ant-popover-content > .ant-popover-arrow:after,
.ant-popover-placement-topLeft
  > .ant-popover-content
  > .ant-popover-arrow:after,
.ant-popover-placement-topRight
  > .ant-popover-content
  > .ant-popover-arrow:after {
  left: 0;
  margin-left: -4px;
}

/* Instagram Modal */

.ant-modal-wrap.instagram-modal .ant-modal {
  max-width: 935px;
  width: 100% !important;
}

@media only screen and (max-width: 991px) {
  .ant-modal-wrap.instagram-modal .ant-modal {
    padding: 0 60px;
  }
}

@media only screen and (max-width: 767px) {
  .ant-modal-wrap.instagram-modal .ant-modal {
    max-width: 580px;
  }
}

.ant-modal-wrap.instagram-modal .ant-modal-content {
  border-radius: 0;
}

.ant-modal-wrap.instagram-modal .ant-modal-content button.ant-modal-close {
  position: fixed;
  color: #fff;
}

.ant-modal-wrap.instagram-modal .ant-modal-content button.ant-modal-close i {
  font-size: 24px;
}

.ant-modal-wrap.instagram-modal .ant-modal-content .ant-modal-body {
  padding: 0;
}

/********** Add Your Global RTL CSS Here **********/

/* Popover */

html[dir='rtl'] .ant-popover {
  text-align: right;
}

/* Ecommerce Card */

html[dir='rtl'] .isoCardInfoForm .ant-input {
  text-align: right;
}

/* Modal */

html[dir='rtl'] .has-success.has-feedback:after,
html[dir='rtl'] .has-warning.has-feedback:after,
html[dir='rtl'] .has-error.has-feedback:after,
html[dir='rtl'] .is-validating.has-feedback:after {
  left: 0;
  right: auto;
}

html[dir='rtl'] .ant-modal-close {
  right: inherit;
  left: 0;
}

html[dir='rtl'] .ant-modal-footer {
  text-align: left;
}

html[dir='rtl'] .ant-modal-footer button + button {
  margin-left: 0;
  margin-right: 8px;
}

html[dir='rtl'] .ant-confirm-body .ant-confirm-content {
  margin-right: 42px;
}

html[dir='rtl'] .ant-btn > .anticon + span,
html[dir='rtl'] .ant-btn > span + .anticon {
  margin-right: 0.5em;
}

html[dir='rtl'] .ant-btn-loading span {
  margin-left: 0;
  margin-right: 0.5em;
}

html[dir='rtl']
  .ant-btn.ant-btn-loading:not(.ant-btn-circle):not(.ant-btn-circle-outline) {
  padding-left: 25px;
  padding-right: 29px;
}

html[dir='rtl']
  .ant-btn.ant-btn-loading:not(.ant-btn-circle):not(.ant-btn-circle-outline)
  .anticon {
  margin-right: -14px;
  margin-left: 0;
}

/* Confirm */

html[dir='rtl'] .ant-modal.ant-confirm .ant-confirm-body > .anticon {
  margin-left: 16px;
  margin-right: 0;
  float: right;
}

html[dir='rtl'] .ant-modal.ant-confirm .ant-confirm-btns {
  float: left;
}

html[dir='rtl'] .ant-modal.ant-confirm .ant-confirm-btns button + button {
  margin-right: 10px;
  margin-left: 0;
}

/* Message */

html[dir='rtl'] .ant-message .anticon {
  margin-left: 8px;
  margin-right: 0;
}

/* Pop Confirm */

html[dir='rtl'] .ant-popover-message-title {
  padding-right: 20px;
  padding-left: 0;
}

html[dir='rtl'] .ant-popover-buttons {
  text-align: left;
}

/* Notification */

html[dir='rtl']
  .ant-notification-notice-closable
  .ant-notification-notice-message {
  padding-left: 24px;
  padding-right: 0;
}

html[dir='rtl']
  .ant-notification-notice-with-icon
  .ant-notification-notice-message,
html[dir='rtl']
  .ant-notification-notice-with-icon
  .ant-notification-notice-description {
  margin-right: 48px;
}

html[dir='rtl'] .ant-notification-notice-close {
  right: auto;
  left: 16px;
}

html[dir='rtl'] .ant-notification-notice-with-icon {
  left: 0;
}

/* Dropzone */

html[dir='rtl'] .dz-hidden-input {
  display: none;
}

/* Activity tab */
.isoContentMainLayout{
  .activityUserMainHeader{
    padding-right: 15px;
    .ant-typography{
      margin-bottom: 20px;
    }
  }
  @media (max-width: 767px){
    .activityUserMainHeader{
      padding-right: 25px;
      padding-left: 45px;
    }
  }
  @media (max-width: 575px){
    .activityUserMainHeader{
      padding-right: 15px;
      padding-left: 35px;
    }
    .isoLayoutHeaderActionWrapper{
      .ant-row{
        .ant-col{
          .ant-form-item{
            .ant-form-item-label{
              padding: 0px 10px 0 0;
            }
          }
        }
      }
      >.ant-row{
        >.ant-col{
          padding: 15px 0 0;
        }
      }
    }
  }
}
.isoLayoutHeaderActionWrapper{
  .ant-row{
    align-items:center;
    &.ant-form-item{
      margin-bottom: 0px;
    }
    .userDetailButton{
      display: flex;
      justify-content: flex-end;
      .userDetailDelete{
        min-width: auto;
        margin-left: 15px;
      }
    }
    .ant-btn{
      padding: 0 19px;
      &.ant-btn-primary{
        min-width: auto;
      }
    }
    .ant-btn-tag{
      padding: 0px;
      min-width: auto;
    }
    .ant-form-item-control{
      .ant-select-arrow{
        top: 48%;
      }
    }
    .searchUsers{
      padding: 0px !important;
      margin-left: auto;
      .ant-form-item-control-input-content{
        position: relative;
        &:after{
          content: '';
          position: absolute;
          right: 7px;
          top: 50%;
          transform: translateY(-50%);
          width: 18px;
          height: 18px;
          background-image: url(${SearchIcon});
          background-repeat: no-repeat;
          background-size: 18px auto;
          background-position: center;
          cursor: pointer;
        }
        .ant-input{
          padding: 6px 30px 6px 10px;
        }
      }
    }
  }
  @media (max-width: 1199px){
    .ant-row{
      .searchUsers{
        padding: 15px 12.5px 0px !important;
        margin-left: 0px;
        &.altSearchUser{
          margin-left: auto;
          padding: 0px !important;
        }
      }
    }
  }
  @media (max-width: 991px){
    .ant-row{
      .generateReportBtn{
        padding: 15px 0 0 0;
        &.activityCalculations{
          padding: 0px;
        }
      }
      .userDetailButton{
        justify-content: flex-start;
        margin-top: 15px;
      }
      .searchUsers{
        &.altSearchUser{
          margin-left: 0;
          padding: 15px 12.5px 0px !important;
        } 
      }
    }
  }
  @media (max-width: 575px){
    .ant-row{
      .generateReportBtn{
        &.activityCalculations{
          padding: 15px 0 0 0;
        }
      }
      .searchUsers{
        .ant-form-item-control-input-content{
          &:after{
            width: 16px;
            height: 16px;
            background-size: 15px auto;
          }
        }
      }
    }
    .exportToSelect, .exportBtn, .pushNotificationBtn, .generateReportBtn{
      flex: 0 0 50%;
      max-width: 50%;
    }
  }
  @media (max-width: 480px){
    .exportToSelect, .exportBtn, .pushNotificationBtn, .generateReportBtn{
      flex: 0 0 100%;
      max-width: 100%;
    }
  }
}

/* Co-Branding */
.coBrandingHeader{
  .ant-typography{
    margin-bottom: 20px !important;
  }
  .addCoBrandingBtn{
    margin-left: auto;
    padding: 0px !important;
    text-align: right;
  }
  @media (max-width: 767px){
    .addCoBrandingBtn{
      margin-left: 0px;
    }
  }
  @media (max-width: 575px){
    padding-left: 35px !important;
    .addCoBrandingBtn{
      text-align: left;
      margin-left: 0px;
      padding: 15px 12.5px !important;
    }    
  }
}
/* */

/* pdf viewer styling */
.pdf-stl > canvas{
  max-width:700px;
}

.isoLayoutContentWrapper{
  .commonWidgetBox{
    width: 100%;
    .commonWidgetTitle{
      padding: 25px 30px;
      margin: 0px;
    }
    .isoWidgetBox{
      padding: 0px;
      border: 0px;
      .isoSimpleTable{
        .ant-table-thead{
          > tr{
            > th{
              color: ${palette('label', 0)};
              font-size: 12px;
              line-height: 16px;
            }
          }
          tr{
            th{
              &.callbackComments{
                width: 400px;
              }
            }
            &:first-child{
              th{
                &:first-child{
                  padding-left: 30px;
                }
                &:last-child{
                  padding-right: 30px;
                }
              }
            }
          }
        }
        .ant-table-tbody{
          tr{
            td{
              font-size: 15px;
              line-height: 22px;
              color: ${palette('text', 0)};
              &.callbackComments{
                word-break: break-word;
                white-space: break-spaces;
              }
              &:first-child{
                padding-left: 30px;
              }
              &:last-child{
                padding-right: 30px;
              }
            }
          }
          .table-action-btns-grp{
            button{
              padding: 0px;
              border: 0px;
              cursor: pointer;
            }
            .ant-col:not(:first-child){
              margin-left: 20px;
            }
          }
        }
        .ant-spin-container{
          .ant-pagination{
            padding: 0 40px 0 0;
            .ant-pagination-prev, .ant-pagination-next{
              border: 0px;
            }
          }
        }
      }
    }
    .viewUserDetailActivity, .contentChecklists{
      .isoSimpleTable {
        .ant-table-thead {
          tr:first-child {
            th:first-child{
              padding-left: 20px;
            }
          }
        }
        .ant-table-tbody{
          tr{
            td:first-child{
              padding-left: 20px;
            }
          }
        }
        .ant-table-footer{
          padding: 30px 20px;
          .ant-btn{
            min-width: auto;
          }
          .ant-btn-tag{
            padding: 0px;
            &.checklistsTagBtn{
              margin-left: 25px;
            }
          }
        }
      }
    }
  }
  .userPushNotification{
    width: 100%;
    .commonWidgetTitle{
      padding: 25px 30px;
      margin: 0px;
      border-bottom: 1px solid ${palette('border', 0)}; 
    }
    .isoWidgetsWrapper{
      padding: 30px 30px 0px;
      .isoWidgetBox{
        border: 0px;
        border-top: 1px solid ${palette('border', 0)};
        border-bottom: 1px solid ${palette('border', 0)};
        textarea{
          border: 1px solid ${palette('grayscale', 12)};
          border-radius: 2px;
        }
      }
    }
    .submitbtnwrapper{
      padding: 30px;
      width: 100%;
      border-top: 1px solid ${palette('border', 0)}; 
      .ant-btn{
        min-width: auto;
      }
    }
  }
  @media (max-width: 1024px){
    .commonWidgetBox{
      .isoWidgetBox {
        .isoSimpleTable {
          .ant-table-tbody {
            tr {
              td{
                &.callbackComments{
                  width:400px; 
                  display:table;
                  white-space: pre-wrap;
                  white-space: -moz-pre-wrap;
                  white-space: -pre-wrap;
                  white-space: -o-pre-wrap;
                  word-wrap: break-word;
                }
              }
            }
          }
        }
      }          
    }
  }
  @media (max-width: 767px){
    .commonWidgetBox{
      .commonWidgetTitle{
        padding: 20px;
      }
      .viewUserDetailActivity .isoSimpleTable .ant-table-footer, 
      .contentChecklists .isoSimpleTable .ant-table-footer{
        padding: 20px 15px;
      }
    }
  }
}

.isoLayoutHeaderActionWrapper{
  .userDetailMainHeader{
    margin-top: 20px;
    width: 100%;
    align-items: start;
    .userDetailHeaderLeft{
      width: 100%;
      align-items: center;
      .ant-form-item-control-input{
        .ant-form-item-control-input-content{
          color: ${palette('text', 0)};
        }
      }
    }
  }
}

.addNewContentChecklist{
  width: 100%;
  > div{
    background-color: transparent;
    border: 0px;
  }
  .isoInputWrapper{
    padding: 30px;
    background-color: ${palette('text', 5)};
    .contentChecklistLabel{
      margin-right: 30px;
      label{
        margin-bottom: 0px;
        width: 100%;
        text-align: right;
      }
    }
    .ant-form-item{
      margin-bottom: 0px;
    }
    &.contentChecklistName{
      margin-bottom: 30px;
      border: 1px solid ${palette('border', 0)};
      .ant-row{
        align-items: center;
      }
    }
    &.contentChecklistsItems{
      border: 1px solid ${palette('border', 0)};
      border-bottom: 0px;
      .ant-row{
        align-items: center;
      }
      .contentChecklistSavebtn{
        margin-left: auto;
        .ant-btn{
          min-width: auto;
        }
      } 
    }
  }
  .contentChecklistTable{
    border: 1px solid ${palette('border', 0)};
    border-top: 0px;
    .isoSimpleTable {
      .ant-table-thead{
        tr:first-child{
          th:first-child{
            padding-left: 14px;
          }
        }
        tr:first-child{
          th:last-child{
            padding-left: 14px;
          }
        }
      }
      .ant-table-tbody{
        tr{
          td:first-child{
            padding-left: 30px;
          }
          td:last-child{
            padding-left: 30px;
          }
        }
        .table-action-btns-grp{
          button{
            padding: 0px;
            border: 0px;
            cursor: pointer
          }
        } 
      }
      .ant-spin-container{
        .ant-pagination{
          padding: 0 40px 0 0;
          .ant-pagination-prev, .ant-pagination-next{
            border: 0px;
          }
        }
      } 
    }
  }
}

/* auto responder */
.autoResponderContent{
  padding-top: 20px;
}
.autoResponderEditor {
  margin-left: 3.7%;
  @media (max-width: 991px){
    margin-left: 0px;
  }
}
.isoLayoutContentWrapper{
  .dashboardButtonwrapper{
    .responderRestoreDefault{
      border: 0px;
      padding: 0px;
      min-width: auto;
    }
  }
}

/* */

/* share app */
.shareAppMainWrapper{
  .isoBoxChildrenWrapper{
    margin: 0px;
    padding: 30px;
    .numberAddressWrapper{
      position:relative;
      margin-bottom: 20px;
      .separator-label{
        position: absolute;
        top: 50%;
        left: 53%;
        transform: translateY(-50%);
        color: ${palette('text', 0)};
      }
      .ant-form-item{
        margin-bottom: 0px;
      }
    }
    .shareAppMessage{
      margin-left: 2.5%;
    }
  }
  @media (max-width: 1024px){
    .isoBoxChildrenWrapper{
      .numberAddressWrapper{
        .separator-label{
          left: 52%;
        }
      }
    }
  }
  @media (max-width: 991px){
    .isoBoxChildrenWrapper{
      .numberAddressWrapper{
        .separator-label{
          position: relative;
          margin: 15px 0;
          left: 50%;
          transform: translateX(-50%);
        }
      }
      .shareAppMessage{
        margin-left: 0%;
      }
    } 
  }
  @media (max-width: 575px){
    .isoBoxChildrenWrapper{
      padding: 20px;
    }
    .isoBoxFooterWrapper{
      padding: 20px;
    }
  }
}
/* */

/* faqs */
.supportFaqsWrapper{
  .ant-collapse{
    border: 0px;
    background-color: transparent;
    .ant-collapse-item{
      border-bottom: 0px;
      border: 1px solid ${palette('border', 0)};
      margin-bottom: 30px;
      &:last-child{
        border: 1px solid ${palette('border', 0)};
      }
      .ant-collapse-header{
        padding: 30px;
        font-size: 16px;
        color: ${palette('text', 0)};
        font-weight: 700;
        background-color: #fff;
        .anticon{
          display: none;
        }
        &:before{
          content: '';
          position: absolute;
          width: 0px;
          height: 0px;
          border-left: 5px solid transparent;
          border-right: 5px solid transparent;
          border-top: 8px solid #1F2428;
          right: 30px;
          top: 50%;
          transform: translateY(-50%);
        }
      }
      .ant-collapse-content{
        border-top: 1px solid ${palette('border', 0)};
        color: ${palette('label', 0)};
        .ant-collapse-content-box{
          padding: 30px;
        }
      }
      &.ant-collapse-item-active{
        .ant-collapse-header{
          &:before{
            transform:rotate(-180deg);
          }
        }
      }
    }
  }
  @media (max-width: 575px){
    .ant-collapse {
      .ant-collapse-item {
        .ant-collapse-header{
          padding: 20px;
        }
        .ant-collapse-content {
          .ant-collapse-content-box{
            padding: 20px;
          }
        }  
      }
    }    
  }
}
/* */

/* Branded app */
.brandedAppTitle{
  .ant-typography{
    margin-bottom: 20px !important;
  }
  .customTabHeaderItems {
    flex-wrap: nowrap;
    white-space: nowrap;
    overflow: auto;
  }
}
.brandedAppInfoContent{
  .isoBoxChildrenWrapper{
    margin: 0px;
    padding: 30px;
    .isoWidgetsWrapper{
      color: ${palette('text', 0)};
      p{
        margin-bottom: 20px;
        &:last-child{
          margin-bottom: 0px;
        }
      }
    }
  }
  @media (max-width: 575px){
    .isoBoxChildrenWrapper, .isoBoxFooterWrapper{
      padding: 20px;
    }
  }
}

.brandedAppApply{
  .isoBoxChildrenWrapper{
    margin: 0px;
    padding: 30px 30px 10px;
  }
  .isoBoxFooterWrapper{
    .brandedAppBtnWrapper{
      .ant-btn{
        &+.ant-btn{
          margin-left: 20px;
        }
      }
    }
  }
  @media (max-width: 575px){
    .isoBoxChildrenWrapper{
      padding: 20px 20px 10px;
    }
    .isoBoxFooterWrapper{
      padding: 20px;
    }
  }
  @media (max-width: 480px){
    .isoBoxFooterWrapper{
      .brandedAppBtnWrapper{
        .ant-btn{
          &+.ant-btn{
            margin-left: 0px;
            margin-top: 15px;
          }
        }
      }
    }
  }
}

.commonBrandedApp{
  &.billingDetails{
    padding-bottom: 0px;
  }
  .isoBoxWrapper{
    padding: 0px;
    border: 0px;
    .isoBoxHeaderWrapper{
      padding: 30px;
      margin-bottom: 0px;
    }
    .isoBoxChildrenWrapper{
      margin: 0px;
      padding: 30px;
      .isoWidgetsWrapper{
        .ant-row{
          margin-bottom: 20px;
          .label{
            color: ${palette('label', 0)};
          }
          .value{
            color: ${palette('text', 0)};  
          }
          &:last-child{
            margin-bottom: 0px;
          }
          .expiryDateColumn{
            .ant-col{
              .exportSelectInput{
                width: 48%;
                &+.exportSelectInput{
                  margin-left: 10px;
                }
              }
            }
          }
        }
      }
    }
    .isoBoxFooterWrapper{
      .cardDetailsBtnWrapper{
        .ant-btn{
          &+.ant-btn{
            margin-left: 30px;
          }
        }
      }
    }  
  }
  @media (max-width: 991px){
    .isoBoxWrapper {
      .isoBoxChildrenWrapper {
        .isoWidgetsWrapper {
          .ant-row {
            .expiryDateColumn {
              margin-left: 0%;
              .ant-col {
                .exportSelectInput{
                  &+.exportSelectInput{
                    margin-left: 7px;
                  }
                }
              }  
            }
          }
        }
      }
    }      
  }
  @media (max-width: 767px){
    .isoBoxWrapper {
      .isoBoxChildrenWrapper {
        .isoWidgetsWrapper {
          .ant-row {
            .expiryDateColumn{
              margin-top: 20px;
              .ant-col {
                .exportSelectInput{
                  &+.exportSelectInput{
                    margin-left: 4%;
                  }
                }
              }    
            }
            .paymentCityDropdown{
              margin-bottom: 20px;
            }
          }
        }
      }
    }          
  }
  @media (max-width: 575px){
    .isoBoxWrapper {
      .isoBoxHeaderWrapper{
        padding: 20px;
      }
      .isoBoxChildrenWrapper {
        padding: 20px;
        .isoWidgetsWrapper {
          .ant-row {
            .expiryDateColumn{
              .ant-col {
                .exportSelectInput{
                  width: 100%;
                  &+.exportSelectInput{
                    margin-left: 0;
                    margin-top: 20px;
                  } 
                }
              }
            }
          }
        }
      }
      .isoBoxFooterWrapper{
        padding: 20px;
      }
    }            
  }
  @media (max-width: 480px){
    .isoBoxWrapper {
      .isoBoxFooterWrapper {
        .cardDetailsBtnWrapper {
          .ant-btn{
            &+.ant-btn{
              margin-left: 0px;
              margin-top: 15px;
            }
          }
        }
      }
    }        
  }
}

.addUserExisting{
  padding-bottom: 0px !important;
  .commonWidgetBox{
    width: 100%;
    .isoBoxWrapper{
      padding: 0px;
      .isoBoxHeaderWrapper{
        padding: 30px;
        margin: 0px;
      }
      .isoBoxChildrenWrapper{
        padding: 0px;
        margin: 0px;
        .isoSimpleTable{
          .ant-table-content{
            .ant-table-thead{
              tr{
                th{
                  color: ${palette('label', 0)};
                  .ant-table-column-sorters{
                    .ant-space-item{
                      color: ${palette('label', 0)};
                    }
                  }  
                  &:first-child{
                    .ant-table-column-sorters{
                      padding-left: 30px;
                    }
                  }
                }  
              }
            }
            .ant-table-tbody{
              tr{
                .ant-table-cell{
                  color: ${palette('text', 0)};
                  font-size: 14px;
                  &:first-child{
                    padding-left: 30px;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  @media (max-width: 575px){
    .commonWidgetBox {
      .isoBoxWrapper {
        .isoBoxHeaderWrapper{
          padding: 20px;
        }
      }
    }    
  }
}

.addUserLo{
  .isoBoxWrapper{
    padding: 0px;
    .isoBoxHeaderWrapper{
      padding: 30px;
      margin-bottom: 0px;
    }
    .isoBoxChildrenWrapper{
      padding: 30px;
      margin: 0px;
    }
  }
  @media (max-width: 575px){
    .isoBoxWrapper{
      .isoBoxHeaderWrapper{
        padding: 20px;
      }
      .isoBoxChildrenWrapper{
        padding: 20px;
      }
    }
  }  
}

/* email signature */
.emailSignatureImgWrapper {
    img {
      height: 300px;
      width: 300px;
      object-fit: contain;
    }
  }
  
.marketingEmailsignature{
  > div{
    border: 0px;
  }
  padding-bottom: 0px !important;
  .isoBoxWrapper{
    padding: 0px;
    .isoBoxHeaderWrapper{
      padding: 30px;
      margin: 0px;
    }
    .isoBoxChildrenWrapper{
      padding: 30px 30px 10px;
      margin: 0px;
      .ant-row{
        align-items: center;
        .ant-col{
          .ant-skeleton-element{
            .ant-skeleton-input{
              background-color: #C4C4C4;
              width: 300px;
              display: inline-block;
              height: 100px;
              border-radius: 4px;
            }
          }
          .ant-radio-wrapper{
            .ant-radio{
              &:hover{
                .ant-radio-inner{
                  border-color: #74BB39;
                }    
              }
              .ant-radio-input{
                &:focus{
                  &+ .ant-radio-inner{
                    border-color: #74BB39;
                    box-shadow: 0 0 0 3px rgba(116,187,57,0.08);  
                  }
                }
              }
              &.ant-radio-checked {
                .ant-radio-inner{
                  border-color: #74BB39;
                  &:after{
                    background-color: #74BB39;
                  }
                }
              }  
            }
            &:hover{
              .ant-radio{
                border-color: #74BB39;
              }
            }
          }
        }
      }
    }
    .isoBoxFooterWrapper{
      .imageListBtnWrapper{
        .ant-btn{
          &.submitBtn{
            margin-right: 20px;
          }
        }
      }
    }
  }
  @media(max-width: 575px){
    .isoBoxWrapper {
      .isoBoxHeaderWrapper, .isoBoxFooterWrapper{
        padding: 20px;
      }
      .isoBoxChildrenWrapper{
        padding: 20px 20px 10px;
      }
    }  
  }
  @media(max-width: 480px){
    .isoBoxWrapper {
      .isoBoxFooterWrapper {
        .imageListBtnWrapper {
          .ant-btn.submitBtn{
            margin-right: 0px;
            margin-bottom: 15px;
          }
        }
      }
    }      
  }
  @media(max-width: 400px){
    .isoBoxWrapper {
      .isoBoxChildrenWrapper {
        .ant-row {
          .ant-col {
            .ant-skeleton-element {
              .ant-skeleton-input{
                width: 190px;
                height: 70px;
              }
            }
          }
        }
      }
    }          
  }
}

.marketingSourceCode{
   > div{
    border: 0px;
  }
  .isoBoxWrapper{
    padding: 0px;
    .isoBoxHeaderWrapper{
      padding: 30px;
      margin: 0px;
    }
    .isoBoxChildrenWrapper{
      padding: 30px;
      margin: 0px;
    }
  }
  @media(max-width: 575px){
    .isoBoxWrapper {
      .isoBoxHeaderWrapper, .isoBoxChildrenWrapper, .isoBoxFooterWrapper{
        padding: 20px;
      }
    }
  }
}
/* */

.rearrangecolumn {
  width:90%;
}


.row-dragging {
  background: #fafafa;
  border: 1px solid #ccc;
}

.row-dragging td {
  padding: 16px;
  visibility: hidden;
}

.row-dragging .drag-visible {
  visibility: visible;
}


/* subscription */
.subscriptionCurrent{
  padding: 30px 0px 30px 30px !important;
  >div{
    border: 0px;
  }
  .isoBoxWrapper{
    padding-bottom: 0px;
    .isoBoxHeaderWrapper{
      padding: 30px;
      margin: 0px;
    }
    .isoBoxChildrenWrapper{
      padding: 30px;
      margin: 0px;
      .currentSubRow{
        margin-bottom: 20px;
        .label{
          color: ${palette('label', 0)};
        }
        .value{
          color: ${palette('text', 0)};
        }
        &:last-child{
          margin-bottom: 0px;
        }
      }
    }
  }
  @media (max-width:991px){
    padding: 30px 30px 0px !important;
  }
  @media (max-width:767px){
    .isoBoxWrapper{
      padding: 0px;
    }
  }
  @media (max-width:575px){
    padding: 15px 15px 0px !important;
    .isoBoxWrapper{
      .isoBoxHeaderWrapper{
        padding: 20px;
      }
      .isoBoxChildrenWrapper{
        padding: 20px;
      }
      .isoBoxFooterWrapper{
        padding: 20px;
      }
    } 
  }
}

.subscriptionApplyCode{
  padding: 30px !important;
  .commonWidgetBox{
    width: 100%;
    > div{
      border: 0px;
    }
  }
  .isoBoxWrapper{
    padding-bottom: 0px;
    .isoBoxHeaderWrapper{
      padding: 30px;
      margin: 0px;
    }
    .isoBoxChildrenWrapper{
      margin: 0px;
      padding: 0px;
      .isoWidgetsWrapper{
        .applyPromoCode{
          text-align: center;
          padding: 30px;
          border-bottom: 1px solid ${palette('border', 0)};
          .discountCodeNote{
            color: ${palette('text', 0)};
            display: inline-block;
            margin: 30px auto 0;
            width: 70%;
          }
        }
        .applyCodeBtn{
          margin: 30px;
        }
        .promoCodeStatusTable{
          .ant-table-content{
            .ant-table-thead{
              tr{
                th{
                  color: ${palette('label', 0)};
                  font-size: 12px;
                }
                &:first-child{
                  th{
                    &:first-child{
                      padding-left: 30px;
                    }
                  }
                }
              }
            }
            .ant-table-tbody{
              tr{
                td{
                  color: ${palette('text', 0)};
                  font-size: 15px;
                  &:first-child{
                    padding-left: 30px;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  @media (max-width:991px){
    padding: 30px 30px 0px !important;
  }
  @media (max-width:767px){
    .isoBoxWrapper{
      padding: 0px;
      .isoBoxChildrenWrapper {
        .isoWidgetsWrapper {
          .applyPromoCode {
            .discountCodeNote{
              width: 100%;
            }
          }
        }
      }      
    }
  }
  @media (max-width:575px){
    padding: 15px 15px 0px !important;
    .isoBoxWrapper{
      .isoBoxHeaderWrapper{
        padding: 20px;
      }
      .isoBoxChildrenWrapper{
        .isoWidgetsWrapper {
          .applyPromoCode{
            padding: 20px;
          }
          .applyCodeBtn{
            margin: 20px;
            width: calc(100% - 40px);
          }
          .promoCodeStatusTable {
            .ant-table-content {
              .ant-table-thead {
                tr{
                  &:first-child {
                    th{
                      &:first-child{
                        padding-left: 20px;
                      }
                    }
                  }
                }
              }
              .ant-table-tbody{
                tr {
                  td{
                    &:first-child{
                      padding-left: 20px;
                    }
                  }
                }    
              }
            }  
          }            
        }  
      }
      .isoBoxFooterWrapper{
        padding: 20px;
      }
    } 
  }
}

.learnMoreOwnApp{
  margin: 20px 40px 20px 20px;
  text-align: center;
  .ant-card-bordered{
    background-color: #BAFAC7;
    .learnMoreSec{
      font-weight: 700;
      font-size: 16px;
      color: ${palette('text', 0)};
      margin-bottom: 20px;
    }
  }
  @media(max-width: 991px){
    margin: 20px 30px;
  }
  @media(max-width: 575px){
    margin: 15px 15px;
  }
}


.learnMoreOwnAppError{
  margin: 0px 0px 20px 0px;
  text-align: center;
  .ant-card-bordered{
    background-color: #FFCCCF;
    .ant-card-body {
      padding: 18px 24px;
      .learnMoreSec{
        font-weight: 700;
        font-size: 16px;
        color: #EB4949;
        margin-bottom: 0px;
      }
    }
  }
  @media(max-width: 991px){
    margin: 20px 0px;
  }
  @media(max-width: 575px){
    margin: 15px 0px;
  }
}

@media (max-width: 991px){
.isoBoxWrapper {
.isoBoxChildrenWrapper{
.co-brand-form-item{
.ant-form-item-label{
text-align:left;
}
}
}
}
}
/* */


/* cancel subscribe */
.subscriptionSubscribe{
  > div{
    border: 0px;
  }
  .isoBoxWrapper{
    padding: 0px;
    .isoBoxChildrenWrapper{
      padding: 30px;
      margin: 0px;
      .ant-row{
        margin-bottom: 20px;
        .ant-col{
          .ant-row{
            margin-bottom: 0px;
          }
        }
        &:last-child{
          margin-bottom: 0px;
        }
      }
      .subscribePlanDetails{
        border: 1px solid #cacaca;
      }
      .expiryDateColumn{
        .isoWidgetsWrapper{
          .ant-row{
            .ant-col{
              .exportSelectInput{
                width: 48%;
                display: inline-block;
                &+.exportSelectInput{
                  margin-left: 4%;
                }
              }
            }
          }
        }
      }
    }
    .isoBoxFooterWrapper{
      .cancelSubscriptionWrapper{
        .ant-btn{
          &+.ant-btn{
            margin-left: 20px;
          }
        }
      }
    }
  }
  @media (max-width: 991px){
    .isoBoxWrapper {
      .isoBoxChildrenWrapper{
        .subscribeSelectPlan, .subscribeCityDropdown, .subscribeNameCard{
          margin-bottom: 20px;
        }
        .expiryDateColumn{
          margin-top: 20px;
        }
      }
    } 
  }
  @media (max-width: 575px){
    .isoBoxWrapper {
      .isoBoxChildrenWrapper{
        padding: 20px;
        .expiryDateColumn {
          .isoWidgetsWrapper {
            .ant-row {
              .ant-col {
                .exportSelectInput{
                  width: 100%;
                  &+.exportSelectInput{
                    margin-left: 0px;
                    margin-top: 15px;
                  }
                }
              }
            }
          }
        }        
      }
      .isoBoxFooterWrapper{
        padding: 20px;
      }
    }  
  }
  @media (max-width: 480px){
    .isoBoxWrapper {
      .isoBoxFooterWrapper{
        .cancelSubscriptionWrapper{
          .ant-btn{
            &+.ant-btn{
              margin-left: 0px;
              margin-top: 15px;
            }
          }  
        }
      }
    }
  }
}
/* */

/* ant form label */
.ant-form-item {
  .ant-form-item-label {
    > label{
      word-break: break-work;
      white-space: normal;
    }
  }
}    
/* */

.customScrollBarForChat{
  ::-webkit-scrollbar {
          width: 8px;
          border: 2px solid ${palette('border', 5)};
        }
        ::-webkit-scrollbar-track {
          border-radius: 0;
          background: #fff;
        }
        ::-webkit-scrollbar-thumb {
          border-radius: 0;
          background: ${palette('border', 5)};
        }
}

.ChatSettingWordBreak{
  word-wrap: break-word;
  display:inline-block;
  white-space:normal;
  word-break:break-word;
}

.ChatSettingWordBreak > div {
  text-align:left;
  display:inline-block;
  word-break:break-all;
}
.ChatSettingWordBreak > a {
  text-align:left;
  display:inline-block;
  word-break:break-all;
}

/* Support Guide */
.guideCommonSection{
  > .ant-row{
    width: 100%;
  }
  &.guideGeneralSection, &.guideSettingSection{
    padding-bottom: 0px;
  }
  .isoBoxWrapper{
    padding: 0px;
    .isoBoxHeaderWrapper{
      padding: 30px;
      margin: 0px;
    }
    .isoBoxChildrenWrapper{
      margin: 0px;
      padding: 30px 30px 15px 30px;
      .ant-row{
        padding-bottom: 15px;
        ::-webkit-scrollbar {
          height: 8px;
          border: 2px solid ${palette('border', 5)};
        }
        ::-webkit-scrollbar-track {
          border-radius: 0;
          background: #fff;
        }
        ::-webkit-scrollbar-thumb {
          border-radius: 0;
          background: ${palette('border', 5)};
        }
        .ant-col{
          margin-right: 30px;
        }
      }
      .guideTitle{
        font-size: 18px;
          color: ${palette('text', 0)};
          font-weight: 700;
          margin-bottom: 20px;
          display: inline-block;
          line-height: 24px;
      }
      iframe{
        width: 100%;
      }
      .guideDesc{
        font-size: 15px;
        color: ${palette('text', 0)};
        font-weight: 400;
        margin-top: 10px;
        display: inline-block;
      }
    }
  }
  @media (max-width: 767px){
    .isoBoxWrapper {
      .isoBoxChildrenWrapper {
        .guideTitle{
          font-size: 16px;
          margin-bottom: 12px;
        }
      }
    }    
  }
  @media (max-width: 575px){
    .isoBoxWrapper {
      .isoBoxHeaderWrapper{
        padding: 20px;
      }
      .isoBoxChildrenWrapper{
        padding: 20px 20px 10px 20px;
      }
    }  
  }
  @media (max-width: 400px){
    .isoBoxWrapper {
      .isoBoxChildrenWrapper {
        .guideTitle{
          font-size: 15px;
          margin-bottom: 10px;
        }
        .guideDesc{
          font-size: 14px;
        }
      }
    }    
  }
}
/* */

/* widget */
.widgetHeader{
  .ant-typography{
    margin-bottom: 20px !important;
  }
}

.commonWidgets{
  > div{
    border: 0px;
  }
  &.widgetPriceChartSection{
    .isoBoxWrapper{
      .isoBoxChildrenWrapper{
        > .ant-row{
          align-items: center;
        }
      }
    }
  }
  &.widgetAdvanced{
    .isoBoxWrapper{
      .isoBoxChildrenWrapper{
        padding: 30px 30px 10px;
      }
    }  
  }
  .isoBoxWrapper{
    padding: 0px;
    .isoBoxHeaderWrapper{
      padding: 30px;
      margin: 0px;
    }
    .isoBoxChildrenWrapper{
      padding: 30px;
      margin: 0px;
      .isoWidgetsWrapper{
        .widgetLabel{
          font-size: 15px;
          color: ${palette('label', 0)};
          display: inline-block;
          margin-bottom: 0px;
        }
        .ant-row{
          .widgetRateSlider{
            .ant-slider{
              margin: 17px 15px 17px 3px;
              padding: 1px 0;
              .ant-slider-rail{
                height: 9px;
                background-color: #D4D5DB;
                border-radius: 10px;
              }
              .ant-slider-track{
                height: 9px;
                border-radius: 10px;
                background-color: ${palette('primary', 0)};
              }
              .ant-slider-step{
                height: 9px;
              }
              .ant-slider-handle{
                height: 34px;
                border-radius: 5px;
                border: 0px;
                border: solid 2px ${palette('label', 0)};
                width: 0;
                margin-top: -12.5px;
                background-color: transparent;
                &.ant-tooltip-open{
                  background-color: ${palette('primary', 0)};
                }
                &:focus{
                  -webkit-box-shadow: 0 0 0 5px rgba(141, 142, 144, 0.12);
                  box-shadow: 0 0 0 5px rgba(141, 142, 144, 0.12);
                }
              }
              &:hover{
                .ant-slider-track{
                  background-color: ${palette('primary', 0)};   
                }
              }
            }
          }
          .widgetSliderInput{
            .ant-input-number{
              border: 1px solid #cacaca;
              .ant-input-number-input-wrap{
                input{
                  height: 44px;
                  border-radius: 4px;
                  color: ${palette('text', 0)};
                }
              }
            }
          }
        }
      }
      .ant-row{
        .ant-col{
          .ant-row{
            margin-bottom: 20px;
          }
          &.widgetInputGroupWrapper{
            .ant-form-item-control-input{
              .ant-input-group-wrapper{
                width: 48%;
                &+.ant-input-group-wrapper{
                  margin-left: 4%;
                }
              }
            }
          }
        }
      }
      .widgetChartSection{
        .isoWidgetsWrapper{
          .isoChartWrapper{
            display: inline-block;
            text-align: center;
            margin-left: 30px;
            .ant-typography{
              font-size: 16px;
              color: ${palette('label', 0)};
            }
            .recharts-wrapper{
              width: 170px !important;
              height: 170px !important;
              > .recharts-surface{
                width: 170px;
                height: 170px;
              }
              .recharts-legend-wrapper{
                margin-left: 50px;
                height: auto !important;
                width: 155px !important;
                top: -15px !important;
                ul{
                  &.recharts-default-legend{
                    li{
                      margin-right: 0px !important;
                      height: 40px;
                      margin-bottom: 10px;
                      line-height: 40px;
                      .recharts-surface{
                        width: 15px;
                        height: 15px;
                        margin-right: 15px !important;
                      }
                      .recharts-legend-item-text{
                        font-size: 14px;
                        color: ${palette('label', 0)};
                      }
                      &:last-child{
                        margin-bottom: 0px;
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  @media(max-width: 1199px){
    .isoBoxWrapper {
      .isoBoxChildrenWrapper {
        .widgetChartSection {
          .isoWidgetsWrapper {
            .isoChartWrapper{
              margin-left: 15px;
              .recharts-wrapper {
                .recharts-legend-wrapper{
                  margin-left: -30px;
                }
              }  
            }
          }
        }
      }
    }        
  }
  @media(max-width: 991px){
    &.widgetPriceChartSection {
      .isoBoxWrapper {
        .isoBoxChildrenWrapper{
          > .ant-row{
            align-items: flex-start;
          }
        }
      }
    }      
    .isoBoxWrapper {
      .isoBoxChildrenWrapper {
        .widgetChartSection {
          margin-top: 20px;
          .isoWidgetsWrapper {
            .isoChartWrapper{
              margin-left: 0px;
            }
          }
        }
      }
    }        
  }
  @media(max-width: 575px){
    &.widgetAdvanced {
      .isoBoxWrapper {
        .isoBoxChildrenWrapper{
          padding: 20px 20px 0px;
        }
      }
    }    
    .isoBoxWrapper{
      .isoBoxHeaderWrapper{
        padding: 20px;
      }
      .isoBoxChildrenWrapper{
        padding: 20px;
        .isoWidgetsWrapper {
          .widgetLabel{
            font-size: 14px;
          }
          .ant-row {
            .widgetSliderInput {
              .ant-input-number {
                width: 80px;
                .ant-input-number-input-wrap input{
                  height: 37px;
                }
              }
            }
            .widgetRateSlider {
              .ant-slider{
                margin: 13.5px 15px 13.5px 3px;
                padding: 3px 0;
                .ant-slider-rail{
                  height: 6px;
                }
                .ant-slider-track{
                  height: 6px;
                }
                .ant-slider-step{
                  height: 6px;
                }
                .ant-slider-handle{
                  height: 28px;
                  margin-top: -10px;
                }
              }
            }
          }      
        }  
      }
      .isoBoxFooterWrapper{
        padding: 20px;
      }
    }  
  }
  @media(max-width: 480px){
    .isoBoxWrapper {
      .isoBoxChildrenWrapper {
        .ant-row {
          .ant-col{
            &.widgetInputGroupWrapper {
              .ant-form-item-control-input {
                .ant-input-group-wrapper{
                  width: 100%;
                  &+.ant-input-group-wrapper{
                    margin-left: 0px;
                    margin-top: 15px;
                  }
                }
              }
            }
          }
        }
        .widgetChartSection {
          text-align: center;
          .isoWidgetsWrapper {
            .isoChartWrapper {
              .recharts-wrapper {
                .recharts-legend-wrapper{
                  position: relative !important;
                  left: 0 !important;
                  margin: 20px 0 0 20px;
                  width: auto !important;   
                }
              }
            }
          }      
        }
      }  
    }            
  }
}
/* */


/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}

/* color scheme page */
.appSettingsColorScheme{
  .dashboardContent{
    .isoBoxChildrenWrapper{
      padding: 30px 40px;
    }
    .coloSchemeWrapper{
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      .colorSchemeLists{
        max-width: 44%;
        flex: 0 0 44%;
        margin-bottom: 50px;
        display: block;
        &:nth-last-child(-n+2){
          margin-bottom: 0px;
        }
        .ant-checkbox-group{
          display: block;
          .ant-checkbox-wrapper{
            span{
              text-transform: capitalize;
              color: ${palette('text', 0)};
            }
          }
          >.ant-card-bordered{
            border-radius: 4px;
            margin-top: 10px;
          }
          .ant-card-bordered{
            .ant-card-body{
              .colorSchemeAvtar{
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 32% 0 48%;
                .ant-avatar{
                  &.ant-avatar-icon{
                    width: 46px;
                    height: 44px;
                    svg{
                      width: 40px;
                      height: 40px;
                    }
                  }
                }
              }    
              .ant-card{
                border-radius: 4px;
                border: 0px;
                .ant-card-body{
                  padding: 0px;
                }
              }
              .colorSchemeDesc{
                .schemeDesc{
                  display: flex;
                  padding: 10px;
                  border-bottom: 1px solid #D4D5DB;
                  img{
                    margin-right: 10px;
                  }
                  p{
                    color: ${palette('label', 0)};
                    line-height: normal;
                  }
                  &:last-child{
                    border-bottom: 0px;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  
  @media(max-width: 991px){
    
    .dashboardContent {
      .isoBoxChildrenWrapper{
        padding: 30px 20px;
      }
      .coloSchemeWrapper {
        .colorSchemeLists{
          .ant-card{
            .ant-card-body{
              padding: 15px;
            }
          }
          .ant-checkbox-group {
            .ant-card-bordered {
              .ant-card-body {
                .colorSchemeAvtar{
                  padding: 26% 0 44%;
                  .ant-avatar{
                    &.ant-avatar-icon{
                      width: 36px;
                      height: 34px;
                      svg{
                        width: 30px;
                        height: 30px;
                      }
                    }
                  }  
                }
                .colorSchemeDesc {
                  .schemeDesc{
                    padding: 7px;
                  }
                }  
              }
            }
          }      
        }
      }  
    }  
  }
  @media(max-width: 767px){
    
    .dashboardContent {
      .isoBoxChildrenWrapper{
        padding: 30px 40px;
      }
      .coloSchemeWrapper {
        .colorSchemeLists{
          .ant-card{
            .ant-card-body{
              padding: 24px;
            }
          }
          .ant-checkbox-group {
            .ant-card-bordered {
              .ant-card-body {
                .colorSchemeAvtar{
                  padding: 32% 0 48%;
                  .ant-avatar{
                    &.ant-avatar-icon{
                      width: 46px;
                      height: 44px;
                      svg{
                        width: 40px;
                        height: 40px;
                      }
                    }
                  }  
                }
              }
            }
          }      
        }
      }  
    }
  }
  @media(max-width: 575px){
    
    .dashboardContent {
      .isoBoxChildrenWrapper{
        padding: 20px;
      }
      .coloSchemeWrapper {
        .colorSchemeLists{
          margin-bottom: 35px;
          .ant-card{
            .ant-card-body{
              padding: 20px;
            }
          }
          .ant-checkbox-group {
            .ant-card-bordered {
              .ant-card-body {
                .colorSchemeAvtar{
                  padding: 24% 0 42%;
                  .ant-avatar{
                    &.ant-avatar-icon{
                      width: 30px;
                      height: 34px;
                      svg{
                        width: 30px;
                        height: 30px;
                      }
                    }
                  }  
                }
              }
            }
          }      
        }
      }  
    }
  }
  @media(max-width: 480px){
    
    .dashboardContent {
      .isoBoxChildrenWrapper{
        padding: 20px;
      }
      .coloSchemeWrapper {
        .colorSchemeLists{
          max-width: 70%;
          flex: 0 0 70%;
          margin-left: auto;
          margin-right: auto;
          &:nth-last-child(-n+2){
            margin-bottom: 35px;
          }
          &:last-child{
            margin-bottom: 0px;
          }
          .ant-checkbox-group {
            .ant-card-bordered {
              .ant-card-body {
                .colorSchemeAvtar{
                  padding: 20% 0 32%;
                }
              }
            }
          }      
        }
      }  
    }
  } 
  @media(max-width: 400px){
    .dashboardContent {
      .coloSchemeWrapper {
        .colorSchemeLists{
          max-width: 90%;
          flex: 0 0 90%;
          margin-left: auto;
          margin-right: auto;
          .ant-checkbox-group {
            .ant-card-bordered {
              .ant-card-body {
                .colorSchemeAvtar{
                  padding: 20% 0 32%;
                }
              }
            }
          }      
        }
      }  
    }
  } 
}
/* */

/* dashboard home page */
.dashboardGridHead{
  &.dashboardInstallations{
    padding-right: 15px;
    padding-bottom: 15px;
  }
  &.dashboardRecentActivities{
    padding-right: 15px;
    padding-top: 15px;
    padding-bottom: 15px;
    .commonWidgetBox{
      width: 100%;
      .isoBoxWrapper{
        border: 0px;
        padding-bottom: 0px;
        .isoBoxChildrenWrapper{
          padding: 0px;
          .isoWidgetBox{
            .isoSimpleTable{
              .ant-spin-container{
                .ant-table-content{
                  .ant-table-thead{
                    tr{
                      th{
                        border-bottom: 1px solid ${palette('border', 0)};
                        .ant-table-column-sorters{
                          .ant-space{
                            .ant-space-item{
                              color: ${palette('label', 0)};
                            }
                          }
                        }
                        &:first-child{
                          .ant-table-column-sorters{
                            padding-left: 30px;
                          }
                        }
                        &:last-child{
                          .ant-table-column-sorters{
                            padding-right: 30px;
                          } 
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  &.dashboardPromotions{
    padding-left: 15px;
    padding-bottom: 15px;
    .isoBoxWrapper{
      padding-bottom: 0px;
      .isoBoxChildrenWrapper{
        .ant-collapse{
          border: 0px;
          background-color: transparent;
          .ant-collapse-item{
            border-bottom: 0px;
            border: 1px solid ${palette('border', 0)};;
            margin-bottom: 20px;
            border-radius: 4px;
            .ant-collapse-header{
              padding: 10px;
              font-size: 15px;
              color: ${palette('text', 0)};
              background-color: #fff;
              border-radius: 4px;
              &:before{
                content: '';
                position: absolute;
                width: 0px;
                height: 0px;
                border-left: 4px solid transparent;
                border-right: 4px solid transparent;
                border-top: 6px solid ${palette('label', 0)};;
                right: 12px;
                top: 20px;
              }
              .anticon{
                display: none;
              }
            }
            &.ant-collapse-item-active {
              .ant-collapse-header{
                &:before{
                  transform: rotate(-180deg);
                }
              }
            }
            .ant-collapse-content{
              border-top: 1px solid ${palette('border', 0)};;
              color: ${palette('text', 0)};
              border-radius: 4px;
              border-top-left-radius: 0px;
              border-top-right-radius: 0px;
              .ant-collapse-content-box{
                padding: 20px 10px;
              }
            }
          }
        }
      }
    }
  }
  &.dashboardRecentCalculations{
    padding-left: 15px;
    padding-top: 15px;
    padding-bottom: 15px;
  }
  &.dashboardQuickGuide{
    padding-top: 15px;
    .isoBoxWrapper{
      padding: 0px;
      .isoBoxChildrenWrapper{
        padding: 30px 30px 15px 30px;
        .ant-row{
          padding-bottom: 15px;
          ::-webkit-scrollbar {
            height: 2px;
            border: 2px solid ${palette('border', 5)};
          }
          ::-webkit-scrollbar-track {
            border-radius: 0;
            background: #fff;
          }
          ::-webkit-scrollbar-thumb {
            border-radius: 0;
            background: ${palette('border', 5)};
          }
          .ant-col{
            margin-right: 30px;
          }
        }
        .guideTitle{
          font-size: 18px;
          color: ${palette('text', 0)};
          font-weight: 700;
          margin-bottom: 20px;
          display: inline-block;
          min-height: 50px;
          line-height: 24px;
        }
        iframe{
          width: 100%;
        }
      }
    }
  }
  .isoBoxWrapper{
    .isoBoxHeaderWrapper{
      padding: 30px;
      margin: 0 0 0 0;
    }
    .isoBoxChildrenWrapper{
      padding: 30px;
      margin: 0 0 0 0;
    }
  }
  @media (max-width: 991px){
    &.dashboardInstallations{
      padding-right: 30px;
    }
    &.dashboardRecentActivities{
      padding-right: 30px;
    }
    &.dashboardPromotions{
      padding-left: 30px;
      padding-top: 15px;
    }
    &.dashboardRecentCalculations{
      padding-left: 30px;
    }
  }
  @media (max-width: 767px){
    .isoBoxWrapper{
      padding: 0px;
    }
    &.dashboardInstallations{
      padding-right: 20px;
    }
    &.dashboardRecentActivities{
      padding-right: 20px;
    }
    &.dashboardPromotions{
      padding-left: 20px;
      padding-top: 15px;
    }
    &.dashboardRecentCalculations{
      padding-left: 20px;
    }
    &.dashboardQuickGuide {
      .isoBoxWrapper {
        .isoBoxChildrenWrapper {
          .guideTitle{
            font-size: 16px;
            min-height: 35px;
            margin-bottom: 12px;
          }
        }
      }
    }      
  }
  @media (max-width: 580px){
    &.dashboardInstallations, &.dashboardRecentActivities{
      padding-right: 15px;
    }
    &.dashboardPromotions, &.dashboardRecentCalculations{
      padding-left: 15px;
    }
  }
  @media (max-width: 575px){
    .isoBoxWrapper {
      .isoBoxHeaderWrapper{
        padding: 20px;
      }
      .isoBoxChildrenWrapper{
        padding: 20px;
      }
    }
    &.dashboardRecentActivities {
      .commonWidgetBox {
        .isoBoxWrapper {
          .isoBoxChildrenWrapper {
            .isoWidgetBox {
              .isoSimpleTable {
                .ant-spin-container {
                  .ant-table-content {
                    .ant-table-thead {
                      tr {
                        th{
                          &:first-child {
                            .ant-table-column-sorters{
                              padding-left: 20px;
                            }
                          }
                          &:last-child{
                            .ant-table-column-sorters{
                              padding-right: 20px;
                            }  
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    &.dashboardQuickGuide {
      .isoBoxWrapper {
        .isoBoxChildrenWrapper{
          padding: 20px 20px 10px 20px;
        }
      }  
    }
  }
  @media (max-width: 400px){
    &.dashboardQuickGuide {
      .isoBoxWrapper {
        .isoBoxChildrenWrapper {
          .guideTitle{
            font-size: 15px;
            min-height: 30px;
            margin-bottom: 10px;
          }
        }
      }
    } 
  }
}
/* */

/* activity users generate popup */
.ant-modal-wrap {
  .ant-modal{
    &.generateReportPopupWrapper {
      .ant-modal-content {
        .ant-modal-close{
          top: 22px;
        }
      }
    }
  }
  @media (max-width: 575px){
    .ant-modal{
      &.generateReportPopupWrapper {
        .ant-modal-content {
          .ant-modal-close{
            top: 10px;
          }
        }
      }
    }  
  }
}        
.generateReportPopup{
  border: 0px !important;
  padding: 0px !important;
  .isoBoxHeaderWrapper{
    padding: 30px;
    margin-bottom: 0px;
  }
  .isoBoxChildrenWrapper{
    padding: 30px;
    margin-top: 0px;
    .ant-row{
      .ant-col{
        label{
          height: 44px !important;
        }
        .ant-picker{
          width: 100%;
          height: 44px;
          &:hover{
            border-color: ${palette('primary', 0)};
          }
          &.ant-picker-focused{
            border-color: ${palette('primary', 0)};
            box-shadow: 0 0 0 2px rgba(79,178,99,0.2);
          }
          .ant-picker-suffix{
            .anticon{
              vertical-align: middle;
              svg{
                width: 20px;
                height: 20px;
              }
            }
          }
        }
      }
    }
    .generatedReports{
      margin-top: 35px;
      .generateReportsLabel{
        color: ${palette('text', 0)};
        font-size: 16px;
        display: inline-block;
        width: 100%;
        margin: 0 0 25px 0;
      }
      .generatedReportsDetails{
        color: ${palette('text', 0)};
        font-size: 16px;
        display: inline-block;
        width: 100%;
        margin: 0 0 5px 0;
        span{
          margin: 0 5px 0 0;
          display: inline-block;
          svg{
            path{
              fill: ${palette('text', 0)};
            }
          }
        }
      }
    }
  }
  @media(max-width: 575px){
    .isoBoxHeaderWrapper{
      padding: 20px;
    }
    .isoBoxChildrenWrapper{
      padding: 20px;
      .ant-row {
        .ant-col {
          label{
            height: auto !important;
          }
          &.datePickerFromDate{
            margin-bottom: 20px; 
          }
        }
      }
      .generatedReports{
        margin-top: 20px;
        .generateReportsLabel{
          font-size: 14px;
          margin: 0 0 15px 0;
        }
        .generatedReportsDetails{
          font-size: 14px;
          span{
            svg{
              width: 14px;
              height: 14px;
            }
          }
        }
      }    
    }
    .isoBoxFooterWrapper{
      padding: 20px;
    }
  }
}
.notification-section {
  .ant-divider {
    margin: 0;
  }
  .ant-col {
    padding: 28px;
  }
  @media(max-width: 991px){
    .ant-col {
      padding: 15px;
    }
  }
  @media(max-width: 575px){
    .mob-space {
      padding-top: 0;
    }
  }
}
.brandingOfficerQrCode {
  .ant-table {
    border-bottom: 1px solid #E6E7EB;
    .ant-table-tbody {
      tr {
        td {
          border-bottom: none !important;
        }
      }
    }
  }
  .link {
    p {
      color: #4FB263;
    }
  }
}
/* */

/* */

`;
export const DashboardContainer = styled.div`
  -webkit-overflow-scrolling: touch;
  .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 16px;
    cursor: pointer;
    transition: color 0.3s;
  }

  .trigger:hover {
    color: ${palette('primary', 0)};
  }

  .ant-layout-sider-collapsed .anticon {
    font-size: 16px;
  }

  .ant-layout-sider-collapsed .nav-text {
    display: none;
  }

  .ant-layout {
    background: ${palette('secondary', 1)};

    &.isoContentMainLayout {
      overflow: auto;
      overflow-x: hidden;
      @media only screen and (min-width: 768px) and (max-width: 1220px) {
        width: calc(100% - 80px);
        flex-shrink: 0;
      }

      @media only screen and (max-width: 767px) {
        width: 100%;
        flex-shrink: 0;
      }
    }
  }

  .isoLayoutContent {
    width: 100%;
    padding: 35px;
    background-color: #ffffff;
    border: 1px solid ${palette('border', 0)};
    height: 100%;
  }

  .isomorphicLayout {
    width: calc(100% - 240px);
    flex-shrink: 0;
    overflow-x: hidden !important;

    @media only screen and (max-width: 767px) {
      width: 100%;
    }

    @media only screen and (min-width: 768px) and (max-width: 1220px) {
      width: calc(100% - 80px);
      width: 100%;
    }
  }

  .ant-layout-footer {
    font-size: 13px;
    @media (max-width: 767px) {
      padding: 10px 20px;
    }
  }

  .ant-input-affix-wrapper {
    input {
      &.ant-input {
        height: 30px;
        @media (max-width: 575px) {
          height: 25px;
        }
      }
    }
  }

  .isoBoxFooterWrapper {
    padding: 30px 22px;
    @media (max-width: 575px) {
      padding: 15px;
    }
    .ant-btn {
      .anticon {
        line-height: 0;
        transform: rotate(-30deg);
        font-size: 20px;
        margin: -4px 0 0 5px;
      }
    }
  }

  ${'' /* button {
    border-radius: 0;
  } */};
`;
