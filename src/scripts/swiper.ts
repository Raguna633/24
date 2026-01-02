import Swiper from "swiper";
import { Autoplay, Navigation, Pagination, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

export function initGreetingSwiper() {
  const isDesktop = window.matchMedia("(min-width: 1024px)").matches;

  new Swiper(".greeting-swiper", {
    modules: [Navigation, Pagination, Autoplay, EffectFade],
    effect: "fade",
    fadeEffect: { crossFade: true },
    loop: true,
    speed: 1500,
    autoplay: isDesktop
      ? { delay: 5000, disableOnInteraction: false }
      : false,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    on: {
      slideChangeTransitionStart() {
        closeAllGreetingSections();
      },
    }
  });
}

function closeAllGreetingSections() {
  document
    .querySelectorAll<HTMLElement>("section[data-greeting]")
    .forEach((section) => {
      const excerpt = section.querySelector<HTMLElement>("[id$='-excerpt']");
      const full = section.querySelector<HTMLElement>("[id$='-full']");
      const button = section.querySelector<HTMLButtonElement>("button[aria-expanded]");

      if (excerpt && full) {
        excerpt.classList.remove("hidden");
        full.classList.add("hidden");
      }

      if (button) {
        button.setAttribute("aria-expanded", "false");
        button.querySelector(".toggle-text")!.textContent = "Read More";
        button.querySelector(".toggle-icon")?.classList.remove("rotate-180");
      }

      delete section.dataset.expanded;

      section
        .querySelector<HTMLElement>(".greeting-text-content")
        ?.scrollTo({ top: 0, behavior: "instant" });
    });
}


