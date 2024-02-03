"use client";
import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import StarRating from "react-rating-stars-component";
import { FaStar } from "react-icons/fa";

const reviews = [
  {
    id: 1,
    text: "Space Burger hat meine Erwartungen übertroffen! Die Burger sind nicht nur außerirdisch gut, sondern die Möglichkeit der Lieferung macht es noch besser. Perfekt für einen gemütlichen Abend zu Hause mit köstlichen Burgern!",
    imageUrl: "/img/foto_1_img.png",
    rating: 5,
    signature: "Sara aus Berlin",
  },
  {
    id: 2,
    text: "Space Burger ist unser Lieblingsort für schnelle Snacks. Die Vielfalt an Burgern und Sandwiches ist beeindruckend, und die Option für die Lieferung macht es besonders bequem. Die Qualität und der Geschmack sind wirklich  außergewöhnlich.",
    imageUrl: "/img/foto_2_img.png",
    rating: 4,
    signature: "Monika aus Bernau bei Berlin",
  },
  {
    id: 3,
    text: "Space Burger hat nicht nur großartiges Essen für Erwachsene, sondern auch eine fantastische Auswahl für Kinder. Das kinderfreundliche Menü und die bunten Verpackungen sind ein Hit bei den Kleinen  Eine tolle Option für Familien!.",
    imageUrl: "/img/foto_3_img.png",
    rating: 4,
    signature: "Robert aus Eberswalde",
  },
  {
    id: 4,
    text: "Wenn Sie Lust auf einen erstklassigen Burger haben, aber keine Lust haben zu kochen, ist Space Burger die ideale Lösung. Die Lieferoption macht es einfach, sich verwöhnen zu lassen. Probieren Sie es unbedingt aus!",
    imageUrl: "/img/anonym.png",
    rating: 5,
    signature: "Anonym",
  },
];

export default function TestimonialsCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: (index) => setCurrentSlide(index),
  };

  const averageRating =
    reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  return (
    <div className="text-center max-w-3xl mx-auto">
      <section className=" mt-24 ">
        <Slider {...settings}>
          {reviews.map((review, index) => (
            <div key={review.id} className="carousel-item">
              <div className="review__image-container flex items-center justify-center text-center rounded-full overflow-hidden ">
                <Image
                  className="review__image flex justify-center"
                  width={200}
                  height={200}
                  src={review.imageUrl}
                  alt={`Review ${review.id}`}
                />
              </div>
              <div className="faq-items grid grid-rows-2 mt-8 text-center">
                <p>{review.text}</p>
                <p className="text-sm italic grid justify-end mt-4 text-primary">
                  - {review.signature}
                </p>
              </div>
              <div className="flex justify-center">
                <StarRating
                  count={5}
                  value={review.rating}
                  size={24}
                  edit={true}
                  className="flex items-center justify-center text-center mt-16"
                  activeColor="#E7F44E"
                  emptyIcon={<FaStar />}
                  filledIcon={<FaStar />}
                />
              </div>
            </div>
          ))}
        </Slider>

        
      </section>
    </div>
  );
}
