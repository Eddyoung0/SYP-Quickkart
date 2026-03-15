import { useEffect, useState } from "react";
import { Heart, Star, ShoppingCart, Package, ArrowRight, Mail } from "lucide-react";

const Home = () => {
  const [likedProducts, setLikedProducts] = useState({});

  const categories = [
    {
      id: 1,
      name: "Beauty Picks",
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop",
    },
    {
      id: 2,
      name: "Computers & Accessories",
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop",
    },
    {
      id: 3,
      name: "Video Games",
      image: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=400&h=400&fit=crop",
    },
    {
      id: 4,
      name: "Toys & Games",
      image: "https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=400&h=400&fit=crop",
    },
  ];

  const quickLinks = [
    { label: "Recommendations for you", icon: "🎁" },
    { label: "Your Orders", icon: "📦" },
    { label: "Electronics\nBig Sale 20%", icon: "🔌" },
    { label: "Home & Kitchen\nBig Sale 30%", icon: "🏠" },
  ];

  const recentProducts = [
    {
      id: 1,
      name: "Puma AMS TIl BOOT VTG Black Men",
      price: "$150.99",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop",
      rating: 4.5,
      reviews: 205,
      tag: "Ships worldwide",
    },
    {
      id: 2,
      name: "Nike Air Max Light Red Sneakers",
      price: "$86.00",
      image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=300&h=300&fit=crop",
      rating: 4.3,
      reviews: 150,
      tag: "Ships worldwide",
    },
    {
      id: 3,
      name: "Adidas Fusion Storm Armor",
      price: "$79.97",
      image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=300&h=300&fit=crop",
      rating: 4.7,
      reviews: 89,
      tag: "Ships worldwide",
    },
    {
      id: 4,
      name: "Nike Charlitown Pure Running Shoes",
      price: "$68.99",
      image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=300&h=300&fit=crop",
      rating: 4.6,
      reviews: 432,
      tag: "Sale",
      saleTag: true,
    },
    {
      id: 5,
      name: "Adidas Alpha Bounce Running Shoe",
      price: "$59.94",
      originalPrice: "$82.71",
      image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=300&h=300&fit=crop",
      rating: 4.4,
      reviews: 167,
      tag: "Ships worldwide",
    },
  ];

  const topSellers = [
    {
      id: 6,
      name: "Lightning to USB Cable",
      price: "$15.99",
      image: "https://images.unsplash.com/photo-1621540489099-981a58a6b580?w=300&h=300&fit=crop",
      rating: 4.5,
      reviews: 1200,
      tag: "Free shipping",
    },
    {
      id: 7,
      name: "SpaceTech D-Series 24\" Smart TV",
      price: "$129.97",
      originalPrice: "$199.99",
      image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=300&h=300&fit=crop",
      rating: 4.6,
      reviews: 856,
      tag: "Ships worldwide",
    },
    {
      id: 8,
      name: "Instant Pot Duo 7-in-1 Electric Cooker",
      price: "$79.00",
      originalPrice: "$99.95",
      image: "https://images.unsplash.com/photo-1585515320310-259814833e62?w=300&h=300&fit=crop",
      rating: 4.8,
      reviews: 2341,
      tag: "Ships worldwide",
    },
    {
      id: 9,
      name: "Philips Electric Grooming Kit",
      price: "$24.99",
      originalPrice: "$39.95",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=300&fit=crop",
      rating: 4.3,
      reviews: 567,
      tag: "Ships worldwide",
    },
    {
      id: 10,
      name: "Goodwin Stackable Frying Pan 12\"",
      price: "$59.94",
      originalPrice: "$111.71",
      image: "https://images.unsplash.com/photo-1574269909862-7e3d7bc4e317?w=300&h=300&fit=crop",
      rating: 4.5,
      reviews: 334,
      tag: "Ships worldwide",
    },
  ];

  const mustHaveProducts = [
    {
      id: 11,
      name: "Xiaomi Mi Bluetooth Mouse Silent",
      price: "$20.99",
      image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=300&fit=crop",
      rating: 4.4,
      reviews: 120,
      tag: "Ships worldwide",
    },
    {
      id: 12,
      name: "Instant Pot Duo 7-In-1 Electric Cooker",
      price: "$400.60",
      image: "https://images.unsplash.com/photo-1585515320310-259814833e62?w=300&h=300&fit=crop",
      rating: 4.8,
      reviews: 890,
      tag: "Ships worldwide",
    },
    {
      id: 13,
      name: "Razer Man O'War 7.1 Headphone",
      price: "$45.45",
      originalPrice: "$63.90",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
      rating: 4.6,
      reviews: 445,
      tag: "Sale",
      saleTag: true,
    },
    {
      id: 14,
      name: "Bluetooth Earbuds Gt 10080",
      price: "$20.50",
      originalPrice: "$33.80",
      image: "https://images.unsplash.com/photo-1590658268037-6bf12f032f1f?w=300&h=300&fit=crop",
      rating: 4.2,
      reviews: 223,
      tag: "Ships worldwide",
    },
    {
      id: 15,
      name: "Wireless Headphones MaxPro True",
      price: "$67.00",
      originalPrice: "$120.00",
      image: "https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?w=300&h=300&fit=crop",
      rating: 4.7,
      reviews: 678,
      tag: "Ships worldwide",
    },
  ];

  const categoryStrip = [
    { name: "Vacuum cleaners", label: "Big Sale 25%" },
    { name: "Xbox & Consoles", label: "Big Sale 30%" },
    { name: "Portable speakers", label: "" },
    { name: "Projectors", label: "" },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleLike = (id) => {
    setLikedProducts((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const ProductCard = ({ product }) => (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group cursor-pointer border border-gray-100">
      <div className="relative overflow-hidden h-52 bg-gray-50 flex items-center justify-center p-4">
        <img
          src={product.image}
          alt={product.name}
          className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
        />
        {product.saleTag && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded">
            Sale
          </span>
        )}
        {product.tag && !product.saleTag && (
          <span className="absolute top-3 left-3 bg-gray-100 text-gray-600 text-xs px-2.5 py-1 rounded">
            {product.tag}
          </span>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleLike(product.id);
          }}
          className="absolute top-3 right-3 bg-white rounded-full p-1.5 shadow-sm hover:shadow transition-all opacity-0 group-hover:opacity-100"
        >
          <Heart
            size={16}
            className={likedProducts[product.id] ? "fill-red-500 text-red-500" : "text-gray-400"}
          />
        </button>
      </div>
      <div className="p-4">
        <h3 className="text-sm font-medium text-gray-800 line-clamp-2 mb-2 min-h-[2.5rem]">
          {product.name}
        </h3>
        <div className="flex items-center gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={12}
              className={
                i < Math.floor(product.rating)
                  ? "fill-amber-400 text-amber-400"
                  : "text-gray-200 fill-gray-200"
              }
            />
          ))}
          <span className="text-xs text-gray-400 ml-1">{product.reviews}</span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-bold text-gray-900">{product.price}</span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">{product.originalPrice}</span>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Hero Section */}
      <section className="pt-20 bg-[#faf8f5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="animate-slide-up">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                SHOP COMPUTERS
                <br />& ACCESSORIES
              </h1>
              <ul className="space-y-2 text-gray-600 mb-8 text-sm md:text-base">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full flex-shrink-0" />
                  Shop laptops, desktops, monitors, tablets, PC gaming
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full flex-shrink-0" />
                  Hard drives and storage, accessories and more
                </li>
              </ul>
              <button
                className="bg-gray-900 text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors"
                onClick={() => window.location.href = '/product'}
              >
                View more
              </button>
            </div>

            <div className="relative flex justify-center animate-fade-in">
              <div className="relative">
                <div className="absolute -top-2 right-4 lg:right-8 bg-amber-400 text-white font-bold text-lg w-16 h-16 rounded-full flex items-center justify-center z-10 shadow-lg">
                  50%
                </div>
                <img
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop"
                  alt="Featured headphones"
                  className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 object-contain drop-shadow-2xl"
                />
              </div>
              <div className="absolute bottom-4 right-4 bg-white rounded-xl shadow-lg p-4 w-52 hidden lg:block">
                <p className="text-xs text-gray-500 mb-1">JBL T450BT Black Headphones</p>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-lg font-bold text-gray-900">$125.00</span>
                  <span className="text-sm text-gray-400 line-through">$258.00</span>
                </div>
                <div className="flex gap-1">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 bg-gray-100 rounded" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links Row */}
      <section className="bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickLinks.map((link, i) => (
              <div
                key={i}
                className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 cursor-pointer hover:bg-gray-100 transition-colors"
              >
                <span className="text-2xl">{link.icon}</span>
                <span className="text-sm font-medium text-gray-700 whitespace-pre-line">
                  {link.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shop by Categories */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Discover</p>
              <h2 className="text-2xl font-bold text-gray-900">Shop by categories</h2>
            </div>
            <a
              href="/product"
              className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors flex items-center gap-1"
            >
              All Departments <ArrowRight size={14} />
            </a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((cat) => (
              <div key={cat.id} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-2xl bg-gray-100 h-48 md:h-56 mb-3">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <h3 className="text-sm font-medium text-gray-800 group-hover:text-amber-600 transition-colors text-center">
                  {cat.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promotional Banners */}
      <section className="py-4 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#f5f0e8] rounded-2xl p-6 md:p-8 flex items-center justify-between cursor-pointer hover:shadow-md transition-shadow">
              <div>
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-2">
                  Quickkart Basics
                </p>
                <h3 className="text-base md:text-lg font-bold text-gray-900 mb-1">
                  Shop Trendy Deals, Lightning Deals,
                </h3>
                <p className="text-sm text-gray-600 mb-4">and best low-price discounts.</p>
                <span className="text-sm font-medium text-amber-600 hover:text-amber-700 flex items-center gap-1 cursor-pointer">
                  See more <ArrowRight size={14} />
                </span>
              </div>
              <img
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=150&fit=crop"
                alt="Basics"
                className="w-28 h-20 md:w-32 md:h-24 object-cover rounded-xl hidden sm:block"
              />
            </div>
            <div className="bg-[#faf5ef] rounded-2xl p-6 md:p-8 flex items-center justify-between cursor-pointer hover:shadow-md transition-shadow">
              <div>
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-2">
                  Deals & Promotions
                </p>
                <h3 className="text-base md:text-lg font-bold text-gray-900 mb-1">
                  Best Deals Finder, Lightning Deals and
                </h3>
                <p className="text-sm text-gray-600 mb-4">limited-time discounts.</p>
                <span className="text-sm font-medium text-amber-600 hover:text-amber-700 flex items-center gap-1 cursor-pointer">
                  See more <ArrowRight size={14} />
                </span>
              </div>
              <img
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=200&h=150&fit=crop"
                alt="Deals"
                className="w-28 h-20 md:w-32 md:h-24 object-cover rounded-xl hidden sm:block"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Delivery Banner */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#faf8f5] rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-lg">
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Discover Quickkart</p>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                QUICKKART DELIVERS
                <br />TO YOU
              </h2>
              <p className="text-gray-500 mb-6 text-sm md:text-base">
                Worldwide shipping. We ship to over 100 countries and
                regions, right here on Quickkart.
              </p>
              <button className="border-2 border-gray-900 text-gray-900 px-6 py-2.5 rounded-full font-medium hover:bg-gray-900 hover:text-white transition-all text-sm">
                View more
              </button>
            </div>
            <div className="flex-shrink-0">
              <Package size={100} className="text-amber-400 md:w-[120px] md:h-[120px]" strokeWidth={1} />
            </div>
          </div>
        </div>
      </section>

      {/* Recently Viewed */}
      <section className="py-10 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Last viewed</p>
              <h2 className="text-2xl font-bold text-gray-900">Recently viewed</h2>
            </div>
            <a
              href="/product"
              className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors flex items-center gap-1"
            >
              More items <ArrowRight size={14} />
            </a>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
            {recentProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Top Sellers */}
      <section className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Discover</p>
              <h2 className="text-2xl font-bold text-gray-900">Quickkart Top Sellers</h2>
            </div>
            <a
              href="/product"
              className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors flex items-center gap-1"
            >
              More items <ArrowRight size={14} />
            </a>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
            {topSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Comfy Styles */}
      <section className="py-10 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex flex-col sm:flex-row h-full">
                <div className="sm:w-1/2 h-56 sm:h-auto">
                  <img
                    src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=500&fit=crop"
                    alt="Comfy styles for her"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="sm:w-1/2 p-6 md:p-8 flex flex-col justify-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Comfy styles for her</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Shop Quickkart Fashion including clothing, shoes, jewelry, watches, bags and more.
                  </p>
                  <span className="text-sm font-medium text-amber-600 hover:text-amber-700 flex items-center gap-1 cursor-pointer">
                    See more <ArrowRight size={14} />
                  </span>
                  <div className="mt-4 flex items-center gap-3">
                    <span className="text-xs bg-gray-100 rounded-full px-3 py-1 text-gray-600">Top Handbags</span>
                    <span className="text-xs text-gray-400">Big Sale 30%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex flex-col sm:flex-row h-full">
                <div className="sm:w-1/2 h-56 sm:h-auto">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop"
                    alt="Comfy styles for him"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="sm:w-1/2 p-6 md:p-8 flex flex-col justify-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Comfy styles for him</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Shop Quickkart Fashion including clothing, shoes, jewelry, watches, bags and more.
                  </p>
                  <span className="text-sm font-medium text-amber-600 hover:text-amber-700 flex items-center gap-1 cursor-pointer">
                    See more <ArrowRight size={14} />
                  </span>
                  <div className="mt-4 flex items-center gap-3">
                    <span className="text-xs bg-gray-100 rounded-full px-3 py-1 text-gray-600">Checkered shirt</span>
                    <span className="text-xs text-gray-400">Big Sale 30%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Must Have For You */}
      <section className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Discover</p>
              <h2 className="text-2xl font-bold text-gray-900">This must have for you 🔥</h2>
            </div>
            <a
              href="/product"
              className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors flex items-center gap-1"
            >
              View more <ArrowRight size={14} />
            </a>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
            {mustHaveProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Category Strip */}
      <section className="py-6 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12">
            {categoryStrip.map((cat, i) => (
              <div key={i} className="flex items-center gap-3 cursor-pointer group">
                <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center group-hover:shadow transition-shadow">
                  <ShoppingCart size={20} className="text-gray-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800 group-hover:text-amber-600 transition-colors">
                    {cat.name}
                  </p>
                  {cat.label && <p className="text-xs text-gray-400">{cat.label}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#faf8f5] rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-md">
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Discover Quickkart</p>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                SUBSCRIBE TO THE
                <br />NEWS
              </h2>
              <p className="text-gray-500 mb-6 text-sm md:text-base">
                Be aware of all discounts and bargains! Don't miss your benefit 🎉
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 px-5 py-3 rounded-full border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm"
                />
                <button className="bg-amber-400 hover:bg-amber-500 text-gray-900 font-semibold px-6 py-3 rounded-full transition-colors text-sm whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
            <div className="flex-shrink-0 hidden md:block">
              <Mail size={120} className="text-amber-400" strokeWidth={1} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;