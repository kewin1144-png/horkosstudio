import re

with open('index.html', 'r', encoding='utf-8') as f:
    text = f.read()

old_btn = r'<div class=\"fixed bottom-6 right-6 md:bottom-8 md:right-8 z-\[100\] pointer-events-none\">\s*<a href=\"#contact\" class=\"pointer-events-auto liquid-glass-btn group flex h-12 items-center gap-3 rounded-full px-6 backdrop-blur-xl transition-all duration-350 hover:scale-\[1.05\]\">\s*Start Project\s*<i class=\"fa-solid fa-arrow-right text-xs group-hover:translate-x-1 transition-transform duration-300\"><\/i>\s*<\/a>\s*<\/div>'

new_btn = """<div id="floating-start-btn" class="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[100] pointer-events-none transition-all duration-500 ease-in-out translate-y-0 opacity-100">
  <a href="#contact" class="pointer-events-auto liquid-glass-btn group flex h-10 items-center gap-2 rounded-full px-5 backdrop-blur-xl transition-all duration-350 hover:scale-[1.05] text-sm">
    Start Project
    <i class="fa-solid fa-arrow-right text-[10px] group-hover:translate-x-1 transition-transform duration-300"></i>
  </a>
</div>"""

text = re.sub(old_btn, new_btn, text)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(text)

with open('script.js', 'a', encoding='utf-8') as f:
    f.write("\n\n// Floating Button Footer Collision Logic\n")
    f.write("document.addEventListener('DOMContentLoaded', () => {\n")
    f.write("  const floatingBtn = document.getElementById('floating-start-btn');\n")
    f.write("  const footer = document.querySelector('footer');\n")
    f.write("  if (floatingBtn && footer) {\n")
    f.write("    const observer = new IntersectionObserver((entries) => {\n")
    f.write("      entries.forEach(entry => {\n")
    f.write("        if (entry.isIntersecting) {\n")
    f.write("          floatingBtn.classList.add('translate-y-24', 'opacity-0');\n")
    f.write("          floatingBtn.firstElementChild.classList.remove('pointer-events-auto');\n")
    f.write("          floatingBtn.firstElementChild.classList.add('pointer-events-none');\n")
    f.write("        } else {\n")
    f.write("          floatingBtn.classList.remove('translate-y-24', 'opacity-0');\n")
    f.write("          floatingBtn.firstElementChild.classList.remove('pointer-events-none');\n")
    f.write("          floatingBtn.firstElementChild.classList.add('pointer-events-auto');\n")
    f.write("        }\n")
    f.write("      });\n")
    f.write("    }, {\n")
    f.write("      root: null,\n")
    f.write("      threshold: 0,\n")
    f.write("      rootMargin: '50px'\n")
    f.write("    });\n")
    f.write("    observer.observe(footer);\n")
    f.write("  }\n")
    f.write("});\n")
