from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import LETTER
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import (
    HRFlowable,
    KeepTogether,
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
)


OUT_DIR = Path("artifacts/cv_welli_wiselie")
PDF_PATH = OUT_DIR / "Welli_CV_Wiselie_Junior_AI_Fullstack_Engineer.pdf"


def styles():
    base = getSampleStyleSheet()
    return {
        "name": ParagraphStyle(
            "Name",
            parent=base["Normal"],
            fontName="Helvetica-Bold",
            fontSize=18,
            leading=20,
            alignment=TA_CENTER,
            textColor=colors.HexColor("#0B2545"),
            spaceAfter=1,
        ),
        "subtitle": ParagraphStyle(
            "Subtitle",
            parent=base["Normal"],
            fontName="Helvetica-Bold",
            fontSize=8.8,
            leading=10,
            alignment=TA_CENTER,
            textColor=colors.HexColor("#333333"),
            spaceAfter=2,
        ),
        "contact": ParagraphStyle(
            "Contact",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=7.8,
            leading=9.2,
            alignment=TA_CENTER,
            textColor=colors.HexColor("#333333"),
            spaceAfter=5,
        ),
        "section": ParagraphStyle(
            "Section",
            parent=base["Normal"],
            fontName="Helvetica-Bold",
            fontSize=9.8,
            leading=11,
            alignment=TA_LEFT,
            textColor=colors.HexColor("#1F4E79"),
            spaceBefore=5,
            spaceAfter=2,
            keepWithNext=True,
        ),
        "body": ParagraphStyle(
            "Body",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=8.45,
            leading=10.0,
            alignment=TA_LEFT,
            textColor=colors.black,
            spaceAfter=3,
        ),
        "skill": ParagraphStyle(
            "Skill",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=8.05,
            leading=9.4,
            alignment=TA_LEFT,
            textColor=colors.black,
            spaceAfter=1.7,
        ),
        "role_org": ParagraphStyle(
            "RoleOrg",
            parent=base["Normal"],
            fontName="Helvetica-Bold",
            fontSize=8.7,
            leading=9.8,
            alignment=TA_LEFT,
            textColor=colors.black,
            spaceBefore=3,
            spaceAfter=0.8,
            keepWithNext=True,
        ),
        "role_title": ParagraphStyle(
            "RoleTitle",
            parent=base["Normal"],
            fontName="Helvetica-Bold",
            fontSize=8.4,
            leading=9.6,
            alignment=TA_LEFT,
            textColor=colors.HexColor("#333333"),
            spaceAfter=1.4,
            keepWithNext=True,
        ),
        "label": ParagraphStyle(
            "Label",
            parent=base["Normal"],
            fontName="Helvetica-Bold",
            fontSize=8.05,
            leading=9.3,
            alignment=TA_LEFT,
            textColor=colors.HexColor("#444444"),
            spaceBefore=1.8,
            spaceAfter=0.8,
            keepWithNext=True,
        ),
        "bullet": ParagraphStyle(
            "Bullet",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=7.85,
            leading=9.25,
            alignment=TA_LEFT,
            textColor=colors.black,
            leftIndent=13,
            firstLineIndent=-7,
            bulletIndent=0,
            spaceAfter=1.75,
        ),
        "project": ParagraphStyle(
            "Project",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=7.95,
            leading=9.4,
            alignment=TA_LEFT,
            textColor=colors.black,
            spaceAfter=2,
        ),
        "edu": ParagraphStyle(
            "Education",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=8.3,
            leading=9.5,
            alignment=TA_LEFT,
            textColor=colors.black,
            spaceAfter=1.4,
        ),
    }


def section(story, s, title):
    story.append(Paragraph(title.upper(), s["section"]))
    story.append(
        HRFlowable(
            width="100%",
            thickness=0.45,
            color=colors.HexColor("#B7C9DD"),
            spaceBefore=0,
            spaceAfter=3,
        )
    )


def bullet(story, s, text):
    story.append(Paragraph(text, s["bullet"], bulletText="-"))


def role(story, s, org, location, title, dates):
    story.append(
        KeepTogether(
            [
                Paragraph(f"{org} | {location}", s["role_org"]),
                Paragraph(f"{title} | {dates}", s["role_title"]),
            ]
        )
    )


