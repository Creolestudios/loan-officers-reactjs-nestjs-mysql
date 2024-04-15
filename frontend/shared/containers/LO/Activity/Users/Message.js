import React, { Component } from 'react';

import { db } from '@iso/lib/firebase/firebase';
import moment from 'moment';
import { isEmpty } from 'lodash';
import Loader from '@iso/components/utility/loader';
import DocumentImg from '@iso/assets/images/Docs.svg';
import ChatImgIcon from '@iso/assets/images/chat-Image-icon.svg';
import { LoadingOutlined } from '@ant-design/icons';
import PdfIcon from '@iso/assets/images/pdf-Icon.svg';
import axios from 'axios';
import {
  Row,
  Col,
  Typography,
  message,
  Form,
  Popover,
  Divider,
  Progress,
  Spin,
} from 'antd';
import Button from '@iso/components/uielements/button';
import HeaderBreadCrumb, {
  DisabledLinkText,
} from '@iso/components/utility/headerBreadCrumb';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import LayoutHeaderActionWrapper from '@iso/components/utility/layoutHeaderActionWrapper';
import LayoutHeaderWrapper from '@iso/components/utility/layoutHeaderWrapper';
import Box from '@iso/components/utility/box';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Input from '@iso/components/uielements/input';
import usersAction from '@iso/redux/usersActivity/action';

const {
  createChatId,
  getUserDetailes,
  uploadChatDocs,
  chatURLEmpty,
  sendMessageNotification,
} = usersAction;

import {
  PaperClipOutlined,
  SendOutlined,
  DownloadOutlined,
} from '@ant-design/icons';

var CryptoJS = require('crypto-js');
const FormItem = Form.Item;
const commentDateFormate = 'YYYY-MM-DD HH:mm:ss';
var SECRET_KEY = 'ppOtCEH2s0OaQgyg2bfgI9sHyAFBcy9supbnLpj1';
const { Title } = Typography;

class Message extends Component {
  constructor() {
    super();
    this.state = {
      messges: '',
      visible: false,
      displayData: [],
      msgAry: [],
      cardsvalue: false,
      uploadImage: null,
      uploadImageName: '',
      image_URL: null,
      messgesFromClient: '',
      loading: true,
      uploadFilesName: '',
      uploadFiles: null,
      isUrl: true,
    };
  }

  messagesEndRef = React.createRef();
  async componentDidMount() {
    await this.props.getUserDetailes({
      userId: +this.props.match.params.userdetail,
      is_saved: false,
      message: true,
    });

    await this.props.createChatId({
      borrower_id: +this.props.match.params.userdetail,
    });
  }

  async componentDidUpdate(prevProps, prevState) {
    const chatID = this.props.Chat_ID;

    if (
      prevState.uploadImageName !== this.state.uploadImageName ||
      prevState.uploadFilesName !== this.state.uploadFilesName ||
      prevState.uploadFiles !== this.state.uploadFiles
    ) {
      this.scrollToBottom();
    }

    if (chatID && isEmpty(this.state.msgAry)) {
      this.getCountinueChild();
    }

    if (this.props.Chat_Docs_URL) {
      if (this.state.uploadFilesName) {
        this.newOnSend(this.state.uploadFilesName, 2, this.props.Chat_Docs_URL);
        this.props.chatURLEmpty();
      } else if (this.state.uploadImageName) {
        this.newOnSend(this.state.uploadImageName, 1, this.props.Chat_Docs_URL);
        this.props.chatURLEmpty();
      }
    }

    if (prevProps.Chat_ID !== chatID) {
      if (chatID) {
        try {
          AsyncStorage.getItem(CONSTANT.USER_DATA).then((response) => {
            let resObject = JSON.parse(response);

            let id = resObject?.data?.user?.id;

            setUserId(id);

            setUnreadCountZero();
            onOnlineStatus(true);
            var amOnline = db.ref('info/connected');
            // var userOnlinePath = database().ref(
            //   `chatList/${props.chatID}/onlineMembers/${id}`,
            // );
            var userConenctionPath = db.ref(`typingStatus/${chatID}/${id}`);
            amOnline.on('value', function (snapshot) {
              if (snapshot.val()) {
                // userOnlinePath.onDisconnect().set(false);
                userConenctionPath.onDisconnect().set(null);
              }
            });

            setTimeout(() => {
              updateTimeStamp();
              onAddedConnectionData();
              getchatList();
              renderOnlineStatus();

              this.setState({
                loading: false,
              });
            }, 30);
          });
        } catch (error) {}
      }
    }
  }

