from PIL import Image, ImageFilter
import numpy as np
from collections import deque

input_path = r"C:/Users/vardh/.gemini/antigravity/brain/106d2cbc-69fc-4702-8af0-5f689fefff1a/.user_uploaded/media_1788014445481.jpg"
output_path = r"public/profile-transparent.png"

img = Image.open(input_path).convert("RGB")
arr = np.array(img, dtype=np.float32)
h, w, _ = arr.shape

# The background at the top is bright white: R>200, G>200, B>200
# Calculate brightness / whiteness score:
whiteness = (arr[:, :, 0] + arr[:, :, 1] + arr[:, :, 2]) / 3.0

visited = np.zeros((h, w), dtype=bool)
queue = deque()

# Seed strictly from top edge y=0 and upper sides
for x in range(w):
    if whiteness[0, x] > 190:
        queue.append((0, x))
        visited[0, x] = True

for y in range(int(h * 0.55)):
    for x in [0, w - 1]:
        if not visited[y, x] and whiteness[y, x] > 190:
            queue.append((y, x))
            visited[y, x] = True

# Flood fill only through the bright white background surrounding the person
while queue:
    cy, cx = queue.popleft()
    for dy, dx in [(-1, 0), (1, 0), (0, -1), (0, 1), (-1, -1), (-1, 1), (1, -1), (1, 1)]:
        ny, nx = cy + dy, cx + dx
        if 0 <= ny < h and 0 <= nx < w and not visited[ny, nx]:
            # The background is white (whiteness > 195). The dark hair (whiteness < 110) acts as an impenetrable wall.
            if whiteness[ny, nx] > 190:
                visited[ny, nx] = True
                queue.append((ny, nx))

# visited == True is background. Everything else is person (100% solid, fully opaque!)
# Build mask: 0 for background, 255 for person
mask = np.where(visited, 0, 255).astype(np.uint8)

# Smooth edges with 1px Gaussian blur for clean anti-aliasing
mask_pil = Image.fromarray(mask, mode='L')
mask_pil = mask_pil.filter(ImageFilter.GaussianBlur(radius=0.9))

rgba = Image.open(input_path).convert("RGBA")
rgba.putalpha(mask_pil)
rgba.save(output_path, "PNG")
rgba.save("public/profile.png", "PNG")
print(f"Saved solid head transparent profile to {output_path}!")
