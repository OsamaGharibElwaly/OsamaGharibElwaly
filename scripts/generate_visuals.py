# generate_visuals.py - portfolio visuals with matplotlib & PIL
import math
from pathlib import Path
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib.patches import FancyBboxPatch
import numpy as np
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
DOCS = ROOT / 'docs' / 'images'
PUB = ROOT / 'public' / 'assets' / 'generated'
DOCS.mkdir(parents=True, exist_ok=True)
PUB.mkdir(parents=True, exist_ok=True)

BG, BG2, CARD = '#0b1220', '#111827', '#182235'
ACCENT, ACCENT2, ACCENT3 = '#22d3ee', '#818cf8', '#34d399'
TEXT, MUTED, GRID = '#e5eefb', '#94a3b8', '#24324a'

plt.rcParams.update({
    'figure.facecolor': BG, 'axes.facecolor': BG2, 'axes.edgecolor': GRID,
    'axes.labelcolor': TEXT, 'text.color': TEXT, 'xtick.color': MUTED,
    'ytick.color': MUTED, 'grid.color': GRID, 'font.family': 'DejaVu Sans',
})

def save(fig, name):
    for d in [DOCS, PUB]:
        fig.savefig(d / name, dpi=180, bbox_inches='tight', facecolor=fig.get_facecolor())
    plt.close(fig)
    print('saved', name)

def font(size, bold=False):
    name = 'arialbd.ttf' if bold else 'arial.ttf'
    try:
        return ImageFont.truetype(name, size)
    except Exception:
        return ImageFont.load_default()

def hero_banner():
    W, H = 1600, 500
    img = Image.new('RGB', (W, H), BG)
    draw = ImageDraw.Draw(img)
    for i in range(W):
        r = int(11 + 8 * i / W); g = int(18 + 12 * i / W); b = int(32 + 20 * (1 - i / W))
        draw.line([(i, 0), (i, H)], fill=(r, g, b))
    for x in range(0, W, 40): draw.line([(x, 0), (x, H)], fill=(36, 50, 74))
    for y in range(0, H, 40): draw.line([(0, y), (W, y)], fill=(36, 50, 74))
    glow = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    gd.ellipse([900, -120, 1500, 420], fill=(34, 211, 238, 35))
    gd.ellipse([1100, 120, 1700, 620], fill=(129, 140, 248, 30))
    img = Image.alpha_composite(img.convert('RGBA'), glow).convert('RGB')
    draw = ImageDraw.Draw(img)
    fb, fm, fs = font(64, True), font(30), font(24)
    draw.text((70, 120), 'OSAMA GHARIB AL-WALY', fill=TEXT, font=fb)
    draw.text((72, 205), 'AI Engineer  |  Data Scientist', fill=ACCENT, font=fm)
    draw.text((72, 260), 'Building auditable AI systems, data products, and intelligent workflows.', fill=MUTED, font=fs)
    pills = [('2', 'Flagship Projects'), ('10+', 'Systems Built'), ('End-to-End', 'AI Delivery'), ('R&D', 'Mindset')]
    x = 72
    for val, label in pills:
        tw = draw.textlength(val + ' ' + label, font=fs)
        bw = int(tw + 36)
        draw.rounded_rectangle([x, 340, x + bw, 390], radius=20, fill=(24, 34, 53), outline=(34, 211, 238))
        draw.text((x + 18, 352), val, fill=ACCENT, font=fs)
        vx = x + 18 + draw.textlength(val + ' ', font=fs)
        draw.text((vx, 352), label, fill=TEXT, font=fs)
        x += bw + 18
    cx, cy = 1240, 250
    for r, c in [(170, (34, 211, 238)), (120, (129, 140, 248)), (70, (52, 211, 153))]:
        draw.ellipse([cx-r, cy-r, cx+r, cy+r], outline=c, width=2)
    for ang, label in [(-90, 'Data'), (-18, 'Model'), (54, 'Eval'), (126, 'API'), (198, 'UX')]:
        a = math.radians(ang)
        px, py = cx + 170 * math.cos(a), cy + 170 * math.sin(a)
        draw.ellipse([px-34, py-34, px+34, py+34], fill=(24, 34, 53), outline=(34, 211, 238))
        bb = draw.textbbox((0, 0), label, font=fs)
        draw.text((px-(bb[2]-bb[0])/2, py-(bb[3]-bb[1])/2-2), label, fill=TEXT, font=fs)
        draw.line([(cx+70*math.cos(a), cy+70*math.sin(a)), (px-34*math.cos(a), py-34*math.sin(a))], fill=(34, 211, 238), width=2)
    draw.ellipse([cx-44, cy-44, cx+44, cy+44], fill=(34, 211, 238), outline=(229, 238, 251))
    bb = draw.textbbox((0, 0), 'AI', font=fm)
    draw.text((cx-(bb[2]-bb[0])/2, cy-(bb[3]-bb[1])/2-2), 'AI', fill=BG, font=fm)
    for d in [DOCS, PUB]: img.save(d / 'hero-banner.png')
    print('saved hero-banner.png')

