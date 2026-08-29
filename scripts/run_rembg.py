from rembg import remove
from PIL import Image
import numpy as np

input_path = r"C:/Users/vardh/.gemini/antigravity/brain/106d2cbc-69fc-4702-8af0-5f689fefff1a/.user_uploaded/media_1788017133168.jpg"
output_path = r"public/profile-transparent.png"

input_image = Image.open(input_path)
output_image = remove(input_image)

output_image.save(output_path, "PNG")
output_image.save("public/profile.png", "PNG")
print("Successfully generated AI-segmented portrait using rembg!")

arr = np.array(output_image)
h, w, _ = arr.shape
head = arr[int(h*0.15):int(h*0.45), int(w*0.35):int(w*0.65), 3]
print(f"Head region min alpha: {head.min()}, max alpha: {head.max()}, mean: {head.mean():.2f}")
