import re

with open('about.html', 'r', encoding='utf-8') as f:
    text = f.read()

old_content = """          <div class="order-1 lg:order-2">
            <span class="font-space text-xs text-brandBlue uppercase tracking-[0.2em] font-bold block mb-3">FOUNDER'S NOTE</span>
            <h2 class="font-outfit text-3xl md:text-5xl font-black uppercase tracking-widest text-brandBlack mb-6">
              A RELENTLESS PURSUIT<br>OF PERFECTION
            </h2>
            <p class="font-outfit text-sm md:text-base font-light text-brandBlack/60 leading-relaxed mb-6">
              "When I started Horkos Studio, the goal was simple: to create digital experiences that refuse to be ignored. We don't just build websites; we engineer digital monuments. Every pixel, every animation, every interaction is a deliberate choice. We believe in aesthetics with purpose, and performance without compromise."
            </p>
          </div>"""

new_content = """          <div class="order-1 lg:order-2">
            <span class="font-space text-xs text-brandBlue uppercase tracking-[0.2em] font-bold block mb-3">FOUNDER'S NOTE</span>
            <h2 class="font-outfit text-3xl md:text-5xl font-black uppercase tracking-widest text-brandBlack mb-6">
              ABOUT THE FOUNDER
            </h2>
            <p class="font-outfit text-sm md:text-base font-light text-brandBlack/60 leading-relaxed mb-4">
              I'm <strong class="font-medium text-brandBlack">Edwin Paleti</strong>, Founder and Creative Director of Horkos Studio, a design studio dedicated to building impactful brands and meaningful visual experiences. With experience working alongside businesses across diverse industries, I have developed a strong understanding of different markets, audiences, and brand challenges.
            </p>
            <p class="font-outfit text-sm md:text-base font-light text-brandBlack/60 leading-relaxed mb-4">
              My expertise spans branding, logo design, packaging design, marketing creatives, and visual storytelling. Through Horkos Studio, I focus on creating clean, strategic, and memorable design solutions that help businesses communicate their values, build trust, and establish a strong presence in competitive markets.
            </p>
            <p class="font-outfit text-sm md:text-base font-light text-brandBlack/60 leading-relaxed mb-8">
              Driven by creativity, attention to detail, and a commitment to continuous growth, I lead every project with the goal of delivering purposeful designs that not only look exceptional but also create lasting value for brands.
            </p>
            
            <a href="https://www.edwinpaleti.netlify.app" target="_blank" class="inline-flex items-center gap-3 bg-brandBlue text-brandWhite px-6 py-3 rounded-full font-space text-xs uppercase font-bold tracking-widest hover:bg-brandBlack hover:scale-105 transition-all duration-300">
              View Portfolio <i class="fa-solid fa-arrow-right text-[10px]"></i>
            </a>
          </div>"""

text = text.replace(old_content, new_content)

with open('about.html', 'w', encoding='utf-8') as f:
    f.write(text)

print("Replacement done.")