def skill_matrix():
    skills = [('Python & Data Science', 92), ('Machine Learning / NLP', 88), ('LLM / RAG / Agents', 86),
              ('FastAPI & Backend', 84), ('Evaluation & Testing', 82), ('SQL / Data Modeling', 80),
              ('Frontend (React/Next)', 78), ('MLOps / Docker / CI', 75)]
    fig, ax = plt.subplots(figsize=(11, 5.5))
    y = np.arange(len(skills))
    vals = [s[1] for s in skills]
    colors = [ACCENT, ACCENT2, ACCENT3, ACCENT, ACCENT2, ACCENT3, ACCENT, ACCENT2]
    ax.barh(y, [100]*len(skills), color=GRID, alpha=0.25, height=0.55)
    bars = ax.barh(y, vals, height=0.55)
    for b, v, c in zip(bars, vals, colors):
        b.set_color(c)
    for i, v in enumerate(vals):
        ax.text(v+1, i, f'{v}%', va='center', color=TEXT, fontsize=10, fontweight='bold')
    ax.set_yticks(y); ax.set_yticklabels([s[0] for s in skills], fontsize=11)
    ax.set_xlim(0, 110); ax.invert_yaxis()
    ax.set_xlabel('Proficiency signal (self-assessed, project-backed)', color=MUTED)
    ax.set_title('AI Engineer | Data Scientist — Capability Matrix', fontsize=16, fontweight='bold', pad=14, color=TEXT)
    for s in ['top','right','bottom']: ax.spines[s].set_visible(False)
    ax.spines['left'].set_color(GRID); ax.grid(axis='x', alpha=0.25)
    save(fig, 'skill-matrix.png')

def project_scope():
    labels = ['Pipeline Stages','Automated Checks','Core Modules','User Surfaces','Artifacts']
    talentos, waly = [6,13,10,5,8], [5,12,9,3,7]
    x = np.arange(len(labels)); w = 0.36
    fig, ax = plt.subplots(figsize=(11, 5.5))
    ax.bar(x-w/2, talentos, w, label='TalentOS', color=ACCENT)
    ax.bar(x+w/2, waly, w, label='Waly_Presentation', color=ACCENT2)
    ax.set_xticks(x); ax.set_xticklabels(labels)
    ax.set_title('Flagship Projects — Scope Snapshot', fontsize=16, fontweight='bold', pad=14)
    ax.legend(frameon=False, labelcolor=TEXT); ax.grid(axis='y', alpha=0.25)
    for s in ['top','right']: ax.spines[s].set_visible(False)
    for i,v in enumerate(talentos): ax.text(i-w/2, v+0.15, str(v), ha='center', color=TEXT, fontsize=9)
    for i,v in enumerate(waly): ax.text(i+w/2, v+0.15, str(v), ha='center', color=TEXT, fontsize=9)
    save(fig, 'project-scope.png')

