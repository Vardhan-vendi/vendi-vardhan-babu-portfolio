from PIL import Image
import numpy as np
from collections import deque

input_path = r"C:/Users/vardh/.gemini/antigravity/brain/106d2cbc-69fc-4702-8af0-5f689fefff1a/.user_uploaded/media_1788017133168.jpg"
output_path = r"public/profile-transparent.png"

img = Image.open(input_path).convert("RGBA")
arr = np.array(img)
h, w, _ = arr.shape

# The background is solid black (0,0,0) or near black at the borders
# Let's do a flood-fill / BFS from all 4 borders to remove background without touching black suit/hair inside
visited = np.zeros((h, w), dtype=bool)
queue = deque()

# Add all perimeter pixels that are near black (R, G, B < 25)
for y in range(h):
    for x in [0, w - 1]:
        r, g, b, _ = arr[y, x]
        if r < 30 and g < 30 and b < 30:
            queue.append((y, x))
            visited[y, x] = True

for x in range(w):
    for y in [0, h - 1]:
        if not visited[y, x]:
            r, g, b, _ = arr[y, x]
            if r < 30 and g < 30 and b < 30:
                queue.append((y, x))
                visited[y, x] = True

# BFS to find connected background
while queue:
    cy, cx = queue.popleft()
    # Check 4 neighbors
    for dy, dx in [(-1, 0), (1, 0), (0, -1), (0, 1), (-1, -1), (-1, 1), (1, -1), (1, 1)]:
        ny, nx = cy + dy, cx + dx
        if 0 <= ny < h and 0 <= nx < w and not visited[ny, nx]:
            r, g, b, _ = arr[ny, nx]
            # If color is black/near black
            if r < 35 and g < 35 and b < 35:
                visited[ny, nx] = True
                queue.append((ny, nx))

# Now set alpha = 0 for all visited pixels
# For slight anti-aliasing / feathering:
alpha_mask = np.where(visited, 0, 255).astype(np.uint8)

# Smooth edges with slight blur or alpha gradient
from PIL import ImageFilter
mask_img = Image.fromarray(alpha_mask, mode='L')
# Smooth mask
mask_img = mask_img.filter(ImageFilter.GaussianBlur(radius=1.2))

# Apply mask
img.putalpha(mask_img)

# Save result
img.save(output_path, "PNG")
# Also save as public/profile.png
img.save("public/profile.png", "PNG")
print(f"Successfully saved transparent profile to {output_path} (Dimensions: {w}x{h})")
