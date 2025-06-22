document.addEventListener("DOMContentLoaded", function () {
  /* --------- Mobile Menu Toggle --------- */
  const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
  const navLinks = document.getElementById("nav-links");
  mobileMenuToggle.addEventListener("click", function () {
    navLinks.classList.toggle("show");
  });
  
  // Close mobile menu when a link is clicked
  const navLinkItems = document.querySelectorAll("#nav-links a");
  navLinkItems.forEach((link) => {
    link.addEventListener("click", () => {
      if (navLinks.classList.contains("show")) {
        navLinks.classList.remove("show");
      }
    });
  });

  /* --------- Typing Animation with Multiple Texts --------- */
  const typingElement = document.getElementById("typing");
  const texts = ["Md Sadman Ferdous", "A Learner", "A Designer"];
  let currentTextIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeDelay = 150;

  function type() {
    const currentText = texts[currentTextIndex];
    
    if (!isDeleting) {
      typingElement.textContent = currentText.substring(0, charIndex);
      charIndex++;
      if (charIndex > currentText.length) {
        isDeleting = true;
        typeDelay = 1000;
      } else {
        typeDelay = 150;
      }
    } else {
      typingElement.textContent = currentText.substring(0, charIndex);
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        currentTextIndex = (currentTextIndex + 1) % texts.length;
        typeDelay = 500;
      } else {
        typeDelay = 100;
      }
    }
    setTimeout(type, typeDelay);
  }
  type();

  /* --------- Education Cards Generation --------- */
  const educationData = [
    {
      certificate: "PSC",
      institution: "Masjid Mission Academy, Rajshahi",
      subject: "Science",
      year: "2017",
      result: "GPA 5.00",
    },
    {
      certificate: "JSC",
      institution: "Masjid Mission Academy, Rajshahi",
      subject: "Science",
      year: "2019",
      result: "GPA 4.80",
    },
      {
      certificate: "SSC",
      institution: "Masjid Mission Academy, Rajshahi",
      subject: "Science",
      year: "2021",
      result: "GPA 5.00",
    },
      {
      certificate: "HSC",
      institution: "Varendra College , Rajshahi",
      subject: "Science",
      year: "2024",
      result: "GPA 5.00",
    },
  ];

  const eduContainer = document.getElementById("education-container");

  function generateEducationCards(data) {
    data.forEach((item) => {
      const card = document.createElement("div");
      card.classList.add("education-card");
      
      const title = document.createElement("h3");
      title.textContent = item.certificate;
      card.appendChild(title);

      const inst = document.createElement("p");
      inst.innerHTML = `<strong>Institution:</strong> ${item.institution}`;
      card.appendChild(inst);

      const subj = document.createElement("p");
      subj.innerHTML = `<strong>Subject:</strong> ${item.subject}`;
      card.appendChild(subj);

      const year = document.createElement("p");
      year.innerHTML = `<strong>Year:</strong> ${item.year}`;
      card.appendChild(year);

      const result = document.createElement("p");
      result.innerHTML = `<strong>Result:</strong> ${item.result}`;
      card.appendChild(result);

      eduContainer.appendChild(card);
    });
  }

  generateEducationCards(educationData);

  /* Animate Education Cards */
  const eduCards = document.querySelectorAll('.education-card');
  const eduObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  
  eduCards.forEach(card => {
    eduObserver.observe(card);
  });

  /* --------- Skills Progress Bar Animation & Label Assignment --------- */
  const progressBars = document.querySelectorAll(".progress-bar");

  // Set the label from the data attribute
  progressBars.forEach(bar => {
    const label = bar.getAttribute("data-label");
    const labelElem = bar.querySelector(".progress-label");
    if (labelElem) {
      labelElem.textContent = label;
    }
  });

  const animateProgress = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const fill = entry.target.querySelector(".progress-fill");
        const targetPercent = entry.target.getAttribute("data-percentage");
        fill.style.width = targetPercent + "%";
        observer.unobserve(entry.target);
      }
    });
  };

  const progressObserver = new IntersectionObserver(animateProgress, {
    threshold: 0.5,
  });

  progressBars.forEach((bar) => {
    progressObserver.observe(bar);
  });

  /* --------- Slider (Projects) Functionality --------- */
  const slides = document.querySelectorAll(".slide");
  const controls = document.querySelectorAll(".slider-controls .control");
  let currentSlide = 0;
  const totalSlides = slides.length;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
    });
    controls.forEach((control, i) => {
      control.classList.toggle("active", i === index);
    });
    currentSlide = index;
  }

  // Automatic slide change every 4 seconds
  let slideInterval = setInterval(function () {
    let nextSlide = (currentSlide + 1) % totalSlides;
    showSlide(nextSlide);
  }, 4000);

  // Manual control on click
  controls.forEach((control, i) => {
    control.addEventListener("click", () => {
      clearInterval(slideInterval);
      showSlide(i);
      slideInterval = setInterval(function () {
        let nextSlide = (currentSlide + 1) % totalSlides;
        showSlide(nextSlide);
      }, 4000);
    });
  });

  /* --------- Contact Form (Basic Handling) --------- */
  const contactForm = document.getElementById("contact-form");
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Thank you for your message!");
    contactForm.reset();
  });
});
