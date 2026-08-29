import os
import glob
from PIL import Image
import pytesseract

files = sorted(glob.glob("public/certificates/cert-*.jpg"), key=lambda x: int(x.split('cert-')[1].split('.jpg')[0]))

print(f"Total files: {len(files)}")
for f in files:
    print(f"\n==========================================")
    print(f"FILE: {f}")
    print(f"==========================================")
    try:
        img = Image.open(f)
        text = pytesseract.image_to_string(img)
        print(text.strip())
    except Exception as e:
        print(f"Error: {e}")
