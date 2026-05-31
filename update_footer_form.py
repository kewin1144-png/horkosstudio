import os, re

d = '.'
for f in os.listdir(d):
    if f.endswith('.html'):
        path = os.path.join(d, f)
        with open(path, 'r', encoding='utf-8') as file:
            c = file.read()
        
        # Replace the footer icon
        c = re.sub(r'images/fav-icon\.svg([^\>]*?)animate-spin-slow', r'images/footer logo icon.svg\1animate-[spin_3s_linear_infinite]', c)
        c = re.sub(r'images/footer logo icon\.svg([^\>]*?)animate-spin-slow', r'images/footer logo icon.svg\1animate-[spin_3s_linear_infinite]', c)
        c = re.sub(r'images/fav-icon\.svg([^\>]*?)animate-\[spin_3s_linear_infinite\]', r'images/footer logo icon.svg\1animate-[spin_3s_linear_infinite]', c)

        if f == 'index.html':
            # Remove existing values if any
            c = re.sub(r'(<input[^>]*?name=\"name\"[^>]*?) value=\"[^\"]*\"', r'\1', c)
            c = re.sub(r'(<input[^>]*?name=\"email\"[^>]*?) value=\"[^\"]*\"', r'\1', c)
            
            # Add values
            c = re.sub(r'(<input[^>]*?name=\"name\"[^>]*?)>', r'\1 value=\"charishma\">', c)
            c = re.sub(r'(<input[^>]*?name=\"email\"[^>]*?)>', r'\1 value=\"chanrishma@example.com\">', c)

        with open(path, 'w', encoding='utf-8') as file:
            file.write(c)
