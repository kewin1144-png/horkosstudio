import re
with open('about.html', 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace('href="https://www.edwinpaleti.netlify.app"', 'href="https://edwinpaleti.netlify.app/"')

with open('about.html', 'w', encoding='utf-8') as f:
    f.write(text)
