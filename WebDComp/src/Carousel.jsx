import React, { useState, useEffect, useRef } from 'react';
import redb from './assets/redb.jpg';
import redbred from './assets/redbred.jpg';
import redbgreen from './assets/redbgreen.jpg';
import redbyellow from './assets/redbyellow.jpg';
import redborange from './assets/redborange.jpg'
import "./Carousel.css";

export default function Carousel(){
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const carouselRef = useRef(null);
    const listRef = useRef(null);

    const images = [
        { src: redb, intro: "Red Bull Energy Drink", className: "itembg1" },
        { src: redbred, intro: "Red Bull Energy Drink", className: "itembg2" },
        { src: redbgreen, intro: "Red Bull Energy Drink", className: "itembg3" },
        { src: redbyellow, intro: "Red Bull Energy Drink", className: "itembg4" },
        { src: redborange, intro: "Red Bull Energy Drink", className: "itembg5" },
    ];

    const showSlider = (type) => {
        if (isAnimating) return; // Prevent multiple clicks during animation
        setIsAnimating(true);

        const carousel = carouselRef.current;
        const list = listRef.current;
        const items = list.querySelectorAll('.item');

        carousel.classList.remove('prev', 'next');

        if (type === 'next') {
            list.appendChild(items[0]); // Move the first item to the end
            carousel.classList.add('next');
        } else {
            const positionLast = items.length - 1;
            list.prepend(items[positionLast]); // Move the last item to the beginning
            carousel.classList.add('prev');
        }

        setTimeout(() => {
            setIsAnimating(false); // Re-enable clicks after animation
        }, 500);
        };
    return (
        <div className="carousel" ref={carouselRef}>
            <div className="list" ref={listRef}>
                {images.map((image, index) => (
                    <div key={index} className="item">
                        <div className={image.className}>
                            <img src={image.src} alt="Red Bull" />
                            <div className="intro">
                                {image.intro}
                            </div>
                        </div>
                    </div>
                ))}
                {images.map((image, index) => (
                    <div key={index} className="item">
                        <div className={image.className}>
                            <img src={image.src} alt="Red Bull" />
                            <div className="intro">
                                {image.intro}
                            </div>
                        </div>
                    </div>
                ))}
                {images.map((image, index) => (
                    <div key={index} className="item">
                        <div className={image.className}>
                            <img src={image.src} alt="Red Bull" />
                            <div className="intro">
                                {image.intro}
                            </div>
                        </div>
                    </div>
                ))}
                {images.map((image, index) => (
                    <div key={index} className="item">
                        <div className={image.className}>
                            <img src={image.src} alt="Red Bull" />
                            <div className="intro">
                                {image.intro}
                            </div>
                        </div>
                    </div>
                ))}
                {images.map((image, index) => (
                    <div key={index} className="item">
                        <div className={image.className}>
                            <img src={image.src} alt="Red Bull" />
                            <div className="intro">
                                {image.intro}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="arrows">
                <button id="prev" onClick={() => showSlider('prev')} disabled={isAnimating}>
                    &lt;
                </button>
                <button id="next" onClick={() => showSlider('next')} disabled={isAnimating}>
                    &gt;
                </button>
            </div>
        </div>
    )
    
}