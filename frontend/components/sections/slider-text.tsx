import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

interface typesSliderText {
    data: any;
}

const SliderText: React.FC<typesSliderText> = ({data}) => {

    const {SliderDescription} = data;
    console.log(SliderDescription,'ini datanya');

    return (
        <div className="container py-12">
            <Carousel infiniteLoop={true} swipeable={true} autoPlay={true}>
                {SliderDescription.map((datas : any) => (
                    <div className="" key={datas.id}>
                        <div className="">
                            <p className="">
                                {datas.SliderDescription}
                            </p>
                        </div>
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default SliderText;
