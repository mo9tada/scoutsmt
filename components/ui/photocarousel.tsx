"use client"
import { useState } from "react";

type Slide = {
    image: string;
    text: string;
};

const slides: Slide[] = [
    {
        image: "scouts_chi3ar.jpg",
        text: "Scouts Menzel Temime"
    },
    {
        image: "scoutsbg.jpg",
        text: "Nos Soirées"
    },
    {
        image: "scouts-leaders.jpg",
        text: "Nos Leadeurs"
    }
];

export default function PhotoCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
    };

    return (
        <div className="relative w-relative rounded-lg overflow-hidden">
            {/* Slides */}
            <div
                className="flex transition-transform duration-500"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className="min-w-full relative h-[350px] sm:h-[450px] bg-gray-200"
                    >
                        <img
                            src={slide.image}
                            alt={slide.text}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <span className="text-white text-2xl sm:text-4xl font-bold">
                                {slide.text}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Controls */}
            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 text-white px-3 py-2 rounded-full hover:bg-black/60"
            >
                ❮
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 text-white px-3 py-2 rounded-full hover:bg-black/60"
            >
                ❯
            </button>
        </div>
    );
}
