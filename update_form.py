import re

with open('index.html', 'r', encoding='utf-8') as f:
    c = f.read()

# Add value to name and email
c = re.sub(r'(<input[^>]*?id=\"name\"[^>]*?) value=\"[^\"]*\"', r'\1', c)
c = re.sub(r'(<input[^>]*?id=\"email\"[^>]*?) value=\"[^\"]*\"', r'\1', c)

c = re.sub(r'(<input[^>]*?id=\"name\"[^>]*?)>', r'\1 value=\"charishma\">', c)
c = re.sub(r'(<input[^>]*?id=\"email\"[^>]*?)>', r'\1 value=\"chanrishma@example.com\">', c)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(c)