def build_pdf():
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    s = styles()

    doc = SimpleDocTemplate(
        str(PDF_PATH),
        pagesize=LETTER,
        rightMargin=0.52 * inch,
        leftMargin=0.52 * inch,
        topMargin=0.38 * inch,
        bottomMargin=0.42 * inch,
        title="Welli - CV - Junior AI / Fullstack Engineer",
        author="Welli",
        subject="CV tailored for Wiselie International Solutions",
        keywords=[
            "Junior AI Engineer",
            "Fullstack Engineer",
            "AI Operations",
            "OpenClaw",
            "Supabase",
            "PostgreSQL",
            "React",
            "Next.js",
            "TypeScript",
            "Python",
            "Automation Workflow",
            "API Integration",
        ],
    )

    story = []
    story.append(Paragraph("WELLI", s["name"]))
    story.append(
        Paragraph(
            "Full Stack Developer & AI Operations Engineer | Junior AI / Fullstack Engineer Candidate",
            s["subtitle"],
        )
    )
    story.append(
        Paragraph(
            "Tangerang Selatan, Indonesia | +62 851 6150 7114 | wellibuilds@gmail.com | "
            "linkedin.com/in/welli- | welli.my.id | github.com/Creastein",
            s["contact"],
        )
    )

    section(story, s, "Ringkasan Profesional")
    story.append(
        Paragraph(
            "Full Stack Developer & AI Operations Engineer dengan pengalaman membangun, mengelola, dan "
            "mendokumentasikan sistem AI agent, workflow otomasi, aplikasi internal berbasis web, database, dan "
            "integrasi API. Terbiasa menggunakan Next.js, React, TypeScript, Supabase/PostgreSQL, n8n, GitHub, dan "
            "deployment modern untuk mendukung kebutuhan operasional bisnis. Memiliki pengalaman langsung "
            "mengoperasikan sistem multi-agent berbasis OpenClaw dan Hermes Agent, membangun command interface "
            "melalui Telegram/Discord, serta menerjemahkan kebutuhan bisnis menjadi solusi teknologi yang stabil, "
            "terdokumentasi, aman, dan dapat dikembangkan.",
            s["body"],
        )
    )

    section(story, s, "Keahlian Teknis")
    skills = [
        ("Frontend", "React.js, Next.js, TypeScript, JavaScript, Tailwind CSS, HTML, CSS"),
        ("Backend & Database", "Node.js, REST API, Supabase, PostgreSQL, OAuth, Webhook, Python for automation scripting"),
        ("AI & Automation", "OpenClaw, Hermes Agent, n8n, LLM Integration, Claude API, Tool Calling, Multi-Agent Architecture, AI Workflow Design"),
        ("DevOps & Operations", "Git, GitHub, Vercel, Google Cloud Run, Docker, WSL, Cron Jobs, DNS Setup, Deployment, Server Environment, Logging"),
        ("Integrations", "Telegram Bot API, Discord Bot, WhatsApp API, Google Analytics, SerpApi, Google Workspace API concepts, Third-party API Integration"),
        ("Documentation & Ownership", "Technical SOP, Deployment Guide, System Architecture Documentation, Incident Notes, Problem Solving, Debugging"),
        ("AI Concepts", "RAG concepts, Vector Database concepts, AI Agent Operations, Automation Workflow, Monitoring Dashboard"),
    ]
    for label, value in skills:
        story.append(Paragraph(f"<b>{label}:</b> {value}", s["skill"]))

    section(story, s, "Pengalaman Kerja")
    role(story, s, "WelliBuilds", "Tangerang Selatan, Indonesia", "AI Operations & Full Stack Developer", "2025 - Sekarang")
    story.append(Paragraph("AI Operations, Automation & Internal Systems", s["label"]))
    for item in [
        "Merancang dan mengoperasikan sistem multi-agent AI untuk mendukung workflow operasional bisnis menggunakan OpenClaw, mencakup koordinasi CRM, sales pipeline, marketing workflow, daily briefing otomatis, dan approval-based automation melalui Telegram.",
        "Melakukan migrasi workflow AI operations dari OpenClaw ke Hermes Agent, termasuk evaluasi platform, redesign arsitektur multi-agent, integrasi ulang command interface ke Discord, dan penyesuaian workflow operasional.",
        "Mendesain pembagian role multi-agent berdasarkan fungsi bisnis, termasuk CEO agent untuk koordinasi, Sales agent untuk pipeline, Marketing agent untuk content workflow, dan AI Monitoring agent untuk pemantauan aktivitas.",
        "Membangun automation pipeline berbasis n8n, Docker, dan WSL untuk mendukung workflow konten YouTube dengan Hermes Agent via MCP sebagai orchestrator.",
        "Mengintegrasikan Telegram Bot API dan Discord Bot sebagai interface perintah, notifikasi, dan approval layer untuk sistem otomasi.",
        "Membuat dokumentasi teknis, SOP operasional, deployment guide, dan catatan arsitektur untuk sistem AI dan automation workflow.",
    ]:
        bullet(story, s, item)

    story.append(Paragraph("Full Stack Development & Internal Tools", s["label"]))
    for item in [
        "Mengembangkan LeadFinder AI, internal tool berbasis Next.js 15 dan SerpApi untuk membantu proses prospecting bisnis secara otomatis.",
        "Membangun dan memelihara aplikasi web menggunakan React, Next.js, TypeScript, Tailwind CSS, REST API, dan integrasi layanan pihak ketiga.",
        "Mengelola database, autentikasi, integrasi API, dan deployment aplikasi menggunakan Supabase, PostgreSQL, GitHub, dan Vercel.",
        "Melakukan troubleshooting, debugging, deployment, DNS setup, domain configuration, dan Google Search Console untuk proyek web klien.",
        "Mengembangkan website komersial untuk sektor hospitality, termasuk thesecretkarimunjawa.com dan floatingparadise.id, dengan skor performa PageSpeed 95, SEO 100, dan Accessibility 100.",
    ]:
        bullet(story, s, item)

    role(story, s, "PT. Graha Era Nusantara (Wartelsus)", "Indonesia", "Admin & Web Developer", "Sep 2025 - Des 2025")
    for item in [
        "Mendigitalisasi alur kerja internal dengan merancang dan membangun website operasional perusahaan untuk mengurangi dependensi pada pencatatan manual.",
        "Mengelola database internal dan berkoordinasi langsung dengan vendor pihak ketiga untuk kebutuhan sistem, operasional, dan integrasi data.",
    ]:
        bullet(story, s, item)

    role(story, s, "PT. Exi Global Indonesia", "Indonesia", "Business Analyst Intern", "Apr 2024 - Jul 2024")
    for item in [
        "Menerjemahkan kebutuhan operasional bisnis ke dalam spesifikasi teknis terstruktur untuk tim pengembang.",
        "Mendokumentasikan alur logika sistem melalui flowchart dan Entity Relationship Diagram (ERD) menggunakan draw.io.",
    ]:
        bullet(story, s, item)

    section(story, s, "Proyek Terpilih")
    for name, desc in [
        ("AI Agent Operations System", "Sistem multi-agent untuk mengotomasi koordinasi CRM, sales pipeline, marketing workflow, daily briefing, dan approval-based task execution melalui Telegram/Discord."),
        ("LeadFinder AI", "Internal prospecting tool berbasis Next.js 15 dan SerpApi untuk menemukan bisnis potensial tanpa website secara otomatis."),
        ("YouTube Automation Pipeline", "Workflow otomasi berbasis n8n, Docker, WSL, dan Hermes Agent via MCP untuk mendukung proses produksi konten."),
        ("Hospitality Website Projects", "Website komersial untuk thesecretkarimunjawa.com dan floatingparadise.id dengan fokus pada performa, SEO, accessibility, deployment, dan domain setup."),
    ]:
        story.append(Paragraph(f"<b>{name}:</b> {desc}", s["project"]))

    section(story, s, "Pendidikan")
    story.append(Paragraph("<b>Universitas Kristen Satya Wacana (UKSW)</b> | Salatiga, Indonesia", s["edu"]))
    story.append(Paragraph("Sarjana Sistem Informasi | 2018 - 2025 | IPK: 3.57 / 4.00", s["edu"]))

    doc.build(story)
    print(PDF_PATH.resolve())


if __name__ == "__main__":
    build_pdf()
