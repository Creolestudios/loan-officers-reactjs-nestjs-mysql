import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import actions from '@iso/redux/loanofficer/appsetting/actions';
import DeleteBtn from '@iso/assets/images/icon/delete-btn.svg';
import { Row, Col, Empty } from 'antd';

const { coBrandCustomLinksList, deleteCoBrandCustomLink } = actions;

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  flex-basis: 30%;
  max-height: 210px;
  overflow-y: auto;
`;

const CoBrandListCustomLists = ({ coBrandId }) => {
  const dispatch = useDispatch();
  const links = useSelector((state) => state.LOAppSetting.coBrandCustomLinks);

  useEffect(() => {
    dispatch(coBrandCustomLinksList({ id: coBrandId }));
  }, []);

  const handleDeleteLink = (id) => {
    dispatch(deleteCoBrandCustomLink({ id }, coBrandId));
  };

  if (!links?.length) {
    return <Empty />;
  }

  return (
    <ListWrapper>
      {links.map((item) => (
        <Row key={item.id}>
          <Col span={18}>{item.name}</Col>
          <Col span={6}>
            <img
              src={DeleteBtn}
              onClick={() => handleDeleteLink(item.id)}
              alt="Delete co-brand custom link"
              style={{ width: 35, cursor: 'pointer' }}
            />
          </Col>
        </Row>
      ))}
    </ListWrapper>
  );
};

export default CoBrandListCustomLists;
