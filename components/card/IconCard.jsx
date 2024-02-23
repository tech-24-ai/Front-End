import React from "react";
import { Card } from "antd";
import myImageLoader from "../../components/imageLoader";
import Image from "next/image";
import { ArrowRightOutlined } from "@ant-design/icons";
import Router from "next/router";
import {
    ConnectQuestion
} from "../icons";

function iconCard({
    image,
    imageAlign,
    imageHeight = 306,
    imageWidth = 298,
}) {
    return (
        <Card className="icon-card">
                <div className={`research-card-image ${imageAlign}`}>
                    {/* <Image
                        loader={myImageLoader}
                        src={image}
                        alt=""
                        layout="raw"
                        width={imageWidth}
                        height={imageHeight}
                        style={{ objectFit: "contain" }}
                    /> */}
                    <ConnectQuestion />
                </div>
       
        </Card>
    );
}

export default iconCard;
