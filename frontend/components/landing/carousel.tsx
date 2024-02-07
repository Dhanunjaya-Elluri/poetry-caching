"use client";
import Autoplay from "embla-carousel-autoplay";
import React from "react";
import platformTest from "@/public/images/platform_test.png";
import platform_test_result from "@/public/images/platform_test_result.png";
import platform_dashboard from "@/public/images/platform_dashboard.png";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";

export function CarouselPlugin() {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false })
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full"
      opts={{
        align: "start",
        loop: true,
      }}
    >
      <CarouselContent>
        <CarouselItem>
          <Image src={platform_dashboard} alt="logo" width={1000} height={32} />
        </CarouselItem>
        <CarouselItem>
          <Image src={platformTest} alt="logo" width={1000} height={32} />
        </CarouselItem>
        <CarouselItem>
          <Image
            src={platform_test_result}
            alt="logo"
            width={1000}
            height={32}
          />
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
}
