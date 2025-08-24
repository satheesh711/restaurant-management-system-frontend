import React from "react";
import "./HeroSection.css";
import jb1 from "../assets/jb1.jpg"
import jb2 from "../assets/jb3.jpeg"
import jb3 from "../assets/jb2.jpg"

import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function HeroSection({ homeRef }) {
    return (
        <section ref={homeRef} className="hero d-flex flex-column align-items-center text-center">
            <Carousel
                className="carousel-container"
                controls={false}
                indicators={false}
                interval={2000}
            >
                <Carousel.Item>
                    <img
                        className="d-block  "
                        src={jb1}
                        alt="First slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block  "
                        src={jb2}
                        alt="Second slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block  "
                        src={jb3}
                        alt="Third slide"
                    />
                </Carousel.Item>
            </Carousel>

            <h1 
    className="text-light fw-bold display-4"
    style={{
        textShadow: "2px 2px 8px rgba(0, 0, 0, 0.8)"
    }}
>
Know Before You Grow.
</h1>
<p 
    className="fs-5 fw-medium"
    style={{
        textShadow: "1px 1px 6px rgba(0, 0, 0, 0.7)"
    }}
>
Discover insights from leading companies.
</p>

        </section>
    );
}

export default HeroSection;
