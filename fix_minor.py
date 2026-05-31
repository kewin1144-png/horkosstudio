import re

# 1. Fix about.html image extension
with open('about.html', 'r', encoding='utf-8') as f:
    about_text = f.read()

about_text = about_text.replace('edwin-paleti.jpeg', 'edwin-paleti.jpg')

with open('about.html', 'w', encoding='utf-8') as f:
    f.write(about_text)

# 2. Fix index.html form inputs
with open('index.html', 'r', encoding='utf-8') as f:
    index_text = f.read()

# Remove value="\"charishma\"" and value="\"chanrishma@example.com\"" and variants
index_text = re.sub(r'value=\s*[\"\'\\]*charishma[\"\'\\]*', '', index_text)
index_text = re.sub(r'value=\s*[\"\'\\]*chanrishma@example\.com[\"\'\\]*', '', index_text)

# Change placeholder for name to e.g. charishma
index_text = re.sub(r'placeholder=\"e\.g\. Edwin Paleti\"', 'placeholder=\"e.g. charishma\"', index_text)
# Change placeholder for email if there's one, or add it
if 'placeholder="hello@horkos.com"' in index_text:
    index_text = index_text.replace('placeholder="hello@horkos.com"', 'placeholder="charishma@example.com"')
else:
    # Just to be safe, replace email placeholder if it exists, otherwise we'll inject it.
    pass

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(index_text)

