from PIL import Image, ImageEnhance, ImageDraw, ImageFont, ImageFilter
from pathlib import Path
import matplotlib
matplotlib.use('Agg')
import numpy as np

ROOT = Path(r"H:\devH\myportfolio\OsamaGharibElwaly")
OUT = ROOT / 'docs' / 'images' / 'screenshots'
PUB = ROOT / 'public' / 'assets' / 'generated' / 'screenshots'
OUT.mkdir(parents=True, exist_ok=True)
PUB.mkdir(parents=True, exist_ok=True)

def enhance(src_name, dst_name, title, subtitle, accent=(34,211,238)):
    src = OUT / src_name
    if not src.exists():
        print('missing', src)
        return
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

enhance('raw-waly-editor.png','waly-editor.png','Waly_Presentation — Editor Workspace','Offline AI presentation factory: markdown editor and control studio',(129,140,248))
enhance('raw-waly-design.png','waly-design.png','Waly_Presentation — Design System Controls','30 design archetypes with palette/theme catalog selection',(56,189,248))
enhance('raw-waly-preview.png','waly-preview.png','Waly_Presentation — Live Preview','Real-time slide preview and layout inspection',(34,211,238))
enhance('raw-waly-content.png','waly-content.png','Waly_Presentation — Content Pipeline','Structured markdown-to-slide workflow with agent-style planning',(52,211,153))
