import React from "react";
import myImageLoader from "../components/imageLoader";
import Image from "next/future/image";
import roboAdvisorImage from "../public/new_images/robo-advisor-img.svg";
import { Container } from "reactstrap";
import PageBanner from "../components/card/pageBanner";
import Link from "next/link";

function itRobo() {
  return (
    <section className="robo-advisor-section" id="robo-advisor-section">
      <PageBanner
        titleNode={
          <div>
            <h4>
              Meet Industry's first <br /> Robo-Advisor for IT
            </h4>
            <p className="try-free-now">Try free now!</p>
          </div>
        }
        image={roboAdvisorImage}
      />
      <Container className="robo-advisor-content">
        <h3>What would you like to do today?</h3>
        <div className="card-container">
          <div className="card">
            <div className="custom-icon">
              <Image
                loader={myImageLoader}
                src={`/new_images/engine.svg`}
                alt=""
                placeholder="Website"
                layout="raw"
                height={45}
                width={48}
              />
            </div>
            <h5>
              Get Product
              <br />
              Recommendations
            </h5>
            <a className="custom-btn btn-gray" href="/find-technology">
              Explore More
            </a>
          </div>
          <div className="card">
            <div className="custom-icon">
              <Image
                loader={myImageLoader}
                src={`/new_images/troubleshoot.svg`}
                alt=""
                placeholder="Troubleshoot"
                layout="raw"
                height={48}
                width={41}
              />
            </div>
            <h5>
              Troubleshoot
              <br />
              Issues
            </h5>
            <a href="/troubleshoot-subject" className="custom-btn btn-gray">
              Explore More
            </a>
          </div>
          {/* <div className="card">
            <div className="custom-icon">
              <Image
                loader={myImageLoader}
                src={`/new_images/pricing.svg`}
                alt=""
                placeholder="Pricing"
                layout="raw"
                height={35}
                width={48}
              />
            </div>
            <h5>
              Get Pricing
              <br />
              Guidance
            </h5>
            <a className="custom-btn btn-gray" href="/pricing/advisor">
              Explore More
            </a>
          </div> */}
        </div>
      </Container>
    </section>
  );
}

export default itRobo;
