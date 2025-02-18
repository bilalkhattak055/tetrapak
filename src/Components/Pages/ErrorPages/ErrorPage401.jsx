import React, { Fragment, useContext } from 'react';
import sad from '../../../assets/images/other-images/sad.png';
import { Link } from 'react-router-dom';
import { Container, Button, Media, Col } from "reactstrap"
import { BACK_TO_HOME_PAGE } from "../../../Constant";
import { H2, P } from '../../../AbstractElements';
import CustomizerContext from '../../../_helper/Customizer';

const Error401 = () => {
    const { layoutURL } = useContext(CustomizerContext);
    const role = JSON.parse(localStorage.getItem('role'))
    return (
        <Fragment>
            <div className="page-wrapper">
                <div className="error-wrapper">
                    <Container>
                        <Media body className="img-100" src={sad} alt="" />
                        <div className="error-heading">
                            <H2 attrH2={{ className: "headline font-warning" }} >{"401"}</H2>
                        </div>
                        <Col md="8 offset-md-2">
                            <P attrPara={{ className: "sub-content" }} >{"Un Authorized User!"}</P>
                        </Col>
                        <Link to={`${process.env.PUBLIC_URL}/dashboard/default/${role}`}><Button color="warning-gradien" size='lg'>{BACK_TO_HOME_PAGE}</Button></Link>
                    </Container>
                </div>
            </div>
        </Fragment>
    );
};

export default Error401;