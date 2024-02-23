import React from "react";
import PageBanner from "../components/card/pageBanner";
import ResearchCard from "../components/card/researchCard";
import cookiesImage from "../public/new_images/cookies-bg.svg";
import researchIcon from "../public/new_images/research-icon.svg";
import templateIcon from "../public/new_images/template-icon.svg";
import toolIcon from "../public/new_images/tools-calculator-icon.svg";
import { Container, Col, Row } from "reactstrap";
import Categories from "../components/categories/legal";
import Card from "../components/card/CategoryCard";
import {
    MarketTrends,
    InDepthProduct,
    Operational,
    Technology,
    Policy,
    Calculator,
    Description,
    Strategy,
    ToolKits,
    Chat,
    Clock,
    Cursor,
    User,
} from "../components/icons";

function cookies() {


    return (
        <section className="cookies-portal-section">
            <PageBanner
                titleNode={
                    <div>
                        <h4>Cookies</h4>
                        <h4>Settings</h4>
                    </div>
                }
                image={cookiesImage}
            />
            <Container className="cookies-body-container">
                <div className="body-box">
                    <h4 className="step-title">Step for on - off Cookies</h4>
                    <ul className="step-list">
                        <li className="step-cookies">On your computer, open Chrome.</li>
                        <li className="step-cookies">At the top right, click More. <span className="step-bold">Settings.</span></li>
                        <li className="step-cookies">Under "Privacy and security," click <span className="step-bold">Cookies.</span> and other site data.</li>
                        <li className="step-cookies">Select an option: “Allow all cookies” "Block all <span className="step-bold">cookies</span> (not recommended)”. "Block third party <span className="step-bold">cookies</span> in Incognito" "Block third-party <span className="step-bold">cookies.</span>"</li>
                    </ul>
                </div>

            </Container>
        </section>
    );
}

export default cookies;