def arch_diagram(name, title, boxes, arrows):
    fig, ax = plt.subplots(figsize=(12, 6))
    ax.set_xlim(0, 12); ax.set_ylim(0, 6); ax.axis('off'); fig.patch.set_facecolor(BG)
    ax.text(6, 5.6, title, ha='center', fontsize=15, fontweight='bold', color=TEXT)
    for x,y,w,h,t,sub,edge in boxes:
        rect = FancyBboxPatch((x,y), w,h, boxstyle="round,pad=0.02,rounding_size=0.15", linewidth=1.5, edgecolor=edge, facecolor=CARD)
        ax.add_patch(rect)
        ax.text(x+w/2, y+h/2+(0.12 if sub else 0), t, ha='center', va='center', fontsize=10.5, fontweight='bold', color=TEXT)
        if sub: ax.text(x+w/2, y+h/2-0.22, sub, ha='center', va='center', fontsize=8.5, color=MUTED)
    for x1,y1,x2,y2 in arrows:
        ax.annotate('', xy=(x2,y2), xytext=(x1,y1), arrowprops=dict(arrowstyle='->', color=MUTED, lw=1.5))
    save(fig, name)

def talentos_arch():
    boxes = [
        (0.4,2.2,2.0,1.2,'Frontend','React / Dashboard',ACCENT2),
        (3.0,4.0,2.2,1.0,'FastAPI Gateway','REST + SSE',ACCENT),
        (3.0,2.2,2.2,1.2,'Service Layer','Auth · Jobs · Scoring',ACCENT),
        (3.0,0.5,2.2,1.0,'Async Workers','Parse · Embed · Score',ACCENT3),
        (6.0,4.0,2.0,1.0,'Object Storage','Resumes / Files',ACCENT2),
        (6.0,2.2,2.0,1.2,'PostgreSQL','Tenants · Jobs · Evals',ACCENT),
        (6.0,0.5,2.0,1.0,'pgvector / Index','Semantic Search',ACCENT3),
        (8.8,2.2,2.6,1.2,'AI Guardrails','Schema · Citations · PII','#f59e0b'),
    ]
    arrows = [(2.4,2.8,3.0,2.8),(4.1,3.4,4.1,4.0),(4.1,2.2,4.1,1.5),(5.2,4.5,6.0,4.5),(5.2,2.8,6.0,2.8),(5.2,1.0,6.0,1.0),(8.0,2.8,8.8,2.8),(7.0,1.5,7.0,2.2)]
    arch_diagram('talentos-architecture.png','TalentOS — AI-Native ATS Architecture (Proof of Concept)', boxes, arrows)

def waly_arch():
    boxes = [
        (0.4,2.4,2.1,1.2,'Markdown / Input','Brief · Notes · Structure',ACCENT2),
        (3.1,2.4,2.1,1.2,'Agent Pipeline','Plan · Outline · Tools',ACCENT),
        (5.8,3.8,2.1,1.0,'Theme/Design','30 Archetypes · Palettes','#f59e0b'),
        (5.8,1.2,2.1,1.0,'PPTX Engine','python-pptx shapes',ACCENT3),
        (8.5,2.8,2.3,1.0,'PDF Engine','ReportLab export',ACCENT2),
        (8.5,1.2,2.3,1.0,'Output Artifacts','.pptx · .pdf · images',ACCENT3),
        (3.1,0.6,2.1,0.9,'Offline Runtime','No API · Local','#f59e0b'),
    ]
    arrows = [(2.5,3.0,3.1,3.0),(5.2,3.2,5.8,4.2),(5.2,2.8,5.8,1.7),(7.9,4.1,9.0,3.8),(7.9,1.7,8.5,1.7),(4.15,2.4,4.15,1.5)]
    arch_diagram('waly-architecture.png','Waly_Presentation — Offline AI Presentation Factory', boxes, arrows)

