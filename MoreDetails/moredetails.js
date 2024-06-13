document.addEventListener('DOMContentLoaded', function () {
  loadProductDetails();
  updateCartCount();
  updateRemoveButtonState(); // Ажурирање на состојбата на копчето при вчитување на страницата

  let currentImageIndex = 0;
  const thumbnails = document.querySelectorAll('.thumbnails img');
  const productImage = document.getElementById('product-image');

  function updateActiveImage(index) {
      thumbnails.forEach((thumb, i) => {
          if (i === index) {
              thumb.classList.add('active');
              productImage.src = thumb.src;
              productImage.style.width = '500px'; // Поставување на фиксна ширина
              productImage.style.height = '500px'; // Поставување на фиксна висина
              productImage.style.objectFit = 'cover'; // Задржување на пропорциите
              productImage.style.borderRadius = '10px'; // Заоблување на аглите
              productImage.style.display = 'block'; // Прикажување на активната слика
          } else {
              thumb.classList.remove('active');
          }
      });
  }

  document.getElementById('prev-thumbnail').addEventListener('click', function () {
      if (currentImageIndex > 0) {
          currentImageIndex--;
      } else {
          currentImageIndex = thumbnails.length - 1;
      }
      updateActiveImage(currentImageIndex);
  });

  document.getElementById('next-thumbnail').addEventListener('click', function () {
      if (currentImageIndex < thumbnails.length - 1) {
          currentImageIndex++;
      } else {
          currentImageIndex = 0;
      }
      updateActiveImage(currentImageIndex);
  });

  // Иницијално поставување на првата слика како активна
  if (thumbnails.length > 0) {
      updateActiveImage(0);
  }
});

function loadProductDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('productId');

  const products = {
      1: {
        title: "DUO RING",
        price: "254.99€",
        image: "/img/jewellery/DuoRing.webp",
        description: "Sleek and twist, the ultimate hook-up. Although opposites, they complement each other so well. This ring is handcrafted in 14k solid gold. The two bands are thicker than their sister Stacker Rings and move oh-so-effortlessly together.",
        thumbnails: [
          "/img/jewellery/duo-ring/duoring.webp",
          "/img/jewellery/duo-ring/duoring1.webp",
          "/img/jewellery/duo-ring/duoring2.webp",
          "/img/jewellery/duo-ring/duoring3.webp"
        ],
        presentation: `Every detail is meticulously designed to create a refined and elegant look. Crafted with the highest standards of goldsmithing, this ring is a symbol of eternal love and sophistication. Perfect for any occasion, whether for daily wear or special moments. The ring offers unparalleled comfort and style, while the golden lines shine with exquisite brilliance. Invest in something that will last forever and remind you of the beauty of simplicity and elegance.Each ring is a testament to exceptional craftsmanship, embodying both tradition and modernity. The 14k solid gold ensures durability and a timeless appeal, making it a cherished addition to any jewelry collection. Its versatile design allows it to be worn alone or paired with other pieces, enhancing its allure. Whether you're treating yourself or gifting it to a loved one, this ring is sure to become a treasured heirloom, admired for its beauty and cherished for its meaning. Celebrate life's precious moments with a piece that captures the essence of elegance and grace.`,
        specification: `<ul>
          <li><strong>Product Type:</strong> Drops</li>
          <li><strong>Occasion:</strong> Office Wear</li>
          <li><strong>Material Colour:</strong> Yellow</li>
          <li><strong>Jewellery Type:</strong> Gold Jewellery</li>
          <li><strong>Metal:</strong> Gold</li>
          </ul>`,
      },
      2: {
        title: "GEOMETRIC DANGLE DROP EARRINGS",
        price: "6000.00€",
        image: "/img/jewellery/geometric dangle drop earrings/geometric-dangle-drop.jpg",
        description: "These Drop Earrings are crafted with 22 Karat gold their geometric oval shapes and delicate Chain links exude sophistication.",
        thumbnails: [
          "/img/jewellery/geometric dangle drop earrings/geometric-dangle-drop.jpg",
          "/img/jewellery/geometric dangle drop earrings/geometric-dangle-drop1.jpg",
          "/img/jewellery/geometric dangle drop earrings/geometric-dangle-drop2.jpg",
          "/img/jewellery/geometric dangle drop earrings/geometric-dangle-drop3.jpg",
          "/img/jewellery/geometric dangle drop earrings/geometric-dangle-drop4.jpg",
        ],
        presentation: `Add a touch of elegance to any look with these exquisite Drop Earrings, meticulously crafted to enhance your natural beauty. Featuring graceful polished oval outlines, these earrings are the epitome of sophistication. The smooth, lustrous finish of the ovals catches the light beautifully, creating a dazzling effect that draws attention to your face. <br><br> Perfect for pairing with both a business suit and a little black dress, these Drop Earrings are versatile enough to complement any outfit. Whether you're heading to a formal meeting or a glamorous evening event, these earrings will add a touch of class and elegance to your ensemble. <br><br> Crafted from high-quality materials, these earrings are designed to last, ensuring that they remain a staple in your jewelry collection for years to come. The lightweight design ensures comfort, making them ideal for all-day wear.`,
      specification: `<ul>
        <li><strong>Product Type:</strong> Drops</li>
        <li><strong>Occasion:</strong> Office Wear</li>
        <li><strong>Material Colour:</strong> Yellow</li>
        <li><strong>Jewellery Type:</strong> Gold Jewellery</li>
        <li><strong>Metal:</strong> Gold</li>
        </ul>`,
      },
      3: {
        title: "LUSTER PEARL HOOP EARRINGS",
        price: "30.99€",
        image: "/img/jewellery/pearl-hoops/organicpearlhoops.jpg",
        description: "These Luster Pearl Hoop Earrings feature radiant pearls set in elegant hoops, perfect for adding a touch of sophistication to any outfit. Handcrafted with meticulous attention to detail, these earrings offer timeless beauty and style.",
        thumbnails: [
          "/img/jewellery/pearl-hoops/organicpearlhoops.jpg",
          "/img/jewellery/pearl-hoops/organicpearlhoops1.jpg",
          "/img/jewellery/pearl-hoops/organicpearlhoops2.jpg"
        ],
        presentation: `Add a touch of elegance to any look with these exquisite Drop Earrings, meticulously crafted to enhance your natural beauty. Featuring graceful polished oval outlines, these earrings are the epitome of sophistication. The smooth, lustrous finish of the ovals catches the light beautifully, creating a dazzling effect that draws attention to your face. <br><br> Perfect for pairing with both a business suit and a little black dress, these Drop Earrings are versatile enough to complement any outfit. Whether you're heading to a formal meeting or a glamorous evening event, these earrings will add a touch of class and elegance to your ensemble. <br><br> Crafted from high-quality materials, these earrings are designed to last, ensuring that they remain a staple in your jewelry collection for years to come. The lightweight design ensures comfort, making them ideal for all-day wear.`,
        specification: `<ul>
          <li><strong>Product Type:</strong> Drops</li>
          <li><strong>Occasion:</strong> Office Wear</li>
          <li><strong>Material Colour:</strong> Yellow</li>
          <li><strong>Jewellery Type:</strong> Gold Jewellery</li>
          <li><strong>Metal:</strong> Gold</li>
          </ul>`,
      },
      4: {
        title: "MINIMAL MODERN BRACELET",
        price: "1500.00€",
        image: "/img/jewellery/minimal-modern-bracelet/minimalmodernbracelet.jpg",
        description: "These Luster Pearl Hoop Earrings feature radiant pearls set in elegant hoops, perfect for adding a touch of sophistication to any outfit. Handcrafted with meticulous attention to detail, these earrings offer timeless beauty and style.",
        thumbnails: [
          "/img/jewellery/minimal-modern-bracelet/minimalmodernbracelet.jpg",
          "/img/jewellery/minimal-modern-bracelet/minimalmodernbracelet1.jpg",
          "/img/jewellery/minimal-modern-bracelet/minimalmodernbracelet2.jpg",
          "/img/jewellery/minimal-modern-bracelet/minimalmodernbracelet3.jpg"
        ],
        presentation: `Add a touch of elegance to any look with these exquisite Drop Earrings, meticulously crafted to enhance your natural beauty. Featuring graceful polished oval outlines, these earrings are the epitome of sophistication. The smooth, lustrous finish of the ovals catches the light beautifully, creating a dazzling effect that draws attention to your face. <br><br> Perfect for pairing with both a business suit and a little black dress, these Drop Earrings are versatile enough to complement any outfit. Whether you're heading to a formal meeting or a glamorous evening event, these earrings will add a touch of class and elegance to your ensemble. <br><br> Crafted from high-quality materials, these earrings are designed to last, ensuring that they remain a staple in your jewelry collection for years to come. The lightweight design ensures comfort, making them ideal for all-day wear.`,
        specification: `<ul>
          <li><strong>Product Type:</strong> Drops</li>
          <li><strong>Occasion:</strong> Office Wear</li>
          <li><strong>Material Colour:</strong> Yellow</li>
          <li><strong>Jewellery Type:</strong> Gold Jewellery</li>
          <li><strong>Metal:</strong> Gold</li>
          </ul>`,
      },
      5: {
        title: "RADIANT FLORAL DIAMOND MANGALSUTRA",
        price: "3300.00€",
        image: "/img/jewellery/radiant-floral-diamond-mangalsutra.webp",
        description: "These Luster Pearl Hoop Earrings feature radiant pearls set in elegant hoops, perfect for adding a touch of sophistication to any outfit. Handcrafted with meticulous attention to detail, these earrings offer timeless beauty and style.",
        thumbnails: [
          "/img/jewellery/radiant-floral-diamond-mangalsutra.webp",
          "/img/jewellery/seashell-pearl-bangle.webp",
          "/img/jewellery/small-hoops.webp",
          "/img/gardening-tools/roller-moss-removal-rake.webp",
          "/img/gardening-tools/roller-moss-removal-rake.webp"
        ],
        presentation: `Add a touch of elegance to any look with these exquisite Drop Earrings, meticulously crafted to enhance your natural beauty. Featuring graceful polished oval outlines, these earrings are the epitome of sophistication. The smooth, lustrous finish of the ovals catches the light beautifully, creating a dazzling effect that draws attention to your face. <br><br> Perfect for pairing with both a business suit and a little black dress, these Drop Earrings are versatile enough to complement any outfit. Whether you're heading to a formal meeting or a glamorous evening event, these earrings will add a touch of class and elegance to your ensemble. <br><br> Crafted from high-quality materials, these earrings are designed to last, ensuring that they remain a staple in your jewelry collection for years to come. The lightweight design ensures comfort, making them ideal for all-day wear.`,
        specification: `<ul>
          <li><strong>Product Type:</strong> Drops</li>
          <li><strong>Occasion:</strong> Office Wear</li>
          <li><strong>Material Colour:</strong> Yellow</li>
          <li><strong>Jewellery Type:</strong> Gold Jewellery</li>
          <li><strong>Metal:</strong> Gold</li>
          </ul>`,
      },
      6: {
        title: "SEASHELL PEARL BANGLE",
        price: "3475.00€",
        image: "/img/jewellery/seashell-pearl-bangle.webp",
        description: "These Luster Pearl Hoop Earrings feature radiant pearls set in elegant hoops, perfect for adding a touch of sophistication to any outfit. Handcrafted with meticulous attention to detail, these earrings offer timeless beauty and style.",
        thumbnails: [
          "/img/jewellery/radiant-floral-diamond-mangalsutra.webp",
          "/img/jewellery/seashell-pearl-bangle.webp",
          "/img/jewellery/small-hoops.webp",
          "/img/gardening-tools/roller-moss-removal-rake.webp",
          "/img/gardening-tools/roller-moss-removal-rake.webp"
        ],
        presentation: `Add a touch of elegance to any look with these exquisite Drop Earrings, meticulously crafted to enhance your natural beauty. Featuring graceful polished oval outlines, these earrings are the epitome of sophistication. The smooth, lustrous finish of the ovals catches the light beautifully, creating a dazzling effect that draws attention to your face. <br><br> Perfect for pairing with both a business suit and a little black dress, these Drop Earrings are versatile enough to complement any outfit. Whether you're heading to a formal meeting or a glamorous evening event, these earrings will add a touch of class and elegance to your ensemble. <br><br> Crafted from high-quality materials, these earrings are designed to last, ensuring that they remain a staple in your jewelry collection for years to come. The lightweight design ensures comfort, making them ideal for all-day wear.`,
        specification: `<ul>
          <li><strong>Product Type:</strong> Drops</li>
          <li><strong>Occasion:</strong> Office Wear</li>
          <li><strong>Material Colour:</strong> Yellow</li>
          <li><strong>Jewellery Type:</strong> Gold Jewellery</li>
          <li><strong>Metal:</strong> Gold</li>
          </ul>`,
      },
      7: {
        title: "SMALL HOOPS",
        price: "44.99€",
        image: "/img/jewellery/small-hoops.webp",
        description: "These Luster Pearl Hoop Earrings feature radiant pearls set in elegant hoops, perfect for adding a touch of sophistication to any outfit. Handcrafted with meticulous attention to detail, these earrings offer timeless beauty and style.",
        thumbnails: [
          "/img/jewellery/radiant-floral-diamond-mangalsutra.webp",
          "/img/jewellery/seashell-pearl-bangle.webp",
          "/img/jewellery/small-hoops.webp",
          "/img/gardening-tools/roller-moss-removal-rake.webp",
          "/img/gardening-tools/roller-moss-removal-rake.webp"
        ],
        presentation: `Add a touch of elegance to any look with these exquisite Drop Earrings, meticulously crafted to enhance your natural beauty. Featuring graceful polished oval outlines, these earrings are the epitome of sophistication. The smooth, lustrous finish of the ovals catches the light beautifully, creating a dazzling effect that draws attention to your face. <br><br> Perfect for pairing with both a business suit and a little black dress, these Drop Earrings are versatile enough to complement any outfit. Whether you're heading to a formal meeting or a glamorous evening event, these earrings will add a touch of class and elegance to your ensemble. <br><br> Crafted from high-quality materials, these earrings are designed to last, ensuring that they remain a staple in your jewelry collection for years to come. The lightweight design ensures comfort, making them ideal for all-day wear.`,
        specification: `<ul>
          <li><strong>Product Type:</strong> Drops</li>
          <li><strong>Occasion:</strong> Office Wear</li>
          <li><strong>Material Colour:</strong> Yellow</li>
          <li><strong>Jewellery Type:</strong> Gold Jewellery</li>
          <li><strong>Metal:</strong> Gold</li>
          </ul>`,
      },
      8: {
        title: "WOLF ROLLER MOSS REMOVAL RAKE",
        price: "40.99€",
        image: "/img/gardening-tools/roller-moss-removal-rake.webp",
        description: "These Luster Pearl Hoop Earrings feature radiant pearls set in elegant hoops, perfect for adding a touch of sophistication to any outfit. Handcrafted with meticulous attention to detail, these earrings offer timeless beauty and style.",
        thumbnails: [
          "/img/jewellery/radiant-floral-diamond-mangalsutra.webp",
          "/img/jewellery/seashell-pearl-bangle.webp",
          "/img/jewellery/small-hoops.webp",
          "/img/gardening-tools/roller-moss-removal-rake.webp",
          "/img/gardening-tools/roller-moss-removal-rake.webp"
        ]
      },
      9: {
        title: "WOLF SOIL RAKE",
        price: "15.99€",
        image: "/img/gardening-tools/soil-rake.webp",
        description: "These Luster Pearl Hoop Earrings feature radiant pearls set in elegant hoops, perfect for adding a touch of sophistication to any outfit. Handcrafted with meticulous attention to detail, these earrings offer timeless beauty and style.",
        thumbnails: [
          "/img/jewellery/radiant-floral-diamond-mangalsutra.webp",
          "/img/jewellery/seashell-pearl-bangle.webp",
          "/img/jewellery/small-hoops.webp",
          "/img/gardening-tools/roller-moss-removal-rake.webp",
          "/img/gardening-tools/roller-moss-removal-rake.webp"
        ]
      },
      10: {
        title: "WILKINSON SWORD 3 PRONG CULTIVATOR",
        price: "15.99€",
        image: "/img/gardening-tools/wilkinson-sword-3-prong.webp",
        description: "These Luster Pearl Hoop Earrings feature radiant pearls set in elegant hoops, perfect for adding a touch of sophistication to any outfit. Handcrafted with meticulous attention to detail, these earrings offer timeless beauty and style.",
        thumbnails: [
          "/img/jewellery/radiant-floral-diamond-mangalsutra.webp",
          "/img/jewellery/seashell-pearl-bangle.webp",
          "/img/jewellery/small-hoops.webp",
          "/img/gardening-tools/roller-moss-removal-rake.webp",
          "/img/gardening-tools/roller-moss-removal-rake.webp"
        ]
      },
      11: {
        title: "WILKINSON SWORD ULTRALIGHT SHOVEL",
        price: "65.99€",
        image: "/img/gardening-tools/wilkinson-sword-ultralight-shovel.webp",
        description: "These Luster Pearl Hoop Earrings feature radiant pearls set in elegant hoops, perfect for adding a touch of sophistication to any outfit. Handcrafted with meticulous attention to detail, these earrings offer timeless beauty and style.",
        thumbnails: [
          "/img/jewellery/radiant-floral-diamond-mangalsutra.webp",
          "/img/jewellery/seashell-pearl-bangle.webp",
          "/img/jewellery/small-hoops.webp",
          "/img/gardening-tools/roller-moss-removal-rake.webp",
          "/img/gardening-tools/roller-moss-removal-rake.webp"
        ]
      },
      12: {
        title: "WOLF WINDOW WIPER",
        price: "18.99€",
        image: "/img/gardening-tools/window-wiper.webp",
        description: "These Luster Pearl Hoop Earrings feature radiant pearls set in elegant hoops, perfect for adding a touch of sophistication to any outfit. Handcrafted with meticulous attention to detail, these earrings offer timeless beauty and style.",
        thumbnails: [
          "/img/jewellery/radiant-floral-diamond-mangalsutra.webp",
          "/img/jewellery/seashell-pearl-bangle.webp",
          "/img/jewellery/small-hoops.webp",
          "/img/gardening-tools/roller-moss-removal-rake.webp",
          "/img/gardening-tools/roller-moss-removal-rake.webp"
        ]
      },
      13: {
        title: "WOLF ADJUSTABLE ANVIL TREE LOPPER",
        price: "45.99€",
        image: "/img/gardening-tools/wolf-adjustable-anvil.webp",
        description: "These Luster Pearl Hoop Earrings feature radiant pearls set in elegant hoops, perfect for adding a touch of sophistication to any outfit. Handcrafted with meticulous attention to detail, these earrings offer timeless beauty and style.",
        thumbnails: [
          "/img/jewellery/radiant-floral-diamond-mangalsutra.webp",
          "/img/jewellery/seashell-pearl-bangle.webp",
          "/img/jewellery/small-hoops.webp",
          "/img/gardening-tools/roller-moss-removal-rake.webp",
          "/img/gardening-tools/roller-moss-removal-rake.webp"
        ]
      },
      14: {
        title: "WOLF LAWN EDGE TRIMMER",
        price: "50.99€",
        image: "/img/gardening-tools/wolf-lawn-edge-trimmer.webp",
        description: "These Luster Pearl Hoop Earrings feature radiant pearls set in elegant hoops, perfect for adding a touch of sophistication to any outfit. Handcrafted with meticulous attention to detail, these earrings offer timeless beauty and style.",
        thumbnails: [
          "/img/jewellery/radiant-floral-diamond-mangalsutra.webp",
          "/img/jewellery/seashell-pearl-bangle.webp",
          "/img/jewellery/small-hoops.webp",
          "/img/gardening-tools/roller-moss-removal-rake.webp",
          "/img/gardening-tools/roller-moss-removal-rake.webp"
        ]
      },
      15: {
        title: "WOLF TELESCOPIC ANVIL LOPPERS",
        price: "70.99€",
        image: "/img/gardening-tools/wolf-telescopic-anvil-loppers.webp",
        description: "These Luster Pearl Hoop Earrings feature radiant pearls set in elegant hoops, perfect for adding a touch of sophistication to any outfit. Handcrafted with meticulous attention to detail, these earrings offer timeless beauty and style.",
        thumbnails: [
          "/img/jewellery/radiant-floral-diamond-mangalsutra.webp",
          "/img/jewellery/seashell-pearl-bangle.webp",
          "/img/jewellery/small-hoops.webp",
          "/img/gardening-tools/roller-moss-removal-rake.webp",
          "/img/gardening-tools/roller-moss-removal-rake.webp"
        ]
      },
      16: {
        title: "ANALOGUE THERMOCONTROLLER",
        price: "25.99€",
        image: "/img/kitchen/analogue-controller.webp",
        description: "These Luster Pearl Hoop Earrings feature radiant pearls set in elegant hoops, perfect for adding a touch of sophistication to any outfit. Handcrafted with meticulous attention to detail, these earrings offer timeless beauty and style.",
        thumbnails: [
          "/img/jewellery/radiant-floral-diamond-mangalsutra.webp",
          "/img/jewellery/seashell-pearl-bangle.webp",
          "/img/jewellery/small-hoops.webp",
          "/img/gardening-tools/roller-moss-removal-rake.webp",
          "/img/gardening-tools/roller-moss-removal-rake.webp"
        ]
      },
      17: {
        title: "POT, 7.0 L, Ø 24CM, H. 16.5CM WITH LID",
        price: "275.99€",
        image: "/img/kitchen/casserole-2.0l-16cm-with-lid.webp",
        description: "These Luster Pearl Hoop Earrings feature radiant pearls set in elegant hoops, perfect for adding a touch of sophistication to any outfit. Handcrafted with meticulous attention to detail, these earrings offer timeless beauty and style.",
        thumbnails: [
          "/img/jewellery/radiant-floral-diamond-mangalsutra.webp",
          "/img/jewellery/seashell-pearl-bangle.webp",
          "/img/jewellery/small-hoops.webp",
          "/img/gardening-tools/roller-moss-removal-rake.webp",
          "/img/gardening-tools/roller-moss-removal-rake.webp"
        ]
      },
      18: {
        title: "COBALT ROYAL - COMPLETE PORCELAIN 68 PIECES",
        price: "300.99€",
        image: "/img/kitchen/cobalt-royal-porcelain.webp",
        description: "These Luster Pearl Hoop Earrings feature radiant pearls set in elegant hoops, perfect for adding a touch of sophistication to any outfit. Handcrafted with meticulous attention to detail, these earrings offer timeless beauty and style.",
        thumbnails: [
          "/img/jewellery/radiant-floral-diamond-mangalsutra.webp",
          "/img/jewellery/seashell-pearl-bangle.webp",
          "/img/jewellery/small-hoops.webp",
          "/img/gardening-tools/roller-moss-removal-rake.webp",
          "/img/gardening-tools/roller-moss-removal-rake.webp"
        ]
      },
      19: {
        title: "CORAL - 12 PC COFFEE SET FOR 6 PERSONS",
        price: "78.99€",
        image: "/img/kitchen/coral-12-set-for-6-person.webp",
        description: "These Luster Pearl Hoop Earrings feature radiant pearls set in elegant hoops, perfect for adding a touch of sophistication to any outfit. Handcrafted with meticulous attention to detail, these earrings offer timeless beauty and style.",
        thumbnails: [
          "/img/jewellery/radiant-floral-diamond-mangalsutra.webp",
          "/img/jewellery/seashell-pearl-bangle.webp",
          "/img/jewellery/small-hoops.webp",
          "/img/gardening-tools/roller-moss-removal-rake.webp",
          "/img/gardening-tools/roller-moss-removal-rake.webp"
        ]
      },
      20: {
        title: "ESPRESSO POT KITTY 2 CUP S",
        price: "74.99€",
        image: "/img/kitchen/espresso-pot-kitty-2.webp",
        description: "These Luster Pearl Hoop Earrings feature radiant pearls set in elegant hoops, perfect for adding a touch of sophistication to any outfit. Handcrafted with meticulous attention to detail, these earrings offer timeless beauty and style.",
        thumbnails: [
          "/img/jewellery/radiant-floral-diamond-mangalsutra.webp",
          "/img/jewellery/seashell-pearl-bangle.webp",
          "/img/jewellery/small-hoops.webp",
          "/img/gardening-tools/roller-moss-removal-rake.webp",
          "/img/gardening-tools/roller-moss-removal-rake.webp"
        ]
      },
      21: {
        title: "FELIX CUTTING BOARD 20x29cm",
        price: "25.99€",
        image: "/img/kitchen/felix-cutting-board.webp",
        description: "These Luster Pearl Hoop Earrings feature radiant pearls set in elegant hoops, perfect for adding a touch of sophistication to any outfit. Handcrafted with meticulous attention to detail, these earrings offer timeless beauty and style.",
        thumbnails: [
          "/img/jewellery/radiant-floral-diamond-mangalsutra.webp",
          "/img/jewellery/seashell-pearl-bangle.webp",
          "/img/jewellery/small-hoops.webp",
          "/img/gardening-tools/roller-moss-removal-rake.webp",
          "/img/gardening-tools/roller-moss-removal-rake.webp"
        ]
      },
      22: {
        title: "KETTLE 2.4 L",
        price: "200.99€",
        image: "/img/kitchen/kettle-2.4l.webp",
        description: "These Luster Pearl Hoop Earrings feature radiant pearls set in elegant hoops, perfect for adding a touch of sophistication to any outfit. Handcrafted with meticulous attention to detail, these earrings offer timeless beauty and style.",
        thumbnails: [
          "/img/jewellery/radiant-floral-diamond-mangalsutra.webp",
          "/img/jewellery/seashell-pearl-bangle.webp",
          "/img/jewellery/small-hoops.webp",
          "/img/gardening-tools/roller-moss-removal-rake.webp",
          "/img/gardening-tools/roller-moss-removal-rake.webp"
        ]
      },
      23: {
        title: "KITCHEN PARING KNIFE SOLINGEN FELIX (12 cm blade)",
        price: "73.99€",
        image: "/img/kitchen/kitchen-paring-knife-solingen-12cm.webp",
        description: "These Luster Pearl Hoop Earrings feature radiant pearls set in elegant hoops, perfect for adding a touch of sophistication to any outfit. Handcrafted with meticulous attention to detail, these earrings offer timeless beauty and style.",
        thumbnails: [
          "/img/jewellery/radiant-floral-diamond-mangalsutra.webp",
          "/img/jewellery/seashell-pearl-bangle.webp",
          "/img/jewellery/small-hoops.webp",
          "/img/gardening-tools/roller-moss-removal-rake.webp",
          "/img/gardening-tools/roller-moss-removal-rake.webp"
        ]
      },
      24: {
        title: "KITCHEN SHEARS, STAINLESS STEEL",
        price: "38.99€",
        image: "/img/kitchen/kitchen-shears-stainless.webp",
        description: "These Luster Pearl Hoop Earrings feature radiant pearls set in elegant hoops, perfect for adding a touch of sophistication to any outfit. Handcrafted with meticulous attention to detail, these earrings offer timeless beauty and style.",
        thumbnails: [
          "/img/jewellery/radiant-floral-diamond-mangalsutra.webp",
          "/img/jewellery/seashell-pearl-bangle.webp",
          "/img/jewellery/small-hoops.webp",
          "/img/gardening-tools/roller-moss-removal-rake.webp",
          "/img/gardening-tools/roller-moss-removal-rake.webp"
        ]
      },
      25: {
        title: "MAGIC HARMONY CRYSTAL & STAINLESS STEEL",
        price: "95.99€",
        image: "/img/kitchen/magic-harmony-crystal.webp",
        description: "These Luster Pearl Hoop Earrings feature radiant pearls set in elegant hoops, perfect for adding a touch of sophistication to any outfit. Handcrafted with meticulous attention to detail, these earrings offer timeless beauty and style.",
        thumbnails: [
          "/img/jewellery/radiant-floral-diamond-mangalsutra.webp",
          "/img/jewellery/seashell-pearl-bangle.webp",
          "/img/jewellery/small-hoops.webp",
          "/img/gardening-tools/roller-moss-removal-rake.webp",
          "/img/gardening-tools/roller-moss-removal-rake.webp"
        ]
      },
      26: {
        title: "MAGNETIC KNIFE STAND, SOLID WALNUT",
        price: "24.99€",
        image: "/img/kitchen/magnetic-stand-knife.webp",
        description: "These Luster Pearl Hoop Earrings feature radiant pearls set in elegant hoops, perfect for adding a touch of sophistication to any outfit. Handcrafted with meticulous attention to detail, these earrings offer timeless beauty and style.",
        thumbnails: [
          "/img/jewellery/radiant-floral-diamond-mangalsutra.webp",
          "/img/jewellery/seashell-pearl-bangle.webp",
          "/img/jewellery/small-hoops.webp",
          "/img/gardening-tools/roller-moss-removal-rake.webp",
          "/img/gardening-tools/roller-moss-removal-rake.webp"
        ]
      },
      27: {
        title: "MASTERPIECE COOKWARE Z SET - GRANDE",
        price: "499.99€",
        image: "/img/kitchen/masterpiece-coockware.webp",
        description: "These Luster Pearl Hoop Earrings feature radiant pearls set in elegant hoops, perfect for adding a touch of sophistication to any outfit. Handcrafted with meticulous attention to detail, these earrings offer timeless beauty and style.",
        thumbnails: [
          "/img/jewellery/radiant-floral-diamond-mangalsutra.webp",
          "/img/jewellery/seashell-pearl-bangle.webp",
          "/img/jewellery/small-hoops.webp",
          "/img/gardening-tools/roller-moss-removal-rake.webp",
          "/img/gardening-tools/roller-moss-removal-rake.webp"
        ]
      },
      28: {
        title: "BATMAN ADVENTURES 12\" COLLECTIBLE ACTION FIGURE",
        price: "20.99€",
        image: "/img/toys/batman-adventures-16armor.webp",
        description: "These Luster Pearl Hoop Earrings feature radiant pearls set in elegant hoops, perfect for adding a touch of sophistication to any outfit. Handcrafted with meticulous attention to detail, these earrings offer timeless beauty and style.",
        thumbnails: [
          "/img/jewellery/radiant-floral-diamond-mangalsutra.webp",
          "/img/jewellery/seashell-pearl-bangle.webp",
          "/img/jewellery/small-hoops.webp",
          "/img/gardening-tools/roller-moss-removal-rake.webp",
          "/img/gardening-tools/roller-moss-removal-rake.webp"
        ]
      },
      29: {
        title: "DISNEY JUNIOR MINNIE MOUSE BUTTERFLY BALLERINA PLUSH",
        price: "39.99€",
        image: "/img/toys/disney-junior-minnie-mouse.webp",
        description: "These Luster Pearl Hoop Earrings feature radiant pearls set in elegant hoops, perfect for adding a touch of sophistication to any outfit. Handcrafted with meticulous attention to detail, these earrings offer timeless beauty and style.",
        thumbnails: [
          "/img/jewellery/radiant-floral-diamond-mangalsutra.webp",
          "/img/jewellery/seashell-pearl-bangle.webp",
          "/img/jewellery/small-hoops.webp",
          "/img/gardening-tools/roller-moss-removal-rake.webp",
          "/img/gardening-tools/roller-moss-removal-rake.webp"
        ]
      },
      30: {
        title: "FISHER-PRICE THOMAS & FRIENDS WOODEN RAILWAY",
        price: "15.99€",
        image: "/img/toys/fisher-price-thomas.webp",
        description: "These Luster Pearl Hoop Earrings feature radiant pearls set in elegant hoops, perfect for adding a touch of sophistication to any outfit. Handcrafted with meticulous attention to detail, these earrings offer timeless beauty and style.",
        thumbnails: [
          "/img/jewellery/radiant-floral-diamond-mangalsutra.webp",
          "/img/jewellery/seashell-pearl-bangle.webp",
          "/img/jewellery/small-hoops.webp",
          "/img/gardening-tools/roller-moss-removal-rake.webp",
          "/img/gardening-tools/roller-moss-removal-rake.webp"
        ]
      },
      31: {
        title: "GB FURIOUS CHALLENGER ELECTRIC POWER ROAD RACING",
        price: "70.99€",
        image: "/img/toys/gb-furious-challenger-electric.webp",
        description: "These Luster Pearl Hoop Earrings feature radiant pearls set in elegant hoops, perfect for adding a touch of sophistication to any outfit. Handcrafted with meticulous attention to detail, these earrings offer timeless beauty and style.",
        thumbnails: [
          "/img/jewellery/radiant-floral-diamond-mangalsutra.webp",
          "/img/jewellery/seashell-pearl-bangle.webp",
          "/img/jewellery/small-hoops.webp",
          "/img/gardening-tools/roller-moss-removal-rake.webp",
          "/img/gardening-tools/roller-moss-removal-rake.webp"
        ]
      },
      32: {
        title: "HOT WHEELS MARVEL WOOD CAR RACERS DIY KIT",
        price: "15.99€",
        image: "/img/toys/hot-wheels-marvel-wood-car.webp",
        description: "These Luster Pearl Hoop Earrings feature radiant pearls set in elegant hoops, perfect for adding a touch of sophistication to any outfit. Handcrafted with meticulous attention to detail, these earrings offer timeless beauty and style.",
        thumbnails: [
          "/img/jewellery/radiant-floral-diamond-mangalsutra.webp",
          "/img/jewellery/seashell-pearl-bangle.webp",
          "/img/jewellery/small-hoops.webp",
          "/img/gardening-tools/roller-moss-removal-rake.webp",
          "/img/gardening-tools/roller-moss-removal-rake.webp"
        ]
      },
      33: {
        title: "KID GALAXY 20V POWER DRIVE HIGH SPEED",
        price: "149.99€",
        image: "/img/toys/kid-galaxy-20v-power.webp",
        description: "These Luster Pearl Hoop Earrings feature radiant pearls set in elegant hoops, perfect for adding a touch of sophistication to any outfit. Handcrafted with meticulous attention to detail, these earrings offer timeless beauty and style.",
        thumbnails: [
          "/img/jewellery/radiant-floral-diamond-mangalsutra.webp",
          "/img/jewellery/seashell-pearl-bangle.webp",
          "/img/jewellery/small-hoops.webp",
          "/img/gardening-tools/roller-moss-removal-rake.webp",
          "/img/gardening-tools/roller-moss-removal-rake.webp"
        ]
      },
      34: {
        title: "LEGO HARRY POTTER HOGWARTS CASTLE 2,660 PIECES",
        price: "119.99€",
        image: "/img/toys/lego-harry-potter-2.660pieces.webp",
        description: "asdad",
        thumbnails: [
          "/img/jewellery/radiant-floral-diamond-mangalsutra.webp",
          "/img/jewellery/seashell-pearl-bangle.webp",
          "/img/jewellery/small-hoops.webp",
          "/img/gardening-tools/roller-moss-removal-rake.webp",
          "/img/gardening-tools/roller-moss-removal-rake.webp"
        ]
      },
    };

    

    


 
  

    const product = products[productId];

    if (product) {
        document.getElementById('product-title').innerText = product.title;
        document.getElementById('product-image').src = product.image;
        document.getElementById('product-price').innerText = product.price;
        document.getElementById('product-description').innerText = product.description;
        document.getElementById('product-presentation').innerHTML = product.presentation;
        document.getElementById('product-specification').innerHTML = product.specification;

        const thumbnailContainer = document.querySelector('.thumbnail-container .thumbnails');
        thumbnailContainer.innerHTML = '';

        product.thumbnails.forEach(src => {
            const img = document.createElement('img');
            img.classList.add('thumbnail');
            img.src = src;
            img.alt = 'Thumbnail';
            thumbnailContainer.appendChild(img);

            img.addEventListener('click', function () {
                document.getElementById('product-image').src = this.src;
            });
        });

        document.getElementById('add-to-cart-button').onclick = function() {
            addItemToCart(productId, product.title, product.price, product.image);
        };

        document.getElementById('remove-from-cart-button').onclick = function() {
            removeItemFromCart(productId);
        };

        // Проверка дали производот веќе е во кошничката и ажурирање на состојбата на копчињата
        updateRemoveButtonState();
    } else {
        document.getElementById('product-details').innerText = "Product not found.";
    }
}

