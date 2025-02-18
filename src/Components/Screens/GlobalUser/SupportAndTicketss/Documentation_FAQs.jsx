import React, { Fragment, useState } from "react";
import {
  Container,
  Row,
  Col,
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
} from "reactstrap";
import { IoIosArrowRoundBack } from "react-icons/io";
import "./style/style.css";
import { Link } from "react-router-dom";
const DocumentationFAQs = () => {
  const [role, setRole] = useState(JSON.parse(localStorage.getItem("role")));
  const [open, setOpen] = useState("");

  const toggle = (id) => {
    if (open === id) {
      setOpen("");
    } else {
      setOpen(id)
    }
  };
  return (
    <Fragment>
      <br />
      <Container fluid={true}>
        <Row>
          <Col
            lg="12"
            md="12"
            sm="12"
            xs="12"
            xxl="12"
            className="d-flex gap-2 align-items-center"
          >
            <Link  to={-1}
            //  to={`${process.env.PUBLIC_URL}/support/${role}`}
             >
              <button className="backbtnparent btn">
                {" "}
                <IoIosArrowRoundBack className="backArrow" />{" "}
              </button>
            </Link>{" "}
            <h5>FAQs</h5>
          </Col>
          <Col xs="12">
            <Accordion open={open} toggle={toggle}>
              <AccordionItem>
                <AccordionHeader targetId="1">
                  How to create a support ticket?
                </AccordionHeader>
                <AccordionBody accordionId="1">
                  <p>
                    To create a support ticket, click on the "Generate Support
                    Ticket" card. A form will appear where you need to fill in
                    the necessary details, including <b>Area Owner</b>,{" "}
                    <b>Sub Area</b>, <b>Model</b>, and <b>Query</b>. Once you
                    have entered all the information, click on the "Submit"
                    button. You will receive a confirmation message indicating
                    that your ticket has been successfully created. For further
                    assistance, please contact our support team at{" "}
                    <a href="mailto:support@example.com">support@example.com</a>
                    .
                  </p>
                </AccordionBody>
              </AccordionItem>
              <AccordionItem>
                <AccordionHeader targetId="2">
                  How to schedule a call with support?
                </AccordionHeader>
                <AccordionBody accordionId="2">
                  <p>
                    To schedule a call with support, click on the "Schedule a
                    Call with Support" card. You will be redirected to a
                    calendar interface where you can select an available time
                    slot that suits you. After selecting your preferred date and
                    time, click <b>"Confirm"</b> and provide your contact
                    details along with a brief description of your issue. Click{" "}
                    <b>"Schedule"</b> to finalize the booking. A confirmation
                    email will be sent to you with the call details. Please make
                    sure to be available at the chosen time to avoid any delays.
                  </p>
                </AccordionBody>
              </AccordionItem>
              <AccordionItem>
                <AccordionHeader targetId="5">
                  Can I update a submitted support ticket?
                </AccordionHeader>
                <AccordionBody accordionId="5">
                  <p>
                    Yes, you can update a support ticket after it has been
                    submitted. Go to the "Support Tickets" section and select
                    the ticket you want to update. Click on the <b>"Edit"</b>{" "}
                    button, make the necessary changes, and then click{" "}
                    <b>"Save"</b>. Our support team will be notified of the
                    updates to your ticket.
                  </p>
                </AccordionBody>
              </AccordionItem>
            </Accordion>
          </Col>

          <Accordion open={open} toggle={toggle}>
            <AccordionItem>
              <AccordionHeader targetId="3">
                What information do I need to provide in a support ticket?
              </AccordionHeader>
              <AccordionBody accordionId="3">
                <p>
                  When creating a support ticket, it's important to provide
                  accurate and detailed information to help us resolve your
                  issue quickly. Include details such as the <b>Area Owner</b>,
                  the specific <b>Sub Area</b> related to the issue, the{" "}
                  <b>Model</b> number or name, and a clear description of the
                  problem in the <b>Query</b> section. Providing as much
                  relevant information as possible will enable our support team
                  to assist you more effectively.
                </p>
              </AccordionBody>
            </AccordionItem>
            <AccordionItem>
              <AccordionHeader targetId="4">
                How long does it take to get a response from support?
              </AccordionHeader>
              <AccordionBody accordionId="4">
                <p>
                  Our support team strives to respond to all tickets within{" "}
                  <b>24 hours</b>. However, the response time may vary depending
                  on the complexity of the issue and the current volume of
                  support requests. For urgent matters, we recommend using the
                  "Schedule a Call with Support" option to speak directly with
                  our support staff at the earliest available time.
                </p>
              </AccordionBody>
            </AccordionItem>
          </Accordion>
        </Row>
      </Container>
    </Fragment>
  );
};

export default DocumentationFAQs;
