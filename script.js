let touchStartY = 0;
let touchEndY = 0;
const threshold = 100;



// ======================
// Floating Hearts
// ======================
function createHeart() {
  const heart = document.createElement("div");
  heart.classList.add("heart");
  heart.innerHTML = "❤";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = (Math.random() * 3 + 3) + "s";
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 6000);
}
setInterval(createHeart, 300);

// ======================
// Elements
// ======================
const giftBox = document.getElementById("giftBox");
const frontPage = document.getElementById("frontPage");
const slideshowPage = document.getElementById("slideshowPage");
const currentImg = document.getElementById("currentSlide");

// Music
const music1 = document.getElementById("bgMusic1");
const music2 = document.getElementById("bgMusic2");

document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Browser minimized / tab switched / app switched
        music1.pause();
        music2.pause();
    } else {
        // আবার active হলে চালাতে চাইলে uncomment করো
         if(currentIndex < totalImages) music1.play().catch(err => console.log(err));
    }
});

// ======================
// Slide Images
// ======================
const images = [];
for (let i = 1; i <= 30; i++) images.push(`images/pic${i}.jpg`);

let currentIndex = 0;
const totalImages = images.length;

// ======================
// Corners / Directions
// ======================
const corners = [
  { x: "-60%", y: "-60%" },
  { x: "160%", y: "-60%" },
  { x: "-60%", y: "160%" },
  { x: "160%", y: "160%" }
];

// ======================
// Gift Box Click
// ======================
giftBox.addEventListener("click", () => {
  giftBox.classList.add("gift-open");

  setTimeout(() => {
    frontPage.style.display = "none";
    slideshowPage.classList.add("show");

    // Play first music
    music1.play().catch(err => console.log(err));

    // When first music ends, play second if images not finished
    music1.addEventListener("ended", () => {
      if(currentIndex < totalImages) music2.play().catch(err => console.log(err));
    });

    showNextImage();
  }, 1000);
});

// ======================
// Show Next Image (Smooth, Cinematic)
// ======================

function showNextImage() {
  if(currentIndex >= totalImages) {
    // Stop music
    music1.pause();
    music2.pause();

    // Final message
    const finalMsg = document.createElement("div");
    finalMsg.innerHTML = `
      তোমার প্রতিটি সকাল হোক নতুন স্বপ্নের আলোয় ভরা,<br>
      প্রতিটি রাত হোক শান্তি আর ভালোবাসায় পূর্ণ।<br>
      জীবনের পথে তুমি সর্বদা হাসিখুশি থেকো। ✨💖
    `;
    finalMsg.style.position = "absolute";
    finalMsg.style.top = "50%";
    finalMsg.style.left = "50%";
    finalMsg.style.transform = "translate(-50%, -50%)";
    finalMsg.style.fontSize = "clamp(18px, 5vw, 28px)";
    finalMsg.style.color = "#fff";
    finalMsg.style.textAlign = "center";
    finalMsg.style.textShadow = "2px 2px 10px rgba(0,0,0,0.5)";
    finalMsg.style.lineHeight = "1.6";
    slideshowPage.appendChild(finalMsg);

    return;
  }

  const startCorner = corners[Math.floor(Math.random() * corners.length)];
  let endCorner;
  do { endCorner = corners[Math.floor(Math.random() * corners.length)]; }
  while (endCorner === startCorner);

  // Initial state
  currentImg.style.transition = "none";
  currentImg.style.transform = `translate(${startCorner.x}, ${startCorner.y}) scale(${Math.random()*0.5+0.7}) rotate(${Math.random()*5-2.5}deg)`;
  currentImg.style.opacity = 0;
  currentImg.style.filter = "brightness(0.5) contrast(0.9) saturate(0.95)";
  currentImg.classList.remove("glow");

  setTimeout(() => {
    currentImg.src = images[currentIndex];

    currentImg.style.transition = "transform 2s cubic-bezier(0.68,-0.55,0.27,1.55), opacity 1.5s ease, filter 2s ease";
    currentImg.style.transform = `translate(-50%, -50%) scale(1) rotate(${Math.random()*3-1.5}deg)`;
    currentImg.style.opacity = 1;
    currentImg.style.filter = "brightness(1.1) contrast(1.05) saturate(1.05) drop-shadow(0 0 20px rgba(255,255,255,0.3))";
    currentImg.classList.add("glow");

    for(let i=0;i<8;i++) createSparkle();

  }, 50);

  currentIndex++;

// Slide-out (after slide-in + stay)
setTimeout(() => {
  currentImg.style.transition = "transform 1.5s ease, opacity 1.5s ease, filter 1.5s ease";
  currentImg.style.transform = `translate(${endCorner.x}, ${endCorner.y}) scale(${Math.random()*0.3+0.7}) rotate(${Math.random()*3-1.5}deg)`;
  currentImg.style.opacity = 0;
  currentImg.style.filter = "brightness(0.7) contrast(0.95) saturate(0.95)";
  currentImg.classList.remove("glow");
}, 5000); // slide-in + short stay

// Call next image slightly after slide-out starts
setTimeout(showNextImage, 6500); // slide-out overlap করে next image আসবে

}





// ======================
// Sparkle Function
// ======================
function createSparkle() {
  const sparkle = document.createElement("div");
  sparkle.classList.add("sparkle");
  const x = Math.random() * 220 - 110 + "px";
  const y = Math.random() * 220 - 110 + "px";
  sparkle.style.setProperty("--x", x);
  sparkle.style.setProperty("--y", y);
  sparkle.style.background = `rgba(255, ${150+Math.random()*50}, ${200+Math.random()*55}, ${0.7+Math.random()*0.3})`;
  sparkle.style.width = sparkle.style.height = (4 + Math.random()*6) + "px";
  sparkle.style.animationDuration = (1 + Math.random()*2) + "s";
  sparkle.style.top = "50%";
  sparkle.style.left = "50%";
  currentImg.parentElement.appendChild(sparkle);
  setTimeout(() => sparkle.remove(), 2000);
}

document.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
});

document.addEventListener('touchmove', (e) => {
    touchEndY = e.touches[0].clientY;
});

document.addEventListener('touchend', () => {
    if (touchEndY - touchStartY > threshold) {
        location.reload(); // পেজ refresh হবে
    }
    touchStartY = 0;
    touchEndY = 0;
});

