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

/* Title Stlye */
h1.ant-typography, h2.ant-typography, .ant-typography h1, .ant-typography h2 {
  color: ${palette('primary', 0)} !important;
}

/* Export Select Input Style */
.exportSelectInput {
  
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
                ${'' /* width: 400px; */}
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
                max-width: 0px
              
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
  @media (max-width: 575px){
    .commonWidgetBox {
      .isoWidgetBox {
        .isoSimpleTable {
          .ant-table-thead {
            tr{
              &:first-child {
                th{
                  &:first-child{
                    padding-left: 20px;
                  }
                  &:last-child{
                    padding-right: 20px;
                  }
                }
              }
            }
          }
          .ant-table-tbody{
            tr{
              td{
                &:first-child{
                  padding-left: 20px;
                }
                &:last-child{
                  padding-right: 20px;
                }
              }
            }
          }
        }
        .ant-spin-container {
          .ant-table-footer{
            padding: 20px;
          }
        }  
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

/* billing primary-lo */
.adminBillingPrimaryLo{
  .adminRow{
    width: 100%;
    .primaryUserProfile{
      padding-right: 30px;
      .primaryUserDetail{
        border: 1px solid ${palette('border', 0)};
        .isoWidgetBox{
          padding: 30px 30px 0 30px !important;
          border-bottom: 1px solid ${palette('border', 0)} !important;
          .primaryLoUserWrap{
            flex-direction: column;
            .primaryLoUserImage{
              margin-bottom: 30px;
            }
            .primaryLoUserDetails{
              .isoUserProfileWidgetWrapper{
                display: flex;
                flex-direction: column;
                .isoUserProfileWidgetItem{
                  p{
                    color: ${palette('label', 0)};
                    width: 50%;
                    font-size: 16px;
                  }
                  h4{
                    color: ${palette('text', 0)};
                    width: 50%;
                    text-align: left;
                    font-size: 16px;
                  }
                }
              }
            }
          }
        }
        .primaryLoButtonWrap{
          padding: 30px;
          display: flex;
          .ant-btn-primary{
            margin: 0 30px 0 0;
          }
        }
      }
    }
    .primaryBrandApp{
      .primaryBrandRow{
        .brandedAppSubscriptionSec{
          padding-bottom: 30px;
        }
        .isoBoxWrapper{
          padding: 0px;
          .isoBoxHeaderWrapper{
            padding: 30px;
            margin-bottom: 0px;
          }
          .isoBoxChildrenWrapper{
            margin: 0px;
            padding: 30px;
            .isoUserProfileWidgetWrapper{
              display: flex;
              flex-direction: column;
              .isoUserProfileWidgetItem{
                p{
                  color: ${palette('label', 0)};
                  width: 50%;
                  font-size: 16px;
                }
                h4{
                  color: ${palette('text', 0)};
                  width: 50%;
                  text-align: left;
                  font-size: 16px;
                }
              }
            }
          }
        }
      }
    }
  }
  .billingOtherSection{
    .isoLayoutContentWrapper{
      padding: 30px 0 0 0;
      .commonWidgetBox{
        .isoBoxWrapper{
          .isoBoxChildrenWrapper{
            .ant-table-footer{
              .ant-row{
                .ant-col{
                  .ant-btn{
                    padding: 0px;
                  }
                }
              }
            }
          }
        }
      }
    }
    &.billingNotesSection{
      .isoLayoutContentWrapper{
        padding: 30px 30px 0 0;
      }
    }
  }
  @media (max-width: 991px){
    .adminRow {
      .primaryUserProfile{
        padding-right: 0px;
        padding-bottom: 30px;
      }
    }  
    .billingOtherSection{
      &.billingNotesSection {
        .isoLayoutContentWrapper{
          padding: 30px 0px 0 0;
        }
      }
    } 
  }
  @media (max-width: 767px){
    .billingOtherSection{
      .cal-disclaimer{
        &.isoBoxWrapper {
          .isoBoxHeaderWrapper{
            padding: 30px;
          }
        }
      }    
    }
  }
  @media (max-width: 575px){
    .adminRow {
      .primaryUserProfile {
        .primaryUserDetail {
          .isoWidgetBox{
            padding: 20px !important;
            .primaryLoUserWrap {
              .primaryLoUserImage{
                margin-bottom: 20px;
                img{
                  width: 100px;
                  height: 100px;
                }
              }
              .primaryLoUserDetails {
                .isoUserProfileWidgetWrapper {
                  .isoUserProfileWidgetItem {
                    p, h4{
                      font-size: 14px;
                    }
                  }
                }
              }      
            }  
          }
          .primaryLoButtonWrap{
            padding: 20px;
          }
        }
      }
      .primaryBrandApp {
        .primaryBrandRow {
          .isoBoxWrapper {
            .isoBoxHeaderWrapper, .isoBoxChildrenWrapper{
              padding: 20px;
            }
            .isoBoxChildrenWrapper{
              .isoUserProfileWidgetWrapper {
                .isoUserProfileWidgetItem {
                  p, h4{
                    font-size: 14px;
                  }
                }
              }
            }   
          }
        }
      }      
    }
    .billingOtherSection{
      .cal-disclaimer{
        &.isoBoxWrapper {
          .isoBoxHeaderWrapper{
            padding: 20px;
          }
        }
      }    
    }      
  }
  @media (max-width: 480px){
    .adminRow {
      .primaryUserProfile {
        .primaryUserDetail { 
          .isoWidgetBox {
            .primaryLoUserWrap {
              .primaryLoUserDetails {
                .isoUserProfileWidgetWrapper{                  
                  .isoUserProfileWidgetItem{
                    flex-wrap: wrap;
                    padding: 10px 0;
                    p, h4{
                      width: 100%;
                    }
                  }
                }
              }
            }
          }
          .primaryLoButtonWrap{
            flex-wrap: wrap;
            a{
              width: 100%;
              margin: 0px;
            }
            .ant-btn-primary{
              margin: 0 0 20px 0;
            }
          }
        }
      }
      .primaryBrandApp {
        .primaryBrandRow {
          .isoBoxWrapper {
            .isoBoxChildrenWrapper {
              .isoUserProfileWidgetWrapper {
                .isoUserProfileWidgetItem {
                  flex-wrap: wrap;
                  padding: 10px 0;
                  p, h4{
                    width: 100%;
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

.billingPrimaryLoAddPage{
  .commonWidgetBox{
    width: 100%;
    .isoBoxWrapper{
      padding: 0px;
      .isoBoxHeaderWrapper{
        margin-bottom: 0px;
      }
      .isoBoxChildrenWrapper{
        margin: 0px;
        .isoWidgetsWrapper{
          padding: 30px;
          border-bottom: 1px solid ${palette('border', 0)};
          .ant-input{
            &:hover{
              border-color: ${palette('primary', 0)};
            }
          }
        }
        .submitbtnwrapper{
          margin: 0px;
          padding: 30px;
        }
      }
    }
  }
  @media (max-width: 767px){
    .cal-disclaimer{
      &.isoBoxWrapper {
        .isoBoxHeaderWrapper{
          padding: 30px;
        }
      }
    }    
  }
  @media (max-width: 575px){
    .cal-disclaimer{
      &.isoBoxWrapper {
        .isoBoxHeaderWrapper{
          padding: 20px;
        }
      }
    }
    .commonWidgetBox {
      .isoBoxWrapper {
        .isoBoxChildrenWrapper {
          .isoWidgetsWrapper, .submitbtnwrapper{
            padding: 20px;
          }
        }
      }
    }      
  }
}
/* */

/* admin user */
.adminUserLo{
  .adminUserLoDetails{
    border: 1px solid ${palette('border', 0)};
    .isoWidgetBox{
      padding: 30px !important;
      border-bottom: 1px solid ${palette('border', 0)} !important;
      .adminUserRow{
        .adminUserProfileImage{
          width: 100%;
          margin-bottom: 30px;
        }
        .adminUserColumn{
          width: 50%;
          .isoUserProfileWidgetWrapper{
            display: flex;
            flex-direction: column;
            .isoUserProfileWidgetItem{
              p{
                color: ${palette('label', 0)};
                width: 50%;
                font-size: 16px;
              }
              h4{
                color: ${palette('text', 0)};
                width: 50%;
                text-align: left;
                font-size: 16px;
              }
            }
          }
        }
      }
    }
    .adminUserBtnWrapper{
      padding: 30px;
      display: flex;
      .ant-btn{
        margin-right: 30px;
      }
    }
  }
  @media(max-width: 767px){
    .adminUserLoDetails {
      .isoWidgetBox {
        .adminUserRow {
          .adminUserColumn {
            width: 100%;
            .isoUserProfileWidgetWrapper {
              .isoUserProfileWidgetItem {
                flex-wrap: wrap;
                padding: 10px 0px;
                p{
                  width: 40%;
                }
                h4{
                  width: 60%
                }
              }
            }
          }
        }
      }
    }
  }
  @media(max-width: 575px){
    .adminUserLoDetails {
      .isoWidgetBox {
        padding: 20px !important;
        .adminUserRow {
          .adminUserProfileImage{
            img{
              width: 120px;
              height: 120px;
            }
          }
          .adminUserColumn {
            .isoUserProfileWidgetWrapper {
              .isoUserProfileWidgetItem {
                p, h4{
                  font-size: 14px;
                }
              }
            }
          }
        }
      }
      .adminUserBtnWrapper{
        padding: 20px;
      }
    }
  }
  @media(max-width: 480px){
    .adminUserLoDetails {
      .isoWidgetBox {
        .adminUserRow {
          .adminUserColumn {
            .isoUserProfileWidgetWrapper {
              .isoUserProfileWidgetItem {
                p,h4{
                  width: 100%;
                }
              }
            }
          }
        }
      }
      .adminUserBtnWrapper{
        flex-wrap: wrap;
        a{
          width: 100%;
          .ant-btn{
            margin: 0px;
          }
        }
        .ant-btn{
          margin-right: 0px;
          margin-bottom: 20px;
        }
      }
    }
  }  
}
.userReferredPopup{
  .ant-modal-content{
    border-radius: 0px;
    .ant-modal-close{
      right: 30px !important;
      top: 30px !important;
      .ant-modal-close-x{
        width: 20px;
        height: 21px;
        line-height: 21px;
        svg{
          path{
            stroke: ${palette('label', 0)};
            stroke-width: 1.5px;
          }
        }
      }
    }
    .ant-modal-body{
      padding: 0px !important;
      .referredTitle{
        padding: 30px;
        border-bottom: 1px solid ${palette('border', 0)};
        .ant-typography{
          padding: 0px;
          margin: 0px;
          font-size: 17px;
          font-weight: 700;
          color: ${palette('text', 0)};
        }
      }
      .referredToListing{
        padding: 30px;
        li{
          font-size: 15px;
          font-weight: 700;
          color: ${palette('primary', 0)};
          margin-bottom: 20px;
        }
      }
    }
  }
  @media(max-width: 575px){
    .ant-modal-content {
      .ant-modal-close{
        right: 20px !important;
        top: 20px !important;
        .ant-modal-close-x {
          width: 18px;
          height: 18px;
          line-height: 18px;
          svg{
            width: 18px;
            height: 18px;
          }
        }  
      }
      .ant-modal-body {
        .referredTitle{
          padding: 20px;
        }
        .referredToListing{
          padding: 20px;
          li{
            margin-bottom: 12px;
          }
        }
      }
    }    
  }
}
.userDefaultHeader{
  padding-bottom: 25px !important;
  .isoHeaderBreadCrumbWrapper{
    margin-bottom: 25px;
  }
}
.userDefaultsTabsSection{
  padding-top: 0px !important;
}
.userDefaultMortgageGuide{
  .isoBoxWrapper{
    .isoBoxHeaderWrapper{
      padding: 30px;
      margin-bottom: 0px;
    }
    .isoBoxChildrenWrapper{
      margin-top: 0px;
      padding: 30px;
      .switchLabel{
        color: ${palette('text', 0)};
        font-size: 15px;
      }
    }
  }
  @media (max-width: 575px){
    .isoBoxWrapper {
      .isoBoxHeaderWrapper, .isoBoxChildrenWrapper{
        padding: 20px;
      }
    }  
  }
}
.userDefaultLoanPrograms{
  .isoWidgetBox{
    .isoSimpleTable{
      .ant-table-content{
        .ant-table-thead{
          tr{
            &:first-child{
              th{
                &:first-child{
                  padding-left: 10px;
                }
              }
            }
          }
        }
        .ant-table-tbody{
          tr{
            td{
                padding-left: 10px;
                div{
                  color: ${palette('text', 0)};
                  svg{
                    margin-right: 30px !important;
                  }
                }
              }
            }
          }
        }
      }
    }
  }

.ant-modal-wrap{
  .userLoanProgramsPopup, .userLearnCenterPopup{
    &.ant-modal {
      .ant-modal-content {
        border-radius: 0px;
        .ant-modal-close{
          right: 30px;
          top: 35px;
          .ant-modal-close-x{
            width: 22px;
            height: 22px;
            line-height: 22px;
          }
        }
        .ant-modal-body {
          .ant-typography{
            padding: 30px 30px;
            margin: 0px;
            border-bottom: 1px solid ${palette('border', 0)};
          }
          .ql-snow{
            .ql-editor{
              padding: 30px;
              color: ${palette('text', 0)};
              min-height: 300px;
              font-size: 15px;
            }
          }
        }
      }
    }      
  }
  @media(max-width: 575px){
    .userLoanProgramsPopup, .userLearnCenterPopup{
      &.ant-modal {
        .ant-modal-content {
          .ant-modal-close{
            right: 20px;
            top: 23px;
          }
          .ant-modal-body {
            .ant-typography{
              padding: 20px;
            }
            .ql-snow {
              .ql-editor{
                padding: 20px;
              }
            }  
          }
        }
      }
    }        
  }
}
.usersDefaultCalculator{
  &.cal-disclaimer{
    &.isoBoxWrapper {
      .isoBoxHeaderWrapper{
        padding: 30px;
        margin: 0px;
      }
      .isoBoxChildrenWrapper{
        margin: 0px;
        .isoWidgetsWrapper{
          padding: 30px;
          .ant-input{
            &:hover{
              border-color: ${palette('primary', 0)};
            }
          }
        }
      }
    }
  }
  @media (max-width: 575px){
    &.cal-disclaimer{
      &.isoBoxWrapper {
        .isoBoxHeaderWrapper{
          padding: 20px;
        }
        .isoBoxChildrenWrapper{
          .isoWidgetsWrapper{
            padding: 20px;
          }
        }
      }
    }    
  }    
}
.isoLayoutContentWrapper {
  .commonWidgetBox {
    .userLoContentTable {
      &.contentChecklists{
        .isoSimpleTable {
          .ant-table-thead {
            tr{
              &:first-child {
                th{
                  &:first-child{
                    padding-left: 14px;
                  } 
                }
              }    
            }
          }
          .ant-table-tbody {
            tr{
              td{
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
  @media(max-width: 575px){
    .commonWidgetBox {
      .userLoContentTable{
        &.contentChecklists {
          .isoSimpleTable {
            .ant-table-thead {
              tr{
                &:first-child {
                  th{
                    &:first-child{
                      padding-left: 4px;
                    }
                  }
                }
              }
            }
            .ant-table-tbody {
              tr{
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
  }
}                
.userLoChecklistDetails{
  .commonWidgetBox{
    width: 100%;
    .contentChecklists{
      .isoWidgetBox{
        padding: 30px !important;
        .userLoChecklistLabel{
          .ant-form-item-label{
            text-align: left;
          }
          .ant-form-item-control{
            .ant-form-item-control-input{
              min-height: 42px;
              .userLoChecklistValue{
                color: ${palette('text', 0)};
                width: 100%;
                display: inline-block;
                margin: 10px 0;
              }
            }
          }
        }
      }
    }
  }
  @media(max-width: 767px){
    .commonWidgetBox {
      .contentChecklists {
        .isoWidgetBox {
          .userLochecklistFirstCol {
            margin-bottom: 10px;
          }
        }
      }
    }        
  }
  @media(max-width: 575px){
    .commonWidgetBox {
      .contentChecklists {
        .isoWidgetBox{
          padding: 20px !important;
          .userLoChecklistLabel {
            .ant-form-item-control {
              .ant-form-item-control-input {
                .userLoChecklistValue{
                  margin: 7px 0;
                }
              }
            }
          }      
        }
      }
    }    
  }
}
.userLoLegalSection{
  .isoBoxWrapper{
    padding: 0px;
    .isoBoxChildrenWrapper{
      margin: 0px;
      padding: 30px;
      span{
        font-size: 15px;
        color: ${palette('text', 0)};
        p{
          margin-bottom: 20px;
          &:last-child{
            margin-bottom: 0px;
          }
        }
      }
    }
  }
  @media(max-width: 575px){
   .isoBoxWrapper{
      .isoBoxChildrenWrapper{
        padding: 20px;
      }
    } 
  }
}
.userBorrowerDetails{
  .userBorrowContentWrap{
    .isoLayoutContentWrapper{
      padding-bottom: 0px;
      .commonWidgetBox {
        .isoWidgetBox {
          .isoSimpleTable {
            .ant-table-thead {
              tr{
                &:first-child {
                  th{
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
  }
  @media(max-width:575px){
    .userBorrowContentWrap{
      .isoLayoutContentWrapper{
        .commonWidgetBox {
          .isoWidgetBox {
            .isoSimpleTable {
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
            }
          }
        }
      }
    }  
  }
}
.userBorrowContentWrap{
  .isoLayoutContentWrapper {
    .commonWidgetBox {
      .isoWidgetBox {
        .isoSimpleTable {
          .ant-table-thead {
            tr{
              &:first-child {
                th{
                  &:first-child{
                    padding-left: 14px;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  @media(max-width:575px){
    .isoLayoutContentWrapper {
      .commonWidgetBox {
        .isoWidgetBox {
          .isoSimpleTable {
            .ant-table-thead {
              tr{
                &:first-child {
                  th{
                    &:first-child{
                      padding-left: 4px;
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
/* */

/* admin branded app */
.adminBrandedAppDetails{
  padding-bottom: 0px !important;
  .isoBoxWrapper{
    padding-bottom: 0px;
    .isoBoxChildrenWrapper{
      padding: 30px;
      margin: 0px;
      .isoUserProfileWidgetWrapper{
        display: flex;
        flex-direction: column;
        width: 50%;
        .isoUserProfileWidgetItem{
          align-items: center;
          p{
            color: ${palette('label', 0)};
            width: 50%;
            font-size: 16px;
          }
          h4{
            color: ${palette('text', 0)};
            width: 50%;
            text-align: left;
            font-size: 16px;
            span{
              .ant-btn{
                margin-left: 30px;
              }
            }
          }
        }
      }
    }
    .isoBoxFooterWrapper{
      .brandedAppBtnWrapper{
        display: flex;
        flex-wrap: wrap;
        .brandedAppRejectBtn{
          margin-right: 30px;
        }
      }
    }
  }
  @media(max-width: 767px){
    padding: 20px !important;
    .isoBoxWrapper {
      padding: 0px;
      .isoBoxChildrenWrapper {
        .isoUserProfileWidgetWrapper{
          width: 100%;
          .isoUserProfileWidgetItem {
            p{
              width: 40%;
            }
            h4{
              width: 60%;
            }
          }  
        }
      }
    }    
  }
  @media(max-width: 575px){
    .isoBoxWrapper {
      .isoBoxChildrenWrapper{
        padding: 20px;
        .isoUserProfileWidgetWrapper{
          .isoUserProfileWidgetItem {
            padding: 10px 0;
            p, h4{
              font-size: 14px;
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
      .isoBoxChildrenWrapper{
        padding: 20px;
        .isoUserProfileWidgetWrapper{
          .isoUserProfileWidgetItem {
            flex-wrap: wrap;
            padding: 10px 0px;
            p, h4{
              width: 100%;
            }
            h4{
              span{
                .ant-btn{
                  margin-left: 0px;
                }
              }
            }
          }
        }  
      }
      .isoBoxFooterWrapper {
        .brandedAppBtnWrapper {
          .brandedAppRejectBtn{
            margin-right: 0px;
            margin-bottom: 20px;
          }
        }  
      }
    }  
  }
}
.adminBrandedAppDetailsStatus{
  .isoBoxWrapper{
    padding-bottom: 0px;
    .isoBoxChildrenWrapper{
      padding: 30px;
      margin: 0px;
    }
  }
  @media(max-width: 767px){
    padding: 20px !important;
    .isoBoxWrapper{
      padding: 0px;
    }
  }
  @media(max-width: 575px){
    .isoBoxWrapper{
      padding-bottom: 0px;
      .isoBoxChildrenWrapper{
        padding: 20px;
        .ant-form-item{
          .ant-col{
            width: 100%;
          }
        }
      }
      .isoBoxFooterWrapper{
        padding: 20px;
      }
    } 
  }
}
.ant-modal-root{
  .brandAppRequestPopup{
    .ant-modal-content{
      .ant-modal-close{
        right: 30px;
        top: 35px;
        .ant-modal-close-x{
          width: 22px;
          height: 22px;
          line-height: 22px;
        }
      }
      .ant-modal-body{
        .isoBoxWrapper{
          padding-bottom: 0px;
          .isoBoxHeaderWrapper{
            padding: 30px;
            margin: 0px;
          }
          .isoBoxChildrenWrapper{
            margin: 0px;
            padding: 30px;
            .brandedAppPopupLabel{
              .ant-form-item-control{
                .ant-input{
                  &:hover{
                    border-color: ${palette('primary', 0)};
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  @media(max-width:767px){
    .brandAppRequestPopup {
      .ant-modal-content {
        .ant-modal-body {
          .isoBoxWrapper {
            padding: 0px;
          }
        }
      }
    }        
  }
  @media(max-width:575px){
    .brandAppRequestPopup {
      .ant-modal-content {
        .ant-modal-close{
          right: 20px;
          top: 24px;
        }
        .ant-modal-body {
          .isoBoxWrapper {
            .isoBoxHeaderWrapper{
              padding: 20px;
            }
            .isoBoxChildrenWrapper{
              padding: 20px;
              .brandedAppPopupLabel{
                .ant-form-item-label, .ant-form-item-control{
                  width: 100%;
                }
              }
            }
            .isoBoxFooterWrapper{
              padding: 20px;
            }
          }
        }
      }
    }        
  }
}
.brandedAppInfoContent{
  .isoBoxWrapper{
    border: 0px;
    padding: 0px;
    .isoBoxChildrenWrapper{
      margin: 0px;
      padding: 30px;
      .brandAppContent{
        .ant-row{
          margin-bottom: 20px;
          .ant-form-item-control-input{
            .quill{
              .ql-snow{
                &.ql-toolbar{
                  background-color: ${palette('grayscale', 13)};
                  border-top-left-radius: 2px;
                  border-top-right-radius: 2px;
                  .ql-formats{
                    border: 1px solid ${palette('border', 5)};
                    padding: 3px 5px;
                    border-radius: 4px;
                    background-color: ${palette('text', 5)};
                    button{
                      padding: 3px;
                      float: none;
                      vertical-align: middle;
                    }
                  }
                }
                .ql-list{
                  svg{
                    .ql-stroke{
                      stroke: ${palette('label', 0)};
                    }
                    .ql-fill{
                      fill: ${palette('label', 0)};
                    }
                  }
                }
              }
              .ql-container{
                border-bottom-left-radius: 2px;
                border-bottom-right-radius: 2px; 
                .ql-editor{
                  color: ${palette('label', 0)};
                  font-size: 15px;
                  &.ql-blank{
                    &:before{
                      font-style: normal;
                      color: ${palette('label', 0)};
                      font-size: 15px;
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
    .isoBoxWrapper {
      .isoBoxChildrenWrapper, .isoBoxFooterWrapper{
        padding: 20px;
      }
    }  
  }
  @media(max-width: 480px){
    .isoBoxWrapper {
      .isoBoxChildrenWrapper {
        .brandAppContent {
          .ant-row {
            .ant-form-item-control-input {
              .quill {
                .ql-snow{
                  &.ql-toolbar {
                    .ql-formats{
                      margin: 0 10px 5px 0;
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
/* */

/* scubscription */
.subscriptionHeaderWrap{
  .ant-typography{
    margin: 0 0 20px 0 !important;
  }
}
.subscriptionPlansAddNew{
  .isoBoxWrapper{
    padding: 0px;
    .isoBoxChildrenWrapper{
      margin: 0px;
      padding: 30px;
      .subscriptionPlansAddNewContent{
        >.ant-row{
          >.ant-col{
            margin-bottom: 20px;
            &.subscriptionPlansEditor{
              margin-bottom: 0px;
              .ant-form-item-control-input{
                .quill{
                  .ql-snow{
                    &.ql-toolbar{
                      background-color: ${palette('grayscale', 13)};
                      border-top-left-radius: 2px;
                      border-top-right-radius: 2px;
                      .ql-formats{
                        border: 1px solid ${palette('border', 5)};
                        padding: 3px 5px;
                        border-radius: 4px;
                        background-color: ${palette('text', 5)};
                        button{
                          padding: 3px;
                          float: none;
                          vertical-align: middle;
                        }
                      }
                    }
                    .ql-list{
                      svg{
                        .ql-stroke{
                          stroke: ${palette('label', 0)};
                        }
                        .ql-fill{
                          fill: ${palette('label', 0)};
                        }
                      }
                    }
                  }
                  .ql-container{
                    border-bottom-left-radius: 2px;
                    border-bottom-right-radius: 2px; 
                    .ql-editor{
                      color: ${palette('label', 0)};
                      font-size: 15px;
                      &.ql-blank{
                        &:before{
                          font-style: normal;
                          color: ${palette('label', 0)};
                          font-size: 15px;
                        }
                      }  
                    }
                  }
                }
              }  
            }
          }
        }
        .subscriptionPlansEditor{
          margin-left: 3.7%;
        }
      }
    }
  }
  @media(max-width:991px){
    .isoBoxWrapper {
      .isoBoxChildrenWrapper {
        .subscriptionPlansAddNewContent {
          .subscriptionPlansEditor{
            margin-left: 0px;
          }
        }
      }
    }      
  }
  @media(max-width:767px){
    .isoBoxWrapper {
      .isoBoxChildrenWrapper {
        .subscriptionPlansAddNewContent {
          .ant-row {
            .ant-col{
              .ant-form-item-label{
                text-align: left;
              }
            }
          }
        }
      }
    }        
  }
  @media(max-width:575px){
    .isoBoxWrapper {
      .isoBoxChildrenWrapper, .isoBoxFooterWrapper{
        padding: 20px;
      }
    }  
  }
  @media(max-width: 480px){
    .isoBoxWrapper {
      .isoBoxChildrenWrapper {
        .subscriptionPlansAddNewContent {
          >.ant-row {
            >.ant-col{
              &.subscriptionPlansEditor{
                .ant-form-item-control-input {
                  .quill {
                    .ql-snow{
                      &.ql-toolbar {
                        .ql-formats{
                          margin: 0 10px 5px 0;
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
/* */

/* edit subscription */
.subscriptionPlanEdit{
  .isoBoxWrapper{
    padding: 0px;
    .isoBoxChildrenWrapper{
      margin: 0px;
      padding: 30px;
      .editSubscriptionPlanContent{
        >.ant-row{
          margin-bottom: 0px !important;
        }
        .ant-row{
          margin-bottom: 20px;
          .ant-form-item-control-input{
            .quill{
              .ql-snow{
                &.ql-toolbar{
                  background-color: ${palette('grayscale', 13)};
                  border-top-left-radius: 2px;
                  border-top-right-radius: 2px;
                  .ql-formats{
                    border: 1px solid ${palette('border', 5)};
                    padding: 3px 5px;
                    border-radius: 4px;
                    background-color: ${palette('text', 5)};
                    button{
                      padding: 3px;
                      float: none;
                      vertical-align: middle;
                    }
                  }
                }
                .ql-list{
                  svg{
                    .ql-stroke{
                      stroke: ${palette('label', 0)};
                    }
                    .ql-fill{
                      fill: ${palette('label', 0)};
                    }
                  }
                }
              }
              .ql-container{
                border-bottom-left-radius: 2px;
                border-bottom-right-radius: 2px; 
                .ql-editor{
                  color: ${palette('label', 0)};
                  font-size: 15px;
                  &.ql-blank{
                    &:before{
                      font-style: normal;
                      color: ${palette('label', 0)};
                      font-size: 15px;
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
    .isoBoxWrapper {
      .isoBoxChildrenWrapper, .isoBoxFooterWrapper{
        padding: 20px;
      }
    }  
  }
  @media(max-width: 480px){
    .isoBoxWrapper {
      .isoBoxChildrenWrapper {
        .editSubscriptionPlanContent {
          .ant-row {
            .ant-form-item-control-input {
              .quill {
                .ql-snow{
                  &.ql-toolbar {
                    .ql-formats{
                      margin: 0 10px 5px 0;
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
/* */

/* subscription view plan */
.subscriptionViewPlan{
  .isoBoxWrapper{
    padding: 0px;
    .isoBoxChildrenWrapper{
      margin: 0px;
      padding: 30px;
      .subscriptionViewPlanContent{
        .ant-form-item{
          .ant-form-item-label{
            width: 25%;
            text-align: left;
            label{
              font-size: 16px;
            }
          }
          .ant-form-item-control{
            width: 75%;
            .ant-form-item-control-input{
              min-height: 42px;
              .ant-form-item-control-input-content{
                color: ${palette('text', 0)};
                font-size: 16px;
                ul{
                  li{
                    padding: 8.5px 0px;
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
    .isoBoxWrapper {
      .isoBoxChildrenWrapper {
        .subscriptionViewPlanContent {
          .ant-form-item {
            .ant-form-item-label{
              width: 35%;
            }
            .ant-form-item-control{
              width: 65%;
            }
          }
        }
      }
    }          
  }
  @media(max-width: 575px){
    .isoBoxWrapper {
      .isoBoxChildrenWrapper{
        padding: 20px;
        .subscriptionViewPlanContent {
          .ant-form-item {
            margin: 0 0 15px 0;
            .ant-form-item-label{
              padding: 0px;
            }
            .ant-form-item-control{
              .ant-form-item-control-input{
                min-height: auto;
              }
            }
          }
        }    
      }
    }  
  }
  @media(max-width: 480px){
    .isoBoxWrapper {
      .isoBoxChildrenWrapper{
        padding: 20px;
        .subscriptionViewPlanContent {
          .ant-form-item {
            .ant-form-item-label{
              label{
                font-size: 14px;
              }
            }
            .ant-form-item-control{
              .ant-form-item-control-input{
                .ant-form-item-control-input-content{
                  font-size: 14px;
                  ul{
                    li{
                      padding: 5px 0px;
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
/* */
/* guide-section start */
.section-header {
  margin-bottom:30px !important;
  h2.ant-typography {
    margin-bottom: 15px !important;
  }
  .btngrp {
    .ant-btn {
      margin-right: 15px;
    }
  }
  @media (max-width: 576px) {
    .category {
      text-align: left !important;
    }
  }
  @media (max-width: 480px) {
    .btngrp {
      a {
        .ant-btn {
          margin-top: 10px;
        }
      }
    }
  }
}
.guide-section { 
  padding: 0px 30px 30px !important;
  iframe {
    width: 100%;
    margin: 15px 0;
  }
  img {
    max-width: 100%;
  }
  .isoBoxWrapper {
    padding-bottom:0;
  }
  .isoBoxChildrenWrapper {
    padding-top:10px;
    .ant-checkbox-group {
      width: 100%;
    }
  }
  @media(max-width: 767px) {
    .isoBoxWrapper {
      padding :0;
    }
  }
}
.addnew-guide {
  .isoBoxChildrenWrapper {
    padding:20px 20px 10px !important;
    .ant-form-item {
      margin-bottom: 20px;
    }
  }
  .cal-disclaimer {
    padding-bottom: 0;
  }
  @media(max-width: 767px) {
    .isoBoxWrapper {
      padding :0;
    }
    .isoBoxChildrenWrapper {
      margin-top: 0;
      .ant-form-item {
        margin-bottom: 10px;
        .ant-form-item-label {
          text-align: left;
        }
      }
    }
  }
}
.ttlcolumn {
  width: 80%;
}
.faqcolumn {
  width: 75%;
}
.rearrangecolumn {
  width:90%;
}
.modal {
  .ant-modal-close-x {
    height: 22px;
    width: 22px;
    line-height: 44px;
    svg {
      width: 15px;
    }
  }
  @media(max-width: 767px) {
    .isoBoxWrapper {
      padding :0;
    }
    .ant-modal-close {
      right: 14px !important;
      top: 14px !important;
    }
  }
  @media(max-width: 576px) {
    .ant-form-item-label {
      padding: 0 10px 0 0 !important;
    }
  }
}
button:focus {
  outline: none;
}
.glossary-section {
  .ant-collapse-content-box {
    display: flex;
    justify-content: space-between;
    .ql-editor {
      padding : 0 15px 0 0;
      overflow: initial;
    }
    .ant-content {
      white-space: nowrap;
    }
  }
  .ant-collapse-header {
    padding-right: 110px;
    .ant-collapse-extra {
      position: absolute;
      right: 30px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .ant-collapse-item-active
  {
    .ant-collapse-header {
      &:before {
        transform:rotate(-180deg) translateY(50%) !important;
      }
    }
  }
  @media (max-width: 576px) {
    .ant-collapse-content-box {
      flex-wrap: wrap;
      .ant-content {
        width: 100%;
        white-space: initial !important;
        margin-top: 10px;
      }
    }
    .ant-collapse-header {
      padding: 15px 90px 15px 15px !important;
      &:before {
        right: 15px !important;
      }
      img {
        width: 30px;
      }
      .ant-collapse-extra {
        right: 20px;
      }
    }
  }
}
.sorting-section {
  .sorting-wrapper {
    margin: auto 0 0;
    span {
      margin-right: 20px;
      padding-bottom: 15px;
      font-weight: bold;
      font-size: 16px;
      margin-top: 10px;
    }
  }
  .addnew-btn {
    padding: 15px 0 20px;
  }
}
.export-disount {
  .ant-select-selector {
    height: 42px !important;
    .ant-select-selection-item {
      line-height: 39px !important;
    }
  }
  @media (max-width:576px) {
    .ant-select-selector {
      height: 36px !important;
      .ant-select-selection-item {
        line-height: 34px !important;
      }
    }
  }
}
.addnew-discount {
  .rd-m {
    margin-top: 0px;
    margin-bottom: 20px;
  }
  .ant-picker {
    border: 1px solid #CACACA;
    border-radius: 4px;
    height: 42px !important;
    padding: 6px 10px;
    width: 100%;
  }
  .expiryDateColumn {
    .ant-form-item-control-input-content {
      justify-content: space-between;
      display: flex;
      .ant-form-item {
        display: inline-block;
        width: calc(50% - 15px);
        margin-bottom: 0;
      }
    }
  }
  .dashboardButtonwrapper {
    button {
      margin-right: 15px;
    }
  }
  @media (max-width:1199px) { 
    .expiryDateColumn {
      .ant-form-item-control-input-content {
        .ant-form-item {
          width: calc(50% - 10px);
        }
      }
    }
  }
  @media (max-width:991px) { 
    .ant-form-item-label {
      text-align: left;
    }
    .rd-m {
      margin-top: 5px;
      margin-bottom: 10px;
    }
  }
  @media (max-width:767px) { 
    .rd-m {
      margin-top: 10px;
      margin-bottom: 5px;
    }
  }
  @media (max-width:576px) { 
    .rd-m {
      margin-bottom: 10px;
    }
  }
  @media (max-width:480px) { 
    .expiryDateColumn {
      .ant-form-item-control-input-content {
        flex-wrap: wrap;
        .ant-form-item {
          width: 100%;
          &:last-child {
            margin-top: 15px; 
          }
        }
      }
    }
    .dashboardButtonwrapper {
      button {
        margin-right: 0px;
        &:last-child {
          margin-top: 15px;
        }
      }
    }
  }
}
/* guide-section end */
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

  .tab-section {
    justify-content: space-between;
    > div {
      display: inline-block;
      width: auto;
      margin-right: 10px;
    }
    .switch-button {
      margin: 12px 0;
      text-align: right;
    }
    @media only screen and (max-width: 767px) {
      .switch-button {
        display: inline-block;
        width: 100%;
      }
    }
  }
  .profile {
    .isoBoxChildrenWrapper,
    .passwordsWrapper {
      padding: 30px 20px 10px !important;
      .ant-form-item {
        margin-bottom: 0;
        .ant-form-item-label {
          padding-bottom: 0;
        }
      }
    }
    @media only screen and (max-width: 991px) {
      .isoBoxChildrenWrapper,
      .passwordsWrapper {
        padding: 20px 20px 10px !important;
      }
    }
    @media only screen and (max-width: 576px) {
      .ant-form-item-label {
        height: 34px;
      }
    }
  }
  .myac {
    & + .myac {
      padding-top: 0;
    }
    &.upload-photo {
      .isoBoxHeaderWrapper {
        margin-bottom: 0;
      }
      .ant-col {
        margin-bottom: 0;
      }
    }
  }
  .notes-section {
    .ant-table-body {
      overflow-y: auto !important;
      min-height: 168px;
      border-bottom: 1px solid #e6e7eb;
    }
  }

  ${'' /* button {
    border-radius: 0;
  } */};
`;
