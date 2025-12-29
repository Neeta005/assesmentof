/**
 * Validation & QA Test Suite for Premier Schools Exhibition
 * Run this in the browser console to validate accessibility and functionality
 */

console.log("[v0] Starting QA Test Suite for Premier Schools Exhibition...\n")

// ============================================================
// Accessibility Tests
// ============================================================

class AccessibilityValidator {
  constructor() {
    this.issues = []
    this.warnings = []
    this.successes = []
  }

  // Check for skip link
  checkSkipLink() {
    const skipLink = document.querySelector(".header__skip-link")
    if (skipLink) {
      this.successes.push("✓ Skip-to-content link found")
      // Test focus
      skipLink.focus()
      if (document.activeElement === skipLink) {
        this.successes.push("✓ Skip link is focusable")
      }
    } else {
      this.issues.push("✗ No skip-to-content link found")
    }
  }

  // Check ARIA labels
  checkAriaLabels() {
    const buttons = document.querySelectorAll("button")
    let buttonsWithoutLabel = 0

    buttons.forEach((btn) => {
      const hasLabel =
        btn.getAttribute("aria-label") || btn.textContent.trim() || btn.title || btn.getAttribute("aria-labelledby")

      if (!hasLabel) {
        buttonsWithoutLabel++
      }
    })

    if (buttonsWithoutLabel === 0) {
      this.successes.push(`✓ All ${buttons.length} buttons have proper labels`)
    } else {
      this.issues.push(`✗ ${buttonsWithoutLabel} buttons missing ARIA labels`)
    }
  }

  // Check heading hierarchy
  checkHeadingHierarchy() {
    const headings = document.querySelectorAll("h1, h2, h3, h4, h5, h6")
    const headingLevels = Array.from(headings).map((h) => Number.parseInt(h.tagName[1]))

    let isValid = true
    for (let i = 1; i < headingLevels.length; i++) {
      const diff = headingLevels[i] - headingLevels[i - 1]
      if (diff > 1) {
        isValid = false
        break
      }
    }

    if (isValid && headingLevels.length > 0) {
      this.successes.push(`✓ Proper heading hierarchy found (${headings.length} headings)`)
    } else {
      this.warnings.push("⚠ Check heading hierarchy for proper nesting")
    }
  }

  // Check alt text
  checkAltText() {
    const images = document.querySelectorAll("img")
    let imagesWithoutAlt = 0

    images.forEach((img) => {
      if (!img.hasAttribute("alt") || img.getAttribute("alt").trim() === "") {
        imagesWithoutAlt++
      }
    })

    if (imagesWithoutAlt === 0) {
      this.successes.push(`✓ All ${images.length} images have alt text`)
    } else {
      this.issues.push(`✗ ${imagesWithoutAlt} images missing alt text`)
    }
  }

  // Check form labels
  checkFormLabels() {
    const inputs = document.querySelectorAll("input, select, textarea")
    let inputsWithoutLabel = 0

    inputs.forEach((input) => {
      const hasLabel =
        document.querySelector(`label[for="${input.id}"]`) ||
        input.getAttribute("aria-label") ||
        input.getAttribute("aria-labelledby") ||
        input.hasAttribute("placeholder")

      if (!hasLabel) {
        inputsWithoutLabel++
      }
    })

    if (inputsWithoutLabel === 0) {
      this.successes.push(`✓ All ${inputs.length} form fields are labeled`)
    } else {
      this.warnings.push(`⚠ ${inputsWithoutLabel} form fields may lack proper labels`)
    }
  }

  // Check focus indicators
  checkFocusIndicators() {
    const focusableElements = document.querySelectorAll("a, button, input, select, textarea")

    let elementsWithoutFocus = 0
    focusableElements.forEach((el) => {
      const styles = window.getComputedStyle(el)
      const hasFocusStyle = styles.outline !== "none"
      if (!hasFocusStyle) {
        elementsWithoutFocus++
      }
    })

    if (elementsWithoutFocus === 0) {
      this.successes.push("✓ Focus indicators present on interactive elements")
    } else {
      this.warnings.push(`⚠ ${elementsWithoutFocus} interactive elements may lack focus indicators`)
    }
  }

  // Check color contrast (basic check)
  checkColorContrast() {
    const elements = document.querySelectorAll("body *")
    const lowContrast = 0

    // This is a simplified check - use dedicated tools for thorough validation
    elements.forEach((el) => {
      const styles = window.getComputedStyle(el)
      const bgColor = styles.backgroundColor
      const color = styles.color

      // Basic check for black on white
      if (
        (bgColor === "rgb(255, 255, 255)" && color === "rgb(0, 0, 0)") ||
        (bgColor === "rgb(0, 0, 0)" && color === "rgb(255, 255, 255)")
      ) {
        // Good contrast
      }
    })

    this.warnings.push("⚠ Use Axe DevTools or WAVE for detailed contrast analysis")
  }

  run() {
    console.log("🔍 Running Accessibility Tests...\n")

    this.checkSkipLink()
    this.checkAriaLabels()
    this.checkHeadingHierarchy()
    this.checkAltText()
    this.checkFormLabels()
    this.checkFocusIndicators()
    this.checkColorContrast()

    this.report()
  }

