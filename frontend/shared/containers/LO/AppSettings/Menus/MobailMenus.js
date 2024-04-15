import React from 'react';
import userpic from '@iso/assets/images/avatar.png';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import Image from '@iso/ui/Image/Image';
import { imageArr } from '@iso/config/constant';
import useWindowSize from '@iso/lib/hooks/useWindowSize';

function getIcon(icon_name, icon_color) {
  const iconss =
    icon_name &&
    imageArr.filter(
      (img) => img.name === icon_name.split('/').slice(-1)[0].split('.')[0]
    )[0];

  return <iconss.value />;
}

function getIconDashBoard(icon_name, icon_color) {
  const iconss =
    icon_name &&
    imageArr.filter(
      (img) => img.name === icon_name?.split('/').slice(-1)[0].split('.')[0]
    )[0];
  return iconss && <iconss.value stroke={icon_color} />;
}

export default function MobailMenus({
  profilePhoto,
  UserName,
  Title,
  LiOrNMLS,
  BackGroungColor,
  DashboardItem,
  AppMenuItems,
  ActiveTab,
  dashLinks,
}) {
  const [visible, setVisiblity] = React.useState(ActiveTab === 2);

  const { width } = useWindowSize();

  const styleForUpDownIcon = {
    color: `${BackGroungColor !== '#000000' ? BackGroungColor : '#cdcdcd'}`,
    border: '1px solid #cdcdcd',
    borderRadius: '50%',
    width: `${width}` <= 1449 ? 30 : 40,
    height: `${width}` <= 1449 ? 30 : 40,
    padding: `${width}` <= 1449 ? 7 : 10,
    marginTop: -40,
    background: '#000',
    cursor: 'pointer',
  };

  return (
    <>
      <div className="mobile-content">
        <div className="mobile-body">
          <h3
            className="bioMobileTitle"
            style={{ color: `${BackGroungColor}` }}
          >
            Dashboard
          </h3>

          <div className="profileBioMobileOutput">
            <div
              className="bioBgcolorWrap"
              style={{ backgroundColor: `${BackGroungColor}` }}
            >
              <div className="profileUserContent">
                <div className="profileImagWrap">
                  <Image src={profilePhoto ?? userpic} alt={'profile image'} />
                </div>
                <div className="profileUserDetails">
                  <h4 className="userName">{UserName}</h4>
                  <h5 className="userDesignation">{Title || 'N/A'}</h5>
                  <h5 className="userCode">
                    <span>NMLS</span> : {LiOrNMLS || 'N/A'}
                  </h5>
                </div>
              </div>
              <div className="profileSocialLinks">
                <ul className="profileSocialListing">
                  {dashLinks.map((item, index) => (
                    <li
                      key={index}
                      style={{
                        backgroundColor: 'transparent',
                        display: 'inline-grid',
                        flexGrow: 1,
                      }}
                    >
                      <Image
                        src={item.icon}
                        alt={`${item.name} icon`}
                        style={
                          item.key === 'appointment'
                            ? {
                                width: 20,
                                height: 20,
                                display: 'inline-block',
                                margin: 'auto',
                              }
                            : {}
                        }
                      />
                      <p
                        style={{
                          fontSize: 15,
                          marginTop: 10,
                          color: '#FFFFFF',
                        }}
                      >
                        {item.name}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="userBioDescription">
              <div className="service-box">
                {DashboardItem?.map(
                  (img, index) =>
                    img.id !== 'DASHBOARD' && (
                      <div className="service" key={index}>
                        {img.type === 2 ? (
                          getIconDashBoard(img.addIcon, BackGroungColor)
                        ) : (
                          <img.addIcon.value stroke={BackGroungColor} />
                        )}
                        <span>{img.name}</span>
                      </div>
                    )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mobile-bottom">
        <ul>
          {AppMenuItems.map(
            (item, index) =>
              index < 2 && (
                <li key={index}>
                  {item.type === 2 ? (
                    getIcon(item.addIcon, BackGroungColor)
                  ) : (
                    <item.addIcon.value
                      stroke={
                        index === 0 && BackGroungColor !== '#000000'
                          ? BackGroungColor
                          : ''
                      }
                    />
                  )}

                  <span
                    style={
                      index === 0 && BackGroungColor !== '#000000'
                        ? {
                            color: `${BackGroungColor}`,
                            fontSize: 10,
                          }
                        : {
                            color: '#fff',
                            fontSize: 10,
                          }
                    }
                  >
                    {item.name}
                  </span>
                </li>
              )
          )}
          <li className="up-slide" onClick={() => setVisiblity(!visible)}>
            {visible ? (
              <DownOutlined style={styleForUpDownIcon} />
            ) : (
              <UpOutlined style={styleForUpDownIcon} />
            )}
          </li>
          {AppMenuItems.map(
            (item, index) =>
              index >= 2 &&
              index < 4 && (
                <li key={index}>
                  {item.type === 2 ? (
                    getIcon(item.addIcon, BackGroungColor)
                  ) : (
                    <item.addIcon.value />
                  )}
                  <span
                    style={{
                      color: '#fff',
                      fontSize: 10,
                    }}
                  >
                    {item.name}
                  </span>
                </li>
              )
          )}
        </ul>
        {visible && (
          <div className="up-slider-wrapper">
            <div className="slide-icon">
              <DownOutlined
                onClick={() => setVisiblity(false)}
                style={{ color: `${BackGroungColor}` }}
              />
            </div>
            <ul>
              {AppMenuItems.map(
                (item, index) =>
                  index >= 4 && (
                    <li key={index}>
                      {item.type === 2 ? (
                        getIcon(item.addIcon, BackGroungColor)
                      ) : (
                        <item.addIcon.value width={25} height={25} />
                      )}

                      <span style={{ fontSize: 10 }}>{item.name}</span>
                    </li>
                  )
              )}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
