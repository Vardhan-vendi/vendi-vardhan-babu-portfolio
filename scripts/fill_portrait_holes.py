from PIL import Image, ImageFilter
import numpy as np
from scipy import ndimage

img = Image.open('public/profile-transparent.png')
arr = np.array(img)
alpha = arr[:, :, 3]

# Binary threshold for person
binary_mask = (alpha > 50)

# Fill any enclosed holes inside the binary mask using scipy ndimage binary_fill_holes
filled_mask = ndimage.binary_fill_holes(binary_mask)

# For any pixel that is inside the filled mask, ensure alpha is 255
new_alpha = np.where(filled_mask, 255, 0).astype(np.uint8)

# Feather the border very slightly (0.75px) for ultra-clean anti-aliased contour
mask_pil = Image.fromarray(new_alpha, mode='L')
mask_pil = mask_pil.filter(ImageFilter.GaussianBlur(radius=0.75))

img.putalpha(mask_pil)
img.save('public/profile-transparent.png', 'PNG')
img.save('public/profile.png', 'PNG')
print('Successfully filled all internal holes and generated 100% solid transparent portrait!')
