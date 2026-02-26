import { useState, useRef, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { MessageCircle, X, Send, Sparkles, ArrowRight } from "lucide-react";

// ─── Types ────────────────────────────────────────────────

interface ChatMessage {
  id: string;
  text: string;
  role: "user" | "agent";
  timestamp: number;
  domain?: string;
  actions?: QuickAction[];
}

interface QuickAction {
  label: string;
  value: string;
}

// ─── Simulated agent responses ────────────────────────────

type AgentDomain =
  | "orchestrator"
  | "screening"
  | "maintenance"
  | "accounting"
  | "leasing"
  | "properties";

function detectDomain(text: string, currentPath: string): AgentDomain {
  const lower = text.toLowerCase();

  // Keyword-based
  if (/prospect|applicant|screen|background check|invite/i.test(lower))
    return "screening";
  if (/work order|maintenance|repair|fix|broken|leak|vendor|plumb|electric|hvac/i.test(lower))
    return "maintenance";
  if (/payment|charge|balance|rent|collect|overdue|delinquen|accounting|transaction/i.test(lower))
    return "accounting";
  if (/lease|renew|expir|move.?in|move.?out/i.test(lower)) return "leasing";
  if (/property|properties|unit|vacant|vacancy|occupancy|portfolio/i.test(lower))
    return "properties";

  // Page-context fallback
  if (currentPath.includes("/screening")) return "screening";
  if (currentPath.includes("/maintenance")) return "maintenance";
  if (currentPath.includes("/accounting")) return "accounting";
  if (currentPath.includes("/leasing")) return "leasing";
  if (currentPath.includes("/properties")) return "properties";

  return "orchestrator";
}

const DEMO_RESPONSES: Record<AgentDomain, Array<{
  patterns: RegExp[];
  text: string;
  actions?: QuickAction[];
}>> = {
  orchestrator: [
    {
      patterns: [/help|what can you do|\?$/],
      text: "I'm your Rentvine AI assistant. I can help with:\n\n• **Screening** — prospects, applications, invitations\n• **Maintenance** — work orders, vendors, emergencies\n• **Accounting** — payments, charges, balances\n• **Leasing** — leases, renewals, move-in/out\n• **Properties** — units, vacancies, occupancy\n\nWhat would you like to do?",
      actions: [
        { label: "Show prospects", value: "Show new screening prospects" },
        { label: "Open work orders", value: "Show open work orders" },
        { label: "Outstanding balances", value: "Show outstanding balances" },
        { label: "Vacancies", value: "Show vacancy report" },
      ],
    },
    {
      patterns: [/hi|hello|hey|good morning|good afternoon/],
      text: "Hi there! 👋 I'm your Rentvine assistant. I can see you're on the dashboard — want me to pull up a quick summary or help with something specific?",
      actions: [
        { label: "Quick status", value: "Give me a quick status overview" },
        { label: "Work orders", value: "Show open work orders" },
        { label: "Balances", value: "Show outstanding balances" },
      ],
    },
    {
      patterns: [/status|overview|summary|dashboard/],
      text: "**Quick Status Overview**\n\n🏠 **Properties:** 110 units, 86% occupancy\n🔧 **Maintenance:** 6 open work orders (2 overdue)\n💰 **Rent:** $239,700 monthly revenue\n📋 **Leasing:** 2 leases expiring in 30 days\n\nAnything you want to dive into?",
      actions: [
        { label: "Overdue work orders", value: "Show overdue work orders" },
        { label: "Expiring leases", value: "Show expiring leases" },
        { label: "Rent collection", value: "Show rent collection status" },
      ],
    },
  ],
  screening: [
    {
      patterns: [/prospect|new|applicant|show/],
      text: "**Screening Prospects** — 3 new:\n\n1. **Maria Santos** — new (maria@email.com)\n2. **David Kim** — new (d.kim@email.com)\n3. **Ashley Johnson** — invitation_sent\n\n4 applications in progress, 2 submitted awaiting review.",
      actions: [
        { label: "Send invitation", value: "Send screening invitation to Maria Santos" },
        { label: "Review submitted", value: "Show submitted applications" },
        { label: "Approve/Deny", value: "Show applications pending decision" },
      ],
    },
    {
      patterns: [/invite|invitation|send/],
      text: "✅ Screening invitation sent to **Maria Santos** at maria@email.com.\n\nShe'll receive an email with a link to complete the application. I'll notify you when she starts.",
      actions: [
        { label: "View prospects", value: "Show new screening prospects" },
        { label: "Check status", value: "Check application status for Maria Santos" },
      ],
    },
    {
      patterns: [/approve|submitted|pending|review/],
      text: "**Applications Pending Review:**\n\n1. 🟢 **James Rivera** — Score: 720 | Income: $5,200/mo | No evictions\n   → Oakwood Apartments, Unit 205\n\n2. 🟡 **Priya Patel** — Score: 645 | Income: $3,800/mo | 1 collection\n   → Pine St Complex, Unit 3B\n\nWould you like to approve or see full reports?",
      actions: [
        { label: "Approve James", value: "Approve James Rivera" },
        { label: "Full report", value: "Show full screening report for Priya Patel" },
      ],
    },
  ],
  maintenance: [
    {
      patterns: [/open|active|work order|show/],
      text: "**Open Work Orders** — 6 total:\n\n1. 🔴 **Water heater failure** — Oakwood #101 — Emergency\n2. 🟠 **AC not cooling** — Pine St #3B — High\n3. 🟡 **Leaky faucet** — Oakwood #205 — Medium\n4. 🟡 **Broken blinds** — Cedar Ln #2A — Medium\n5. 🟢 **Touch-up paint** — Oakwood #102 — Low\n6. 🟢 **Replace smoke detector** — Pine St #1A — Low\n\n⚠️ 2 overdue (open > 7 days)",
      actions: [
        { label: "Assign vendor", value: "Assign vendor to water heater failure" },
        { label: "Create new", value: "Create a new work order" },
        { label: "Overdue only", value: "Show overdue work orders" },
      ],
    },
    {
      patterns: [/assign|vendor/],
      text: "For the **water heater failure** at Oakwood #101:\n\n**Available Plumbing Vendors:**\n1. ⭐ **Mike's Plumbing** — 4.8★ — $85/hr — Available today\n2. **ProFlow Services** — 4.5★ — $95/hr — Available tomorrow\n3. **QuickFix Plumbing** — 4.2★ — $75/hr — Available today\n\nShall I assign Mike's Plumbing?",
      actions: [
        { label: "Assign Mike's", value: "Assign Mike's Plumbing to the water heater work order" },
        { label: "Try ProFlow", value: "Assign ProFlow Services" },
      ],
    },
    {
      patterns: [/create|new|submit/],
      text: "To create a work order, I need:\n\n1. **Property/Unit** — which property?\n2. **Description** — what's the issue?\n3. **Priority** — low, medium, high, or emergency?\n\nYou can say it all at once, like: *\"Broken garbage disposal at Oakwood #103, medium priority\"*",
      actions: [
        { label: "Emergency", value: "Create emergency work order" },
        { label: "Medium priority", value: "Create medium priority work order" },
      ],
    },
    {
      patterns: [/overdue/],
      text: "**Overdue Work Orders** (open > 7 days):\n\n1. 🟡 **Broken blinds** — Cedar Ln #2A — 12 days open\n   No vendor assigned yet\n\n2. 🟢 **Replace smoke detector** — Pine St #1A — 9 days open\n   Vendor assigned, awaiting scheduling\n\nWant me to escalate these or find vendors?",
      actions: [
        { label: "Find vendor for blinds", value: "Find vendor for broken blinds at Cedar Ln" },
        { label: "Follow up", value: "Send follow up to vendor for smoke detector" },
      ],
    },
    {
      patterns: [/emergency|flood|leak|fire|gas/],
      text: "**⚠️ EMERGENCY DETECTED**\n\nImmediate steps:\n1. 🚨 If gas leak or fire — **call 911**\n2. 🔧 Shut off water main if flooding\n3. I'm creating a high-priority work order now\n4. Notifying on-call vendors immediately\n\nWhat property and unit is this for?",
      actions: [
        { label: "Oakwood Apartments", value: "Emergency at Oakwood Apartments" },
        { label: "Pine St Complex", value: "Emergency at Pine St Complex" },
      ],
    },
  ],
  accounting: [
    {
      patterns: [/balance|outstanding|overdue|owed/],
      text: "**Outstanding Balances — $17,126 total**\n\n🔴 **Chris Evans** — Oakwood #303 — **$1,525** (45 days overdue)\n🔴 **Lisa Park** — Pine St #2A — **$3,200** (30 days overdue)\n🟡 **Tom Bradley** — Cedar Ln #1B — **$1,650** (15 days overdue)\n🟡 **4 others** — **$10,751** (current/< 15 days)\n\nCollection rate this month: **87.3%**",
      actions: [
        { label: "Send reminders", value: "Send past due reminders to overdue tenants" },
        { label: "Payment plan", value: "Set up payment plan for Chris Evans" },
        { label: "View all", value: "Show all transactions this month" },
      ],
    },
    {
      patterns: [/payment|paid|received|collect|rent/],
      text: "**Rent Collection — February 2026**\n\n📥 **Collected:** $208,900 of $239,700\n📊 **Collection rate:** 87.3%\n⏰ **Pending:** $30,800 (12 tenants)\n🔴 **Overdue:** $6,375 (3 tenants)\n\n15 payments received this week via ACH, 2 via check.",
      actions: [
        { label: "Record payment", value: "Record a rent payment" },
        { label: "Send reminders", value: "Send rent reminders to pending tenants" },
        { label: "Overdue details", value: "Show outstanding balances" },
      ],
    },
    {
      patterns: [/transaction|ledger|charge/],
      text: "**Recent Transactions:**\n\n1. 📥 **$1,350** — Sarah Mitchell payment (ACH) — Feb 1\n2. 📥 **$1,650** — James Rodriguez payment (ACH) — Feb 1\n3. 📤 **$850** — Maintenance charge — Mike's Plumbing — Feb 3\n4. 📥 **$1,350** — Emily Chen payment (ACH) — Feb 5\n5. 📤 **$125** — Late fee posted — Chris Evans — Feb 6\n\n23 transactions this month.",
      actions: [
        { label: "Post charge", value: "Post a new charge" },
        { label: "Record payment", value: "Record a payment" },
        { label: "Owner statements", value: "Show owner distribution status" },
      ],
    },
  ],
  leasing: [
    {
      patterns: [/expir|renew|ending/],
      text: "**Expiring Leases — 6 need attention:**\n\n⚠️ **Next 30 days:**\n1. Sarah Mitchell — Oakwood #101 — expires 3/15/2026 — $1,350/mo\n2. Tom Bradley — Cedar Ln #1B — expires 3/22/2026 — $1,450/mo\n\n⏰ **Next 60 days:**\n3. Emily Chen — Oakwood #103 — expires 4/30/2026 — $1,350/mo\n4. Lisa Park — Pine St #2A — expires 5/1/2026 — $1,500/mo\n\nStart renewals?",
      actions: [
        { label: "Renew Sarah's lease", value: "Initiate renewal for Sarah Mitchell" },
        { label: "Renew all", value: "Send renewal offers to all expiring tenants" },
        { label: "Market analysis", value: "Compare current rents to market rates" },
      ],
    },
    {
      patterns: [/active|current|lease|show/],
      text: "**Active Leases — 18 total**\n\n✅ Oakwood Apartments: 8 leases ($11,000/mo)\n✅ Pine St Complex: 5 leases ($7,500/mo)\n✅ Cedar Lane: 3 leases ($4,350/mo)\n✅ Maple Ridge: 2 leases ($3,200/mo)\n\nAverage rent: **$1,898/mo** | Occupancy: **87.3%**",
      actions: [
        { label: "Expiring soon", value: "Show expiring leases" },
        { label: "By property", value: "Show leases for Oakwood Apartments" },
      ],
    },
    {
      patterns: [/move/],
      text: "**Upcoming Move Activity:**\n\n📦 **Move-outs:**\n• Sarah Mitchell — Oakwood #101 — Mar 15\n  *Notice received, inspection not scheduled*\n\n📦 **Move-ins:**\n• James Rivera — Oakwood #205 — Mar 1 (pending approval)\n  *Background check complete, lease pending*\n\nNeed to schedule inspections or create turnover work orders?",
      actions: [
        { label: "Schedule inspection", value: "Schedule move-out inspection for Sarah Mitchell" },
        { label: "Turnover work order", value: "Create turnover work order for Oakwood #101" },
      ],
    },
  ],
  properties: [
    {
      patterns: [/vacant|vacancy|available|empty/],
      text: "**Vacancy Report — 86% Occupancy**\n\n15 vacant of 110 total units:\n\n🏠 **Oakwood Apartments** — 3 vacant\n  • #108 (2bd/1ba) — 22 days — $1,350/mo\n  • #205 (1bd/1ba) — 5 days — $1,100/mo\n  • #302 (3bd/2ba) — 41 days ⚠️ — $1,800/mo\n\n🏠 **Pine St Complex** — 2 vacant\n  • #1C (1bd/1ba) — 8 days — $1,200/mo\n  • #4A (2bd/2ba) — 15 days — $1,550/mo\n\n⚠️ 3 units vacant >30 days need attention.",
      actions: [
        { label: "List on market", value: "List vacant units on rental market" },
        { label: "Schedule showings", value: "Schedule showings for Oakwood #302" },
        { label: "Price analysis", value: "Run market rent comparison" },
      ],
    },
    {
      patterns: [/propert|portfolio|unit|show|list/],
      text: "**Portfolio Overview — ABC Property Mgmt**\n\n1. **Oakwood Apartments** — 42 units (38 occupied) — $239,700/mo\n2. **Pine St Complex** — 28 units (25 occupied) — $156,400/mo\n3. **Cedar Lane Townhomes** — 18 units (16 occupied) — $97,200/mo\n4. **Maple Ridge** — 12 units (10 occupied) — $62,400/mo\n5. **Elm Court** — 10 units (6 occupied) — $48,000/mo\n\nTotal: **110 units** | **$603,700/mo gross**",
      actions: [
        { label: "Vacancies", value: "Show vacancy report" },
        { label: "Performance", value: "Show property performance metrics" },
        { label: "Oakwood details", value: "Show details for Oakwood Apartments" },
      ],
    },
    {
      patterns: [/performance|metric|occupancy/],
      text: "**Property Performance Metrics:**\n\n| Property | Occupancy | Avg Rent | Turnover |\n|----------|-----------|----------|----------|\n| Oakwood | 90.5% | $1,628 | 2.1/yr |\n| Pine St | 89.3% | $1,430 | 1.8/yr |\n| Cedar Ln | 88.9% | $1,450 | 1.5/yr |\n| Maple Ridge | 83.3% | $1,600 | 2.4/yr |\n| Elm Court | 60.0% ⚠️ | $1,200 | 3.2/yr |\n\n⚠️ Elm Court needs attention — high turnover, low occupancy.",
      actions: [
        { label: "Elm Court plan", value: "What can I do about Elm Court occupancy?" },
        { label: "Market comparison", value: "Compare rents to market rates" },
      ],
    },
  ],
};

function getAgentResponse(
  text: string,
  domain: AgentDomain
): { text: string; domain: AgentDomain; actions?: QuickAction[] } {
  // Search the target domain first
  const domainResponses = DEMO_RESPONSES[domain];
  for (const resp of domainResponses) {
    if (resp.patterns.some((p) => p.test(text.toLowerCase()))) {
      return { text: resp.text, domain, actions: resp.actions };
    }
  }

  // Fall back to orchestrator
  for (const resp of DEMO_RESPONSES.orchestrator) {
    if (resp.patterns.some((p) => p.test(text.toLowerCase()))) {
      return {
        text: resp.text,
        domain: "orchestrator",
        actions: resp.actions,
      };
    }
  }

  // Default domain response (first response)
  if (domainResponses.length > 0) {
    const first = domainResponses[0];
    return { text: first.text, domain, actions: first.actions };
  }

  // Ultimate fallback
  return {
    text: "I can help with screening, maintenance, accounting, leasing, and properties. What would you like to know?",
    domain: "orchestrator",
    actions: [
      { label: "Show prospects", value: "Show new screening prospects" },
      { label: "Work orders", value: "Show open work orders" },
      { label: "Balances", value: "Show outstanding balances" },
      { label: "Vacancies", value: "Show vacancy report" },
    ],
  };
}

const DOMAIN_LABELS: Record<AgentDomain, string> = {
  orchestrator: "Rentvine Assistant",
  screening: "Screening Agent",
  maintenance: "Maintenance Agent",
  accounting: "Accounting Agent",
  leasing: "Leasing Agent",
  properties: "Properties Agent",
};

const DOMAIN_COLORS: Record<AgentDomain, string> = {
  orchestrator: "bg-rv-blue",
  screening: "bg-emerald-600",
  maintenance: "bg-amber-600",
  accounting: "bg-violet-600",
  leasing: "bg-sky-600",
  properties: "bg-teal-600",
};

// ─── Component ────────────────────────────────────────────

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [activeDomain, setActiveDomain] = useState<AgentDomain>("orchestrator");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const location = useLocation();

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Page context label
  const pageSection = (() => {
    const path = location.pathname;
    if (path.includes("/screening")) return "Screening";
    if (path.includes("/maintenance")) return "Maintenance";
    if (path.includes("/accounting")) return "Accounting";
    if (path.includes("/leasing")) return "Leasing";
    if (path.includes("/properties")) return "Properties";
    if (path.includes("/dashboard") || path === "/") return "Dashboard";
    return null;
  })();

  function sendMessage(text: string) {
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      text: text.trim(),
      role: "user",
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate agent processing delay
    const delay = 600 + Math.random() * 800;
    setTimeout(() => {
      const domain = detectDomain(text, location.pathname);
      const response = getAgentResponse(text, domain);
      setActiveDomain(response.domain);

      const agentMsg: ChatMessage = {
        id: crypto.randomUUID(),
        text: response.text,
        role: "agent",
        timestamp: Date.now(),
        domain: response.domain,
        actions: response.actions,
      };
      setMessages((prev) => [...prev, agentMsg]);
      setIsTyping(false);
    }, delay);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  }

  function handleOpen() {
    setIsOpen(true);
    // Show welcome if first open
    if (messages.length === 0) {
      setIsTyping(true);
      setTimeout(() => {
        const welcomeDomain = detectDomain("", location.pathname);
        let welcomeText: string;
        let welcomeActions: QuickAction[];

        if (pageSection && pageSection !== "Dashboard") {
          welcomeText = `Hi! 👋 I see you're in **${pageSection}**. I can help with anything here — or switch to another area.\n\nWhat would you like to do?`;
          welcomeActions = [
            ...(DEMO_RESPONSES[welcomeDomain as AgentDomain]?.[0]?.actions ?? []).slice(0, 2),
            { label: "Full overview", value: "Give me a quick status overview" },
          ];
        } else {
          welcomeText = "Hi! 👋 I'm your **Rentvine AI assistant**. I work across screening, maintenance, accounting, leasing, and properties — and I follow your context as you navigate.\n\nTry asking me anything, or pick a quick action below.";
          welcomeActions = [
            { label: "Quick status", value: "Give me a quick status overview" },
            { label: "Open work orders", value: "Show open work orders" },
            { label: "Balances", value: "Show outstanding balances" },
            { label: "Vacancies", value: "Show vacancy report" },
          ];
        }

        setMessages([{
          id: crypto.randomUUID(),
          text: welcomeText,
          role: "agent",
          timestamp: Date.now(),
          domain: welcomeDomain !== "orchestrator" ? welcomeDomain : "orchestrator",
          actions: welcomeActions,
        }]);
        setIsTyping(false);
      }, 400);
    }
  }

  // ─── Render helpers ─────────────────────────────

  function renderMessageText(text: string) {
    // Minimal markdown: bold, bullet points, headings, line breaks
    const html = text
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/^### (.+)$/gm, '<div class="font-semibold text-sm mt-2 mb-1">$1</div>')
      .replace(/^## (.+)$/gm, '<div class="font-semibold mt-2 mb-1">$1</div>')
      .replace(/^[•●] (.+)$/gm, '<div class="flex gap-1.5 ml-1"><span class="text-rv-blue shrink-0">•</span><span>$1</span></div>')
      .replace(/^\d+\. (.+)$/gm, '<div class="ml-1">$&</div>')
      .replace(/\n/g, "<br />");
    return <div dangerouslySetInnerHTML={{ __html: html }} />;
  }

  return (
    <>
      {/* ── FAB ─────────────────────────────────── */}
      {!isOpen && (
        <button
          onClick={handleOpen}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-rv-blue text-white shadow-lg hover:bg-rv-blue-dark transition-all hover:scale-105 flex items-center justify-center group"
        >
          <MessageCircle size={24} />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-rv-green rounded-full border-2 border-white" />
        </button>
      )}

      {/* ── Chat Panel ──────────────────────────── */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[420px] max-w-[calc(100vw-48px)] h-[620px] max-h-[calc(100vh-48px)] flex flex-col rounded-2xl bg-white shadow-2xl border border-rv-lightgray overflow-hidden animate-in">
          {/* Header */}
          <div className={`${DOMAIN_COLORS[activeDomain]} px-5 py-4 flex items-center justify-between shrink-0 transition-colors duration-300`}>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <Sparkles size={16} className="text-white" />
              </div>
              <div>
                <div className="text-white font-semibold text-sm">
                  {DOMAIN_LABELS[activeDomain]}
                </div>
                {pageSection && (
                  <div className="text-white/70 text-xs">
                    📍 {pageSection}
                  </div>
                )}
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white transition-colors p-1"
            >
              <X size={18} />
            </button>
          </div>

          {/* Channel indicator */}
          <div className="px-4 py-2 bg-rv-blue-light border-b border-rv-lightgray flex items-center gap-2 text-xs text-rv-blue-dark shrink-0">
            <span className="font-medium">Channel:</span>
            <span className="px-2 py-0.5 bg-rv-blue-hover rounded-full text-rv-blue-dark font-medium">Desktop</span>
            <span className="text-rv-gray">•</span>
            <span className="text-rv-gray">Also available on Mobile & SMS</span>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-[#f8fafc]">
            {messages.map((msg) => (
              <div key={msg.id}>
                <div
                  className={`max-w-[88%] rounded-xl px-3.5 py-2.5 text-[13px] leading-relaxed ${
                    msg.role === "user"
                      ? "ml-auto bg-rv-blue text-white rounded-br-sm"
                      : "mr-auto bg-white text-rv-black border border-rv-lightgray rounded-bl-sm shadow-sm"
                  }`}
                >
                  {msg.role === "agent" && msg.domain && msg.domain !== "orchestrator" && (
                    <div className="text-[10px] font-semibold text-rv-blue mb-1 flex items-center gap-1">
                      <ArrowRight size={10} />
                      {DOMAIN_LABELS[msg.domain as AgentDomain]}
                    </div>
                  )}
                  {renderMessageText(msg.text)}
                </div>

                {/* Quick actions */}
                {msg.role === "agent" && msg.actions && msg.actions.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2 ml-1">
                    {msg.actions.map((action) => (
                      <button
                        key={action.value}
                        onClick={() => sendMessage(action.value)}
                        className="px-3 py-1.5 text-xs font-medium text-rv-blue bg-white border border-rv-blue/30 rounded-full hover:bg-rv-blue hover:text-white transition-colors"
                      >
                        {action.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="max-w-[88%] mr-auto bg-white border border-rv-lightgray rounded-xl px-4 py-3 shadow-sm">
                <div className="flex gap-1.5">
                  <span className="w-2 h-2 bg-rv-gray rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 bg-rv-gray rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 bg-rv-gray rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="px-4 py-3 border-t border-rv-lightgray bg-white shrink-0">
            <div className="flex items-end gap-2">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about screening, maintenance, accounting..."
                rows={1}
                className="flex-1 resize-none border border-rv-lightgray rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-rv-blue transition-colors max-h-[100px]"
                style={{
                  height: "auto",
                  minHeight: "40px",
                }}
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement;
                  target.style.height = "auto";
                  target.style.height = Math.min(target.scrollHeight, 100) + "px";
                }}
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || isTyping}
                className="shrink-0 w-10 h-10 rounded-lg bg-rv-blue text-white flex items-center justify-center hover:bg-rv-blue-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Inline animation keyframe */}
      <style>{`
        .animate-in {
          animation: rvSlideIn 0.25s ease-out;
        }
        @keyframes rvSlideIn {
          from { opacity: 0; transform: translateY(16px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </>
  );
}