function addItemToCart(productId, title, price, imageSrc) {
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  const existingItem = cartItems.find(item => item.productId === productId);
  if (existingItem) {
      alert("This product is already in the cart.");
      return;
  }

  cartItems.push({ productId, title, price, imageSrc });
  localStorage.setItem('cartItems', JSON.stringify(cartItems));

  updateCartCount();
  updateRemoveButtonState();
  alert("Product added to the cart.");
}

function removeItemFromCart(productId) {
  let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  cartItems = cartItems.filter(item => item.productId !== productId);
  localStorage.setItem('cartItems', JSON.stringify(cartItems));

  updateCartCount();
  updateRemoveButtonState();
  alert("Product removed from the cart.");
}

function updateCartCount() {
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  document.getElementById('cart-count').innerText = cartItems.length;

  const cartLink = document.getElementById('cart-link');
  const cartIcon = document.getElementById('cart-icon');
  if (cartItems.length > 0) {
      cartLink.href = "/Shoping-cart/shop-cart.html";
      cartLink.classList.remove('disabled');
      cartIcon.style.opacity = '1';
  } else {
      cartLink.href = "#";
      cartLink.classList.add('disabled');
      cartIcon.style.opacity = '0.5';
  }
}

function updateRemoveButtonState() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('productId');
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  const addButton = document.getElementById('add-to-cart-button');
  const removeButton = document.getElementById('remove-from-cart-button');
  const itemExists = cartItems.some(item => item.productId === productId);

  if (itemExists) {
      addButton.style.display = 'none';
      removeButton.style.display = 'inline-block';
  } else {
      addButton.style.display = 'inline-block';
      removeButton.style.display = 'none';
  }
}
document.addEventListener("DOMContentLoaded", function() {
  const images = document.querySelectorAll('.product-images img ');

  images.forEach(image => {
    image.style.width = '500px';
    image.style.height = '500px';
    image.style.objectFit = 'cover';
    image.style.borderRadius = '10px';
  });
});
////


