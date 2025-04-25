//*********************************************************************** */
// Sidebar js
// ***********************************************************************
const sidebar = document.querySelector(".sidebar");
const menuBtn = document.querySelector(".navbar-toggler");
const closeBtn = document.querySelector(".close-sidebar");
const overlaySidebar = document.querySelector(".overlaySidebar");

function openSidebar() {
  sidebar.classList.add("active");
  overlaySidebar.classList.add("active");
  // Removed body.style.overflow = "hidden";
}

function closeSidebar() {
  sidebar.classList.remove("active");
  overlaySidebar.classList.remove("active");
  // Removed body.style.overflow = "";
}

menuBtn.addEventListener("click", openSidebar);
closeBtn.addEventListener("click", closeSidebar);
overlaySidebar.addEventListener("click", closeSidebar);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && overlaySidebar.classList.contains("active")) {
    closeSidebar();
  }
});

document.querySelectorAll(".sidebar-links").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href");

    // Close sidebar immediately
    closeSidebar();

    // Wait for sidebar to close and DOM to update
    setTimeout(() => {
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        // Calculate the target position
        const headerHeight = document.querySelector("header").offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight;

        // Scroll to the target position
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    }, 200);
  });
});
// *****************************************************
// Navbar link js
// *******************************************************
const navBarLinks = document.querySelectorAll(".nav-link");

navBarLinks.forEach((link) => {
  link.addEventListener("click", function () {
    navBarLinks.forEach((nav) => nav.classList.remove("active"));
    this.classList.add("active");
  });
});

//************************************************* */
// Nav-collection nav bar js
// **********************************************************

const navLinks = document.querySelectorAll(".nav-collection ul li a");
let currentActive = document.querySelector(".nav-collection ul li a.is-active");
let restoreOnLeave = false;

navLinks.forEach((link) => {
  link.addEventListener("mouseenter", () => {
    if (link !== currentActive && currentActive) {
      currentActive.classList.remove("is-active");
      restoreOnLeave = true;
    }
  });

  link.addEventListener("mouseleave", () => {
    if (restoreOnLeave && currentActive) {
      currentActive.classList.add("is-active");
      restoreOnLeave = false;
    }
  });

  link.addEventListener("click", () => {
    // Remove active from all
    navLinks.forEach((l) => l.classList.remove("is-active"));
    // Set new active
    link.classList.add("is-active");
    currentActive = link;
    restoreOnLeave = false;
  });
});

// *************************************************************
//explore-card slider js
// **************************************************************
document.addEventListener("DOMContentLoaded", function () {
  const slider = document.querySelector(".explore-slider");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");

  const scrollStep =
    document.querySelector(".explore-card-col").offsetWidth * 2; // Moves 2 cards at once

  function updateButtonState() {
    const buffer = 5; // Small buffer for better accuracy

    if (slider.scrollLeft <= 0) {
      prevBtn.style.opacity = "0.5";
      prevBtn.style.pointerEvents = "none";
    } else {
      prevBtn.style.opacity = "1";
      prevBtn.style.pointerEvents = "auto";
    }

    if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - buffer) {
      nextBtn.style.opacity = "0.5";
      nextBtn.style.pointerEvents = "none";
    } else {
      nextBtn.style.opacity = "1";
      nextBtn.style.pointerEvents = "auto";
    }
  }

  nextBtn.addEventListener("click", function () {
    slider.scrollBy({ left: scrollStep, behavior: "smooth" });
  });

  prevBtn.addEventListener("click", function () {
    slider.scrollBy({ left: -scrollStep, behavior: "smooth" });
  });

  // Listen for scroll changes to update button states
  slider.addEventListener("scroll", updateButtonState);

  // Initialize the button states
  updateButtonState();
});
// ************************************************************
//review card slider js
//************************************************************** */

$(document).ready(function () {
  const $slider = $(".autoplay");

  $slider.slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    infinite: true,
    dots: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });

  $slider.on("click", ".slick-dots button", function () {
    setTimeout(() => {
      $slider.slick("slickPlay");
    }, 1000);
  });
});

// **********************************************************
//btns hover and mobile click js
// ************************************************************

const loadMoreBtn = document.querySelector(".load-more-btn");
const subscribeBtn = document.querySelector(".subscribe-btn");
const shopNowBtn = document.querySelector(".shop-now-btn");
const footerText = document.querySelectorAll(".footer-text");
const cardBtn = document.querySelectorAll(".card-btn");

// Function to detect if the device is touch-based (mobile/tablet)
const isMobile = /Mobi|Android/i.test(navigator.userAgent);

// Function to handle the active class on click for mobile (applies to both buttons and footer text)
const handleMobileClick = (element) => {
  element.classList.add("active");

  // Remove the active class after 300ms (same as the CSS transition duration)
  setTimeout(() => {
    element.classList.remove("active");
  }, 300);
};