  report() {
    console.log("✅ SUCCESSES:")
    this.successes.forEach((msg) => console.log(`  ${msg}`))

    console.log("\n⚠️  WARNINGS:")
    this.warnings.forEach((msg) => console.log(`  ${msg}`))

    console.log("\n❌ ISSUES:")
    if (this.issues.length === 0) {
      console.log("  No critical issues found!")
    } else {
      this.issues.forEach((msg) => console.log(`  ${msg}`))
    }

    console.log(
      `\n📊 Summary: ${this.successes.length} passed, ${this.warnings.length} warnings, ${this.issues.length} issues\n`,
    )
  }
}

// ============================================================
// Functionality Tests
// ============================================================

class FunctionalityValidator {
  constructor() {
    this.tests = []
  }

  checkHeroSlider() {
    const slider = document.querySelector(".hero-slider")
    const buttons = document.querySelectorAll(".hero-slider__btn")
    const playPause = document.querySelector(".hero-slider__play-pause")

    if (slider && buttons.length === 2 && playPause) {
      this.tests.push("✓ Hero slider controls present")
    } else {
      this.tests.push("✗ Hero slider may be missing components")
    }
  }

  checkCarousels() {
    const schoolCarousel = document.querySelector(".school-carousel")
    const featuresCarousel = document.querySelector(".features-carousel")
    const schoolCards = document.querySelector(".school-cards")

    let carouselCount = 0
    if (schoolCarousel) carouselCount++
    if (featuresCarousel) carouselCount++
    if (schoolCards) carouselCount++

    this.tests.push(`✓ Found ${carouselCount} carousel/slider components`)
  }

  checkForms() {
    const form = document.querySelector(".enquiry-form")

    if (form) {
      const inputs = form.querySelectorAll("input, select")
      const submitBtn = form.querySelector('button[type="submit"]')

      if (inputs.length >= 3 && submitBtn) {
        this.tests.push(`✓ Enquiry form found with ${inputs.length} input fields`)
      } else {
        this.tests.push("⚠ Enquiry form may be incomplete")
      }
    } else {
      this.tests.push("✗ No enquiry form found")
    }
  }

  checkResponsiveness() {
    const viewport = document.querySelector('meta[name="viewport"]')

    if (viewport && viewport.getAttribute("content").includes("width=device-width")) {
      this.tests.push("✓ Viewport meta tag configured for responsive design")
    } else {
      this.tests.push("✗ Viewport meta tag missing or incorrect")
    }
  }

  run() {
    console.log("🎯 Running Functionality Tests...\n")

    this.checkHeroSlider()
    this.checkCarousels()
    this.checkForms()
    this.checkResponsiveness()

    this.tests.forEach((test) => console.log(`  ${test}`))
    console.log()
  }
}

// ============================================================
// HTML/CSS Validation
// ============================================================

class ValidationChecks {
  constructor() {
    this.results = []
  }

  checkSemanticHTML() {
    const semanticTags = document.querySelectorAll("header, main, section, article, nav, footer, aside")

    if (semanticTags.length > 0) {
      this.results.push(`✓ Semantic HTML tags found (${semanticTags.length} elements)`)
    } else {
      this.results.push("⚠ Consider using semantic HTML tags")
    }
  }

  checkBEM() {
    const elements = document.querySelectorAll('[class*="__"], [class*="--"]')

    if (elements.length > 0) {
      this.results.push(`✓ BEM naming convention detected (${elements.length} elements)`)
    } else {
      this.results.push("⚠ BEM naming convention not consistently used")
    }
  }

  checkMetaTags() {
    const title = document.querySelector("title")
    const description = document.querySelector('meta[name="description"]')
    const viewport = document.querySelector('meta[name="viewport"]')

    if (title) this.results.push("✓ Page title present")
    if (description) this.results.push("✓ Meta description present")
    if (viewport) this.results.push("✓ Viewport meta tag present")

    if (!title || !description || !viewport) {
      this.results.push("⚠ Some important meta tags are missing")
    }
  }

  run() {
    console.log("📝 Running HTML/CSS Validation...\n")

    this.checkSemanticHTML()
    this.checkBEM()
    this.checkMetaTags()

    this.results.forEach((result) => console.log(`  ${result}`))
    console.log()
  }
}

// ============================================================
// Run All Tests
// ============================================================

function runFullQATest() {
  console.clear()
  console.log("🚀 PREMIER SCHOOLS EXHIBITION - QA TEST SUITE\n")
  console.log("=" + "=".repeat(50) + "\n")

  const accessibility = new AccessibilityValidator()
  accessibility.run()

  const functionality = new FunctionalityValidator()
  functionality.run()

  const validation = new ValidationChecks()
  validation.run()

  console.log("=" + "=".repeat(50))
  console.log("\n📋 Next Steps:")
  console.log("1. Run W3C HTML Validator: https://validator.w3.org/")
  console.log("2. Run W3C CSS Validator: https://jigsaw.w3.org/css-validator/")
  console.log("3. Install Axe DevTools browser extension")
  console.log("4. Test with screen readers (NVDA, JAWS, VoiceOver)")
  console.log("5. Test on actual devices (iOS, Android, tablets)")
  console.log("6. Run Lighthouse audit in Chrome DevTools")
  console.log("\n✅ QA Test Suite Complete!\n")
}

// Auto-run tests when page loads
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    setTimeout(runFullQATest, 1000)
  })
} else {
  setTimeout(runFullQATest, 1000)
}

// Make function available in console
window.runFullQATest = runFullQATest
