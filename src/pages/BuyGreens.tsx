import { useState, useRef  } from "react";
import "../styles/buy-greens.css"; // Add styles for this page
import emailjs from 'emailjs-com';
import jsPDF from 'jspdf';
import logo from "../assets/logo_3.png";


const BuyGreens = () => {
    // Initialize EmailJS with your user ID
    emailjs.init('_BVjspFpxrJqFVQpM');
    
    const [cart, setCart] = useState<{ name: string; selectedWeight: string; selectedPrice: string }[]>([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    // 💰 Discount coupon states
    const [couponCode, setCouponCode] = useState("");
    const [discount, setDiscount] = useState(0);
    const [couponMessage, setCouponMessage] = useState("");

    // ✅ Valid coupons
    const validCoupons: Record<string, number> = {
      "CEY5": 5,    // 5% off
      "CEY10": 10,  // 10% off
      "CEYH15": 15,  // 15% off for hotels
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
        selectedPrice?: string;  // selectedPrice optional
        noStock: boolean;
        category: string;
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
              { weight: "50g", price: "Rs. 600" },
              { weight: "100g", price: "Rs. 1070" },
              { weight: "200g", price: "Rs. 1980" },
            ],
            noStock: false,
            category: "Microgreens",
          },
          {
            id: 2,
            name: "Kangkung",
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
              { weight: "50g", price: "Rs. 880" },
              { weight: "100g", price: "Rs. 1750" },
              { weight: "200g", price: "Rs. 3490" },
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
              { weight: "50g", price: "Rs. 590" },
              { weight: "100g", price: "Rs. 860" },
              { weight: "200g", price: "Rs. 1620" },
            ],
            noStock: false,
            category: "Microgreens",
          },
          {
            id: 7,
            name: "Cabbage",
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
              { weight: "100g", price: "Rs. 1460" },
              { weight: "200g", price: "Rs. 2900" },
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
              { weight: "50g", price: "Rs. 810" },
              { weight: "100g", price: "Rs. 1600" },
              { weight: "200g", price: "Rs. 3160" },
            ],
            noStock: false,
            category: "Microgreens",
          },
          {
            id: 12,
            name: "Mix Amaranth Pack",
            description:
              "Mix Amaranth microgreen meal includes Green and Red Amaranth",
            image: "/images/mix-amaranth.png",
            nutritionalFacts: [
              "",
            ],
            benefits: [
              "",
            ],
            price: "600",
            weightOptions: [
              { weight: "50g", price: "Rs. 730" },
              { weight: "100g", price: "Rs. 1480" },
              { weight: "200g", price: "Rs. 2560" },
            ],
            noStock: true,
            category: "Microgreens",
          },
          {
            id: 13,
            name: "Customized Mix Microgreen Pack",
            description:
              "Mix your favourite microgreens for your highly nutritional meal plan",
            image: "/images/Microgreen-mix.png",
            nutritionalFacts: [""],
            benefits: [""],
            price: "",
            weightOptions: [{ weight: "Request", price: "" },], // Removed weight options
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
            category: "Herbs & Teas",
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
            category: "Herbs & Teas",
          },
          {
            id: 16,
            name: "Lemongrass Herbal Tea",
            description:
              "Refreshingly citrusy and naturally soothing, our Lemongrass Herbal Tea is a perfect blend of flavor and wellness. Made from carefully selected, sun-dried lemongrass leaves, this caffeine-free infusion offers a delightful balance of light, lemony zest with a hint of natural sweetness.",
            image: "/images/lemongrasstea.png",
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
            category: "Herbs & Teas",
          },
          {
            id: 17,
            name: "Mint Herbal Tea",
            description:
              "Cool, refreshing, and invigorating, our Mint Herbal Tea is a naturally caffeine-free infusion made from the finest handpicked mint leaves. With its crisp aroma and soothing properties, this tea is perfect for refreshing your senses while promoting digestion and relaxation. Enjoy it hot for a comforting experience or iced for a revitalizing treat.",
            image: "/images/minttea.png",
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
            category: "Herbs & Teas",
          },
          {
            id: 18,
            name: "Moringa Herbal Infusion Tea",
            description:
              "Packed with nutrients and earthy goodness, our Moringa Herbal Tea is a powerhouse of wellness in every sip. Made from handpicked, sun-dried moringa leaves, this naturally caffeine-free tea is rich in antioxidants, vitamins, and minerals that support immunity, boost energy, and promote overall well-being. With its smooth, mildly grassy flavor and subtle nuttiness, Moringa tea is a perfect addition to a healthy lifestyle.",
            image: "/images/moringatea.png",
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
            category: "Herbs & Teas",
          },
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
            name: "Ceylon Cinnamon Tea",
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
            category: "Herbs & Teas",
          },
          {
            id: 30,
            name: "Plantation Seeds",
            description: "Request for any kind of agricultural seeds from below.",
            image: "/images/seeds.png",
            nutritionalFacts: [""],
            benefits: [""],
            price: "",
            weightOptions: [
              { weight: "Request", price: "" },
            ],
            noStock: false,
            category: "Herbs & Teas",
          },
          {
            id: 31,
            name: "Mari Gold",
            description: "Marigold petals are rich in antioxidants, which can help reduce inflammation and protect cells from free radical damage. They also contain compounds that can help stimulate collagen production in the skin, which can reduce the signs of aging.",
            image: "/images/marigold.png",
            nutritionalFacts: [""],
            benefits: ["A source of antioxidants, vitamins, and minerals"],
            price: "",
            weightOptions: [
              { weight: "Request", price: "" },
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
              { weight: "Request", price: "" },
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
              { weight: "Request", price: "" },
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
            noStock: false,
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
              { weight: "Request", price: "" },
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
              { weight: "Request", price: "" },
            ],
            noStock: false,
            category: "Microgreens",
          },
          {
            id: 40,
            name: "Impation",
            description:
              "Vibrant, shade-loving bloom known for its dazzling colors, soft petals, and long-lasting beauty. Popular in ornamental gardening, bouquets, and edible flower arrangements, Impatiens bring a cheerful burst of color to any setting.",
            image: "/images/impatient.png",
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
            category: "Edible Flowers",
          },
          {
            id: 41,
            name: "Zinnia",
            description:
              "Zinnia is a bright, cheerful flower known for its bold colors, daisy-like shape, and long-lasting blooms. Native to Central America and Mexico, Zinnias have become a favorite in gardens and floral arrangements worldwide due to their vibrant beauty, easy care, and symbolic meaning of joy and friendship.",
            image: "/images/zinnia.png",
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
            category: "Edible Flowers",
          },
          {
            id: 42,
            name: "Begonia",
            description:
              "Begonia is a stunning ornamental flower prized for both its gorgeous blooms and decorative foliage. With over 1,800 species and hybrids, Begonias are loved for their vibrant colors, unique petal forms, and ability to thrive in shady, humid conditions. They are a favorite in floral displays, potted arrangements, and garden borders",
            image: "/images/begonia.png",
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
            category: "Edible Flowers",
          },
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
              { weight: "Request", price: "" },
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
    ]);

    const cartRef = useRef<HTMLDivElement | null>(null);
    
    const prodRef = useRef<HTMLDivElement | null>(null);

    const handleScrollToCart = () => {
      cartRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleScrollToProduct = () => {
      prodRef.current?.scrollIntoView({ behavior: 'smooth' })
    };

    const addToCart = (product: { id?: number; name: any; description?: string; image?: string; nutritionalFacts?: string[]; benefits?: string[]; price?: string; weightOptions?: { weight: string; price: string; }[]; selectedPrice?: string | undefined; noStock?: boolean; }, option?: { weight: string; price: string }) => {
      const newItem = {
        name: product.name,
        selectedWeight: option?.weight ?? "Custom Mix",
        selectedPrice: option?.price ?? "Requested",
      };
    
      setCart([...cart, newItem]);
    };    

    const removeFromCart = (index: number) => {
      setCart(cart.filter((_, i) => i !== index));
    };

    const getTotalPrice = () => {
      return cart.reduce((total, item) => {
        // Remove "Rs.", spaces, and commas before converting
        const cleanPrice = item.selectedPrice
          .replace("Rs.", "")
          .replace(",", "")
          .replace(/\s/g, "")
          .trim();
        const numericPrice = parseFloat(cleanPrice) || 0;
        return total + numericPrice;
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

    
    const generateAndDownloadPDF = () => {
      const doc = new jsPDF();
    
      // === HEADER ===
      // doc.addImage(logoBase64, "PNG", 14, 10, 28, 28);
      doc.addImage(logo, "PNG", 14, 10, 28, 28); // ✅ Logo added
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.text("Ceyplanta", 50, 18);
    
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text("No 235, Galle Rd, Thalpitiya South, Wadduwa", 50, 24);
      doc.text("+94 70 234 2433 | ceyplanta@gmail.com | www.ceyplanta.com", 50, 30);
    
      // Divider
      doc.line(14, 42, 196, 42);
    
      // === TITLE ===
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.text("Order Invoice", 14, 50);
    
      // === DATE & ORDER INFO ===
      const today = new Date().toLocaleDateString();
      const orderNo = `CEYD-${Math.floor(Math.random() * 90000) + 10000}`;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      doc.text(`Date: ${today}`, 14, 60);
      doc.text(`Order No: ${orderNo}`, 100, 60);
    
      // === CUSTOMER INFO ===
      doc.text(`Name: ${name}`, 14, 70);
      doc.text(`Email: ${email}`, 14, 76);
      doc.text(`Phone: ${phone}`, 14, 82);
      doc.text(`Message: ${message || "N/A"}`, 14, 88);
    
      // === ORDER ITEMS ===
      doc.setFont("helvetica", "bold");
      doc.text("Order Items:", 14, 100);
      doc.setFont("helvetica", "normal");
      let y = 108;
      cart.forEach((item, index) => {
        doc.text(`${index + 1}. ${item.name} (${item.selectedWeight}) – Rs. ${item.selectedPrice}`, 14, y);
        y += 8;
      });
    
      // === DELIVERY DETAILS ===
      y += 6;
      doc.setFont("helvetica", "bold");
      doc.text("Delivery Details:", 14, y);
      doc.setFont("helvetica", "normal");
      y += 8;
      doc.text(`Address – ${message || "N/A"} Delivery charges may change according to distance`, 14, y);
    
      // === TOTAL SECTION ===
      y += 12;
      doc.setFont("helvetica", "bold");
      doc.text("Total Rates:", 14, y);
      y += 8;
      doc.setFont("helvetica", "normal");
      doc.text(`Gross Total – Rs. ${getTotalPrice()}`, 14, y);
      y += 6;
      doc.text(`Discount – ${discount}%`, 14, y);
      y += 6;
      const netTotal = getTotalPrice() - (getTotalPrice() * discount) / 100;
      doc.text(`Net Total – Rs. ${netTotal.toFixed(2)} + Delivery Charges `, 14, y);
    
      // === BANK DETAILS ===
      y += 14;
      doc.setFont("helvetica", "bold");
      doc.text("Bank Details", 14, y);
      doc.setFont("helvetica", "normal");
      y += 8;
      doc.text("Account Name - Ceyplanta", 14, y);
      y += 6;
      doc.text("Account Number - 200170091420", 14, y);
      y += 6;
      doc.text("Bank - Nations Trust Bank", 14, y);
    
      // === THANK YOU MESSAGE ===
      y += 14;
      doc.setFont("helvetica", "italic");
      doc.text(
        "Thank you for your order! We look forward to supplying you with premium organic microgreens & edible flowers grown with care at Ceyplanta.",
        14,
        y,
        { maxWidth: 180 }
      );
    
      // === TERMS & CONDITIONS ===
      y += 14;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(7);
      doc.text("Terms & Conditions", 14, y);
      doc.setFont("helvetica", "normal");
      y += 8;
      const terms = [
        "This quotation is valid for 15 days from the date of issue. Prices and availability are subject to change after this period.",
        "Bulk Orders: Minimum 400g per microgreen variety or 100 pcs flower.",
        "No cancellation or refund after confirmation invoice.",
        "Payment Terms: 50% advance, balance upon delivery (orders > 2kg) or 100% advance (orders < 2kg).",
        "Orders must be collected on the confirmed delivery date. Freshness not guaranteed after 2 days.",
      ];
      terms.forEach((t) => {
        doc.text(`- ${t}`, 14, y);
        y += 6;
      });
    
      // === FOOTER ===
      doc.setFont("helvetica", "italic");
      doc.setFontSize(10);
      doc.text("This is a system-generated invoice.", 14, 285);
    
      // SAVE PDF
      doc.save("invoice.pdf");
    };

    const handleCheckout = (e: React.FormEvent) => {
      e.preventDefault(); // ✅ Prevent page reload
        // Check if all required fields are filled
        if (!name || !email || !phone ) {
            alert('Please fill out all the required fields!');
            return;
        }

        if (!validatePhoneNumber(phone.trim())) {
          alert('Please enter a valid Sri Lankan mobile number (e.g., 0771234567)');
          return;
        }
    
        if (cart.length === 0) {
          alert('Your cart is empty. Please add some products before checkout.');
          return;
        }

        // Construct the cart items list
        const cartItems = cart.map(item => `${item.name} - ${item.selectedWeight} - Rs. ${item.selectedPrice}`).join('\n');

        // Create the email content
        const checkoutMessage = `
            Name: ${name}
            Email: ${email}
            Phone: ${phone}
            Message: ${message}
            
            Cart:
            ${cartItems}
        `;
        // 🔽 Generate and download PDF after order success
        generateAndDownloadPDF();
        // Send email using EmailJS
        sendEmailToAdmin(checkoutMessage);
    };

    const sendEmailToAdmin = (messageContent: any) => {
        // EmailJS service and template IDs
        const serviceID = 'service_18vf6wc'; // Replace with your service ID
        const templateID = 'template_xcb8ynu'; // Replace with your template ID
        console.log('Sending email with:', { name, email, phone, messageContent });  
        // Send email using EmailJS
        emailjs.send(serviceID, templateID, {
          name,
          email,
          phone,
          time: new Date().toLocaleString(), // adds the local time automatically
          cartItems: messageContent, // your formatted cart items
          message: message || "No additional message provided.",
        })
        .then(() => {
          
          
          alert('Your order has been placed successful. You will be contact soon by our team, Thank You!');
            // Reset form and cart
            setName('');
            setEmail('');
            setPhone('');
            setMessage('');
            setCart([]);
        })
        .catch((error: any) => {
            console.error('Error placing order!:', error);
            alert('There was an error placing your order. Please try again later!');
        });
    };

    const clearCart = () => {
      setCart([]); // Assuming `setCart` is your state updater for the cart
    };

    const validatePhoneNumber = (number: any) => {
      // Sri Lankan mobile number starting with 07 followed by 8 digits
      const regex = /^(0)(7[01245678])[0-9]{7}$/;
      return regex.test(number);
    };

    const [searchTerm, setSearchTerm] = useState('');

    // ✅ Filter products by category
    const filteredProducts = products.filter((product) => {
      const matchCategory = selectedCategory === "All" || product.category === selectedCategory;
      const matchSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchCategory && matchSearch;
    });
    
    return (
        <div className="buy-greens-page">
          {/* Cart Icon */}
          <button className="cart-icon-btn" onClick={handleScrollToCart}>
            🛒
            {cart.length > 0 && <span className="cart-badge">{cart.length}</span>}
          </button>
            <h1>Buy Greens</h1>
            <br></br>

            {/* ✅ Category Buttons */}
            <div className="category-buttons">
              <button
                className={selectedCategory === "All" ? "active" : ""}
                onClick={() => setSelectedCategory("All")}
              >
                🌿 All
              </button>
              <button
                className={selectedCategory === "Microgreens" ? "active" : ""}
                onClick={() => setSelectedCategory("Microgreens")}
              >
                🌱 Microgreens
              </button>
              <button
                className={selectedCategory === "Salads" ? "active" : ""}
                onClick={() => setSelectedCategory("Salads")}
              >
                🥗 Salads
              </button>
              <button
                className={selectedCategory === "Herbs & Teas" ? "active" : ""}
                onClick={() => setSelectedCategory("Herbs & Teas")}
              >
                🍃 Herbs & Teas
              </button>
              <button
                className={selectedCategory === "Edible Flowers" ? "active" : ""}
                onClick={() => setSelectedCategory("Edible Flowers")}
              >
                🌸 Edible Flowers
              </button>
            </div>

            <br />

            <div className="search-container">
              {/* <span className="search-icon">🔍</span> */}
              <input
                type="text"
                placeholder="Search for your greens..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-bar"
              />
            </div>
            <br></br>
            {/* ✅ Filtered Products */}
            <div ref={prodRef} className="product-grid">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <div key={product.id} className="product-card">
                    <img src={product.image} alt={product.name} className="product-image" />
                    <h2>{product.name}</h2>
                    <p>{product.description}</p>
                    <p><strong>Add to Cart</strong></p>

                    {product.noStock ? (
                      <button className="no-stock-btn" disabled>Coming Soon</button>
                    ) : (
                      <div className="button-group">
                        {product.weightOptions.map((option) => (
                          <button
                            key={option.weight}
                            onClick={() => addToCart(product, option)}
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

            <br></br>
            <br></br>
            {/* Subscription Packages */}
            <div className="subscription-packages" >
              <h2>Subscription Packages</h2>
              <div className="package">
                <h3>Weekly Package</h3>
                <p>Enjoy our services for one week. Delivered once a week. Pay Weekly!</p>
                <p><strong>Request on Additional details</strong></p>
                {/* <button className="request-button">Request</button> */}
              </div>
              <div className="package2">
                <h3>Monthly Package</h3>
                <p>Enjoy our services for one month. Delivered weekly for a month. Pay Monthly. Get your customized quotation!</p>
                <p><strong>Request on Additional details</strong></p>
                {/* <button className="request-button">Request</button> */}
              </div>
            </div>
    
            <br />
            <div ref={cartRef} className="cart">
            <h2>Your Cart</h2>
            {cart.length > 0 ? (
              <div>
                <ul className="cart-list">
                  {cart.map((item, index) => (
                    <li key={index} className="cart-item">
                      <span className="cart-name">{item.name}</span>
                      <span className="cart-weight">{item.selectedWeight}</span>
                      <span className="cart-price">{item.selectedPrice}</span>
                      <span 
                        className="cart-remove" 
                        onClick={() => removeFromCart(index)}
                      >
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
                <h3>
                  Total: Rs. {(getTotalPrice() - (getTotalPrice() * discount) / 100).toLocaleString()}
                </h3>
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

    
            <br></br>
            <form className="checkout-form" onSubmit={handleCheckout} noValidate>
                <h2>Checkout & Submit</h2>
                <input
                    type="text"
                    value={name}
                    placeholder="Your Name"
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="email"
                    value={email}
                    placeholder="Your Email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
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