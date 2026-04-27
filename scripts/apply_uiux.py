import os
import re

def apply_ui_ux(directory):
    # Colors to replace
    color_replacements = {
        '#3ECF8E': 'hsl(var(--primary))',
        '#34B27B': 'hsl(var(--primary-variant))',
        '#C5FF4A': 'hsl(var(--accent-cta))',
        '#b8f03d': 'hsl(var(--accent-cta-foreground))'
    }

    # Font inline styles to remove
    font_pattern = re.compile(r'\s*style=\{\{\s*fontFamily:\s*[\'"]\'Playfair Display\',\s*serif[\'"]\s*\}\}')
    font_pattern2 = re.compile(r'\s*style=\{\{\s*fontFamily:\s*[\'"]\'Playfair Display\',\s*serif[\'"]\s*,\s*(.*?)\}\}')

    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith(('.tsx', '.ts', '.jsx', '.js')):
                filepath = os.path.join(root, file)
                
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()

                original_content = content
                
                # Remove inline font family
                content = font_pattern.sub('', content)
                # If there are other properties in style object, just remove the fontFamily part
                content = re.sub(r'fontFamily:\s*[\'"]\'Playfair Display\',\s*serif[\'"]\s*,?', '', content)
                # Cleanup empty styles if any were created
                content = content.replace('style={{}}', '')
                content = content.replace('style={{ }}', '')
                
                # Replace specific hardcoded colors with CSS variables or tailwind classes
                for old_color, new_color in color_replacements.items():
                    # For classNames like bg-[#3ECF8E], we replace the exact hex inside brackets or just replace the string
                    content = content.replace(f'[{old_color}]', '[hsl(var(--primary))]')
                    content = content.replace(old_color, new_color)

                if content != original_content:
                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.write(content)
                    print(f"Updated: {filepath}")

if __name__ == "__main__":
    src_dir = os.path.join(os.path.dirname(__file__), '..', 'src')
    apply_ui_ux(src_dir)
    print("UI/UX rules successfully applied to components.")
