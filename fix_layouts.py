import re

# --- 1. Fix design.html ---
with open('design.html', 'r', encoding='utf-8') as f:
    design_html = f.read()

new_design_layout = """
        <!-- Horizontal List Layout -->
        <div class="flex flex-col gap-12">
          
          <div class="youtube-showcase-card flex flex-col md:flex-row items-center gap-8 relative overflow-hidden rounded-2xl bg-brandWhite border border-brandBlack/5 shadow-sm hover:shadow-xl transition-all duration-300 group" data-tilt>
            <div class="w-full md:w-1/2 relative h-64 md:h-80">
              <img src="https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=80" alt="Logo Design" class="w-full h-full object-cover rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none hover:scale-105 transition-transform duration-700">
            </div>
            <div class="p-8 w-full md:w-1/2 flex flex-col gap-4 text-left bg-brandWhite relative z-10">
              <h4 class="font-outfit text-2xl font-bold uppercase text-brandBlack">02 // LOGO DESIGN</h4>
              <p class="font-outfit text-sm font-light text-brandBlack/60 leading-relaxed">Precision vector marks and responsive brand architectures for modern identity systems.</p>
            </div>
          </div>

          <div class="youtube-showcase-card flex flex-col md:flex-row items-center gap-8 relative overflow-hidden rounded-2xl bg-brandWhite border border-brandBlack/5 shadow-sm hover:shadow-xl transition-all duration-300 group" data-tilt>
            <div class="w-full md:w-1/2 relative h-64 md:h-80">
              <img src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1000&q=80" alt="Poster Making" class="w-full h-full object-cover rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none hover:scale-105 transition-transform duration-700">
            </div>
            <div class="p-8 w-full md:w-1/2 flex flex-col gap-4 text-left bg-brandWhite relative z-10">
              <h4 class="font-outfit text-2xl font-bold uppercase text-brandBlack">03 // POSTER MAKING</h4>
              <p class="font-outfit text-sm font-light text-brandBlack/60 leading-relaxed">High-contrast layout engineering combining geographical weights with clean spacing structures.</p>
            </div>
          </div>
          
          <div class="youtube-showcase-card flex flex-col md:flex-row items-center gap-8 relative overflow-hidden rounded-2xl bg-brandWhite border border-brandBlack/5 shadow-sm hover:shadow-xl transition-all duration-300 group" data-tilt>
            <div class="w-full md:w-1/2 relative h-64 md:h-80">
              <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80" alt="AI Image Editings" class="w-full h-full object-cover rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none hover:scale-105 transition-transform duration-700">
            </div>
            <div class="p-8 w-full md:w-1/2 flex flex-col gap-4 text-left bg-brandWhite relative z-10">
              <h4 class="font-outfit text-2xl font-bold uppercase text-brandBlack">04 // AI IMAGE EDITINGS</h4>
              <p class="font-outfit text-sm font-light text-brandBlack/60 leading-relaxed">Generative conceptual workflows, color grading algorithms, and upscale refinement processing.</p>
            </div>
          </div>

        </div>
"""

design_html = re.sub(r'<div class="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">.*?</div>\s*</div>\s*</section>\s*</main>', new_design_layout + '\n      </div>\n    </section>\n  </main>', design_html, flags=re.DOTALL)

with open('design.html', 'w', encoding='utf-8') as f:
    f.write(design_html)

# --- 2. Fix prompts.html ---
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

new_prompts_html = f"""
      <div class="mb-16 border-b border-brandBlack/5 pb-8">
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
{cards_html}
      </div>

    </section>
  </main>

  <!-- 7. FOOTER SECTION -->
  <footer class="bg-brandBlack border-t border-white/10 py-8 px-6 md:px-[5vw] relative z-10 text-white/55 font-outfit">
"""

with open('prompts.html', 'r', encoding='utf-8') as f:
    prompts_text = f.read()

prompts_text = re.sub(r'<div class="mb-16 border-b border-brandBlack/5 pb-8">.*?<footer class="bg-brandBlack border-t border-white/10 py-8 px-6 md:px-\[5vw\] relative z-10 text-white/55 font-outfit">', new_prompts_html, prompts_text, flags=re.DOTALL)

with open('prompts.html', 'w', encoding='utf-8') as f:
    f.write(prompts_text)
