import React, { Fragment, useContext } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import {} from '../Headings/H3Element';
import H3 from '../Headings/H3Element';
import H5 from '../Headings/H5Element';
import H2 from '../Headings/H2Element';
import CustomizerContext from '../../_helper/Customizer';
import SvgIcon from '../../Components/Common/Component/SvgIcon';

const Breadcrumbs = (props) => {
  const { layoutURL } = useContext(CustomizerContext);
  return (
    <Fragment>
      <Container fluid={true}>
        <div className='page-title pt-4'>
          <Row>
            <Col xs='6'>
              <H2>{props.mainTitle}</H2>
            </Col>
            
          </Row>
        </div>
      </Container>
    </Fragment>
  );
};

export default Breadcrumbs;
