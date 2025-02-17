const plateData = {
    regNumber: "",
    vehicleType: "Car",
    platesLayout: "Custom Plates",
    plateType: "Front & Rear",
    frontSize: "Standard Car (20.5x4.4in)",
    font: "Standard car",
    border: "Black",
    slogan: "",
    badge: {
        region: "wales",
        subRegion: "wales-",
        color: "blue",
    },
    sloganFont: {
        style: "wales",
        variant: "wales-",
        color: "blue",
    },
    plateStyle: "standard",
};

// Function to update plate previews
function updatePlatePreviews() {
    const preview1 = document.getElementById("platePreview1");
    const preview2 = document.getElementById("platePreview2");
    const sloganPreview1 = document.getElementById("sloganPreview1");
    const sloganPreview2 = document.getElementById("sloganPreview2");

    // Update registration number
    preview1.textContent = plateData.regNumber || "YOUR REG";
    preview2.textContent = plateData.regNumber || "YOUR REG";

    // Update slogan
    if (plateData.slogan) {
        sloganPreview1.textContent = plateData.slogan;
        sloganPreview2.textContent = plateData.slogan;
        sloganPreview1.classList.remove("hidden");
        sloganPreview2.classList.remove("hidden");
    } else {
        sloganPreview1.classList.add("hidden");
        sloganPreview2.classList.add("hidden");
    }

    // Update plate style classes
    const baseClasses = "text-4xl font-bold";
    let styleClasses = "";

    switch (plateData.plateStyle) {
        case "4d":
            styleClasses = "font-extrabold text-shadow-lg";
            break;
        case "3d-gel":
            styleClasses = "italic text-gray-700 text-shadow-lg";
            break;
        default:
            styleClasses = "";
    }

    preview1.className = `${baseClasses} ${styleClasses}`;
    preview1.style.textShadow = "2px 2px 4px rgba(255, 0, 0, 0.8)";
    preview2.style.textShadow = "2px 2px 4px rgba(255, 0, 0, 0.8)"; 
    preview2.className = `${baseClasses} ${styleClasses} bg-yellow-400 px-6 py-3 rounded`;
}

// Event listeners for all inputs   
document.getElementById("regNumber").addEventListener("input", (e) => {
    plateData.regNumber = e.target.value.toUpperCase();
    updatePlatePreviews();
});

document.getElementById("slogan").addEventListener("input", (e) => {
    plateData.slogan = e.target.value;
    updatePlatePreviews();
});

// Event listeners for plate style buttons
document.querySelectorAll(".plate-style-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
        // Reset all buttons to gray
        document.querySelectorAll(".plate-style-btn").forEach((b) => {
            b.classList.remove("bg-blue-500");
            b.classList.add("bg-gray-500");
        });

        // Highlight selected button
        this.classList.remove("bg-gray-500");
        this.classList.add("bg-blue-500");

        // Update plate style
        plateData.plateStyle = this.dataset.style;
        updatePlatePreviews();
    });
});

// Event listeners for badge selects
["badgeRegion", "badgeSubRegion", "badgeColor"].forEach((id) => {
    document.getElementById(id).addEventListener("change", (e) => {
        const key = id.replace("badge", "").toLowerCase();
        plateData.badge[key] = e.target.value;
        updatePlatePreviews();
    });
});

// Event listeners for slogan font selects
["sloganStyle", "sloganVariant", "sloganColor"].forEach((id) => {
    document.getElementById(id).addEventListener("change", (e) => {
        const key = id.replace("slogan", "").toLowerCase();
        plateData.sloganFont[key] = e.target.value;
        updatePlatePreviews();
    });
});

// Event listeners for other selects
[
    "vehicleType",
    "platesLayout",
    "plateType",
    "frontSize",
    "font",
    "border",
].forEach((id) => {
    document.getElementById(id).addEventListener("change", (e) => {
        plateData[id] = e.target.value;
        updatePlatePreviews();
    });
});

const plateStyle = document.getElementById("my-plate-style");
const platePreview01 = plateStyle.children[0];
const platePreview02 = plateStyle.children[1];

const vehicleType_of = document.getElementById("vehicleType");
const platesLayout = document.getElementById("platesLayout");

const plateType = document.getElementById("plateType");
const frontSize = document.getElementById("frontSize");

document.getElementById("border").addEventListener("input", (e) => {
    let valueOfBorder = e.target.value.trim().toLowerCase();

    let borderStyle = "5px solid"; // Ensuring a solid border is applied

    if (valueOfBorder === "blue") {
        platePreview01.style.border = borderStyle + " blue";
        platePreview02.style.border = borderStyle + " blue";
    } else if (valueOfBorder === "red") {
        platePreview01.style.border = borderStyle + " red";
        platePreview02.style.border = borderStyle + " red";
    } else if (valueOfBorder === "black") {
        platePreview01.style.border = borderStyle + " black";
        platePreview02.style.border = borderStyle + " black";
    } else if (valueOfBorder === "none") {
        platePreview01.style.border = "none"; // No border when "none" is selected
        platePreview02.style.border = "none"; // No border when "none" is selected
    }

    console.log(valueOfBorder);
});

