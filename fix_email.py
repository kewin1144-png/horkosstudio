import re
with open('index.html', 'r', encoding='utf-8') as f:
    text = f.read()

def fix_email(m):
    input_str = m.group(0)
    if 'placeholder=' in input_str:
        input_str = re.sub(r'placeholder=\"[^\"]*\"', 'placeholder=\"charishma@example.com\"', input_str)
    else:
        input_str = input_str.replace('>', ' placeholder=\"charishma@example.com\">')
    return input_str

text = re.sub(r'<input type=\"email\" id=\"email\".*?>', fix_email, text)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(text)
