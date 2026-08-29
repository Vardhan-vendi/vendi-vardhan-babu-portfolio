from PIL import Image, ImageFilter
import numpy as np
from collections import deque
from scipy import ndimage

input_path = r"C:/Users/vardh/.gemini/antigravity/brain/106d2cbc-69fc-4702-8af0-5f689fefff1a/.user_uploaded/media_1788023551107.jpg"
output_path = r"public/profile-transparent.png"

img = Image.open(input_path).convert("RGB")
arr = np.array(img, dtype=np.float32)
h, w, _ = arr.shape

whiteness = (arr[:, :, 0] + arr[:, :, 1] + arr[:, :, 2]) / 3.0

visited = np.zeros((h, w), dtype=bool)
queue = deque()

# Seed strictly from top edge y=0 and upper sides where background is white
for x in range(w):
    if whiteness[0, x] > 185:
        queue.append((0, x))
        visited[0, x] = True

for y in range(int(h * 0.55)):
    for x in [0, w - 1]:
        if not visited[y, x] and whiteness[y, x] > 185:
            queue.append((y, x))
            visited[y, x] = True

while queue:
    cy, cx = queue.popleft()
    for dy, dx in [(-1, 0), (1, 0), (0, -1), (0, 1), (-1, -1), (-1, 1), (1, -1), (1, 1)]:
        ny, nx = cy + dy, cx + dx
        if 0 <= ny < h and 0 <= nx < w and not visited[ny, nx]:
            if whiteness[ny, nx] > 180:
                visited[ny, nx] = True
                queue.append((ny, nx))

# Binary mask: visited == False is person
person_mask = ~visited

# Morphological fill holes so hair, eyes, neck, shirt collar and suit are 100% solid
filled_mask = ndimage.binary_fill_holes(person_mask)

alpha = np.where(filled_mask, 255, 0).astype(np.uint8)

# Feather the border very slightly (0.8px) for clean anti-aliasing
mask_pil = Image.fromarray(alpha, mode='L')
mask_pil = mask_pil.filter(ImageFilter.GaussianBlur(radius=0.8))

rgba = Image.open(input_path).convert("RGBA")
rgba.putalpha(mask_pil)
rgba.save(output_path, "PNG")
rgba.save("public/profile.png", "PNG")
print("Successfully generated 100% solid transparent portrait from new photo!")
