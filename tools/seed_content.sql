-- Seed Blog Posts
INSERT INTO blog_posts (title, slug, excerpt, content, published, meta_title, meta_description, author_id)
VALUES 
(
  'Why Your Dental Practice Needs a Google Business Profile',
  'dental-google-business-profile',
  'Learn why a well-optimized Google Business Profile is the #1 source of high-quality local patients for dental clinics.',
  '<p>For dental practices, appearing at the top of Google Maps is no longer optional—it is essential for survival.</p><h2>The Power of Local SEO</h2><p>When someone experiences a toothache, they don’t scroll Instagram. They go to Google and search "dentist near me." If your Google Business Profile (GBP) is not optimized, you are losing thousands of dollars in potential revenue to competitors.</p><h3>How to Optimize Your GBP</h3><ul><li>Ensure your Name, Address, and Phone Number (NAP) are exactly the same everywhere online.</li><li>Regularly ask satisfied patients for Google Reviews.</li><li>Post weekly updates, offers, and photos of your clinic.</li></ul>',
  true,
  'Dental Google Business Profile Optimization | Lunexo Media',
  'Learn how to optimize your dental clinic’s Google Business Profile to rank higher on Maps and get more high-paying patients.',
  (SELECT id FROM admin_users LIMIT 1)
),
(
  'AI Chatbot vs. Live Chat for Med Spas: Which is Better?',
  'ai-chatbot-vs-live-chat-med-spa',
  'We compare AI chatbots with traditional live chat to see which drives more bookings and saves more time for Med Spas.',
  '<p>Customer support in the aesthetic industry requires speed and accuracy. Let’s compare AI chatbots with human live chat.</p><h2>Live Chat</h2><p>Pros: Human touch, empathetic.<br>Cons: Expensive, unavailable 24/7, slow response times during off-hours.</p><h2>AI Chatbots</h2><p>Pros: Instant responses, available 24/7, can book appointments automatically, zero ongoing salary cost.<br>Cons: Less empathetic if not configured properly.</p><h3>The Verdict</h3><p>For Med Spas, an AI chatbot that can instantly answer pricing questions and book appointments is the clear winner for ROI.</p>',
  true,
  'AI Chatbot vs Live Chat for Med Spas | Lunexo Media',
  'Discover why AI chatbots are replacing traditional live chat for Med Spas, increasing bookings and saving staff time.',
  (SELECT id FROM admin_users LIMIT 1)
),
(
  'Local SEO Tips for Plumbers & Home Services in 2024',
  'local-seo-tips-plumbers',
  'Discover the top local SEO strategies for plumbing and home service businesses to dominate their local service area.',
  '<p>Home service businesses rely heavily on local search. Here’s how to win in 2024.</p><h2>1. Service Area Pages</h2><p>Create a dedicated page for every city you serve. Do not just list them; write unique content about your services in that specific area.</p><h2>2. Local Schema Markup</h2><p>Use LocalBusiness Schema to tell Google exactly what you do, where you are located, and your operating hours.</p><h2>3. Fast Mobile Website</h2><p>When someone has a burst pipe, they are searching on their phone. If your website takes 5 seconds to load, they will click the next plumber. Optimize for speed.</p>',
  true,
  'Local SEO for Plumbers & Home Services | Lunexo Media',
  'Top Local SEO tips and strategies for plumbing and home service companies to generate more leads from Google.',
  (SELECT id FROM admin_users LIMIT 1)
);

-- Seed Case Studies (Portfolio)
INSERT INTO portfolio (title, slug, category, description, client_name, results, published, blocked)
VALUES 
(
  'Phone Fix & More: 300% Increase in Local Foot Traffic',
  'phone-fix-local-seo',
  'Local SEO',
  'Phone Fix & More was struggling to compete with larger repair shops. We completely overhauled their Google Business Profile, built local citations, and optimized their website for "phone repair near me".',
  'Phone Fix & More',
  '{"traffic_increase": "300%", "roi": "450%", "timeline": "3 Months"}',
  true,
  false
),
(
  'IKNOOR Grocers: E-commerce Website Redesign',
  'iknoor-grocers-ecommerce',
  'Web Design',
  'IKNOOR Grocers needed a modern, fast-loading e-commerce platform that was easy to manage. We designed a custom Shopify storefront that drastically improved user experience on mobile devices.',
  'IKNOOR Grocers',
  '{"conversion_rate": "+45%", "speed_improvement": "60%", "sales_increase": "$12k/mo"}',
  true,
  false
),
(
  'Premium Med Spa: AI Appointment Booking Bot',
  'med-spa-ai-bot',
  'AI Automation',
  'A high-end Med Spa was losing leads after hours. We integrated a custom AI Chatbot that answers FAQ about treatments and directly books patients into their calendar 24/7.',
  'Premium Med Spa',
  '{"time_saved": "20 hrs/week", "after_hours_bookings": "+35%", "response_time": "Instant"}',
  true,
  false
);
