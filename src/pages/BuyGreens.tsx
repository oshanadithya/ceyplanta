import { useState, useRef } from "react";
import "../styles/buy-greens.css";
import emailjs from "emailjs-com";
import { jsPDF, GState } from "jspdf";
import logo from "../assets/logo_3.png";
import autoTable from "jspdf-autotable";
import "../styles//Packages.css";

type CartItem = {
  productId: number;
  category: string;
  name: string;
  selectedWeight: string;
  selectedPrice: string; // e.g. "Rs. 68"
  quantity: number; // ✅ added
};

type Product = {
  id: number;
  name: string;
  description: string;
  image: string;
  nutritionalFacts: string[];
  benefits: string[];
  price: string;
  weightOptions: { weight: string; price: string }[];
  selectedPrice?: string;
  noStock: boolean;
  category: string;
};

const BuyGreens = () => {
  // Initialize EmailJS with your user ID
  emailjs.init("_BVjspFpxrJqFVQpM");

  // ✅ cart now includes quantity
  const [cart, setCart] = useState<CartItem[]>([]);
  const MAX_QTY_DEFAULT = 20;   // for non-nursery (not used in nursery qty selector)
  const MAX_QTY_NURSERY = 100;  // ✅ allow bulk orders

  const getMinQty = (p: Product) => {
    if (p.category !== "Nursery") return 1;
    return p.id === 57 ? 10 : 50; // ✅ Black Pepper id 57 => 10, others nursery => 50
  };

  const getMaxQty = (p: Product) => {
    if (p.category !== "Nursery") return MAX_QTY_DEFAULT;
    return MAX_QTY_NURSERY;
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // 💰 Discount coupon states
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  // ✅ Valid coupons
  const validCoupons: Record<string, number> = {
    CEY5: 5,
    CEY10: 10,
    CEYH15: 15,
  };

    const [products] = useState<Product[]>([
        {
            id: 1,
            name: "Radish",
            description: "Spicy and crisp, perfect for salads.",
            image: "/images/raddish.png",
            nutritionalFacts: [
              "High in Vitamin C",
              "Rich in Antioxidants",
              "Low in Calories",
              "Contains Potassium",
              "Good Source of Fiber",
            ],
            benefits: [
              "Boosts Immunity",
              "Improves Digestion",
              "Good for Heart Health",
              "Supports Skin Health",
            ],
            price: "400",
            weightOptions: [
              { weight: "50g", price: "Rs. 700" },
              { weight: "100g", price: "Rs. 1370" },
              { weight: "200g", price: "Rs. 2710" },
            ],
            noStock: false,
            category: "Microgreens",
          },
          {
            id: 2,
            name: "Water Spinach",
            description: "Nutrient-rich, ideal for stir-fries.",
            image: "/images/kangkung.png",
            nutritionalFacts: [
              "Rich in Iron",
              "High in Fiber",
              "Contains Vitamin A",
              "Good Source of Calcium",
            ],
            benefits: [
              "Prevents Anemia",
              "Aids Digestion",
              "Supports Eye Health",
              "Strengthens Bones",
            ],
            price: "350",
            weightOptions: [
              { weight: "50g", price: "Rs. 620" },
              { weight: "100g", price: "Rs. 1120" },
              { weight: "200g", price: "Rs. 2100" },
            ],
            noStock: false,
            category: "Microgreens",
          },
          {
            id: 3,
            name: "Beetroot",
            description: "Sweet and earthy, great for juices and salads.",
            image: "/images/beetroot.png",
            nutritionalFacts: [
              "Rich in Folate",
              "Good Source of Nitrates",
              "High in Fiber",
              "Contains Iron",
              "Rich in Antioxidants",
            ],
            benefits: [
              "Boosts Stamina",
              "Lowers Blood Pressure",
              "Supports Brain Function",
              "Promotes Detoxification",
            ],
            price: "450",
            weightOptions: [
              { weight: "50g", price: "Rs. 1280" },
              { weight: "100g", price: "Rs. 2500" },
              { weight: "200g", price: "Rs. 4940" },
            ],
            noStock: false,
            category: "Microgreens",
          },
          {
            id: 6,
            name: "Mustard",
            description:
              "Peppery and flavorful, commonly used in salads and Indian cuisine.",
            image: "/images/mustard.png",
            nutritionalFacts: [
              "Rich in Vitamin K",
              "High in Antioxidants",
              "Contains Fiber",
              "Good Source of Magnesium",
            ],
            benefits: [
              "Aids Digestion",
              "Supports Heart Health",
              "Boosts Metabolism",
              "Has Anti-Inflammatory Properties",
            ],
            price: "700",
            weightOptions: [
              { weight: "50g", price: "Rs. 950" },
              { weight: "100g", price: "Rs. 1860" },
              { weight: "200g", price: "Rs. 3700" },
            ],
            noStock: false,
            category: "Microgreens",
          },
          {
            id: 7,
            name: "Purple Cabbage",
            description:
              "Crunchy and versatile, great for salads, stir-fries, and fermented dishes.",
            image: "/images/cabbage2.png",
            nutritionalFacts: [
              "Rich in Vitamin C",
              "High in Fiber",
              "Contains Sulfur Compounds",
              "Good Source of Folate",
            ],
            benefits: [
              "Supports Gut Health",
              "Reduces Inflammation",
              "Strengthens Immunity",
              "Aids in Detoxification",
            ],
            price: "650",
            weightOptions: [
              { weight: "50g", price: "Rs. 2400" },
            ],
            noStock: false,
            category: "Microgreens",
          },
          {
            id: 47,
            name: "Cabbage",
            description:
              "Crunchy and versatile, great for salads, stir-fries, and fermented dishes.",
            image: "/images/cabbagemicrogreen.png",
            nutritionalFacts: [
              "Rich in Vitamin C",
              "High in Fiber",
              "Contains Sulfur Compounds",
              "Good Source of Folate",
            ],
            benefits: [
              "Supports Gut Health",
              "Reduces Inflammation",
              "Strengthens Immunity",
              "Aids in Detoxification",
            ],
            price: "650",
            weightOptions: [
              { weight: "50g", price: "Rs. 2100" },
            ],
            noStock: false,
            category: "Microgreens",
          },
          {
            id: 8,
            name: "Kale",
            description:
              "Highly nutritious and rich in fiber, perfect for smoothies and sautés.",
            image: "/images/kale.png",
            nutritionalFacts: [
              "High in Vitamin A, C, and K",
              "Rich in Fiber",
              "Contains Omega-3 Fatty Acids",
              "Good Source of Calcium",
            ],
            benefits: [
              "Enhances Brain Function",
              "Supports Heart Health",
              "Promotes Healthy Skin",
              "Strengthens Bones",
            ],
            price: "400",
            weightOptions: [
              { weight: "50g", price: "Rs. 800" },
              { weight: "100g", price: "Rs. 1500" },
              { weight: "200g", price: "Rs. 2940" },
            ],
            noStock: false,
            category: "Microgreens",
          },
          {
            id: 9,
            name: "Basil",
            description:
              "Aromatic and flavorful, essential for pesto and Italian dishes.",
            image: "/images/basil2.png",
            nutritionalFacts: [
              "Rich in Vitamin K",
              "Contains Manganese",
              "Good Source of Magnesium",
              "High in Antioxidants",
            ],
            benefits: [
              "Reduces Stress",
              "Supports Liver Health",
              "Fights Infections",
              "Aids Digestion",
            ],
            price: "600",
            weightOptions: [
              { weight: "50g", price: "Rs. 640" },
              { weight: "100g", price: "Rs. 1100" },
              { weight: "200g", price: "Rs. 2100" },
            ],
            noStock: true,
            category: "Microgreens",
          },
          {
            id: 11,
            name: "Pea Shoots",
            description:
              "pea microgreens, are the young, tender leaves and stems of pea plants, harvested when they are still in their early growth stage. They are popular in microgreens and culinary circles for their fresh, delicate texture and sweet, pea-like flavor.",
            image: "/images/peasprouts.png",
            nutritionalFacts: [
              "High in Vitamin A, C, and K",
              "Rich in Potassium",
              "Good Source of Folate",
              "Contains Iron",
              "Anti-Oxidents"
            ],
            benefits: [
              "Detoxifies Heavy Metals",
              "Aids Digestion",
              "Lowers Blood Sugar",
              "Supports Skin Health",
            ],
            price: "700",
            weightOptions: [
              { weight: "50g", price: "Rs. 910" },
              { weight: "100g", price: "Rs. 1740" },
              { weight: "200g", price: "Rs. 3400" },
            ],
            noStock: false,
            category: "Microgreens",
          },
          {
            id: 12,
            name: "Red Amaranth",
            description:
              "Red Amaranth microgreens are vibrant, nutritious shoots known for their deep red stems and leaves, offering a mild, slightly earthy, spinach-like flavor and adding striking color to dishes. They are rich in vitamins (C, E, K) and minerals (iron, calcium, potassium).",
            image: "/images/amaranth.png",
            nutritionalFacts: [
              "",
            ],
            benefits: [
              "",
            ],
            price: "600",
            weightOptions: [
              { weight: "50g", price: "Rs. 1030" },
              { weight: "100g", price: "Rs. 2010" },
              { weight: "200g", price: "Rs. 4000" },
            ],
            noStock: true,
            category: "Microgreens",
          },
          {
            id: 13,
            name: "Mix Microgreen Pack",
            description:
              "Mix your favourite microgreens for your highly nutritional meal plan. Includes Beetroot, Kale, Radish, Mustard",
            image: "/images/Microgreen-mix.png",
            nutritionalFacts: [""],
            benefits: [""],
            price: "",
            weightOptions: [
              { weight: "50g", price: "Rs. 900" },
              { weight: "100g", price: "Rs. 1790" },
              { weight: "200g", price: "Rs. 3520" },
            ], // Removed weight options
            noStock: false,
            category: "Microgreens",
          },
          {
            id: 14,
            name: "Premium Ceylon Cinnamon",
            description:
              "High-quality Ceylon cinnamon for cooking and health benefits.",
            image: "/images/cinnamon-sticks.png",
            nutritionalFacts: [
              "Contains Antioxidants",
            ],
            benefits: [
              "Lower total cholesterol levels",
              "Aids Digestion",
              "Lower your triglycerides",
              "Supports Skin Health",
            ],
            price: "600",
            weightOptions: [
              { weight: "50g", price: "Rs. 600" },
              { weight: "100g", price: "Rs. 1100" },
              { weight: "200g", price: "Rs. 2150" },
            ],
            noStock: false,
            category: "Herbs & Salad Greens",
          },
          {
            id: 15,
            name: "Premium Ceylon Green Tea ",
            description:
              "Pure and natural 100% organic hand plucked green tea leaves for a healthy life.",
            image: "/images/greentea.png",
            nutritionalFacts: [
              "Contains Antioxidants",
            ],
            benefits: [
              "Detoxifies Heavy Metals",
              "Aids Digestion",
              "Lowers Blood Sugar",
              "Supports Skin Health",
            ],
            price: "800",
            weightOptions: [
              { weight: "20g", price: "Rs. 250" },
              { weight: "50g", price: "Rs. 400" },
              { weight: "100g", price: "Rs. 650" },
              { weight: "200g", price: "Rs. 1280" },
            ],
            noStock: true,
            category: "Teas",
          },
          // {
          //   id: 16,
          //   name: "Lemongrass Herbal Tea",
          //   description:
          //     "Refreshingly citrusy and naturally soothing, our Lemongrass Herbal Tea is a perfect blend of flavor and wellness. Made from carefully selected, sun-dried lemongrass leaves, this caffeine-free infusion offers a delightful balance of light, lemony zest with a hint of natural sweetness.",
          //   image: "/images/lemongrasstea.png",
          //   nutritionalFacts: [
          //     "",
          //   ],
          //   benefits: [
          //     "",
          //   ],
          //   price: "",
          //   weightOptions: [
          //     { weight: "50g", price: "" },
          //     { weight: "100g", price: "" },
          //   ],
          //   noStock: true,
          //   category: "Herbs & Teas",
          // },
          // {
          //   id: 17,
          //   name: "Mint Herbal Tea",
          //   description:
          //     "Cool, refreshing, and invigorating, our Mint Herbal Tea is a naturally caffeine-free infusion made from the finest handpicked mint leaves. With its crisp aroma and soothing properties, this tea is perfect for refreshing your senses while promoting digestion and relaxation. Enjoy it hot for a comforting experience or iced for a revitalizing treat.",
          //   image: "/images/minttea.png",
          //   nutritionalFacts: [
          //     "",
          //   ],
          //   benefits: [
          //     "",
          //   ],
          //   price: "",
          //   weightOptions: [
          //     { weight: "50g", price: "" },
          //     { weight: "100g", price: "" },
          //   ],
          //   noStock: true,
          //   category: "Herbs & Teas",
          // },
          // {
          //   id: 18,
          //   name: "Moringa Herbal Infusion Tea",
          //   description:
          //     "Packed with nutrients and earthy goodness, our Moringa Herbal Tea is a powerhouse of wellness in every sip. Made from handpicked, sun-dried moringa leaves, this naturally caffeine-free tea is rich in antioxidants, vitamins, and minerals that support immunity, boost energy, and promote overall well-being. With its smooth, mildly grassy flavor and subtle nuttiness, Moringa tea is a perfect addition to a healthy lifestyle.",
          //   image: "/images/moringatea.png",
          //   nutritionalFacts: [
          //     "",
          //   ],
          //   benefits: [
          //     "",
          //   ],
          //   price: "",
          //   weightOptions: [
          //     { weight: "50g", price: "" },
          //     { weight: "100g", price: "" },
          //   ],
          //   noStock: true,
          //   category: "Herbs & Teas",
          // },
          /* {
            id: 18,
            name: "Lotus Herbal Infusion Tea",
            description:
              "Lotus, Elegant and soothing, our Lotus Herbal Tea is a delicate infusion crafted from carefully selected lotus leaves and flowers. This naturally caffeine-free tea offers a light, floral aroma with a hint of earthiness, creating a truly calming experience. Rich in antioxidants and known for its detoxifying properties, lotus tea supports relaxation, digestion, and overall well-being. Enjoy it as a warm, tranquil brew or a refreshing iced tea.",
            image: "",
            nutritionalFacts: [
              "",
            ],
            benefits: [
              "",
            ],
            price: "",
            weightOptions: [
              { weight: "50g", price: "" },
              { weight: "100g", price: "" },
            ],
            noStock: true,
          }, */
          {
            id: 19,
            name: "Premium Ceylon Cinnamon Tea",
            description:
              "Infused togeth using hand manufactured ceylon cinnamon and tea for the best taste and aroma",
            image: "/images/cinnamontea.png",
            nutritionalFacts: [
              "",
            ],
            benefits: [
              "",
            ],
            price: "",
            weightOptions: [
              { weight: "50g", price: "" },
              { weight: "100g", price: "" },
            ],
            noStock: true,
            category: "Teas",
          },
          // {
          //   id: 30,
          //   name: "Plantation Seeds",
          //   description: "Request for any kind of agricultural seeds from below.",
          //   image: "/images/seeds.png",
          //   nutritionalFacts: [""],
          //   benefits: [""],
          //   price: "",
          //   weightOptions: [
          //     { weight: "Request", price: "" },
          //   ],
          //   noStock: false,
          //   category: "Herbs & Teas",
          // },
          {
            id: 31,
            name: "Mari Gold",
            description: "Marigold petals are rich in antioxidants, which can help reduce inflammation and protect cells from free radical damage. They also contain compounds that can help stimulate collagen production in the skin, which can reduce the signs of aging.",
            image: "/images/marigold.png",
            nutritionalFacts: [""],
            benefits: ["A source of antioxidants, vitamins, and minerals"],
            price: "",
            weightOptions: [
              { weight: "20pcs", price: "Rs. 370" },
              { weight: "100pcs", price: "Rs. 1700" },
            ],
            noStock: false,
            category: "Edible Flowers",
          },
          {
            id: 32,
            name: "Butterfly Pea",
            description: "Butterfly pea flower, a naturally blue edible flower, offers numerous benefits due to its rich antioxidant content and other bioactive compounds.",
            image: "/images/butterflypea.png",
            nutritionalFacts: [""],
            benefits: ["upporting brain health, improving skin and hair health, aiding in weight management, and potentially assisting with blood sugar control and heart health"],
            price: "",
            weightOptions: [
              { weight: "Request", price: "" },
            ],
            noStock: true,
            category: "Edible Flowers",
          },
          {
            id: 33,
            name: "Dianthus",
            description: "Dianthus flowers, also known as pinks, are small, frilly blossoms with a clove-like, sweet fragrance. These edible flowers add a mild peppery note and vibrant color to salads, desserts, and drinks.",
            image: "/images/dianthus.png",
            nutritionalFacts: [""],
            benefits: ["Contains antioxidants that may help reduce oxidative stress, Known for soothing digestive issues and supporting gut health, Offers anti-inflammatory and antimicrobial properties"],
            price: "",
            weightOptions: [
              { weight: "Request", price: "" },
            ],
            noStock: true,
            category: "Edible Flowers",
          },
          {
            id: 34,
            name: "Wishbone",
            description: "Wishbone flowers are delicate, trumpet-shaped blossoms with vibrant purple and blue hues. Though less common in cuisine, they are safe to eat and are sometimes used decoratively in salads and desserts.",
            image: "/images/wishbone.png",
            nutritionalFacts: [""],
            benefits: ["Aesthetic edible garnish rich in phytonutrients, May support eye health due to presence of natural pigments (like anthocyanins), Contains vitamins A and C for skin and immune system support"],
            price: "",
            weightOptions: [
              { weight: "20pcs", price: "Rs. 320" },
              { weight: "100pcs", price: "Rs. 1400" },
            ],
            noStock: false,
            category: "Edible Flowers",
          },
          {
            id: 55,
            name: "Cosmos",
            description: "Edible, drought-resistant, and, particularly C. caudatus, used in traditional medicine for antioxidant, anti-inflammatory, and anti-diabetic properties. ",
            image: "/images/cosmos.png",
            nutritionalFacts: [""],
            benefits: [""],
            price: "",
            weightOptions: [
              { weight: "20pcs", price: "Rs. 360" },
              { weight: "100pcs", price: "Rs. 1650" },
            ],
            noStock: false,
            category: "Edible Flowers",
          },
          {
            id: 36,
            name: "Mung Sprout",
            description:
              "These vibrant green microgreens are crunchy, mildly sweet, and packed with nutrients, making them a favorite for healthy meals, salads, stir-fries, and smoothies.",
            image: "/images/mung.png",
            nutritionalFacts: [
              "",
            ],
            benefits: [
              "",
            ],
            price: "600",
            weightOptions: [
              { weight: "100g", price: "Rs. 300" },
            ],
            noStock: false,
            category: "Microgreens",
          },
          {
            id: 37,
            name: "Micro Kurakkan",
            description:
              "Crisp, earthy, and slightly nutty, packed with essential nutrients and ancient grain goodness. As a gluten-free superfood, millet microgreens bring the power of traditional grains into modern healthy diets",
            image: "/images/millet.png",
            nutritionalFacts: [
              "",
            ],
            benefits: [
              "",
            ],
            price: "600",
            weightOptions: [
              { weight: "Request", price: "" },
            ],
            noStock: true,
            category: "Microgreens",
          },
          {
            id: 38,
            name: "Micro Corn Shoot",
            description:
              "Golden-yellow microgreens are grown in darkness (blanched) to enhance their natural sweetness and vibrant color, making them a favorite in fine dining, gourmet dishes, and modern healthy cuisine.",
            image: "/images/cornshoot.png",
            nutritionalFacts: [
              "",
            ],
            benefits: [
              "",
            ],
            price: "600",
            weightOptions: [
              { weight: "50g", price: "Rs. 620" },
              { weight: "100g", price: "Rs. 1150" },
            ],
            noStock: false,
            category: "Microgreens",
          },
          {
            id: 39,
            name: "Fenugreek",
            description:
              "Young fenugreek plants harvested shortly after sprouting, known for their mildly bitter, slightly maple-like flavor, and crisp texture",
            image: "/images/fenugreek.png",
            nutritionalFacts: [
              "",
            ],
            benefits: [
              "",
            ],
            price: "600",
            weightOptions: [
              { weight: "50g", price: "Rs. 480" },
              { weight: "100g", price: "Rs. 800" },
            ],
            noStock: false,
            category: "Microgreens",
          },
          // {
          //   id: 40,
          //   name: "Impation",
          //   description:
          //     "Vibrant, shade-loving bloom known for its dazzling colors, soft petals, and long-lasting beauty. Popular in ornamental gardening, bouquets, and edible flower arrangements, Impatiens bring a cheerful burst of color to any setting.",
          //   image: "/images/impatient.png",
          //   nutritionalFacts: [
          //     "",
          //   ],
          //   benefits: [
          //     "",
          //   ],
          //   price: "600",
          //   weightOptions: [
          //     { weight: "20pcs", price: "Rs. 405" },
          //     { weight: "100pcs", price: "Rs. 1780" },
          //   ],
          //   noStock: false,
          //   category: "Edible Flowers",
          // },
          // {
          //   id: 41,
          //   name: "Zinnia",
          //   description:
          //     "Zinnia is a bright, cheerful flower known for its bold colors, daisy-like shape, and long-lasting blooms. Native to Central America and Mexico, Zinnias have become a favorite in gardens and floral arrangements worldwide due to their vibrant beauty, easy care, and symbolic meaning of joy and friendship.",
          //   image: "/images/zinnia.png",
          //   nutritionalFacts: [
          //     "",
          //   ],
          //   benefits: [
          //     "",
          //   ],
          //   price: "600",
          //   weightOptions: [
          //     { weight: "10pcs", price: "Rs. 500" },
          //   ],
          //   noStock: false,
          //   category: "Edible Flowers",
          // },
          {
            id: 43,
            name: "Roses",
            description:
              "Rose is one of the most iconic and cherished flowers in the world, celebrated for its timeless beauty, fragrance, and symbolic depth. With thousands of varieties, roses are available in a wide range of colors, sizes, and petal forms, making them perfect for bouquets, gardens, decorations, and even culinary use.",
            image: "/images/rose.png",
            nutritionalFacts: [
              "",
            ],
            benefits: [
              "",
            ],
            price: "600",
            weightOptions: [
              { weight: "5pcs", price: "Rs. 1900" },
              { weight: "10pcs", price: "Rs. 3700" },
            ],
            noStock: false,
            category: "Edible Flowers",
          },
          {
            id: 48,
            name: "Chrysanthemum",
            description:
              "Chrysanthemum flowers are rich in phenolic compounds and exhibit strong properties including antioxidant, antimicrobial, anti-inflammatory, anticancer, anti-allergic, anti-obesity, immune regulation, hepatoprotective, and nephroprotective activities, and charming look making them really good for bouquets, gardens, decorations, and even culinary use.",
            image: "/images/Chrysanthemum.png",
            nutritionalFacts: [
              "",
            ],
            benefits: [
              "",
            ],
            price: "600",
            weightOptions: [
              { weight: "5pcs", price: "Rs. 500" },
              { weight: "10pcs", price: "Rs. 900" },
            ],
            noStock: false,
            category: "Edible Flowers",
          },
          {
            id: 44,
            name: "Crispy Potato Microgreens Salad",
            description:
              "Mustard Microgreens, Radish Microgreens, Chrispy Potatoes, Boiled chickpeas, Sliced red onion, Cherry tomatoes, Lemon juice, Lemon juice, Crushed garlic, Salt & Pepper, Olive Oil, Tofu Cream, Special Dressing.    Each per person meal contains around 350g +/- " ,
            image: "/images/crispypotato.png",
            nutritionalFacts: [
              "",
            ],
            benefits: [
              "",
            ],
            price: "",
            weightOptions: [
              { weight: "Per Person", price: "Rs. 1,210" },
              { weight: "Two Person", price: "Rs. 2,050" }
            ],
            noStock: false,
            category: "Salads",
          },
          {
            id: 45,
            name: "Beet & Radish Microgreens Salad",
            description:
              "Beetroot Microgreens, Radish Microgreens, Grated Carrots, Apple Slices, Pomegranate Seeds, Sunflower or Pumpkins Seeds, Honey, Lemon juice, Salt & Pepper, Olive Oil, Special Dressing.   Each per person meal contains around 350g +/- " ,
            image: "/images/pome.png",
            nutritionalFacts: [
              "",
            ],
            benefits: [
              "",
            ],
            price: "",
            weightOptions: [
              { weight: "Per Person", price: "Rs. 1,260" },
              { weight: "Two Person", price: "Rs. 2,150" }
            ],
            noStock: false,
            category: "Salads",
          },
          {
            id: 46,
            name: "Zesty Avocado Salad",
            description:
              "Mustard Microgreens, Radish Microgreens, Avocado Cubes, Cherry Tomatoes, Cucumber Slices, Lemon Juice, Onion Slices, Chilli, Salt & Pepper, Olive Oil, Sunflower or Pumpkins Seeds, Special Dressing.   Each per person meal contains around 350g +/- " ,
            image: "/images/zesty.png",
            nutritionalFacts: [
              "",
            ],
            benefits: [
              "",
            ],
            price: "",
            weightOptions: [
              { weight: "Per Person", price: "Rs. 1,180" },
              { weight: "Two Person", price: "Rs. 1,990" }
            ],
            noStock: false,
            category: "Salads",
          },
          {
            id: 50,
            name: "Mint Leaves (Minchi)",
            description:
              "Popular Aromatic perennial herbs from the Mentha genus used fresh or dried to add a cool, refreshing flavor to foods, beverages, and teas. They are rich in antioxidants, commonly used to improve digestion, soothe stomach pain, and reduce symptoms of IBS and colds. " ,
            image: "/images/mint.png",
            nutritionalFacts: [
              "",
            ],
            benefits: [
              "",
            ],
            price: "",
            weightOptions: [
              { weight: "100g", price: "Rs. 45" },
              { weight: "200g", price: "Rs. 88" },
            ],
            noStock: false,
            category: "Herbs & Salad Greens",
          },
          {
            id: 51,
            name: "Gotukola",
            description:
              "Gotukola is a highly nutritious, widely consumed leafy green in Sri Lanka, revered for both its culinary, especially in sambol, and medicinal properties. Known as a, herb of longevity, it is rich in iron, used in traditional medicine to enhance memory, improve skin health, and boost immunity, cultivated primarily in wet zones." ,
            image: "/images/gotukola.png",
            nutritionalFacts: [
              "",
            ],
            benefits: [
              "",
            ],
            price: "",
            weightOptions: [
              { weight: "100g", price: "Rs. 150" },
              { weight: "200g", price: "Rs. 295" },
            ],
            noStock: false,
            category: "Herbs & Salad Greens",
          },
          {
            id: 52,
            name: "Butter Head Lettuce ",
            description:
              "A tender, mild-flavored, and succulent leafy green known for its soft, buttery texture and loose, rosette-shaped heads. Excellent for salads, wraps, and sandwiches. " ,
            image: "/images/ButterheadLettuce.png",
            nutritionalFacts: [
              "",
            ],
            benefits: [
              "",
            ],
            price: "",
            weightOptions: [
              { weight: "Request", price: "Rate" },
            ],
            noStock: true,
            category: "Herbs & Salad Greens",
          },
          {
            id: 53,
            name: "Green Curly Lettuce",
            description:
              "Italian loose-leaf lettuce known for its bright, light-green, and intensely curly, frilly leaves. It is a mild-flavored, crunchy, and decorative cut-and-come-again variety that does not form a tight heart. It is commonly used in salads for its texture and appearance" ,
            image: "/images/lollobionda.png",
            nutritionalFacts: [
              "",
            ],
            benefits: [
              "",
            ],
            price: "",
            weightOptions: [
              { weight: "100g", price: "Rs. 320" },
            ],
            noStock: false,
            category: "Herbs & Salad Greens",
          },
          {
            id: 54,
            name: "Red Curly Lettuce ",
            description:
              "A tender, non-heading heirloom lettuce (Lactuca sativa) named for its deeply lobed leaves that resemble white oak leaves. Available in red and green varieties, it is prized for its mild, buttery, sweet flavor, remaining non-bitter even in hot summer, and makes an excellent cut-and-come-again salad green.  " ,
            image: "/images/redlettuce.png",
            nutritionalFacts: [
              "",
            ],
            benefits: [
              "",
            ],
            price: "",
            weightOptions: [
              { weight: "100g", price: "Rs. 420" },
            ],
            noStock: false,
            category: "Herbs & Salad Greens",
          },
          {
            id: 57,
            name: "Black Pepper | ගම් මිරිස්",
            description:
              "The King of Spices for Your Garden - High-quality black pepper plants with strong root systems and fast climbing growth. Ideal for home gardens and estates, this perennial spice plant gives long-term harvests and excellent market value. Suitable for grow bags or ground planting with support. Age of plant: 50 - 60 days. Per Plant Rs 58. Minimum 10 plants required." ,
            image: "/images/blackpepper.png",
            nutritionalFacts: [
              "",
            ],
            benefits: [
              "",
            ],
            price: "",
            weightOptions: [
              // { weight: "10 Plants", price: "Rs. 580" },
              { weight: "Per Plant", price: "Rs. 58" },
            ],
            noStock: false,
            category: "Nursery",
          },
          {
            id: 58,
            name: "MI 2 |අමු මිරිස්",
            description:
              "Sri Lanka’s Most Trusted Green Chilli Variety - MI 2 is a high-yielding, fast-growing green chilli variety with excellent pungency and market demand. Perfect for home growers and commercial farmers looking for consistent harvests and reliable performance. ​Age of plant: 25-30 days. Minimum 50 plants required." ,
            image: "/images/greenchili.png",
            nutritionalFacts: [
              "",
            ],
            benefits: [
              "",
            ],
            price: "",
            weightOptions: [
              { weight: "Per Plant", price: "Rs. 22" },
              // { weight: "Request", price: "" },
            ],
            noStock: false,
            category: "Nursery",
          },
          {
            id: 59,
            name: "MIHP 1 | නයි මිරිස්",
            description:
              "Extra Hot | Premium Market Value - MIHP 1 Nai Miris plants produce intensely spicy chillies with strong market demand. Well-adapted to Sri Lankan conditions, this variety is ideal for farmers targeting niche and high-value chilli markets. ​Age of plant: 45 days. Minimum 50 plants required." ,
            image: "/images/Michhy1.png",
            nutritionalFacts: [
              "",
            ],
            benefits: [
              "",
            ],
            price: "",
            weightOptions: [
              { weight: "Per Plant", price: "Rs. 25" },
              // { weight: "Request", price: "" },
            ],
            noStock: false,
            category: "Nursery",
          },
          {
            id: 60,
            name: "MiCH HY | මිරිස්",
            description:
              "Hybrid Power for Maximum Yield - MiCH HY is a high-yield hybrid green chilli variety known for uniform fruits, strong plant vigor, and extended harvesting periods. A perfect choice for growers aiming for higher productivity and better profits. ​Age of plant: 25-30 days. Minimum 50 plants required." ,
            image: "/images/michhy.png",
            nutritionalFacts: [
              "",
            ],
            benefits: [
              "",
            ],
            price: "",
            weightOptions: [
              { weight: "Per Plant", price: "Rs. 25" },
              // { weight: "Request", price: "" },
            ],
            noStock: false,
            category: "Nursery",
          },
          {
            id: 61,
            name: "Muriya - Capsicum | මාළු මිරිස්",
            description:
              "High-Value Vegetable for Home & Commercial Growing - Healthy capsicum plants that perform exceptionally well in grow bags and protected cultivation. Produces thick, glossy fruits with excellent shelf life and strong demand in supermarkets and hotels. ​Age of plant: 25-30 days. Minimum 50 plants required." ,
            image: "/images/malumiris.png",
            nutritionalFacts: [
              "",
            ],
            benefits: [
              "",
            ],
            price: "",
            weightOptions: [
              { weight: "Per Plant", price: "Rs. 25" },
              // { weight: "Request", price: "" },
            ],
            noStock: false,
            category: "Nursery",
          },
          {
            id: 62,
            name: "Cherry Tomatoes",
            description:
              "Premium Cherry Tomato Plants for Your Garden - Grow delicious and juicy cherry tomatoes right at home! Our cherry tomato plants are healthy, vigorous, and ready for transplanting — perfect for home gardens, balconies, pots, or raised beds. These plants produce abundant clusters of small, sweet tomatoes that are loved for fresh salads, snacks, and gourmet cooking." ,
            image: "/images/cherrytom.png",
            nutritionalFacts: [
              "",
            ],
            benefits: [
              "",
            ],
            price: "",
            weightOptions: [
              { weight: "250g", price: "Rs. 490" },
            ],
            noStock: true,
            category: "Herbs & Salad Greens",
          },
          // {
          //   id: 63,
          //   name: "Green Bell Pepper",
          //   description:
          //     "Crisp, mildly bitter, and grassy-flavored unripe fruits of the Capsicum annuum plant, packed with Vitamin C and fiber. They are highly versatile, often used in salads, sautéed, or stuffed in dishes like Creole holy trinity. Low in calories and,, they provide antioxidants while maturing into sweeter, redder, or yellow varieties over time. " ,
          //   image: "/images/greenbp.png",
          //   nutritionalFacts: [
          //     "",
          //   ],
          //   benefits: [
          //     "",
          //   ],
          //   price: "",
          //   weightOptions: [
          //     { weight: "100g", price: "Rs. 350" },
          //   ],
          //   noStock: true,
          //   category: "Herbs & Salad Greens",
          // },
          {
            id: 64,
            name: "Red Bell Pepper",
            description:
              "Sweet, crisp, nutrient-dense fruits (botanically) or vegetables (culinary) that are fully ripened green peppers. They are nutritional powerhouses, particularly high in vitamins C, A, and E, which support immune function, skin, and eye health. Packed with antioxidants like lycopene, they are low-calorie, versatile, and excellent raw, roasted, or in salads. " ,
            image: "/images/redbp.png",
            nutritionalFacts: [
              "",
            ],
            benefits: [
              "",
            ],
            price: "",
            weightOptions: [
              { weight: "100g", price: "Rs. 380" },
            ],
            noStock: false,
            category: "Herbs & Salad Greens",
          },
          // {
          //   id: 64,
          //   name: "Yellow Bell Pepper",
          //   description:
          //     "" ,
          //   image: "/images/",
          //   nutritionalFacts: [
          //     "",
          //   ],
          //   benefits: [
          //     "",
          //   ],
          //   price: "",
          //   weightOptions: [
          //     { weight: "100g", price: "Rs. 500" },
          //   ],
          //   noStock: true,
          //   category: "Herbs & Salad Greens",
          // },
          // {
          //   id: 64,
          //   name: "Green Chili",
          //   description:
          //     "" ,
          //   image: "/images/",
          //   nutritionalFacts: [
          //     "",
          //   ],
          //   benefits: [
          //     "",
          //   ],
          //   price: "",
          //   weightOptions: [
          //     { weight: "1 Plant", price: "Rs. 120" },
          //   ],
          //   noStock: true,
          //   category: "Herbs & Salad Greens",
          // },
    ]);

    const cartRef = useRef<HTMLDivElement | null>(null);
  const prodRef = useRef<HTMLDivElement | null>(null);

  const handleScrollToCart = () => {
    cartRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleScrollToProduct = () => {
    prodRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // ✅ Nursery quantity per product id
  const [nurseryQty, setNurseryQty] = useState<Record<number, number>>({});

  const getNurseryQty = (product: Product) => {
    const min = getMinQty(product);
    return nurseryQty[product.id] ?? min; // ✅ default = min
  };

  const setQtySafe = (product: Product, val: number) => {
    const min = getMinQty(product);
    const max = getMaxQty(product);
    const numeric = Number.isFinite(val) ? val : min;
    const safe = Math.max(min, Math.min(max, numeric));
    setNurseryQty((prev) => ({ ...prev, [product.id]: safe }));
  };

  const addToCart = (
    product: Product,
    option?: { weight: string; price: string },
    quantity: number = 1
  ) => {
    const min = getMinQty(product);
    const max = getMaxQty(product);

    const finalQty =
      product.category === "Nursery"
        ? Math.max(min, Math.min(max, quantity))
        : 1;

    const newItem: CartItem = {
      productId: product.id,
      category: product.category,
      name: product.name,
      selectedWeight: option?.weight ?? "Custom Mix",
      selectedPrice: option?.price ?? "Requested",
      quantity: finalQty,
    };

  setCart((prev) => [...prev, newItem]);
};

  const removeFromCart = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => {
      // Remove "Rs.", spaces, and commas before converting
      const cleanPrice = item.selectedPrice
        .replace("Rs.", "")
        .replace(/,/g, "")
        .replace(/\s/g, "")
        .trim();

      const numericPrice = parseFloat(cleanPrice) || 0;
      return total + numericPrice * (item.quantity ?? 1);
    }, 0);
  };

  const applyCoupon = () => {
    const code = couponCode.trim().toUpperCase();

    if (validCoupons[code]) {
      setDiscount(validCoupons[code]);
      setCouponMessage(`🎉 Coupon applied! You got ${validCoupons[code]}% off.`);
    } else {
      setDiscount(0);
      setCouponMessage("❌ Invalid coupon code. Please try again.");
    }
  };

  const validatePhoneNumber = (number: string) => {
    // Sri Lankan mobile number starting with 07 followed by 8 digits (total 10)
    const regex = /^(0)(7[01245678])[0-9]{7}$/;
    return regex.test(number);
  };

  // ---------------- PDF (same as yours, but includes Qty column) ----------------
  const generateAndDownloadPDF = (orderNo: string) => {
    const doc = new jsPDF({ unit: "mm", format: "a4" });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    const marginLeft = 14;
    const marginRight = 14;
    const marginBottom = 12;

    const watermarkWidth = 120;
    const watermarkHeight = 120;

    const drawWatermark = () => {
      const x = (pageWidth - watermarkWidth) / 2;
      const y0 = (pageHeight - watermarkHeight) / 2;

      doc.setGState(new GState({ opacity: 0.15 }));
      doc.addImage(logo, "PNG", x, y0, watermarkWidth, watermarkHeight);
      doc.setGState(new GState({ opacity: 1 }));
    };

    const drawHeader = (continued = false) => {
      drawWatermark();

      doc.addImage(logo, "PNG", marginLeft, 10, 28, 28);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.text("Ceyplanta", 50, 18);

      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text("No 235, Galle Rd, Thalpitiya South, Wadduwa", 50, 24);
      doc.text(
        "+94 70 234 2433 | ceyplanta@gmail.com | www.ceyplanta.com | BR Code: PV 00349478",
        50,
        30
      );

      doc.line(marginLeft, 42, pageWidth - marginRight, 42);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.text(continued ? "Invoice" : "Invoice", marginLeft, 50);
    };

    const drawFooter = () => {
      doc.setFont("helvetica", "italic");
      doc.setFontSize(9);
      doc.text("This is a system-generated invoice.", marginLeft, pageHeight - 8);
    };

    let y = 60;
    const lineH = 5;

    const ensureSpace = (need: number) => {
      if (y + need > pageHeight - marginBottom - 10) {
        doc.addPage();
        drawHeader(true);
        drawFooter();
        y = 60;
      }
    };

    const writeWrapped = (
      text: string,
      fontSize = 10,
      fontStyle: "normal" | "bold" | "italic" = "normal"
    ) => {
      doc.setFont("helvetica", fontStyle);
      doc.setFontSize(fontSize);
      const lines = doc.splitTextToSize(text, pageWidth - marginLeft - marginRight);
      lines.forEach((ln: string) => {
        ensureSpace(lineH);
        doc.text(ln, marginLeft, y);
        y += lineH;
      });
    };

    const forceNewPage = () => {
      doc.addPage();
      drawHeader(true);
      drawFooter();
      y = 60;
    };

    drawHeader(false);
    drawFooter();

    // Date / Order
    const today = new Date().toLocaleDateString();
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.text(`Date: ${today}`, marginLeft, y);
    doc.text(`Order No: ${orderNo}`, 100, y);
    y += 10;

    // Customer info
    doc.setFontSize(11);
    doc.text(`Name: ${name}`, marginLeft, y);
    y += 6;
    doc.text(`Email: ${email}`, marginLeft, y);
    y += 6;
    doc.text(`Phone: ${phone}`, marginLeft, y);
    y += 10;

    // Items label
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    ensureSpace(11);
    doc.text("Order Items:", marginLeft, y);
    y += 8;

    // ✅ Items table includes Qty
    autoTable(doc, {
      startY: y,
      margin: { left: marginLeft, right: marginRight },
      head: [["#", "Item", "Weight", "Qty", "Price (Unit)"]],
      body: cart.map((it, i) => [
        String(i + 1),
        it.name,
        it.selectedWeight,
        String(it.quantity ?? 1),
        it.selectedPrice,
      ]),
      styles: {
        font: "helvetica",
        fontSize: 10,
        cellPadding: 2,
        overflow: "linebreak",
      },
      headStyles: { fontStyle: "bold" },
      columnStyles: {
        0: { cellWidth: 10 },
        1: { cellWidth: 78 },
        2: { cellWidth: 26 },
        3: { cellWidth: 14 },
        4: { cellWidth: 30 },
      },
      didDrawPage: () => {
        drawHeader(true);
        drawFooter();
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    y = (doc as any).lastAutoTable.finalY + 8;

    // Delivery
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    ensureSpace(20);
    doc.text("Delivery Details:", marginLeft, y);
    y += 6;

    writeWrapped(`Address & Additional Details – ${message || "N/A"}`, 10, "normal");
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text("Delivery charges may change accordingly to the distance", marginLeft, y);
    y += 6;

    forceNewPage();

    // Totals
    const gross = getTotalPrice();
    const netTotal = gross - (gross * discount) / 100;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    ensureSpace(16);
    doc.text("Total Rates:", marginLeft, y);
    y += 6;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    ensureSpace(6);
    doc.text(`Gross Total – Rs. ${gross.toFixed(2)}`, marginLeft, y);
    y += 5;
    ensureSpace(6);
    doc.text(`Discount – ${discount}%`, marginLeft, y);
    y += 5;
    ensureSpace(6);
    doc.text(`Net Total – Rs. ${netTotal.toFixed(2)} + Delivery Charges`, marginLeft, y);
    y += 8;

    // Bank
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    ensureSpace(20);
    doc.text("Bank Details", marginLeft, y);
    y += 6;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    ensureSpace(6);
    doc.text("Account Name - Ceyplanta Pvt Ltd", marginLeft, y);
    y += 5;
    ensureSpace(6);
    doc.text("Account Number - 002010576887", marginLeft, y);
    y += 5;
    ensureSpace(6);
    doc.text("Bank - Hatton National Bank", marginLeft, y);
    y += 8;

    ensureSpace(8);
    writeWrapped(
      "Thank you for your order! We look forward to supplying you with premium organic microgreens & edible flowers grown with care at Ceyplanta.",
      10,
      "italic"
    );
    y += 4;
    doc.setFont("helvetica", "normal");
      doc.setFontSize(8);

      const terms = [
        "This quotation is valid for 15 days from the date of issue. Prices and availability are subject to change after this period.",
        "Bulk Orders: Minimum 400g per microgreen variety or 100 pcs flower.",
        "No cancellation or refund after order placement.",
        "Payment Terms: Full payment is required within 2 days of order placement. Order preparation will begin only after payment confirmation.",
        "Orders must be collected on the confirmed delivery date. Freshness not guaranteed after 2 days of delivery date.",
      ];

      terms.forEach((t) => {
        writeWrapped(`• ${t}`, 9, "normal");
      });

    doc.save(`invoice ${orderNo}.pdf`);
  };

  // ---------------- Checkout / Email ----------------
  const sendEmailToAdmin = (messageContent: string) => {
    const serviceID = "service_18vf6wc";
    const templateID = "template_xcb8ynu";

    emailjs
      .send(serviceID, templateID, {
        name,
        email,
        phone,
        time: new Date().toLocaleString(),
        cartItems: messageContent,
        message: message || "No additional message provided.",
      })
      .then(() => {
        alert(
          "Your order has been placed successful. You will be contact soon by our team, Thank You!"
        );
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
        setCart([]);
        setNurseryQty({});
      })
      .catch((error: any) => {
        console.error("Error placing order!:", error);
        alert("There was an error placing your order. Please try again later!");
      });
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !phone) {
      alert("Please fill out all the required fields!");
      return;
    }

    if (!validatePhoneNumber(phone.trim())) {
      alert("Please enter a valid Sri Lankan mobile number (e.g., 0771234567)");
      return;
    }

    if (cart.length === 0) {
      alert("Your cart is empty. Please add some products before checkout.");
      return;
    }

    for (const item of cart) {
        if (item.category === "Nursery") {
          const min = item.productId === 57 ? 10 : 50;
          if ((item.quantity ?? 0) < min) {
            alert(`Minimum order for "${item.name}" is ${min} plants.`);
            return;
          }
        }
      }

    const orderNumber = `CEYD-${Math.floor(Math.random() * 90000) + 10000}`;

    // ✅ include quantity, and do NOT double-add "Rs."
    const cartItems = cart
      .map(
        (item) =>
          `${item.name} - ${item.selectedWeight} - Qty: ${item.quantity ?? 1} - ${item.selectedPrice}`
      )
      .join("\n");

    const grossTotal = getTotalPrice();
    const discountAmount = (grossTotal * discount) / 100;
    const netTotal = grossTotal - discountAmount;

    const checkoutMessage = `
🧾 Order Confirmation - ${orderNumber}

Name: ${name}
Email: ${email}
Phone: ${phone}
Message: ${message || "N/A"}

----------------------------
🛒 Cart Items
----------------------------
${cartItems}

----------------------------
💰 Order Summary
----------------------------
Gross Total: Rs. ${grossTotal.toLocaleString()}
Discount: ${discount}% (- Rs. ${discountAmount.toLocaleString()})
Net Total: Rs. ${netTotal.toLocaleString()} + Delivery Charges

----------------------------
📅 Date: ${new Date().toLocaleString()}
`;

    generateAndDownloadPDF(orderNumber);
    sendEmailToAdmin(checkoutMessage);
  };

  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter((product) => {
    const matchCategory = selectedCategory === "All" || product.category === selectedCategory;
    const matchSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });

  // ---------------- UI ----------------
  return (
    <div className="buy-greens-page">
      {/* Cart Icon */}
      <button className="cart-icon-btn" onClick={handleScrollToCart}>
        🛒
        {cart.length > 0 && <span className="cart-badge">{cart.length}</span>}
      </button>

      <h1>Buy Greens</h1>
      <br />

      {/* ✅ Category Buttons */}
      <div className="category-buttons">
        <button className={selectedCategory === "All" ? "active" : ""} onClick={() => setSelectedCategory("All")}>
          🌿 All
        </button>
        <button
          className={selectedCategory === "Microgreens" ? "active" : ""}
          onClick={() => setSelectedCategory("Microgreens")}
        >
          🌱 Microgreens
        </button>
        <button className={selectedCategory === "Salads" ? "active" : ""} onClick={() => setSelectedCategory("Salads")}>
          🥗 Salads
        </button>
        <button
          className={selectedCategory === "Herbs & Salad Greens" ? "active" : ""}
          onClick={() => setSelectedCategory("Herbs & Salad Greens")}
        >
          🍃 Herbs, Fruits & Greens
        </button>
        <button
          className={selectedCategory === "Edible Flowers" ? "active" : ""}
          onClick={() => setSelectedCategory("Edible Flowers")}
        >
          🌸 Edible Flowers
        </button>
        <button className={selectedCategory === "Teas" ? "active" : ""} onClick={() => setSelectedCategory("Teas")}>
          ☕ Teas
        </button>
        <button className={selectedCategory === "Nursery" ? "active" : ""} onClick={() => setSelectedCategory("Nursery")}>
          🪴 Nursery Plants
        </button>
      </div>

      <br />

      <div className="search-container">
        <input
          type="text"
          placeholder="Search for your greens..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />
      </div>

      <br />

      {/* ✅ Filtered Products */}
      <div ref={prodRef} className="product-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} className="product-image" />
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <p>
                <strong>Add to Cart</strong>
              </p>

              {product.noStock ? (
                <button className="no-stock-btn" disabled>
                  Coming Soon
                </button>
              ) : (
                <div className="button-group">
                  {/* ✅ Quantity selector ONLY for Nursery */}
                  {product.category === "Nursery" && (
                    <div className="qty-row">
                      <button
                        type="button"
                        onClick={() => setQtySafe(product, getNurseryQty(product) - 1)}
                      >
                        −
                      </button>

                      <input
                        type="number"
                        min={getMinQty(product)}
                        max={getMaxQty(product)}
                        value={getNurseryQty(product)}
                        onChange={(e) => setQtySafe(product, parseInt(e.target.value, 10))}
                      />

                      <button
                        type="button"
                        disabled={getNurseryQty(product) >= getMaxQty(product)}
                        onClick={() => setQtySafe(product, getNurseryQty(product) + 1)}
                      >
                        +
                      </button>

                      <small className="qty-hint">
                        Min: {getMinQty(product)}
                      </small>
                    </div>
                  )}

                  {product.weightOptions.map((option) => (
                    <button
                      key={option.weight}
                      onClick={() =>
                        addToCart(
                          product,
                          option,
                          product.category === "Nursery" ? getNurseryQty(product) : 1
                        )
                      }
                    >
                      {option.weight} - {option.price} 🛒
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No products found for this category.</p>
        )}
      </div>

      <br />
      <br />

      {/* Subscription Packages */}
      <div className="subscription-packages">
        <h2>Subscription</h2>

        <div className="package2 clickable" onClick={() => setShowModal(true)}>
          <h3>Monthly Package</h3>
          <p>
            Enjoy our services for one month. Delivered weekly for a month. Pay Monthly. Get your customized quotation!
            Mention the Package in Additional Details when checking out!
          </p>
          <p>
            <strong>Click to see packages</strong>
          </p>
        </div>

        {showModal && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <img src="/images/monthly-package.png" alt="Monthly Package Details" />
              <button onClick={() => setShowModal(false)}>Close</button>
            </div>
          </div>
        )}

        <div className="package3">
          <h3>Notice</h3>
          <p>Kindly note that we require 5–10 days’ lead time to prepare your order. We will inform you prior to completion.</p>
          <p>All the prices listed in this page are officially the retail prices. For bulk prices please contact us!</p>
        </div>
      </div>

      <br />

      {/* Cart */}
      <div ref={cartRef} className="cart">
        <h2>Your Cart</h2>

        {cart.length > 0 ? (
          <div>
            <ul className="cart-list">
              {cart.map((item, index) => (
                <li key={index} className="cart-item">
                  <span className="cart-name">{item.name}</span>
                  <span className="cart-weight">{item.selectedWeight}</span>
                  <span className="cart-qty">x {item.quantity}</span>
                  <span className="cart-price">{item.selectedPrice}</span>

                  <span className="cart-remove" onClick={() => removeFromCart(index)}>
                    🗑️
                  </span>
                </li>
              ))}
            </ul>

            <h4>Subtotal: Rs. {getTotalPrice().toLocaleString()}</h4>

            {discount > 0 && (
              <h4>
                Discount ({discount}%): - Rs. {((getTotalPrice() * discount) / 100).toLocaleString()}
              </h4>
            )}

            <h3>Total: Rs. {(getTotalPrice() - (getTotalPrice() * discount) / 100).toLocaleString()}</h3>

            <button className="clear-cart-btn" onClick={clearCart}>
              Clear Cart
            </button>
          </div>
        ) : (
          <p>Your cart is empty.</p>
        )}

        <div className="coupon-section">
          <input
            type="text"
            placeholder="Enter coupon code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            className="coupon-input"
          />
          <button type="button" onClick={applyCoupon} className="apply-coupon-btn">
            Apply
          </button>
          {couponMessage && <p className="coupon-message">{couponMessage}</p>}
        </div>
      </div>

      <br />

      <form className="checkout-form" onSubmit={handleCheckout} noValidate>
        <h2>Checkout & Submit</h2>

        <input type="text" value={name} placeholder="Your Name" onChange={(e) => setName(e.target.value)} required />
        <input type="email" value={email} placeholder="Your Email" onChange={(e) => setEmail(e.target.value)} required />

        <input
          type="tel"
          value={phone}
          placeholder="Your Phone Number (e.g., 0771234567)"
          onChange={(e) => setPhone(e.target.value)}
          required
          pattern="^(0)(7[01245678])[0-9]{7}$"
          title="Enter a valid phone number"
        />

        <textarea
          value={message}
          placeholder="Additional Details (Delivery Details / Request Customer Support / Request Customized Microgreen packages / Request Subscription packages)"
          onChange={(e) => setMessage(e.target.value)}
        />

        <button type="submit">Submit</button>
      </form>

      <button className="prod-icon-btn" onClick={handleScrollToProduct}>
        🥬
      </button>
    </div>
  );
};

export default BuyGreens;