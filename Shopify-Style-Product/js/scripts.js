// 🔄 MAIN IMAGE SWITCHING
let mainImage = document.getElementById('mainProductImage');
const thumbnailsContainer = document.querySelector('.thumbnails');

thumbnailsContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('thumb')) {
        document.querySelectorAll('.thumb').forEach(t => t.classList.remove('active'));
        event.target.classList.add('active');
        mainImage.src = event.target.src;
    }
});

// 📏 SIZE CHART MODAL LOGIC
const sizeChartBtn = document.getElementById('sizeChartBtn');
const sizeChartModal = document.getElementById('sizeChartModal');
const closeSizeChart = document.getElementById('closeSizeChart');

sizeChartBtn.addEventListener('click', () => {
    sizeChartModal.classList.remove('hidden');
});

closeSizeChart.addEventListener('click', () => {
    sizeChartModal.classList.add('hidden');
});


// For size buttons
const sizeButtons = document.querySelectorAll('.size-button');
const COLOR_KEY = 'selectedColor';
const SIZE_KEY = 'selectedSize';

// Load saved selection on page load
window.addEventListener('DOMContentLoaded', () => {
    const savedSize = localStorage.getItem(SIZE_KEY);
    if (savedSize) {
        sizeButtons.forEach(btn => {
            btn.classList.toggle('selected', btn.dataset.size === savedSize);
        });
    }

    const savedColor = localStorage.getItem(COLOR_KEY);
    document.querySelectorAll('.color-swatch').forEach(swatch => {
        swatch.classList.toggle('selected', swatch.dataset.color === savedColor);
    });
});

// Size button click
sizeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove 'selected' from all sizes
        sizeButtons.forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        localStorage.setItem(SIZE_KEY, btn.dataset.size);
    });
});

// Color swatch click
document.querySelectorAll('.color-swatch').forEach(swatch => {
    swatch.addEventListener('click', () => {
        // Remove from all
        document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('selected'));
        swatch.classList.add('selected');
        localStorage.setItem(COLOR_KEY, swatch.dataset.color);
    });
});


// 🎨 COMPARE COLOURS MODAL LOGIC
const compareBtn = document.getElementById("compareColorsBtn");
const compareModal = document.getElementById("compareColorsModal");
const closeCompareModal = document.getElementById("closeCompareModal");
const compareSwatches = document.getElementById("compareSwatches");

const selectedColors = new Set();

document.querySelectorAll(".color-swatch").forEach(swatch => {
    swatch.addEventListener("click", () => {
        const color = swatch.dataset.color;
        if (selectedColors.has(color)) {
            selectedColors.delete(color);
            swatch.classList.remove("selected");
        } else {
            selectedColors.add(color);
            swatch.classList.add("selected");
        }
    });
});

compareBtn.addEventListener("click", () => {
    compareSwatches.innerHTML = "";
    selectedColors.forEach(color => {
        const swatch = document.createElement("div");
        swatch.className = `color-swatch color-${color}`;
        compareSwatches.appendChild(swatch);
    });
    compareModal.classList.remove("hidden");
});

closeCompareModal.addEventListener("click", () => {
    compareModal.classList.add("hidden");
});

// 🔐 UNIVERSAL ESC + OVERLAY MODAL CLOSE
window.addEventListener('click', (e) => {
    if (e.target === sizeChartModal) sizeChartModal.classList.add('hidden');
    if (e.target === compareModal) compareModal.classList.add('hidden');
});

window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        sizeChartModal.classList.add('hidden');
        compareModal.classList.add('hidden');
    }
});
// Bundle Interactions
const checkboxes = document.querySelectorAll(".bundle-checkbox");
const totalDisplay = document.getElementById("bundleTotal");
const addBundleBtn = document.getElementById("addBundleBtn");

// Modal elements
const bundleModal = document.getElementById("bundleModal");
const closeBundleModal = document.getElementById("closeBundleModal");

function updateTotal() {
    let total = 0;
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            total += parseFloat(checkbox.dataset.price);
        }
    });
    totalDisplay.textContent = total.toFixed(2);
}

// Listen for checkbox toggle
checkboxes.forEach(cb => cb.addEventListener("change", updateTotal));

// Confirmation modal logic
addBundleBtn.addEventListener("click", () => {
    bundleModal.classList.remove("hidden");
});

closeBundleModal.addEventListener("click", () => {
    bundleModal.classList.add("hidden");
});

window.addEventListener("click", e => {
    if (e.target === bundleModal) {
        bundleModal.classList.add("hidden");
    }
});
window.addEventListener("keydown", e => {
    if (e.key === "Escape") {
        bundleModal.classList.add("hidden");
    }
});

// Initial total
updateTotal();


// Tabbed Info Section
const tabButtons = document.querySelectorAll(".tab");
const tabContents = document.querySelectorAll(".tab-content");

tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const target = btn.dataset.tab;

        // Deactivate all tabs
        tabButtons.forEach(b => b.classList.remove("active"));
        tabContents.forEach(content => content.classList.add("hidden"));



        // Activate clicked tab and show content
        btn.classList.add("active");
        document.getElementById(target).classList.remove("hidden");
    });
});

document.querySelector('.main-image').addEventListener('mousemove', e => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;

    mainImage.style.transformOrigin = `${xPercent}% ${yPercent}%`;
    mainImage.style.transform = 'scale(1.2)';
});

document.querySelector('.main-image').addEventListener('mouseleave', () => {
    mainImage.style.transformOrigin = 'center center';
    mainImage.style.transform = 'scale(1)';
});