// --------------------------- SCRIPT ЗА REVIEW ------------------------------


    // Слушатели за настани за ѕвездите за рецензија
    document.querySelectorAll('.star').forEach(star => {
      star.addEventListener('mouseover', function () {
          highlightStars(this.getAttribute('data-value'));
      });

      star.addEventListener('mouseout', function () {
          resetStars();
      });

      star.addEventListener('click', function () {
          if (checkLoggedInStatus()) {
              const productId = new URLSearchParams(window.location.search).get('productId');
              const reviews = JSON.parse(localStorage.getItem('reviews')) || {};
              const currentUserId = getCurrentUserId();

              if (reviews[productId] && reviews[productId].find(review => review.userId === currentUserId)) {
                  alert('You have already submitted a review for this product. Please delete your existing review to submit a new one.');
              } else {
                  selectStars(this.getAttribute('data-value'));
                  showReviewModal();
              }
          } else {
              promptCreateAccount();
          }
      });
  });

  // Слушател за настан за копчето за поднесување рецензија
  document.getElementById('submit-review').addEventListener('click', function () {
      const selectedStars = document.querySelectorAll('.star.selected');
      const rating = selectedStars.length > 0 ? parseInt(selectedStars[selectedStars.length - 1].getAttribute('data-value')) : 0;
      const reviewText = document.getElementById('review-text').value;

      if (rating && reviewText.length >= 5 && reviewText.length <= 30) { // Валидација за мин и макс должина на текстот
          submitReview(rating, reviewText);
          closeReviewModal();
      } else {
          alert('Please select a star rating and write a review between 5 and 30 characters.');
      }
  });

  // Додавање на слушател за настан за Enter копчето во текстуалното поле за рецензија
  document.getElementById('review-text').addEventListener('keypress', function (e) {
      if (e.key === 'Enter') {
          const selectedStars = document.querySelectorAll('.star.selected');
          const rating = selectedStars.length > 0 ? parseInt(selectedStars[selectedStars.length - 1].getAttribute('data-value')) : 0;
          const reviewText = document.getElementById('review-text').value;

          if (rating && reviewText.length >= 5 && reviewText.length <= 30) { // Валидација за мин и макс должина на текстот
              submitReview(rating, reviewText);
              closeReviewModal();
          } else {
              alert('Please select a star rating and write a review between 5 and 30 characters.');
          }
      }
  });

  displayReviews(); // Прикажување на рецензиите при вчитување на страницата

  // Get the modal
  var modal = document.getElementById("reviewModal");

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
      closeReviewModal();
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
      if (event.target == modal) {
          closeReviewModal();
      }
  }; // Затворање на DOMContentLoaded слушателот


