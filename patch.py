
import os

try:
    with open('f:/gate tracker/index.html', 'r', encoding='utf-8') as f:
        content = f.read()
    
    with open('f:/gate tracker/temp_landing.js', 'r', encoding='utf-8') as f:
        replacement = f.read()

    start_marker = '/* --- LANDING PAGE --- */'
    end_marker = '/* --- DASHBOARD COMPONENTS --- */'

    start_idx = content.find(start_marker)
    end_idx = content.find(end_marker)

    if start_idx != -1 and end_idx != -1:
        new_content = content[:start_idx] + replacement + '\n\n' + content[end_idx:]
        with open('f:/gate tracker/index.html', 'w', encoding='utf-8') as f:
            f.write(new_content)
        print('Successfully patched index.html')
    else:
        print(f'Markers not found. Start: {start_idx}, End: {end_idx}')

except Exception as e:
    print(f"Error: {e}")
