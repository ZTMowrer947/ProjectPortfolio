// Imports
import Head from 'next/head';
import React from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';

// Component
const AboutPage: React.FC = () => {
    return (
        <>
            <Head>
                <title>Zack Mowrer | About</title>
            </Head>
            <article className="portfolio-about mt-3">
                <Row>
                    <Col xs={12} md={8}>
                        <Image src="/images/profile.jpg" alt="Profile Image" fluid rounded />
                        <h1 className="display-4">Zack Mowrer</h1>
                        <p className="lead text-dark">The Mountain State Programming Prodidy</p>
                        <p>
                            Having been programming seriously since late 2016, I have developed into a lifelong learner with a burning
                            passion to write software that makes others happy. I am hard-working, honest person above all else, always
                            looking for something to learn or another challenge to overcome. A tinkerer and experimenter at heart, I am more
                            than willing to adapt to new technologies and to the needs of others.
                        </p>
                        <p>
                            I also have the certification to back up my programming prowess, being the first and youngest person in West
                            Virginia to complete the Treehouse Techdegree Program, and the second youngest to do so in the entire world.
                        </p>
                        <p>
                            <em>Did I mention that I am only 16?</em>
                        </p>
                    </Col>
                    <Col xs={12} md={4}>
                        <h6>Skills</h6>
                        <ul>
                            <li>HTML</li>
                            <li>CSS</li>
                            <li>JavaScript</li>
                            <li>TypeScript</li>
                            <li>jQuery</li>
                            <li>AJAX</li>
                            <li>Node.js</li>
                            <li>Express</li>
                            <li>React</li>
                        </ul>
                        <ButtonGroup className="w-100 mb-3">
                            <a
                                className="btn btn-dark"
                                href="https://www.linkedin.com/in/zack-mowrer-39902b18b/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                LinkedIn
                            </a>
                            <a className="btn btn-dark" href="https://twitter.com/zackmowrer" target="_blank" rel="noopener noreferrer">
                                Twitter
                            </a>
                            <a className="btn btn-dark" href="https://github.com/ZTMowrer947" target="_blank" rel="noopener noreferrer">
                                GitHub
                            </a>
                        </ButtonGroup>
                    </Col>
                </Row>
            </article>
        </>
    );
};

// Exports
export default AboutPage;