  updateTimeStamp = () => {
    const chatID = this.props.Chat_ID;
    const { profileDetails } = this.props;

    let activeUserObject = {};
    activeUserObject[profileDetails.id] = moment().unix();
    let activeUsersPath = `activeUsers/`;

    db.ref(activeUsersPath).update(activeUserObject, () => {});
  };

  handleDownload = (urls, doc) => {
    axios({
      url: urls,
      method: 'GET',
      responseType: 'blob', // important
    })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', doc);
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => {
        message.error(error.response.statusText);
        console.log(error);
      });
  };

  setUnreadCountZero = () => {
    const chatID = this.props.Chat_ID;
    const { profileDetails } = this.props;

    // var userOnlinePath = `userConnection/${profileDetails.id}`;
    let obj = {};
    obj[chatID] = 0;

    //database().ref(userOnlinePath).update(obj);
  };

  onOnlineStatus = (isOnline) => {
    const { profileDetails } = this.props;
    var userOnlinePath = `chatList/${this.props.Chat_ID}/onlineMembers`;
    let obj = {};
    obj[profileDetails.id] = isOnline;

    db.ref(userOnlinePath).update(obj);
  };

  onAddedConnectionData = () => {
    const { profileDetails } = this.props;

    var userConenctionPath = `userConnection/${profileDetails.id}`;
    db.ref(userConenctionPath).on('child_removed', () => {});
  };

  renderOnlineStatus = () => {
    const { profileDetails } = this.props;
    let onlineStatusPath = `chatList/${this.props.Chat_ID}/onlineMembers`;

    db.ref(onlineStatusPath).on('value', (snap) => {
      if (snap.exists()) {
        // let senderUserId = Object.keys(snap.val()).filter(
        //   (value) => value !== profileDetails.id,
        // );
        // let status = snap.val()[senderUserId[0]];
        // setIsSenderOnline(status);
      } else {
        this.setState({
          loading: false,
        });
      }
    });
  };

  getchatList = () => {
    var chatListPath = `chatList/${this.props.Chat_ID}`;

    db.setPersistenceEnabled(true);
    db.ref(chatListPath).keepSynced(true);

    db.ref(chatListPath).on('value', (snap) => {
      // var finalArray = this.state.data;
      if (snap.exists()) {
        let stringifyObject = JSON.stringify(snap);
        let obj = JSON.parse(stringifyObject);
        obj.key = snap.key;
        let dData = displayData?.filter((value) => value.key !== snap.key);
        dData.push(obj);

        // setDisplayData(displayData.concat(dData));
        this.setState({
          displayData: this.state.displayData.concat(dData),
        });
        // this.setState({
        //   msgAry: data,
        // });
        setTimeout(() => {
          if (isContinueReceived) {
            // onReceiveMessage();
            //getCountinueChild();
          }
          setContinueReceived(false);
          // setIsFirstTime(true);
        }, 500);
      } else {
        this.setState({
          loading: false,
        });
      }
    });
  };

  getCountinueChild = () => {
    const chatID = this.props.Chat_ID;
    var converstionData = `converstionData/${chatID}`;
    // db.setPersistenceEnabled(true);
    // db.ref(converstionData).keepSynced(true);

    let data = [];
    db.ref(converstionData)
      .once('value', (snap) => {
        if (snap.exists()) {
          snap.forEach((dic, index) => {
            var key = dic.key;
            // arrKeys.map((keyName) => {
            let stringifyObject = JSON.stringify(dic.val());
            let obj = JSON.parse(stringifyObject);
            obj.key = key;

            var local_date = moment
              .utc(obj.createdAt)
              .local()
              .format(commentDateFormate);

            var local_time = moment
              .utc(obj.createdAt)
              .local()
              .format('hh:mm A');

            var plaintext = '';
            let isSystem = false;
            if (obj.isSystemMessage) {
              plaintext = obj.text;
              isSystem = true;
            } else {
              var bytes = CryptoJS.AES.decrypt(obj.text, SECRET_KEY);
              plaintext = bytes.toString(CryptoJS.enc.Utf8);
            }

            // Create an object in same formate as Gifted chat need
            let messageObject = {};
            messageObject['_id'] = obj.key;
            messageObject['text'] = plaintext;
            messageObject['createdAt'] = local_date;
            messageObject['created_time'] = local_time;
            messageObject['type'] = obj.type;
            messageObject['url'] = obj.url;

            let userName = '';

            let userData = {};
            userData['_id'] = obj.senderId;
            userData['name'] = userName;
            //userData['avatar'] = userPic;

            messageObject['user'] = userData;
            messageObject['system'] = isSystem;
            let arrFiltered = this.state.msgAry.filter(
              (item) => item._id === obj.key
            );
            data.push(messageObject);
            if (arrFiltered.length === 0) {
              this.setState({
                msgAry: data,
                loading: false,
              });
            }
            this.scrollToBottom();
          });

          // if (data) {
          //   // data = data.reverse();

          //   setTimeout(() => {
          //     this.setState({
          //       msgAry: data,
          //     });
          //     // setLoading(false);
          //   }, 300);
          //   // this.scrollToEnd();
          // }
        } else {
          this.setState({
            loading: false,
          });
        }
      })
      .then(() => {
        this.onReceiveMessage();
        // this.setState({
        //   isChatLoaded: false,
        // });
        // setIsChatLoaded(false);
      });
  };

  onReceiveMessage = () => {
    const chatID = this.props.Chat_ID;

    var converstionData = `converstionData/${chatID}`;
    db.ref(converstionData)
      .limitToLast(1)
      .on('child_added', (snap) => {
        if (snap.exists()) {
          // var finalArray = this.state.data;
          let stringifyObject = JSON.stringify(snap);
          let obj = JSON.parse(stringifyObject);
          obj.key = snap.key;
          var local_date = moment
            .utc(obj.createdAt)
            .local()
            .format(commentDateFormate);

          var local_time = moment.utc(obj.createdAt).local().format('hh:mm A');

          var plaintext = '';
          let isSystem = false;
          if (obj.isSystemMessage) {
            plaintext = obj.text;
            isSystem = true;
          } else {
            var bytes = CryptoJS.AES.decrypt(obj.text, SECRET_KEY);
            plaintext = bytes.toString(CryptoJS.enc.Utf8);
          }

          // Create an object in same formate as Gifted chat need
          let messageObject = {};
          messageObject['_id'] = obj.key;
          messageObject['text'] = plaintext;
          messageObject['createdAt'] = local_date;
          messageObject['created_time'] = local_time;
          messageObject['type'] = obj.type;
          messageObject['url'] = obj.url;

          let userName = '';
          // let userPic = '';
          // let item = displayData[0];

          // let allMem = item.allMembers;
          // let userKey = Object.keys(allMem).filter(
          //   (value) => value === obj.senderId,
          // );

          // if (Object.keys(userKey).length > 0) {
          //   let senderUserId = userKey[0];
          //   if (allMem[senderUserId].firstName) {
          //     userName =
          //       allMem[senderUserId].firstName +
          //       ' ' +
          //       allMem[senderUserId].lastName;
          //   }
          //   if (allMem[senderUserId].profilePic) {
          //     userPic = allMem[senderUserId].profilePic;
          //   }
          // }

          let userData = {};
          userData['_id'] = obj.senderId;
          userData['name'] = userName;
          //userData['avatar'] = userPic;

          messageObject['user'] = userData;
          messageObject['system'] = isSystem;
          let arrFiltered = this.state.msgAry.filter(
            (item) => item._id === obj.ksetey
          );
          if (arrFiltered.length === 0) {
            let data = [];
            if (this.state.msgAry.length > 0) {
              data = this.state.msgAry;
            }
            data = Object.values(data).filter(
              (i) => i._id !== messageObject._id
            );
            data.push(messageObject);

            // data = data.reverse();
            setTimeout(() => {
              this.setState({
                cardsvalue: false,
                msgAry: data,
                loading: false,
                uploadFilesName: '',
              });
              // setLoading(false);
              // setIsLoading(false);
              this.scrollToBottom();
            }, 1500);

            setTimeout(() => {
              // if (this.refs.scrollView) {
              //   this.refs.scrollView.scrollToEnd({animated: true});
              // }Pending
            }, 50);
          }
        } else {
          this.setState({
            loading: false,
          });
          // this.setState({
          //   welcomeAvailable: true,
          // });// removed
        }
      });
  };

  updateMessageCount = () => {
    const { Chat_ID, activityUserDetailes } = this.props;

    var userOnlinePath = `totalMessageCount/${activityUserDetailes.id}/${Chat_ID}`;

    db.ref(userOnlinePath)
      .transaction((currentLike) => {
        return currentLike + 1;
      })
      .then(() => {});
  };

  newOnSend = (textNew, type, url) => {
    const { Chat_ID, activityUserDetailes } = this.props;

    var ciphertext = CryptoJS.AES.encrypt(textNew, SECRET_KEY);
    let text = ciphertext.toString();

    var createdDate = moment.utc(new Date()).format(commentDateFormate);

    // Update the unread counter, it will incrment the counter by one for those user who are not online.
    let item = this.state.displayData[0];
    // let onlineMember = item.onlineMembers;
    // alert(JSON.stringify(onlineMember))
    // Object.keys(onlineMember).map((value) => {
    //   // alert(JSON.stringify(value))
    //   if (onlineMember[value] === false) {
    //     if (value !== undefined) {
    //       var userOnlinePath = `userConnection/${value}/${Chat_ID}`;

    //       db.ref(userOnlinePath)
    //         .transaction((currentLike) => {
    //           return currentLike + 1;
    //         })
    //         .then(() => {});
    //     }
    //   }
    // });
    this.updateMessageCount();

    setTimeout(() => {
      // Insert date into converstinData.
      const { profileDetails } = this.props;
      let messageObject = {
        text: text,
        senderId: profileDetails?.id,
        type: type ? type : 0,
        createdAt: createdDate,
        url: url ? url : '',
      };
      // let chatListObject = {
      //   text: text,
      //   userId: 1,
      //   type: type ? type : 0,
      //   createdAt: createdDate,
      // };
      this.updateTimeStamp();

      var converstionDataPath = `converstionData/${Chat_ID}`;

      db.ref(converstionDataPath).push(messageObject, () => {});

      // Update the lastMessage in chatList
      let updateChatListInfo = {};
      updateChatListInfo[`chatList/${Chat_ID}/lastMessage`] = messageObject;
      updateChatListInfo[`chatList/${Chat_ID}/updateAt`] = moment().unix();

      db.ref().update(updateChatListInfo, function () {});

      this.props.sendMessageNotification({
        message: textNew,
        borrower_id: activityUserDetailes?.user_id,
      });
      this.setUnreadCountZero();

      this.props.chatURLEmpty();
      this.setState({
        loading: false,
        uploadFiles: null,
        // uploadFilesName: '',
        uploadImage: null,
        uploadImageName: '',
        image_URL: '',
      });
    }, 30);
  };

  // function onSend(messages: any = []) {
  //   var ciphertext = CryptoJS.AES.encrypt(messages[0].text, SECRET_KEY);
  //   let text = ciphertext.toString();

  //   var createdDate = moment.utc(new Date()).format(commentDateFormate);

  //   let item = displayData[0];
  //   // alert(JSON.stringify(item))
  //   let onlineMember = item.onlineMembers;
  //   Object.keys(onlineMember).map((value: any, index: number) => {
  //     if (onlineMember[value] === false) {
  //       if (value !== undefined) {
  //         var userOnlinePath = `userConnection/${value}/${props.chatID}`;
  //         database()
  //           .ref(userOnlinePath)
  //           .transaction((currentLike: number) => {
  //             return currentLike + 1;
  //           })
  //           .then(() => {});
  //       }
  //     }
  //   });

  //   updateMessageCount();
  //   setTimeout(() => {
  //     // Insert date into converstinData.
  //     let messageObject = {
  //       text: text,
  //       senderId: props.userData?.id,
  //       type: 0,
  //       createdAt: createdDate,
  //     };
  //     let chatListObject = {
  //       text: text,
  //       userId: props.userData?.id,
  //       type: 0,
  //       createdAt: createdDate,
  //     };

  //     updateTimeStamp();
  //     var converstionDataPath = `converstionData/${props.chatID}`;
  //     database()
  //       .ref(converstionDataPath)
  //       .push(messageObject, () => {});

  //     // Update the lastMessage in chatList
  //     let updateChatListInfo = {};
  //     // updateChatListInfo[
  //     //   `chatList/${this.state.props.chatID}/lastMessage`
  //     // ] = chatListObject;
  //     // updateChatListInfo[
  //     //   `chatList/${this.state.props.chatID}/updateAt`
  //     // ] = moment().unix();
  //     database()
  //       .ref()
  //       .update(updateChatListInfo, function () {});

  //     setUnreadCountZero();
  //   }, 600);
  // }

  handleChange = (e) => {
    this.setState({
      messges: e.target.value,
    });
  };

  handleClick = () => {
    if (this.state.messges) {
      this.newOnSend(this.state.messges);
    }
    // if ()
    this.setState({
      messgesFromClient: this.state.messges,
      messges: '',
    });
  };

  handleClickforDocs = async (e) => {
    if (e.target.files[0]) {
      this.setState({
        cardsvalue: true,
        visible: false,
        uploadFilesName: isEmpty(e.target.files)
          ? this.state.uploadFilesName
          : e.target.files[0].name,
        uploadFiles: isEmpty(e.target.files)
          ? this.state.uploadFiles
          : e.target.files[0],
        // loading: true,
        visible: false,
      });

      await this.props.uploadChatDocs({ upload_docs: e.target.files[0] });
    }
    this.setState({
      visible: false,
    });
  };

  handleClickforimage = (e) => {
    if (e.target.files[0]) {
      if (
        !['image/png', 'image/jpeg', 'image/jpg'].includes(
          e.target.files[0].type
        )
      ) {
        // notification.open({
        //   message: 'Please select only image files',
        // });
        return;
      }

      var file = e.target.files[0];
      var reader = new FileReader();
      var url = reader.readAsDataURL(file);

      reader.onloadend = function (e) {
        this.setState({
          image_URL: [reader.result],
        });
      }.bind(this);
      this.setState({
        cardsvalue: true,
        visible: false,
        uploadImageName: isEmpty(e.target.files)
          ? this.state.uploadImageName
          : e.target.files[0].name,
        uploadImage: isEmpty(e.target.files)
          ? this.state.uploadImage
          : e.target.files[0],
        // loading: true,
        visible: false,
      });

      this.props.uploadChatDocs({ upload_docs: e.target.files[0] });

      // setTimeout(async () => {
      //   if (this.props.Chat_Docs_URL) {
      //     await this.newOnSend(
      //       this.state.uploadImageName,
      //       1,
      //       this.props.Chat_Docs_URL
      //     );
      //   } else {
      //     message.error('URL not found');
      //     this.props.chatURLEmpty();
      //     this.setState({
      //       loading: false,
      //     });
      //   }
      // }, 3000);
    }
    this.setState({
      visible: false,
    });
  };
  _handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (this.state.messges) {
        this.newOnSend(this.state.messges);
      }
      this.setState({
        messgesFromClient: this.state.messges,
        messges: '',
      });
    }
  };

  hide = () => {
    this.setState({
      visible: false,
    });
  };

  scrollToBottom = () => {
    this?.messagesEndRef?.current?.scrollIntoView({
      behavior: 'auto',
      block: 'start',
    });
  };

  handleVisibleChange = (visible) => {
    this.setState({ visible: !this.state.visible });
  };

  content = (
    <div
      style={{
        width: 150,
        height: 80,
      }}
    >
      <p style={{ padding: 7 }}>
        <label style={{ cursor: 'pointer' }}>
          {/* <PictureOutlined /> */}
          <img
            src={ChatImgIcon}
            style={{
              width: 20,
              paddingBottom: 2,
            }}
          />

          <span style={{ padding: 25, fontSize: 18, color: 'black' }}>
            Image
          </span>
          <input
            type="file"
            accept="image/png, image/jpeg"
            onChange={this.handleClickforimage}
            style={{ width: 0 }}
          />
        </label>
      </p>
      <p style={{ padding: 7 }}>
        <label style={{ cursor: 'pointer' }}>
          <img
            src={DocumentImg}
            style={{
              width: 20,

              marginRight: 17,
              paddingBottom: 5,
            }}
          />
          <span style={{ padding: 7, fontSize: 18, color: 'black' }}>
            Document
          </span>
          <input
            type="file"
            accept="application/pdf"
            // accept="application/pdf,.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            onChange={this.handleClickforDocs}
            style={{ width: 0 }}
          />
        </label>
      </p>
    </div>
  );

  render() {
    const userdetail = this.props.activityUserDetailes;
    const { name } = userdetail;
    const antIcon = (
      <LoadingOutlined style={{ fontSize: 24, color: '#4FB263' }} spin />
    );

    return (
      <React.Fragment>
        <LayoutHeaderWrapper>
          <LayoutHeaderActionWrapper>
            <HeaderBreadCrumb>
              <DisabledLinkText to={`/portal/dashboard/activity/users`}>
                Users
              </DisabledLinkText>
              <Title level={2}> Message - {name} </Title>
            </HeaderBreadCrumb>
          </LayoutHeaderActionWrapper>
        </LayoutHeaderWrapper>
        <LayoutContentWrapper>
          <Box
            footer={
              <Row>
                <Col xxl={23} xl={22} lg={22} sm={21} xs={19}>
                  <Input
                    size="large"
                    placeholder="Type Here"
                    value={this.state.messges}
                    onChange={this.handleChange}
                    onKeyDown={this._handleKeyDown}
                    suffix={
                      <Popover
                        trigger="click"
                        content={this.content}
                        visible={this.state.visible}
                        onVisibleChange={this.handleVisibleChange}
                      >
                        <PaperClipOutlined
                          rotate={135}
                          style={{ fontSize: 20, color: 'gray' }}
                        />
                      </Popover>
                    }
                  />
                </Col>
                <Col
                  xxl={1}
                  xl={2}
                  lg={2}
                  sm={3}
                  xs={5}
                  style={{ paddingRight: 13 }}
                >
                  <Button
                    style={{
                      width: '44px',
                      height: '100%',
                      float: 'right',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 0 0 10px',
                      background: '#BAFAC7',
                      border: 'none',
                    }}
                    disabled={!this.props.Chat_ID}
                    icon={<SendOutlined />}
                    onClick={this.handleClick}
                  ></Button>
                </Col>
              </Row>
            }
          >
            {this.state.loading && <Loader />}
            <div
              ref={this.messagesEndRef}
              className="customScrollBarForChat"
              style={{
                height: 300,
                overflowY: 'scroll',
              }}
            >
              {this.state.msgAry.map((x, index) => {
                let today = moment.utc(new Date()).format('YYYY-MM-DD');

                let old_date;
                index === 0
                  ? (old_date = moment.utc(x.createdAt).format('YYYY-MM-DD'))
                  : (old_date = moment
                      .utc(this.state.msgAry[index - 1].createdAt)
                      .format('YYYY-MM-DD'));

                let new_date = null;

                old_date < moment.utc(x.createdAt).format('YYYY-MM-DD')
                  ? (new_date = moment.utc(x.createdAt).format('YYYY-MM-DD'))
                  : (old_date = old_date);

                return (
                  <div key={index}>
                    {(old_date < moment.utc(x.createdAt).format('YYYY-MM-DD') ||
                      index === 0) && (
                      <Divider plain>
                        {today === moment.utc(x.createdAt).format('YYYY-MM-DD')
                          ? 'Today'
                          : moment.utc(x.createdAt).format('ll')}
                      </Divider>
                    )}
                    <Row
                      gutter={[0, 24]}
                      style={
                        x.user._id !== +this.props.match.params.userdetail
                          ? { justifyContent: 'flex-end' }
                          : ''
                      }
                      key={index}
                    >
                      <FormItem
                        style={{
                          backgroundColor: `${
                            x.type === 1
                              ? ''
                              : x.user._id ===
                                +this.props.match.params.userdetail
                              ? 'lightgreen'
                              : 'aliceblue'
                          }`,
                          minWidth: 200,
                        }}
                      >
                        <div
                          className="ChatSettingWordBreak"
                          style={{
                            minHeight: 35,
                            padding: '5px 10px',
                            maxWidth: 400,
                          }}
                        >
                          {/(https?:\/\/[^\s]+)/g.test(x.text) ? (
                            <a href={x.text} target="_blank">
                              {x.text}
                            </a>
                          ) : x.type === 1 ? (
                            <div
                              style={{ display: 'flex', alignItems: 'center' }}
                            >
                              <img
                                src={x.url}
                                style={{ width: 100, height: 100 }}
                              />
                              {x.user._id ===
                                +this.props.match.params.userdetail && (
                                <button
                                  style={{
                                    opacity: 0.5,
                                    margin: '0 0 0 auto',
                                    border: 'none',
                                    background: 'none',
                                    fontSize: '20px',
                                    cursor: 'pointer',
                                  }}
                                  onClick={() =>
                                    this.handleDownload(x.url, x.text)
                                  }
                                >
                                  <DownloadOutlined />
                                </button>
                              )}
                            </div>
                          ) : x.type === 2 ? (
                            <div
                              style={{ display: 'flex', alignItems: 'center' }}
                            >
                              {/* <FileOutlined /> */}
                              <img src={PdfIcon} style={{ paddingRight: 10 }} />
                              {x.text}

                              {x.user._id ===
                                +this.props.match.params.userdetail && (
                                <button
                                  style={{
                                    opacity: 0.5,
                                    margin: '0 0 0 auto',
                                    border: 'none',
                                    background: 'none',
                                    fontSize: '20px',
                                    cursor: 'pointer',
                                  }}
                                  onClick={() =>
                                    this.handleDownload(x.url, x.text)
                                  }
                                >
                                  {/* <img
                                  src={DownloadeBtn}
                                  alt="document download button"
                                /> */}
                                  <DownloadOutlined />
                                </button>
                              )}
                            </div>
                          ) : (
                            x.text
                          )}
                        </div>

                        <p
                          style={{
                            backgroundColor: 'white',
                            fontSize: 'small',
                            textAlign: `${
                              x.user._id === +this.props.match.params.userdetail
                                ? 'start'
                                : 'end'
                            }`,
                          }}
                        >
                          {x.created_time}
                        </p>
                      </FormItem>
                    </Row>
                    <div ref={this.messagesEndRef} />
                  </div>
                );
              })}
              {this.state.cardsvalue && (
                <Row gutter={[0, 24]} style={{ justifyContent: 'flex-end' }}>
                  <FormItem
                    style={{
                      minWidth: 200,
                      backgroundColor: `${
                        this.state.uploadFilesName ? 'aliceblue' : ''
                      }`,
                    }}
                  >
                    <div
                      className="ChatSettingWordBreak"
                      style={{
                        minHeight: 35,
                        padding: '5px 10px',
                        maxWidth: 400,
                      }}
                    >
                      {this.state.image_URL && (
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <img
                            src={this.state.image_URL}
                            style={{
                              width: 100,
                              height: 100,
                              filter: 'blur(1px)',
                            }}
                          />
                          <Loader
                            style={{
                              paddingRight: 73,
                            }}
                          />
                        </div>
                      )}{' '}
                      {this.state.uploadFilesName && (
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <Spin indicator={antIcon} />

                          <img
                            src={PdfIcon}
                            style={{ paddingRight: 10, paddingLeft: 10 }}
                          />

                          {this.state.uploadFilesName}

                          {/* <Loader
                            strokeWidth={2.6}
                            r={10}
                            style={{
                              paddingLeft: 99,
                              paddingBottom: 18,
                            }}
                          /> */}
                        </div>
                      )}
                    </div>

                    <p
                      style={{
                        backgroundColor: 'white',
                        fontSize: 'small',
                        textAlign: 'end',
                      }}
                    >
                      {moment().format('hh:mm A')}
                    </p>
                  </FormItem>
                </Row>
              )}
            </div>
          </Box>
        </LayoutContentWrapper>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  pagecountforUserCalculation: state.Users.pagecountforUserCalculation,
  Chat_ID: state.Users.Chat_ID,
  Chat_Docs_URL: state.Users.Chat_Docs_URL,
  profileDetails: state.Auth.profileObj,
  activityUserDetailes: state.Users.activityUserDetailes,
});

const mapDispatchToProps = (dispatch) => ({
  getUserDetailes: (payload) => dispatch(getUserDetailes(payload)),
  createChatId: (payload) => dispatch(createChatId(payload)),
  uploadChatDocs: (payload) => dispatch(uploadChatDocs(payload)),
  sendMessageNotification: (payload) =>
    dispatch(sendMessageNotification(payload)),

  chatURLEmpty: () => dispatch(chatURLEmpty()),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Message)
);