// Функција за означување на ѕвездите при поместување на маусот
function highlightStars(rating) {
  document.querySelectorAll('.star').forEach(star => {
      if (parseInt(star.getAttribute('data-value')) <= rating) {
          star.classList.add('hover');
      } else {
          star.classList.remove('hover');
      }
  });
}

// Функција за ресетирање на ѕвездите по поместувањето на маусот
function resetStars() {
  document.querySelectorAll('.star').forEach(star => {
      star.classList.remove('hover');
  });
}

// Функција за селектирање на ѕвездите при клик
function selectStars(rating) {
  document.querySelectorAll('.star').forEach(star => {
      if (parseInt(star.getAttribute('data-value')) <= rating) {
          star.classList.add('selected');
      } else {
          star.classList.remove('selected');
      }
  });
}

// Функција за поднесување на рецензија
function submitReview(rating, reviewText) {
  const productId = new URLSearchParams(window.location.search).get('productId');
  let reviews = JSON.parse(localStorage.getItem('reviews')) || {};

  if (!reviews[productId]) {
      reviews[productId] = [];
  }

  const currentUserId = getCurrentUserId();
  const existingReview = reviews[productId].find(review => review.userId === currentUserId);
  if (existingReview) {
      alert('You have already submitted a review for this product.');
      return;
  }

  const review = {
      userId: currentUserId,
      rating: rating, // Осигурување дека вредноста е број
      text: reviewText,
      date: new Date().toLocaleDateString()
  };

  reviews[productId].push(review);
  localStorage.setItem('reviews', JSON.stringify(reviews));

  displayReviews();
  alert('Review submitted!');
  document.getElementById('submit-review').disabled = true;
  disableReviewSection();
}

