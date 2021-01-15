import React from 'react';
import { Link } from 'react-router-dom';

export const HomeScreen = () => {



    return (
        <div className="homeScreen" >

            <div id="blog-section">
                <div className="container">

                    <div className="row">

                        <div className="col-xs-12 col-sm-6 col-md-4">

                            <div className="blog-section-intro">

                                <h2>Read our stories</h2>
                                <p>Cras mattis consectetur purus sit amet fermentum. Donec ullamcorper nulla non metus auctor fringilla.</p>

                            </div>

                        </div>

                        <div className="col-xs-12 col-sm-6 col-md-4">

                            <div className="blog-item first" title="Suspendisse potenti">
                                <div className="blog-item-img"
                                    style={{ backgroundImage: "url(images/carousel/carousel_2.png)" }}
                                ></div>
                                <div className="blog-item-content">
                                    <span className="blog-item-label">Photo</span>
                                    <span className="blog-item-date">
                                        <span className="blog-item-date-day">30</span>
                                        <span className="blog-item-date-month">Sept</span>
                                    </span>
                                    <h3>Nulla vehicula porttitor lorem</h3>
                                    <p>Curabitur sagittis mauris ex, non congue enim sagittis et...</p>
                                </div>
                            </div>

                        </div>

                        <div className="col-xs-12 col-sm-6 col-md-4">

                            <div className="blog-item second" title="Suspendisse potenti">
                                <div className="blog-item-img" style={{ backgroundImage: "url(images/carousel/carousel_1.png)" }}></div>
                                <div className="blog-item-content">
                                    <span className="blog-item-label">Photo</span>
                                    <span className="blog-item-date">
                                        <span className="blog-item-date-day">18</span>
                                        <span className="blog-item-date-month">Aug</span>
                                    </span>
                                    <h3>In quis neque sed velit sodales interdum</h3>
                                    <p>Sed id turpis auctor, vulputate turpis fringilla, volutpat mi. Donec felis enim...</p>
                                </div>
                            </div>

                        </div>

                        <div className="col-xs-12 col-sm-6 col-md-4">

                            <div className="blog-item third" title="Suspendisse potenti">
                                <div className="blog-item-img" style={{ backgroundImage: "url(images/carousel/carousel_3.png)" }}></div>
                                <div className="blog-item-content">
                                    <span className="blog-item-label">Photo</span>
                                    <span className="blog-item-date">
                                        <span className="blog-item-date-day">09</span>
                                        <span className="blog-item-date-month">Aug</span>
                                    </span>
                                    <h3>Sed a nulla a felis imperdiet vestibulum</h3>
                                    <p>Donec blandit vestibulum ipsum, eu facilisis erat. Praesent libero nulla, feugiat quis libero id...</p>
                                </div>
                            </div>

                        </div>

                        <div className="col-xs-12 col-sm-6 col-md-4">

                            <div className="blog-item fourth" title="Suspendisse potenti">
                                <div className="blog-item-img"
                                    style={{ backgroundImage: "url(images/carousel/carousel_5.png)" }}
                                ></div>
                                <div className="blog-item-content">
                                    <span className="blog-item-label">Photo</span>
                                    <span className="blog-item-date">
                                        <span className="blog-item-date-day">7</span>
                                        <span className="blog-item-date-month">Jul</span>
                                    </span>
                                    <h3>Vivamus convallis varius ipsum quis</h3>
                                    <p>In facilisis mi sed ligula congue ullamcorper. Donec tempus porttitor ultricies...</p>
                                </div>
                            </div>

                        </div>

                        <div className="col-xs-12 col-sm-6 col-md-4">

                            <div className="buttonContainer">
                                <Link className="button" to="/products" title="Show more"><span>Show more</span></Link>
                            </div>

                        </div>



                    </div>

                </div>
            </div>

        </div>
    )
}