def delivery_pipeline():
    fig, ax = plt.subplots(figsize=(12, 2.8))
    ax.set_xlim(0,12); ax.set_ylim(0,2.8); ax.axis('off'); fig.patch.set_facecolor(BG)
    steps = ['Problem','Data','Experiment','Evaluate','Ship','Monitor']
    colors = [ACCENT,ACCENT2,ACCENT3,ACCENT,'#f59e0b',ACCENT2]
    for i,(s,c) in enumerate(zip(steps,colors)):
        x=0.6+i*1.85
        rect=FancyBboxPatch((x,0.9),1.45,0.9, boxstyle='round,pad=0.02,rounding_size=0.12', facecolor=CARD, edgecolor=c, linewidth=1.5)
        ax.add_patch(rect)
        ax.text(x+0.725,1.35,s,ha='center',va='center',color=TEXT,fontweight='bold',fontsize=11)
        if i < len(steps)-1:
            ax.annotate('', xy=(x+1.75,1.35), xytext=(x+1.48,1.35), arrowprops=dict(arrowstyle='->', color=MUTED, lw=1.5))
    ax.text(6,2.45,'End-to-End AI Delivery Workflow',ha='center',fontsize=14,fontweight='bold',color=TEXT)
    save(fig,'delivery-pipeline.png')

def section_banner(title, subtitle, fname, accent=ACCENT):
    W,H=1400,220
    img=Image.new('RGB',(W,H),BG); d=ImageDraw.Draw(img)
    for i in range(W): d.line([(i,0),(i,H)], fill=(11+int(10*i/W),18+int(8*i/W),32))
    d.rectangle([0,H-4,W,H], fill=accent)
    fb, fs = font(52, True), font(24)
    d.text((56,58), title, fill=TEXT, font=fb)
    d.text((58,128), subtitle, fill=MUTED, font=fs)
    for i in range(12): d.ellipse([W-260+i*18,40,W-252+i*18,48], fill=accent)
    for p in [DOCS,PUB]: img.save(p/fname)
    print('saved', fname)

def stats_dashboard():
    fig = plt.figure(figsize=(12,4.5)); fig.patch.set_facecolor(BG)
    gs = fig.add_gridspec(1,4)
    metrics = [('2','Flagship\nAI Projects',ACCENT),('30+','Design/Tooling\nComponents',ACCENT2),('13+','Automated\nTest Modules',ACCENT3),('100%','Offline/Local\nCapable Flows','#f59e0b')]
    for i,(v,l,c) in enumerate(metrics):
        ax = fig.add_subplot(gs[0,i]); ax.set_facecolor(CARD)
        ax.set_xticks([]); ax.set_yticks([])
        for sp in ax.spines.values(): sp.set_color(c); sp.set_linewidth(1.5)
        ax.text(0.5,0.62,v,ha='center',va='center',fontsize=34,fontweight='bold',color=c,transform=ax.transAxes)
        ax.text(0.5,0.28,l,ha='center',va='center',fontsize=11,color=TEXT,transform=ax.transAxes)
    fig.suptitle('Portfolio Proof Snapshot', fontsize=16, fontweight='bold', color=TEXT, y=1.02)
    save(fig,'stats-dashboard.png')

if __name__ == '__main__':
    hero_banner(); skill_matrix(); project_scope(); talentos_arch(); waly_arch()
    delivery_pipeline(); stats_dashboard()
    section_banner('Featured Projects','TalentOS and Waly_Presentation — proof-driven AI systems','banner-projects.png',ACCENT)
    section_banner('Technical Arsenal','Data Science, AI Engineering, and production delivery','banner-skills.png',ACCENT2)
    section_banner('Evidence & Metrics','Generated visuals, architecture, and project scope','banner-evidence.png',ACCENT3)
    section_banner("Let's Build Reliable AI",'Open to AI Engineer and Data Scientist opportunities','banner-contact.png','#f59e0b')
    print('done')