// Функција за приказ на рецензии
function displayReviews() {
  const productId = new URLSearchParams(window.location.search).get('productId');
  const reviews = JSON.parse(localStorage.getItem('reviews')) || {};
  const reviewsContainer = document.getElementById('reviews');

  reviewsContainer.innerHTML = '';

  if (reviews[productId]) {
      reviews[productId].forEach(review => {
          const reviewElement = document.createElement('div');
          reviewElement.classList.add('review');
          reviewElement.innerHTML = `
              User: ${review.userId}<br>
              Rating: ${review.rating} stars<br> <!-- Поправено за правилно прикажување на бројот на ѕвезди -->
              Text: ${review.text}<br>
              Date: ${review.date}<br>
              ${review.userId === getCurrentUserId() ? '<button class="remove-review" data-review-id="'+review.userId+'">Remove Review</button>' : ''}
          `;
          reviewsContainer.appendChild(reviewElement);
      });

      // Проверка дали тековниот корисник веќе има оставено рецензија
      const currentUserReview = reviews[productId].find(review => review.userId === getCurrentUserId());
      if (currentUserReview) {
          disableReviewSection();
      }

      // Додавање на слушатели за настани за бришење на рецензијата
      document.querySelectorAll('.remove-review').forEach(button => {
          button.addEventListener('click', function() {
              removeReview(productId, this.getAttribute('data-review-id'));
          });
      });
  } else {
      reviewsContainer.innerText = 'No reviews yet.';
  }
}

