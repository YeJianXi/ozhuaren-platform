from PIL import Image, ImageDraw, ImageFont
import os

WIDTH, HEIGHT = 1200, 630
img = Image.new('RGB', (WIDTH, HEIGHT))
draw = ImageDraw.Draw(img)

# Gradient background
for y in range(HEIGHT):
    r = int(102 + (118 - 102) * y / HEIGHT)
    g = int(126 + (75 - 126) * y / HEIGHT)
    b = int(234 + (162 - 234) * y / HEIGHT)
    draw.line([(0, y), (WIDTH, y)], fill=(r, g, b))

# Try to find a Chinese font
font_paths = [
    r'C:\Windows\Fonts\msyh.ttc',
    r'C:\Windows\Fonts\simhei.ttf',
    r'C:\Windows\Fonts\simsun.ttc',
]
font_path = None
for fp in font_paths:
    if os.path.exists(fp):
        font_path = fp
        break

if font_path:
    title_font = ImageFont.truetype(font_path, 72)
    sub_font = ImageFont.truetype(font_path, 36)
else:
    title_font = ImageFont.load_default()
    sub_font = ImageFont.load_default()

# Title
title = "华人信息平台"
bbox = draw.textbbox((0, 0), title, font=title_font)
tw = bbox[2] - bbox[0]
draw.text(((WIDTH - tw) // 2, 200), title, fill='white', font=title_font)

# Subtitle
subtitle = "澳洲华人求职招聘 · 信息服务"
bbox2 = draw.textbbox((0, 0), subtitle, font=sub_font)
sw = bbox2[2] - bbox2[0]
draw.text(((WIDTH - sw) // 2, 320), subtitle, fill=(255, 255, 255, 200), font=sub_font)

# Accent line
line_y = 400
line_w = 200
draw.line([(WIDTH // 2 - line_w, line_y), (WIDTH // 2 + line_w, line_y)], fill='white', width=3)

output_path = r'E:\一人公司\public\cover.png'
img.save(output_path, 'PNG')
print(f'Cover image saved to {output_path}')
print(f'Size: {img.size}')
