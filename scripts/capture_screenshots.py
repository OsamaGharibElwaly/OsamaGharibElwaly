from playwright.sync_api import sync_playwright
import time
from pathlib import Path
from PIL import Image, ImageEnhance, ImageDraw, ImageFont

ROOT = Path(r"H:\devH\myportfolio\OsamaGharibElwaly")
OUT = ROOT / 'docs' / 'images' / 'screenshots'
PUB = ROOT / 'public' / 'assets' / 'generated' / 'screenshots'
OUT.mkdir(parents=True, exist_ok=True)
PUB.mkdir(parents=True, exist_ok=True)

def enhance(path, title, subtitle):
    img = Image.open(path).convert('RGB')
    img = ImageEnhance.Contrast(img).enhance(1.08)
    img = ImageEnhance.Color(img).enhance(1.05)
    img = ImageEnhance.Sharpness(img).enhance(1.15)
    w, h = img.size
    pad, top = 40, 90
    canvas = Image.new('RGB', (w + pad * 2, h + pad * 2 + top), (11, 18, 32))
    draw = ImageDraw.Draw(canvas)
    for y in range(top + 20):
        c = int(18 + y * 0.3)
        draw.line([(0, y), (canvas.size[0], y)], fill=(11, c, 32 + int(y * 0.2)))
    try:
        fb = ImageFont.truetype('arialbd.ttf', 30)
        fs = ImageFont.truetype('arial.ttf', 18)
    except Exception:
        fb = fs = ImageFont.load_default()
    draw.text((pad, 24), title, fill=(229, 238, 251), font=fb)
    draw.text((pad, 58), subtitle, fill=(148, 163, 184), font=fs)
    draw.rectangle([pad - 1, top - 1, pad + w, top + h], outline=(34, 211, 238), width=2)
    canvas.paste(img, (pad, top))
    draw.rectangle([0, canvas.size[1] - 4, canvas.size[0], canvas.size[1]], fill=(34, 211, 238))
    canvas.save(OUT / path.name, quality=92)
    canvas.save(PUB / path.name, quality=92)
    print('enhanced', path.name)

targets = [
    ('http://localhost:3011', 'talentos-home.png', 'TalentOS - Hiring Workspace Dashboard', 'Live proof capture after 8s load settle'),
    ('http://localhost:3011/jobs', 'talentos-jobs.png', 'TalentOS - Jobs & Rubrics', 'Live proof capture after 8s load settle'),
    ('http://localhost:3011/candidates', 'talentos-candidates.png', 'TalentOS - Candidates & Evidence', 'Live proof capture after 8s load settle'),
    ('http://localhost:3011/talent-pool', 'talentos-search.png', 'TalentOS - Talent Search', 'Live proof capture after 8s load settle'),
    ('http://localhost:3010/projects/talentos', 'portfolio-talentos.png', 'Portfolio - TalentOS Project Page', 'Live proof capture after 8s load settle'),
    ('http://localhost:3010/projects/waly-presentation', 'portfolio-waly.png', 'Portfolio - Waly_Presentation Project Page', 'Live proof capture after 8s load settle'),
]

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    ctx = browser.new_context(viewport={'width': 1440, 'height': 900}, device_scale_factor=1.5)
    page = ctx.new_page()
    for url, name, title, sub in targets:
        try:
            page.goto(url, wait_until='domcontentloaded', timeout=45000)
        except Exception as e:
            print('nav err', url, e)
        time.sleep(8)
        raw = OUT / ('raw-' + name)
        page.screenshot(path=str(raw), full_page=False)
        enhance(raw, title, sub)
        raw.unlink(missing_ok=True)
    browser.close()
print('done')