// Функција за прикажување на модалот за рецензија
function showReviewModal() {
  var modal = document.getElementById("reviewModal");
  modal.style.display = "block";
}

// Функција за затворање на модалот за рецензија
function closeReviewModal() {
  var modal = document.getElementById("reviewModal");
  modal.style.display = "none";
}

// Функција за деактивирање на делот за рецензии
function disableReviewSection() {
  document.querySelectorAll('.star').forEach(star => {
      star.classList.remove('selected');
  });
  document.getElementById('review-text').value = '';
  document.getElementById('review-text').disabled = true;
  document.getElementById('submit-review').disabled = true;
}

// Функција за активирање на делот за рецензии
function enableReviewSection() {
  document.getElementById('submit-review').disabled = false;
  document.getElementById('review-text').disabled = false;
}

// Функција за бришење на рецензија
function removeReview(productId, userId) {
  let reviews = JSON.parse(localStorage.getItem('reviews')) || {};

  if (reviews[productId]) {
      reviews[productId] = reviews[productId].filter(review => review.userId !== userId);
      localStorage.setItem('reviews', JSON.stringify(reviews));
      displayReviews();
      enableReviewSection(); // Активирање на делот за рецензии по бришењето
  }
}

// Функција за добивање на тековниот корисник
function getCurrentUserId() {
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  if (loggedInUser) {
      return `${loggedInUser.firstName} ${loggedInUser.lastName}`;
  }
  return "Anonymous"; // Ако нема најавен корисник
}

