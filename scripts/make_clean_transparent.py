from PIL import Image, ImageFilter
import numpy as np
from collections import deque

input_path = r"C:/Users/vardh/.gemini/antigravity/brain/106d2cbc-69fc-4702-8af0-5f689fefff1a/.user_uploaded/media_1788014445481.jpg"
output_path = r"public/profile-transparent.png"

img = Image.open(input_path).convert("RGBA")
arr = np.array(img)
h, w, _ = arr.shape

# The background is bright white/light off-white (R > 210, G > 210, B > 210)
# Dark hair is R < 120, so there is zero overlap between background and hair!
visited = np.zeros((h, w), dtype=bool)
queue = deque()

# Add all perimeter pixels that are light/white
for y in range(h):
    for x in [0, w - 1]:
        r, g, b, _ = arr[y, x]
        if r > 180 and g > 180 and b > 180:
            queue.append((y, x))
            visited[y, x] = True

for x in range(w):
    for y in [0, h - 1]:
        if not visited[y, x]:
            r, g, b, _ = arr[y, x]
            if r > 180 and g > 180 and b > 180:
                queue.append((y, x))
                visited[y, x] = True

# BFS to expand only through white background
while queue:
    cy, cx = queue.popleft()
    for dy, dx in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
        ny, nx = cy + dy, cx + dx
        if 0 <= ny < h and 0 <= nx < w and not visited[ny, nx]:
            r, g, b, _ = arr[ny, nx]
            if r > 175 and g > 175 and b > 175:
                visited[ny, nx] = True
                queue.append((ny, nx))

# Now alpha: 0 where visited (background), 255 for person (including 100% solid head and hair!)
alpha = np.where(visited, 0, 255).astype(np.uint8)

# Feather the border very slightly (0.8 radius) for clean anti-aliased edge without losing any hair
mask_img = Image.fromarray(alpha, mode='L')
mask_img = mask_img.filter(ImageFilter.GaussianBlur(radius=0.8))

img.putalpha(mask_img)
img.save(output_path, "PNG")
img.save("public/profile.png", "PNG")
print(f"Successfully created 100% solid head transparent profile from {input_path}")
