import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Pagination, A11y } from 'swiper';
// [Components]
import Button from '@components/inputs/Button';
// [Styles]
import 'swiper/css';
import 'swiper/css/pagination';
import styles from '@styles/components/inputs/Slider.module.scss';
// [Icons]
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

interface IHeroOptions {
    width?: number;
    height?: number;
    layout?: any;
    theme?: string;
    quality?: number;
    sizes?: string;
    style?: {};
}

interface IHeroSlide {
    slideId?: number;
    className?: string;
    imageId?: number | string;
    alt?: string;
    caption?: string;
    copy?: string;
    height?: string;
    label?: string;
    options: IHeroOptions;
    src?: string;
    title?: string;
    subtitle?: string;
    width?: string;
}

type HeroOptionsProps = {
    slidesPerView: number;
    spaceBetween: number;
};

type HeroSliderProps = {
    className?: string;
    slides?: IHeroSlide[];
    options?: HeroOptionsProps;
};

function HeroSlideButton({ direction, className }) {
    const swiper = useSwiper();

    return (
        <div
            className={clsx(
                direction === 'right'
                    ? styles[`hero-slider-navigation-arrow-next`]
                    : styles[`hero-slider-navigation-arrow-prev`],
                className
            )}
            onClick={() =>
                direction === 'right' ? swiper.slideNext() : swiper.slidePrev()
            }
        >
            {direction === 'right' ? <MdChevronRight /> : <MdChevronLeft />}
        </div>
    );
}

function HeroSlide(slide: IHeroSlide) {
    return (
        <div
            className={clsx(styles.slide, slide.className)}
            style={{ ...slide.options?.style }}
            {...slide.options}
        >
            <div className={clsx('contain-xl', styles[`slide-container`])}>
                <div className={styles[`slide-content`]}>
                    {slide.subtitle && (
                        <span className={styles[`slide-subtitle`]}>
                            {slide.subtitle}
                        </span>
                    )}
                    {slide.title && (
                        <h1 className={styles[`slide-title`]}>{slide.title}</h1>
                    )}
                    {slide.copy && (
                        <p className={styles[`slide-copy`]}>{slide.copy}</p>
                    )}
                    {slide.label && (
                        <div className={styles[`slide-button-container`]}>
                            <Button
                                className={styles[`slide-button`]}
                                label={slide.label}
                            />
                            {slide.caption && (
                                <p className={styles[`slide-button-caption`]}>
                                    {slide.caption}
                                </p>
                            )}
                        </div>
                    )}
                </div>
                <div className={styles[`slide-image-container`]}>
                    {slide.src && (
                        <div className={styles[`slide-image`]}>
                            <Image
                                width={slide.options.width}
                                height={slide.options.height}
                                quality={slide.options.quality}
                                sizes={slide.options.sizes}
                                priority={true}
                                src={slide.src}
                                alt={slide.alt || `${slide.title} Hero`}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function HeroSlider({
    className,
    slides,
    options,
}: HeroSliderProps) {
    const [slideTheme, setSlideTheme] = useState('');
    const [disableNext, setDisableNext] = useState(false);
    const [disablePrev, setDisablePrev] = useState(false);

    const getSlideOption = (theme: string) => {
        setSlideTheme(theme);
    };

    useEffect(() => {}, [slideTheme]);

    return (
        <div
            className={clsx(
                styles[`hero-slider`],
                styles[`hero-slider-${slideTheme}`],
                className
            )}
        >
            <Swiper
                spaceBetween={options.spaceBetween}
                slidesPerView={options.slidesPerView}
                onReachBeginning={() => {
                    setDisableNext(true);
                }}
                onReachEnd={() => {
                    setDisablePrev(true);
                }}
                modules={[Pagination, A11y]}
                pagination={{ clickable: true }}
            >
                {slides.map((slide: IHeroSlide) => (
                    <SwiperSlide key={slide.slideId}>
                        {({ isActive }) => <HeroSlide {...slide} />}
                    </SwiperSlide>
                ))}
                {slides.length > 0 && (
                    <div className={styles[`hero-slider-navigation`]}>
                        <HeroSlideButton
                            direction="left"
                            className={clsx(disablePrev && styles[`disabled`])}
                        />
                        <HeroSlideButton
                            direction="right"
                            className={clsx(disableNext && styles[`disabled`])}
                        />
                    </div>
                )}
            </Swiper>
        </div>
    );
}
