// ============================================================
// Hero Slider - Dual Axis with Auto-play
// ============================================================

class HeroSlider {
  constructor() {
    this.slider = document.querySelector(".hero-slider")
    this.items = document.querySelectorAll(".hero-slider__item")
    this.prevBtn = document.querySelector(".hero-slider__btn--prev")
    this.nextBtn = document.querySelector(".hero-slider__btn--next")
    this.playPauseBtn = document.querySelector(".hero-slider__play-pause")

    this.currentIndex = 0
    this.autoplayInterval = null
    this.isPlaying = true
    this.autoplayDelay = 5000 // 5 seconds

    this.init()
  }

  init() {
    this.setupEventListeners()
    this.startAutoplay()
  }

  setupEventListeners() {
    this.prevBtn.addEventListener("click", () => this.prevSlide())
    this.nextBtn.addEventListener("click", () => this.nextSlide())
    this.playPauseBtn.addEventListener("click", () => this.toggleAutoplay())

    // Pause on hover
    this.slider.addEventListener("mouseenter", () => this.pauseAutoplay())
    this.slider.addEventListener("mouseleave", () => {
      if (this.isPlaying) this.startAutoplay()
    })

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") this.prevSlide()
      if (e.key === "ArrowRight") this.nextSlide()
    })

    // Swipe support
    let touchStartX = 0
    this.slider.addEventListener("touchstart", (e) => {
      touchStartX = e.touches[0].clientX
    })
    this.slider.addEventListener("touchend", (e) => {
      const touchEndX = e.changedTouches[0].clientX
      if (touchStartX - touchEndX > 50) this.nextSlide()
      if (touchEndX - touchStartX > 50) this.prevSlide()
    })
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.items.length
    this.updateSliderPosition()
  }

  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.items.length) % this.items.length
    this.updateSliderPosition()
  }

  updateSliderPosition() {
    // Visual feedback can be added here
    console.log(`[v0] Slider position updated to: ${this.currentIndex}`)
  }

  startAutoplay() {
    if (this.autoplayInterval) clearInterval(this.autoplayInterval)
    this.autoplayInterval = setInterval(() => this.nextSlide(), this.autoplayDelay)
  }

  pauseAutoplay() {
    if (this.autoplayInterval) clearInterval(this.autoplayInterval)
  }

  toggleAutoplay() {
    this.isPlaying = !this.isPlaying
    const icon = this.playPauseBtn.querySelector(".hero-slider__play-pause-icon")

    if (this.isPlaying) {
      icon.textContent = "⏸"
      this.playPauseBtn.setAttribute("aria-label", "Pause autoplay")
      this.startAutoplay()
    } else {
      icon.textContent = "▶"
      this.playPauseBtn.setAttribute("aria-label", "Play autoplay")
      this.pauseAutoplay()
    }
  }
}

// ============================================================
// School Carousel - Continuous Loop Animation
// ============================================================

class SchoolCarousel {
  constructor() {
    this.carousel = document.querySelector(".school-carousel")
    this.track = document.querySelector(".school-carousel__track")

    if (this.carousel) {
      this.init()
    }
  }

  init() {
    // Pause animation on hover
    this.carousel.addEventListener("mouseenter", () => {
      this.track.style.animationPlayState = "paused"
    })

    this.carousel.addEventListener("mouseleave", () => {
      this.track.style.animationPlayState = "running"
    })

    // Pause on focus for keyboard users
    const items = this.carousel.querySelectorAll(".school-carousel__item")
    items.forEach((item) => {
      item.addEventListener("focus", () => {
        this.track.style.animationPlayState = "paused"
      })
      item.addEventListener("blur", () => {
        this.track.style.animationPlayState = "running"
      })
    })
  }
}

// ============================================================
// School Cards - Mobile Slider with Swipe
// ============================================================

class SchoolCardsSlider {
  constructor() {
    this.cards = document.querySelector(".school-cards")
    this.cardItems = document.querySelectorAll(".school-card")

    if (this.cards && window.innerWidth < 768) {
      this.initMobileSlider()
    }

    window.addEventListener("resize", () => {
      if (window.innerWidth < 768) {
        this.initMobileSlider()
      }
    })
  }