vehicleType_of.addEventListener("click", (e) => {
    vehicleType_value = e.target.value.trim().toLowerCase();
    // console.log(vehicleType_value)
});

platesLayout.addEventListener("click", (e) => {
    const platesLayout_value = e.target.textContent.trim().toLowerCase(); // Use textContent
    console.log(platesLayout_value);
    if (platesLayout_value === "legal plates") {
        platePreview01.style.wordSpacing = "10px"; // Set gap between words
        platePreview02.style.wordSpacing = "10px"; // Set gap between words
        console.log(platesLayout_value);
    }
});

plateType.addEventListener("change", (e) => {
    const plateType_value = e.target.value.trim().toLowerCase();

    if (plateType_value === "front") {
        platePreview01.style.display = "block";
        platePreview02.style.display = "none";
    } else if (plateType_value === "rear") {
        platePreview01.style.display = "none";
        platePreview02.style.display = "block";
    } else if (plateType_value === "front & rear") {
        platePreview01.style.display = "";
        platePreview02.style.display = "";
    }

    // Log the selected value for debugging
});

frontSize.addEventListener("change", (e) => {
    const selectedSize = e.target.value.trim().toLowerCase();

    // Conversion factor (1 inch = 96px)
    const inchToPx = 25;

    // Define size values based on options
    let widthPx = "";
    let heightPx = "";

    switch (selectedSize) {
        case "standard car (20.5x4.4in)":
            widthPx = 20.5 * inchToPx; // 20.5 inches to pixels
            heightPx = 4.4 * inchToPx; // 4.4 inches to pixels
            break;
        case "std. 4x4 279mm x 203mm (11in x 8in)":
            widthPx = 11 * inchToPx; // 11 inches to pixels
            heightPx = 8 * inchToPx; // 8 inches to pixels
            break;
        case "229mm x 76mm (9in x 3in)":
            widthPx = 9 * inchToPx; // 9 inches to pixels
            heightPx = 3 * inchToPx; // 3 inches to pixels
            break;
        case "254mm x 76mm (10in x 3in)":
            widthPx = 10 * inchToPx; // 10 inches to pixels
            heightPx = 3 * inchToPx; // 3 inches to pixels
            break;
        case "305mm x 76mm (12in x 3in)":
            widthPx = 12 * inchToPx; // 12 inches to pixels
            heightPx = 3 * inchToPx; // 3 inches to pixels
            break;
        case "305mm x 152mm (12in x 6in)":
            widthPx = 12 * inchToPx; // 12 inches to pixels
            heightPx = 6 * inchToPx; // 6 inches to pixels
            break;
        case "330mm x 111mm (13in x 4.4in)":
            widthPx = 13 * inchToPx; // 13 inches to pixels
            heightPx = 4.4 * inchToPx; // 4.4 inches to pixels
            break;
        case "330mm x 165mm (13in x 6.5in)":
            widthPx = 13 * inchToPx; // 13 inches to pixels
            heightPx = 6.5 * inchToPx; // 6.5 inches to pixels
            break;
        case "16in x 4.5in (16in x 4.5in)":
            widthPx = 16 * inchToPx; // 16 inches to pixels
            heightPx = 4.5 * inchToPx; // 4.5 inches to pixels
            break;
        case "520mm x 121mm (20.5in x 4.75in)":
            widthPx = 20.5 * inchToPx; // 20.5 inches to pixels
            heightPx = 4.75 * inchToPx; // 4.75 inches to pixels
            break;
        default:
            widthPx = 20.5 * inchToPx; // Default size if no match
            heightPx = 4.4 * inchToPx; // Default height
    }

    // Apply the changes to platePreview01 and platePreview02
    platePreview01.style.width = `${widthPx}px`; // Apply in px
    platePreview01.style.height = `${heightPx}px`; // Apply in px

    platePreview02.style.width = `${widthPx}px`; // Apply in px
    platePreview02.style.height = `${heightPx}px`; // Apply in px

    // Optionally, log the selected size for debugging
    console.log(
        `Selected size: ${selectedSize} -> Width: ${widthPx}px, Height: ${heightPx}px`
    );
});

document.addEventListener("DOMContentLoaded", function () {
    const badgeRegion = document.getElementById("badgeRegion");
    const badgeImages = document.querySelectorAll(".badge-image"); // Select all images with class

    if (badgeImages.length === 0) {
        console.error("❌ No elements found with class 'badge-image' in the DOM!");
        return;
    }

    badgeRegion.addEventListener("change", (e) => {
        const badgeRegionValue = e.target.value.trim().toLowerCase();

        badgeImages.forEach((badgeImage) => {
            // Loop through all images
            if (badgeRegionValue === "england") {
                badgeImage.src = "england_flag.jpeg";
                badgeImage.classList.remove("hidden"); // Show image
            } else if (badgeRegionValue === "wales") {
                badgeImage.src = "wales_flag.png";
                badgeImage.classList.remove("hidden");
            } else if (badgeRegionValue === "scotland") {
                badgeImage.src = "scotland.jpg";
                badgeImage.classList.remove("hidden");
            } else {
                badgeImage.classList.add("hidden"); // Hide image
            }
        });
    });
});



