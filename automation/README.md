# אוטומציה — סוכני ה-AI (n8n)

תיקייה זו מכילה את ה-workflows של n8n שמפעילים את סוכני ה-AI, ואת ה-system prompts שלהם. ר' [`docs/architecture.md`](../docs/architecture.md) לארכיטקטורה המלאה.

## מבנה

```
automation/
├── n8n-workflows/          # ייצוא JSON של כל workflow (ניתן לייבוא ישיר ל-n8n)
│   └── research-agent.json
└── agents/                 # ה-system prompt המדויק של כל סוכן, כמסמך קריא
    └── research-supplier-agent.md
```

## מצב נוכחי

| Workflow | סטטוס | חסר כדי להפעיל בפועל |
|---|---|---|
| Research & Suppliers Agent | ✅ נבנה ואומת (מיובא ל-n8n מקומי בהצלחה) | credential אמיתי ל-Anthropic API; חיבור Approval Hub (Telegram) |

הסוכן נבדק במלואו **מבנית** — ה-workflow מיובא ל-n8n בלי שגיאות, כל הצמתים (trigger, בניית prompt, קריאת API, פענוח תשובה, בניית כרטיס אישור) מחוברים נכון. הוא **לא** נבדק קצה-לקצה עם קריאה אמיתית ל-Claude, כי זה דורש Anthropic API key אמיתי (Phase 0 שלך, ר' `docs/roadmap.md`) — אין להשתמש במפתחות ה-session של סביבת הפיתוח הזו לצורך זה, כי אלה שייכים למנוי Claude Code ולא לעסק.

## איך להריץ n8n מקומית

```bash
npm install -g n8n
export N8N_USER_FOLDER=~/.n8n
n8n start
# ממשק: http://localhost:5678
```

בהרצה הראשונה n8n מבקש ליצור חשבון owner מקומי (אימייל+סיסמה, לא נשלח לשום מקום חיצוני). לאחר מכן:

1. **ייבוא ה-workflow:** Settings → Import from File → `automation/n8n-workflows/research-agent.json` (או `n8n import:workflow --input=<path>` מה-CLI).
2. **הוספת credential ל-Anthropic:** Credentials → New → "Header Auth" → Header Name: `x-api-key`, Value: המפתח שלך. לחבר אותו לצומת "Call Claude - Research Agent" (הוא כרגע מצביע ל-credential placeholder).
3. **הרצה ידנית לבדיקה:** לחיצה על "Manual Run" בעורך.
4. **חיבור Approval Hub:** להחליף את צומת ה-NoOp "Send to Approval Hub" בצומת Telegram אמיתי (או Airtable/Sheets), אחרי שיש בוט טלגרם (ר' `docs/roadmap.md` Phase 0, סעיף 11).

## הוספת סוכן נוסף

לכל סוכן חדש (תוכן, מייל, שירות לקוחות, SEO): צור קובץ `agents/<agent-name>.md` עם ה-system prompt, ו-workflow תואם ב-`n8n-workflows/<agent-name>.json` באותה תבנית (trigger → בניית prompt → קריאת Claude → עיבוד תוצאה → פעולה/Approval Hub).
