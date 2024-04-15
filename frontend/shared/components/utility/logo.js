import React from 'react';
import styled from 'styled-components';
import siteLogo from '@iso/assets/images/loantack-logo.png';
import siteWhiteLogo from '@iso/assets/images/loantack-white-logo.png';
import Image from '@iso/ui/Image/Image';

export default ({ collapsed, isAdmin, brandLogo }) => {
  if (!isAdmin && !collapsed && brandLogo) {
    return <BrandAppLogoFooter brandLogo={brandLogo} />;
  }

  return (
    <div className="isoLogoWrapper">
      {collapsed ? (
        <div>
          <h3>
            <a>
              <i className="isoLogoMainSmall" />
            </a>
          </h3>
        </div>
      ) : (
        <h3>
          <a>
            <Image
              src={isAdmin ? siteWhiteLogo : siteLogo}
              alt="Loantack logo"
              display="inline-block"
            />
          </a>
        </h3>
      )}
    </div>
  );
};

const BrandAppLogoFooter = ({ brandLogo }) => {
  return (
    <BrandAppLogoImage style={{ backgroundImage: `url('${brandLogo}')` }} />
  );
};

const BrandAppLogoImage = styled.div`
  margin: auto;
  margin-top: 0.5em;
  width: 105px;
  height: 63px;
  border-radius: 4px;
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: center center;
`;