// Check if the device is mobile and add click event for both buttons and footer text
if (isMobile || window.matchMedia("(max-width: 768px)").matches) {
  // Buttons
  loadMoreBtn &&
    loadMoreBtn.addEventListener("click", () => handleMobileClick(loadMoreBtn));
  subscribeBtn &&
    subscribeBtn.addEventListener("click", () =>
      handleMobileClick(subscribeBtn)
    );
  shopNowBtn &&
    shopNowBtn.addEventListener("click", () => handleMobileClick(shopNowBtn));
  cardBtn &&
    cardBtn.forEach((btn) => {
      btn.addEventListener("click", () => handleMobileClick(btn));
    });
}

// ********************************
//form submisition sub btn
// ************************************

const form = document.querySelector(".form");
if (form && subscribeBtn) {
  form.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent actual form submission

    // Mobile feedback
    if (isMobile) {
      subscribeBtn.classList.add("active");
      setTimeout(() => {
        subscribeBtn.classList.remove("active");
      }, 300);
    }

    // Show alert
    const alertBox = document.querySelector(".alert-container");
    if (alertBox) {
      alertBox.style.display = "block";
      setTimeout(() => {
        alertBox.style.display = "none";
      }, 5000);
    }

    // Clear input fields
    const inputs = form.querySelectorAll("input");
    inputs.forEach((input) => {
      input.value = ""; // Clear the input field
    });
  });
}

function closeAlert() {
  const alertBox = document.querySelector(".alert-container");
  if (alertBox) alertBox.style.display = "none";
}
//

// Detect if device is touch
const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;

if (isTouchDevice) {
  const contactLinks = document.querySelectorAll(".contact-img-text a");

  contactLinks.forEach((link) => {
    link.addEventListener("touchstart", () => {
      // Remove active from all first
      contactLinks.forEach((el) => el.classList.remove("active"));
      // Then add to current
      link.classList.add("active");

      // Optional: Remove active after short delay for visual feedback
      setTimeout(() => {
        link.classList.remove("active");
      }, 500);
    });
  });
}
//

// *****************************************************
//nav collection product updates
//*********************************************************** */

document.addEventListener("DOMContentLoaded", function () {
  // Get all the anchor links in the navigation menu
  const navLinks = document.querySelectorAll(".nav-collection ul li a");

  // Add event listeners to each link
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault(); // Prevent the default anchor link behavior

      // Get the ID of the clicked link's target (without the #)
      const targetId = link.getAttribute("href").substring(1);
      const targetRow = document.getElementById(targetId);

      // If the clicked link's row is already visible, do nothing
      if (
        link.classList.contains("is-active") &&
        targetRow.classList.contains("is-active-row")
      ) {
        return; // Do nothing if the row is already visible and active
      }

      // Remove the active class from all links
      navLinks.forEach((link) => {
        link.classList.remove("is-active");
      });

      // Add the active class to the clicked link
      link.classList.add("is-active");

      // Hide all rows first
      const allRows = document.querySelectorAll(".collection-card-container");
      allRows.forEach((row) => {
        row.style.display = "none"; // Hide all rows
        row.classList.remove("is-active-row"); // Remove the active class from all rows
      });

      // Display the selected row and add the 'is-active-row' class
      if (targetRow) {
        targetRow.style.display = "flex"; // Show the active row
        targetRow.classList.add("is-active-row"); // Add the active class to the row
      }
    });
  });
});

// ***************************************************************************
//nav collection option value
// ************************************************************************
// on option select
document.addEventListener("DOMContentLoaded", function () {
  // Get all the anchor links in the navigation menu
  const navLinks = document.querySelectorAll(".nav-collection ul li a");
  const filterSelect = document.getElementById("filterSelect");

  // Add event listeners to each link in the navigation
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault(); // Prevent the default anchor link behavior

      // Get the ID of the clicked link's target (without the #)
      const targetId = link.getAttribute("href").substring(1);
      const targetRow = document.getElementById(targetId);

      // If the clicked link's row is already visible, do nothing
      if (
        link.classList.contains("is-active") &&
        targetRow.classList.contains("is-active-row")
      ) {
        return; // Do nothing if the row is already visible and active
      }

      // Remove the active class from all links
      navLinks.forEach((link) => {
        link.classList.remove("is-active");
      });

      // Add the active class to the clicked link
      link.classList.add("is-active");

      // Hide all rows first
      const allRows = document.querySelectorAll(".collection-card-container");
      allRows.forEach((row) => {
        row.style.display = "none"; // Hide all rows
        row.classList.remove("is-active-row"); // Remove the active class from all rows
      });

      // Display the selected row and add the 'is-active-row' class
      if (targetRow) {
        targetRow.style.display = "flex"; // Show the active row
        targetRow.classList.add("is-active-row"); // Add the active class to the row
      }
    });
  });

  // Add event listener for the select dropdown
  filterSelect.addEventListener("change", function () {
    const selectedValue = filterSelect.value;
    const allRows = document.querySelectorAll(".collection-card-container");

    // Hide all rows first
    allRows.forEach((row) => {
      row.style.display = "none";
      row.classList.remove("is-active-row");
    });

    // Show the selected category's row
    if (selectedValue !== "#") {
      const targetRow = document.getElementById(selectedValue);
      if (targetRow) {
        targetRow.style.display = "flex"; // Show the active row
        targetRow.classList.add("is-active-row"); // Add the active class to the row
      }
    }
  });
});
