import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

document.addEventListener("DOMContentLoaded", (event) => {
  // Mobile menu toggle
  const menuToggle = document.getElementById("menu-toggle")
  const mobileMenu = document.getElementById("mobile-menu")

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden")
    })
  }

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
        })
      }
    })
  })

  // Initialize GSAP ScrollTrigger
  gsap.registerPlugin(ScrollTrigger)

  // Animation for sections
  gsap.utils.toArray("section").forEach((section, i) => {
    ScrollTrigger.create({
      trigger: section,
      start: "top 80%",
      end: "bottom 20%",
      markers: false,
      onEnter: () => section.classList.add("fade-in-up"),
    })
  })

  // Dynamic project cards
  const projects = [
    {
      title: "E-commerce Platform",
      description: "A fully responsive online store with secure payment integration.",
      image: "images/E-commerce Platform.jpeg",
    },
    {
      title: "Mobile Banking App",
      description: "Secure and user-friendly mobile banking solution.",
      image: "images/Mobile Banking App.jpeg",
    },
    {
      title: "AI-powered Analytics",
      description: "Advanced analytics platform using machine learning algorithms.",
      image: "https://via.placeholder.com/300x200?text=AI+Analytics",
    },
  ]

  const projectsContainer = document.querySelector("#projects-grid")
  projects.forEach((project) => {
    const card = document.createElement("div")
    card.className = "bg-white rounded-lg shadow-md overflow-hidden shadow-hover"
    card.innerHTML = `
            <img src="${project.image}" alt="${project.title}" class="w-full h-48 object-cover">
            <div class="p-6">
                <h3 class="text-xl font-semibold mb-2">${project.title}</h3>
                <p class="text-gray-600">${project.description}</p>
            </div>
        `
    projectsContainer.appendChild(card)
  })

  // Navbar scroll effect
  const header = document.getElementById("main-header")
  let lastScrollTop = 0

  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    if (scrollTop > lastScrollTop) {
      header.classList.add("nav-hidden")
    } else {
      header.classList.remove("nav-hidden")
    }
    lastScrollTop = scrollTop

    // Adjust elevate text
    const elevateText = document.querySelector(".elevate-text")
    if (elevateText) {
      const headerHeight = header.offsetHeight
      const elevateTextRect = elevateText.getBoundingClientRect()
      if (elevateTextRect.top < headerHeight) {
        elevateText.style.transform = `translateY(${headerHeight - elevateTextRect.top}px)`
      } else {
        elevateText.style.transform = "translateY(0)"
      }
    }
  })

  // Parallax effect for hero section
  const hero = document.querySelector("#home")
  window.addEventListener("scroll", () => {
    const scrollPosition = window.pageYOffset
    hero.style.backgroundPositionY = `${scrollPosition * 0.5}px`
  })
})