// Функција за проверка на статусот на најава
function checkLoggedInStatus() {
  return JSON.parse(localStorage.getItem('loggedInUser')) !== null;
}

// Функција за прикажување на порака за креирање на акаунт
function promptCreateAccount() {
  alert('Please create an account or log in to submit a review.');
  // Тука може да додадете пренасочување кон страницата за креирање акаунт
}

// --------------------------- END ЗА REVIEW ------------------------------

// ------------------------ SUBSCRIBE FOOTER --------------------- //
// Вчитување на претплатените емаил адреси од localStorage
let subscribedEmails = new Set(JSON.parse(localStorage.getItem('subscribedEmails')) || []);

// Функција за претплата
function subscribe(event) {
    event.preventDefault(); // Спречува стандардно поднесување на формата
    var emailInput = document.getElementById('email');
    var email = emailInput.value.trim();
    var messageDiv = document.getElementById('message');

    if (email) {
        if (subscribedEmails.has(email)) {
            messageDiv.innerText = `The email ${email} is already subscribed.`;
        } else {
            subscribedEmails.add(email);
            localStorage.setItem('subscribedEmails', JSON.stringify(Array.from(subscribedEmails)));
            messageDiv.innerText = `Thank you for subscribing! You'll now receive updates from Urban Vibe Store at ${email}.`;
        }
        emailInput.value = ''; // Го брише полето за внесување
        messageDiv.style.display = 'block';
        messageDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Го крие порака по 5 секунди
        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, 5000);
    } else {
        alert('Please enter a valid email address.');
    }
}

// Проверка дали корисникот веќе е претплатен на двете страници
function checkSubscriptionStatus() {
    var emailInput = document.getElementById('email');
    var email = emailInput.value.trim();
    var messageDiv = document.getElementById('message');

    if (email && subscribedEmails.has(email)) {
        messageDiv.innerText = `The email ${email} is already subscribed.`;
        messageDiv.style.display = 'block';
        messageDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Го крие порака по 5 секунди
        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, 5000);

        return true;
    }
    return false;
}

// -------------------------------------------------------------- //
