import re

with open('prompts.html', 'r', encoding='utf-8') as f:
    text = f.read()

# I will recreate the cards_html but with an image at the top of each card.
prompts_data = [
    ("Cinematic Web Layout", "Design a cinematic, dark-mode web layout for a luxury creative agency using deep charcoal backgrounds and neon blue accents.", "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80"),
    ("Minimalist Logo", "Create a minimalist logo for a tech startup using geometric shapes and a monochromatic palette.", "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=600&q=80"),
    ("3D Motion Graphic", "Render a 3D glassmorphic abstract shape rotating slowly with a colorful gradient lighting setup.", "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=600&q=80"),
    ("Responsive UI Kit", "Design a responsive UI kit with modern cards, soft shadows, and clean sans-serif typography.", "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=600&q=80"),
    ("Product Showcase", "A high-end product landing page layout featuring a 3D rendered bottle with floating ingredients.", "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80"),
    ("Cyberpunk Aesthetic", "Create a cyberpunk themed dashboard UI with glowing neon pink and cyan metrics.", "https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=600&q=80"),
    ("Editorial Look", "Design an editorial style fashion blog layout featuring overlapping images and elegant serif typography.", "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=600&q=80"),
    ("Web3 Dashboard", "A Web3 crypto wallet dashboard with dark glassmorphism effects and colorful gradient charts.", "https://images.unsplash.com/photo-1614624532983-4ce03382d63d?auto=format&fit=crop&w=600&q=80"),
    ("Branding Strategy", "Develop a brand identity for an organic coffee shop focusing on earth tones and organic shapes.", "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=600&q=80"),
    ("Futuristic UI", "Design a futuristic HUD interface with complex data visualizations and holographic blue elements.", "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80"),
    ("Abstract Art", "Generate an abstract fluid art background with swirling blue and white gradients.", "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=600&q=80"),
    ("E-commerce Grid", "Create a clean, minimalist e-commerce product grid for a high-end fashion brand.", "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=600&q=80"),
    ("Typography Poster", "Design a typography-heavy poster using bold, sans-serif fonts in a Swiss design style.", "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=600&q=80"),
    ("Dark Mode App", "Design a sleek dark mode mobile app interface for a premium fitness tracker.", "https://images.unsplash.com/photo-1526406915894-7bcd65f60845?auto=format&fit=crop&w=600&q=80"),
    ("Vaporwave Visual", "Generate a vaporwave style visual with neon grids, classical statues, and retro sunset elements.", "https://images.unsplash.com/photo-1618172193763-c511deb635ca?auto=format&fit=crop&w=600&q=80"),
    ("Organic Skincare", "Create a packaging design for an organic skincare brand using pastel colors and minimalist typography.", "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=600&q=80"),
    ("Neon Signage", "Design a custom neon sign concept for a modern arcade bar in vibrant pink and purple.", "https://images.unsplash.com/photo-1563298723-dcfebaa392e3?auto=format&fit=crop&w=600&q=80"),
    ("Glassmorphism UI", "A banking app interface utilizing heavy glassmorphism, bright colorful spheres, and clean white text.", "https://images.unsplash.com/photo-1579621970795-87facc2f976d?auto=format&fit=crop&w=600&q=80"),
    ("Architectural Web", "A website layout for an architecture firm focusing on large high-contrast photography and generous white space.", "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80"),
    ("Metaverse Experience", "Design a landing page for a metaverse virtual reality experience featuring 3D immersive backgrounds.", "https://images.unsplash.com/photo-1614729939124-03290b56c9ce?auto=format&fit=crop&w=600&q=80")
]

cards_html = ""
for i, (title, desc, img) in enumerate(prompts_data, 1):
    cards_html += f"""
          <div class="break-inside-avoid relative overflow-hidden rounded-2xl bg-brandWhite border border-brandBlack/5 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col mb-6">
            <div class="w-full relative overflow-hidden">
              <img src="{img}" alt="{title}" class="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105">
            </div>
            <div class="p-6 flex flex-col gap-4">
              <h4 class="font-outfit text-base font-bold uppercase text-brandBlack">{i:02d} // {title.upper()}</h4>
              <p class="font-outfit text-xs font-light text-brandBlack/60 leading-relaxed">{desc}</p>
              <div class="mt-2">
                <code class="hidden" id="prompt-{i}-text">{desc}</code>
                <button onclick="copyToClipboard('prompt-{i}-text', this)" class="w-full flex items-center justify-center gap-2 bg-brandBlack/5 text-brandBlack font-space text-[10px] uppercase font-bold tracking-widest py-3 rounded-xl hover:bg-brandBlack hover:text-brandWhite transition-colors active:scale-95 duration-200">
                  <i class="fa-regular fa-copy"></i> Copy Prompt
                </button>
              </div>
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
  <footer class="bg-brandBlack border-t border-white/10 py-8 px-6 md:px-[5vw] relative z-10 text-white/55 font-outfit">"""

# Replace in file
text = re.sub(r'<div class="mb-16 border-b border-brandBlack/5 pb-8">.*?<footer class="bg-brandBlack border-t border-white/10 py-8 px-6 md:px-\[5vw\] relative z-10 text-white/55 font-outfit">', new_prompts_html, text, flags=re.DOTALL)

with open('prompts.html', 'w', encoding='utf-8') as f:
    f.write(text)
