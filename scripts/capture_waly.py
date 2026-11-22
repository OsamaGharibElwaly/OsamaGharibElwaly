from PIL import Image, ImageGrab, ImageEnhance, ImageDraw, ImageFont
from pathlib import Path
import time, subprocess

ROOT = Path(r"H:\devH\myportfolio\OsamaGharibElwaly")
OUT = ROOT / 'docs' / 'images' / 'screenshots'
PUB = ROOT / 'public' / 'assets' / 'generated' / 'screenshots'
OUT.mkdir(parents=True, exist_ok=True)
PUB.mkdir(parents=True, exist_ok=True)
raw = OUT / 'raw-waly-studio.png'

p = subprocess.Popen([
    r"H:\devH\offlinepresentationapp\OfflineAIPresentationFactory\.venv\Scripts\python.exe",
    '-m', 'frontend.main'
], cwd=r"H:\devH\offlinepresentationapp\OfflineAIPresentationFactory")
try:
    time.sleep(8)
    img = ImageGrab.grab().convert('RGB')
    img.save(raw)
finally:
    p.terminate()

# enhance
img = Image.open(raw).convert('RGB')
img = ImageEnhance.Contrast(img).enhance(1.08)
img = ImageEnhance.Color(img).enhance(1.05)
img = ImageEnhance.Sharpness(img).enhance(1.15)
w,h = img.size
pad, top = 40, 90
canvas = Image.new('RGB', (w+pad*2, h+pad*2+top), (11,18,32))
draw = ImageDraw.Draw(canvas)
for y in range(top+20):
    c = int(18 + y*0.3)
    draw.line([(0,y),(canvas.size[0],y)], fill=(11,c,32+int(y*0.2)))
try:
    fb = ImageFont.truetype('arialbd.ttf', 30)
    fs = ImageFont.truetype('arial.ttf', 18)
except Exception:
    fb=fs=ImageFont.load_default()
draw.text((pad,24), 'Waly_Presentation - Offline AI Presentation Factory', fill=(229,238,251), font=fb)
draw.text((pad,58), 'Live desktop proof capture after 8s load settle', fill=(148,163,184), font=fs)
draw.rectangle([pad-1, top-1, pad+w, top+h], outline=(129,140,248), width=2)
canvas.paste(img, (pad,top))
draw.rectangle([0, canvas.size[1]-4, canvas.size[0], canvas.size[1]], fill=(129,140,248))
for pth in [OUT/'waly-studio.png', PUB/'waly-studio.png']:
    canvas.save(pth, quality=92)
raw.unlink(missing_ok=True)
print('saved waly-studio.png')