const badgeSubRegion = document.getElementById('badgeSubRegion');

badgeSubRegion.addEventListener('change', (e) => {
    const badgeSubRegionValue = e.target.value.trim().toLowerCase();

    // You can implement custom logic based on the selected value
    if (badgeSubRegionValue === "bedge") {
        // Do something for "Bedge"
        console.log("Bedge option selected!");
    } else if (badgeSubRegionValue === "st_george-eng") {
        // Do something for "St_george-ENG"
        console.log("St_george-ENG option selected!");
    } else if (badgeSubRegionValue === "st_george-english") {
        // Do something for "St_george-ENGLISH"
        console.log("St_george-ENGLISH option selected!");
    }
});


const badgeColor = document.getElementById('badgeColor');

badgeColor.addEventListener('change', (e) => {
    const badgeColorValue = e.target.value.trim().toLowerCase();
    console.log(`Selected badge color: ${badgeColorValue}`);

    // Example: Changing background color of badge elements based on selected color
    const badgeImages = document.querySelectorAll('.badge-image');
    badgeImages.forEach(badgeImage => {
        badgeImage.style.backgroundColor = badgeColorValue; // Update background color
    });

    // You can also add custom logic to handle the selected color
    if (badgeColorValue === "blue") {
        console.log("Blue color selected");
    } else if (badgeColorValue === "red") {
        console.log("Red color selected");
    } else if (badgeColorValue === "green") {
        console.log("Green color selected");
    }
});



// Accessing an element from the HTML
const font_Element = document.getElementById("font");
const prev_fron_Element = document.getElementById("platePreview1");
const prev_rear_Element = document.getElementById("platePreview2");

// Event listener for font dropdown change
font_Element.addEventListener("change", (e) => {
    const font_Element_value = e.target.value.trim().toLowerCase();

    // Apply the selected font directly to the preview elements
    if (font_Element_value === "standard car") {
        prev_fron_Element.style.fontFamily = "'Arial', sans-serif";
        prev_rear_Element.style.fontFamily = "'Arial', sans-serif";
    } else if (font_Element_value === "3d font") {
        prev_fron_Element.style.fontFamily = "'3D Font', sans-serif";
        prev_fron_Element.style.textShadow = "2px 2px 4px rgba(0, 0, 0, 0.3)";
        prev_rear_Element.style.fontFamily = "'3D Font', sans-serif";
        prev_rear_Element.style.textShadow = "2px 2px 4px rgba(0, 0, 0, 0.3)";
    } else if (font_Element_value === "inline font") {
        prev_fron_Element.style.fontFamily = "'Inline Font', sans-serif";
        prev_fron_Element.style.fontWeight = "lighter";
        prev_rear_Element.style.fontFamily = "'Inline Font', sans-serif";
        prev_rear_Element.style.fontWeight = "lighter";
    }
});

const sloganStyle = document.getElementById("sloganStyle");
const sloganVariant = document.getElementById("sloganVariant");
const sloganColor = document.getElementById("sloganColor");

const sloganPreview1 = document.getElementById("sloganPreview1");
const sloganPreview2 = document.getElementById("sloganPreview2");

// Default settings for slogan preview
window.addEventListener("DOMContentLoaded", () => {
    // Default slogan font, size, and color
    sloganPreview1.style.fontFamily = "Arial";
    sloganPreview2.style.fontFamily = "Arial";
    sloganPreview1.style.fontSize = "16px"; // Default size
    sloganPreview2.style.fontSize = "16px"; // Default size
    sloganPreview1.style.color = "black";
    sloganPreview2.style.color = "black";
});

// Event listener for font style
sloganStyle.addEventListener("change", (e) => {
    const selectedStyle = e.target.value;
    sloganPreview1.style.fontFamily = selectedStyle;
    sloganPreview2.style.fontFamily = selectedStyle;
});

// Event listener for font variant (size)
sloganVariant.addEventListener("change", (e) => {
    const selectedVariant = e.target.value;

    switch (selectedVariant) {
        case "Std size":
            sloganPreview1.style.fontSize = "16px"; // Standard size
            sloganPreview2.style.fontSize = "16px"; // Standard size
            break;
        case "Large size":
            sloganPreview1.style.fontSize = "24px"; // Large size
            sloganPreview2.style.fontSize = "24px"; // Large size
            break;
        case "Largest size":
            sloganPreview1.style.fontSize = "32px"; // Largest size
            sloganPreview2.style.fontSize = "32px"; // Largest size
            break;
        default:
            sloganPreview1.style.fontSize = "16px"; // Default to standard size
            sloganPreview2.style.fontSize = "16px"; // Default to standard size
    }
});

// Event listener for font color
sloganColor.addEventListener("change", (e) => {
    const selectedColor = e.target.value.toLowerCase(); // Convert to lowercase for uniformity
    sloganPreview1.style.color = selectedColor;
    sloganPreview2.style.color = selectedColor;
});