  initMobileSlider() {
    let isDown = false
    let startX = 0
    let scrollLeft = 0

    this.cards.addEventListener("mousedown", (e) => {
      isDown = true
      startX = e.pageX - this.cards.offsetLeft
      scrollLeft = this.cards.scrollLeft
    })

    this.cards.addEventListener("mouseleave", () => {
      isDown = false
    })

    this.cards.addEventListener("mouseup", () => {
      isDown = false
    })

    this.cards.addEventListener("mousemove", (e) => {
      if (!isDown) return
      e.preventDefault()
      const x = e.pageX - this.cards.offsetLeft
      const walk = (x - startX) * 1
      this.cards.scrollLeft = scrollLeft - walk
    })

    // Touch support
    this.cards.addEventListener("touchstart", (e) => {
      startX = e.touches[0].pageX - this.cards.offsetLeft
      scrollLeft = this.cards.scrollLeft
    })

    this.cards.addEventListener("touchmove", (e) => {
      const x = e.touches[0].pageX - this.cards.offsetLeft
      const walk = (x - startX) * 1
      this.cards.scrollLeft = scrollLeft - walk
    })
  }
}

// ============================================================
// Features Carousel - Navigation Buttons
// ============================================================

class FeaturesCarousel {
  constructor() {
    this.track = document.querySelector(".features-carousel__track")
    this.prevBtn = document.querySelector(".features-carousel__prev")
    this.nextBtn = document.querySelector(".features-carousel__next")

    if (this.track && this.prevBtn && this.nextBtn) {
      this.init()
    }
  }

  init() {
    const cardWidth = 280
    const gap = 24

    this.prevBtn.addEventListener("click", () => {
      this.track.scrollBy({ left: -(cardWidth + gap), behavior: "smooth" })
    })

    this.nextBtn.addEventListener("click", () => {
      this.track.scrollBy({ left: cardWidth + gap, behavior: "smooth" })
    })
  }
}

// ============================================================
// Enquiry Form Handling
// ============================================================

class EnquiryForm {
  constructor() {
    this.form = document.querySelector(".enquiry-form")

    if (this.form) {
      this.init()
    }
  }

  init() {
    this.form.addEventListener("submit", (e) => {
      e.preventDefault()
      this.handleSubmit()
    })

    const inputs = this.form.querySelectorAll(".enquiry-form__input, .enquiry-form__select")
    inputs.forEach((input) => {
      input.addEventListener("blur", () => this.validateInput(input))
    })
  }

  validateInput(input) {
    const isValid = input.checkValidity()

    if (!isValid) {
      input.setAttribute("aria-invalid", "true")
    } else {
      input.setAttribute("aria-invalid", "false")
    }
  }

  handleSubmit() {
    const inputs = this.form.querySelectorAll(".enquiry-form__input, .enquiry-form__select")
    let isFormValid = true

    inputs.forEach((input) => {
      if (!input.checkValidity()) {
        isFormValid = false
        input.setAttribute("aria-invalid", "true")
      }
    })

    if (isFormValid) {
      const parentName = this.form.querySelector('input[placeholder="Parents Name"]').value
      alert(`Thank you ${parentName}! We will contact you soon.`)
      this.form.reset()
    }
  }
}

// ============================================================
// Appointment Button Handler
// ============================================================

class AppointmentHandler {
  constructor() {
    this.btn = document.querySelector(".appointment__btn")

    if (this.btn) {
      this.btn.addEventListener("click", () => this.handleClick())
    }
  }

  handleClick() {
    console.log("[v0] Appointment scheduling initiated")
    alert("Redirecting to appointment scheduling page...")
  }
}

// ============================================================
// Initialize All Components on Page Load
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  console.log("[v0] Initializing all components...")

  new HeroSlider()
  new SchoolCarousel()
  new SchoolCardsSlider()
  new FeaturesCarousel()
  new EnquiryForm()
  new AppointmentHandler()

  console.log("[v0] All components initialized successfully")
})

// ============================================================
// Accessibility - Keyboard Navigation
// ============================================================

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    // Close any open modals or menus if needed
    console.log("[v0] Escape key pressed")
  }
})
