import { FaqImage, HomeBg } from "@/components/assets/icons/icon";
import Image from "next/image";
import React from "react";
import { Container } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";

const FAQ = () => {
  return (
    <>
      <section>
        <div className="relative">
          <Image className="h-[25rem] w-[100%]" src={HomeBg} alt="" />
          <div className="absolute inset-0 flex flex-col gap-3 items-center justify-center">
            <Image className="h-[6rem] w-[20rem]" src={FaqImage} alt="" />
            <h4 className="semiBold-font leading-[4rem] text-center capitalize text-white text-[2.5rem]">
              Frequently asked <br />
              questions
            </h4>
          </div>
        </div>
      </section>

      <Container fluid="xxl" className="mb-5 relative">
        <section className="bg-0 py-[20px] px-[15px]">
          <section className="mt-[-6rem]">
            <Accordion className="cusAccordion" defaultActiveKey="0">
              <Accordion.Item className="mb-4" eventKey="0">
                <Accordion.Header className="medium-font text-[1.2rem] color-1">
                  What do you need in order to do a takeoff or estimate?
                </Accordion.Header>
                <Accordion.Body className="regular-font text-[0.8rem] color-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item className="mb-4" eventKey="1">
                <Accordion.Header className="medium-font text-[1.2rem] color-1">
                  How much does it cost?
                </Accordion.Header>
                <Accordion.Body className="regular-font text-[0.8rem] color-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item className="mb-4" eventKey="2">
                <Accordion.Header className="medium-font text-[1.2rem] color-1">
                  In which country are you operating?
                </Accordion.Header>
                <Accordion.Body className="regular-font text-[0.8rem] color-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item className="mb-4" eventKey="3">
                <Accordion.Header className="medium-font text-[1.2rem] color-1">
                  What estimating equipments do you use?
                </Accordion.Header>
                <Accordion.Body className="regular-font text-[1rem] color-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </section>
        </section>
      </Container>
    </>
  );
};

export default FAQ;
