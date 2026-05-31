import os, re
issues = []
for f in os.listdir('.'):
    if f.endswith('.html'):
        with open(f, 'r', encoding='utf-8') as file:
            c = file.read()
        if '<meta name="viewport"' not in c:
            issues.append(f'{f}: Missing viewport meta tag')
        if 'overflow-x-hidden' not in c:
            issues.append(f'{f}: Missing overflow-x-hidden (potential mobile scroll bug)')
        
        # Check GSAP
        if 'script.js' in c and 'gsap' not in c:
            issues.append(f'{f}: Has script.js but missing GSAP CDN')
        
        # Ensure body has bg-brandWhite to avoid weird overscroll colors on iOS
        if '<body ' in c and 'bg-' not in c:
            issues.append(f'{f}: Body missing background color')

with open('style.css', 'r', encoding='utf-8') as file:
    css = file.read()
    if 'backdrop-filter' in css and '-webkit-backdrop-filter' not in css:
        issues.append('style.css: Missing -webkit-backdrop-filter for Safari')

print('Audit complete. Issues found:')
for i in issues:
    print(i)
if not issues:
    print('No critical cross-platform structural issues found.')
