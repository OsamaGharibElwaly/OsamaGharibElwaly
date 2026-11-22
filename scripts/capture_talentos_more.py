from playwright.sync_api import sync_playwright
import time
from pathlib import Path
from PIL import Image, ImageEnhance, ImageDraw, ImageFont, ImageFilter
import numpy as np

ROOT = Path(r"H:\devH\myportfolio\OsamaGharibElwaly")
OUT = ROOT / 'docs' / 'images' / 'screenshots'
PUB = ROOT / 'public' / 'assets' / 'generated' / 'screenshots'
OUT.mkdir(parents=True, exist_ok=True)
PUB.mkdir(parents=True, exist_ok=True)

def enhance(src, dst_name, title, subtitle, accent=(34,211,238)):
    img = Image.open(src).convert('RGB')
    img = ImageEnhance.Contrast(img).enhance(1.08)
    img = ImageEnhance.Color(img).enhance(1.06)
    img = ImageEnhance.Sharpness(img).enhance(1.2)
    arr = np.asarray(img).astype(np.float32)/255
    h,w = arr.shape[:2]
    Y,X = np.ogrid[:h,:w]
    cy,cx=h/2,w/2
    r = np.sqrt(((X-cx)/(w*0.75))**2 + ((Y-cy)/(h*0.75))**2)
    mask = 1 - np.clip(r-0.45,0,1)*0.22
    arr *= mask[...,None]
    img = Image.fromarray((np.clip(arr,0,1)*255).astype(np.uint8))
    pad, top, bottom = 36, 86, 28
    cw, ch = img.size[0]+pad*2, img.size[1]+pad*2+top+bottom
    canvas = Image.new('RGB',(cw,ch),(8,14,28))
    draw = ImageDraw.Draw(canvas)
    for y in range(ch):
        t=y/ch
        rv=int(8+12*t); g=int(14+20*t); b=int(28+34*(1-t))
        draw.line([(0,y),(cw,y)], fill=(rv,g,b))
    glow = Image.new('RGBA',(img.size[0]+40,img.size[1]+40),(0,0,0,0))
    gd = ImageDraw.Draw(glow)
    gd.rectangle([20,20,img.size[0]+20,img.size[1]+20], fill=accent+(60,))
    glow = glow.filter(ImageFilter.GaussianBlur(18))
    canvas.paste(glow,(pad-20, top-20),glow)
    draw.rectangle([pad-1,top-1,pad+img.size[0],top+img.size[1]], outline=accent, width=2)
    canvas.paste(img,(pad,top))
    try:
        fb = ImageFont.truetype('arialbd.ttf', 30)
        fs = ImageFont.truetype('arial.ttf', 17)
        fm = ImageFont.truetype('arial.ttf', 13)
    except Exception:
        fb=fs=fm=ImageFont.load_default()
    draw.text((pad,20), title, fill=(236,244,255), font=fb)
    draw.text((pad,54), subtitle, fill=(148,163,184), font=fs)
    draw.rectangle([0,ch-5,cw,ch], fill=accent)
    draw.text((pad,ch-24), 'Live capture • 8s settle • enhanced for portfolio proof', fill=(100,116,139), font=fm)
    for x,y,dx,dy in [(pad,top,18,0),(pad,top,0,18),(pad+img.size[0],top,-18,0),(pad+img.size[0],top,0,18),(pad,top+img.size[1],18,0),(pad,top+img.size[1],0,-18),(pad+img.size[0],top+img.size[1],-18,0),(pad+img.size[0],top+img.size[1],0,-18)]:
        draw.line([(x,y),(x+dx,y+dy)], fill=accent, width=3)
    for p in [OUT/dst_name, PUB/dst_name]:
        canvas.save(p, format='PNG', optimize=True)
    src.unlink(missing_ok=True)
    print('ok', dst_name)

targets = [
    ('http://localhost:3011', 'talentos-dashboard.png', 'TalentOS — Dashboard Overview', 'Live hiring workspace with pipeline signals and quick actions', (34,211,238)),
    ('http://localhost:3011/jobs', 'talentos-jobs.png', 'TalentOS — Jobs & Rubric Management', 'Role setup and weighted evaluation criteria', (56,189,248)),
    ('http://localhost:3011/candidates', 'talentos-candidates.png', 'TalentOS — Candidate Evidence View', 'Resume review, evidence, and scoring workflow', (129,140,248)),
    ('http://localhost:3011/talent-pool', 'talentos-search.png', 'TalentOS — Talent Search Workbench', 'Hybrid search and talent pool discovery', (52,211,153)),
    ('http://localhost:3011/interviews', 'talentos-interviews.png', 'TalentOS — Interview Copilot', 'Structured interview workflow and scorecard support', (251,191,36)),
    ('http://localhost:3011/telemetry', 'talentos-telemetry.png', 'TalentOS — AI Telemetry', 'Operational metrics for latency, cost, and quality', (244,114,182)),
]

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    ctx = browser.new_context(viewport={'width':1440,'height':900}, device_scale_factor=1.5)
    page = ctx.new_page()
    for url, name, title, sub, accent in targets:
        try:
            page.goto(url, wait_until='domcontentloaded', timeout=45000)
        except Exception as e:
            print('nav err', url, e)
        time.sleep(8)
        raw = OUT / ('raw-' + name)
        page.screenshot(path=str(raw), full_page=False)
        enhance(raw, name, title, sub, accent)
    browser.close()
print('done')
