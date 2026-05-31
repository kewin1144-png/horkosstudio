import re

with open('prompts.html', 'r', encoding='utf-8') as f:
    text = f.read()

prompts_data = [
    ("Cinematic Web Layout", "Design a cinematic, dark-mode web layout for a luxury creative agency using deep charcoal backgrounds and neon blue accents."),
    ("Minimalist Logo", "Create a minimalist logo for a tech startup using geometric shapes and a monochromatic palette."),
    ("3D Motion Graphic", "Render a 3D glassmorphic abstract shape rotating slowly with a colorful gradient lighting setup."),
    ("Responsive UI Kit", "Design a responsive UI kit with modern cards, soft shadows, and clean sans-serif typography."),
    ("Product Showcase", "A high-end product landing page layout featuring a 3D rendered bottle with floating ingredients."),
    ("Cyberpunk Aesthetic", "Create a cyberpunk themed dashboard UI with glowing neon pink and cyan metrics."),
    ("Editorial Look", "Design an editorial style fashion blog layout featuring overlapping images and elegant serif typography."),
    ("Web3 Dashboard", "A Web3 crypto wallet dashboard with dark glassmorphism effects and colorful gradient charts."),
    ("Branding Strategy", "Develop a brand identity for an organic coffee shop focusing on earth tones and organic shapes."),
    ("Futuristic UI", "Design a futuristic HUD interface with complex data visualizations and holographic blue elements."),
    ("Abstract Art", "Generate an abstract fluid art background with swirling blue and white gradients."),
    ("E-commerce Grid", "Create a clean, minimalist e-commerce product grid for a high-end fashion brand."),
    ("Typography Poster", "Design a typography-heavy poster using bold, sans-serif fonts in a Swiss design style."),
    ("Dark Mode App", "Design a sleek dark mode mobile app interface for a premium fitness tracker."),
    ("Vaporwave Visual", "Generate a vaporwave style visual with neon grids, classical statues, and retro sunset elements."),
    ("Organic Skincare", "Create a packaging design for an organic skincare brand using pastel colors and minimalist typography."),
    ("Neon Signage", "Design a custom neon sign concept for a modern arcade bar in vibrant pink and purple."),
    ("Glassmorphism UI", "A banking app interface utilizing heavy glassmorphism, bright colorful spheres, and clean white text."),
    ("Architectural Web", "A website layout for an architecture firm focusing on large high-contrast photography and generous white space."),
    ("Metaverse Experience", "Design a landing page for a metaverse virtual reality experience featuring 3D immersive backgrounds.")
]

cards_html = ""
for i, (title, desc) in enumerate(prompts_data, 1):
    cards_html += f"""
          <div class="break-inside-avoid relative overflow-hidden rounded-2xl bg-brandWhite border border-brandBlack/5 shadow-sm hover:shadow-xl transition-all duration-300 group p-6 flex flex-col gap-4 mb-6">
            <h4 class="font-outfit text-base font-bold uppercase text-brandBlack">{i:02d} // {title.upper()}</h4>
            <p class="font-outfit text-xs font-light text-brandBlack/60 leading-relaxed">{desc}</p>
            <div class="mt-2">
              <code class="hidden" id="prompt-{i}-text">{desc}</code>
              <button onclick="copyToClipboard('prompt-{i}-text', this)" class="w-full flex items-center justify-center gap-2 bg-brandBlack/5 text-brandBlack font-space text-[10px] uppercase font-bold tracking-widest py-3 rounded-xl hover:bg-brandBlack hover:text-brandWhite transition-colors active:scale-95 duration-200">
                <i class="fa-regular fa-copy"></i> Copy Prompt
              </button>
            </div>
          </div>
"""

new_prompts_html = f"""      <div class="mb-16 border-b border-brandBlack/5 pb-8">
        <span class="font-space text-xs md:text-[0.9vw] text-brandBlue uppercase tracking-[0.2em] font-bold flex items-center gap-2 mb-2">
          <span class="w-1.5 h-1.5 rounded-full bg-brandBlue"></span> Prompt Archive
        </span>
        <h1 class="font-outfit text-3xl sm:text-5xl md:text-[4vw] font-black uppercase tracking-widest leading-none mb-4">
          PROMPT ENGINEERING
        </h1>
        <p class="font-outfit text-sm md:text-base font-light text-brandBlack/60 leading-relaxed max-w-2xl">
          Explore a curated list of AI prompts to generate high-end visuals and creative inspiration.
        </p>
      </div>

      <!-- Pinterest Style Masonry Grid for 20 Prompts -->
      <div class="columns-1 sm:columns-2 lg:columns-3 gap-6">
{cards_html}      </div>

    </section>
  </main>

  <!-- 7. FOOTER SECTION -->
  <footer class="bg-brandBlack border-t border-white/10 py-8 px-6 md:px-[5vw] relative z-10 text-white/55 font-outfit">
    <div class="max-w-7xl mx-auto w-full flex flex-col md:flex-row justify-between items-center gap-6">
      
      <!-- Left side: Horkos Logo + Copyright -->
      <div class="flex flex-col md:flex-row items-center gap-4 text-center md:text-left select-none">
        <div class="flex items-center gap-2">
          <img src="images/footer logo icon.svg" alt="Horkos Favicon" class="h-6 w-auto object-contain animate-[spin_3s_linear_infinite]">
          <img src="images/logo-name.svg" alt="Horkos Studio" class="h-6 w-auto object-contain brightness-0 invert">
        </div>
        <span class="font-space text-[10px] uppercase tracking-widest text-white/40">© 2026 Horkos Studio. All rights reserved.</span>
      </div>

      <!-- Center-Right: Navigation & Social compact links -->
      <div class="flex flex-wrap items-center justify-center gap-6 font-space text-[10px] uppercase font-bold tracking-widest text-white/50">
        <a href="index.html" class="hover:text-brandBlue transition-colors">Home</a>
        <a href="services.html" class="hover:text-brandBlue transition-colors">Services</a>
        <a href="work.html" class="hover:text-brandBlue transition-colors">Work</a>
        <a href="about.html" class="hover:text-brandBlue transition-colors">About</a>
        <a href="learning.html" class="hover:text-brandBlue transition-colors">Learning</a>
        <span class="text-white/20 hidden sm:inline">|</span>
        <a href="#" class="hover:text-brandBlue transition-colors">Instagram</a>
        <a href="#" class="hover:text-brandBlue transition-colors">Behance</a>
        <span class="text-white/20 hidden sm:inline">|</span>
        <a href="#" class="font-semibold text-brandWhite hover:text-brandBlue transition-colors">Return to Top <i class="fa-solid fa-arrow-up ml-0.5 text-[8px]"></i></a>
      </div>

    </div>
  </footer>"""

# The regex replaces from <div class="mb-16 border-b border-brandBlack/5 pb-8"> all the way to </footer> inclusive
text = re.sub(r'<div class="mb-16 border-b border-brandBlack/5 pb-8">.*?</footer>', new_prompts_html, text, flags=re.DOTALL)

with open('prompts.html', 'w', encoding='utf-8') as f:
    f.write(text)
