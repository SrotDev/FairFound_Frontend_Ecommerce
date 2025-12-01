import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEcommerce } from "@/context/EcommerceContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SimpleBarChart } from "@/components/charts/SimpleBarChart";
import { SimpleLineChart } from "@/components/charts/SimpleLineChart";
import { ArrowRight, Smile, Meh, Frown, TrendingUp, Trash2, Plus, MessageSquare, AlertTriangle } from "lucide-react";

const SentimentAnalysis = () => {
  const navigate = useNavigate();
  const { sentimentSnapshot, sentimentTrend, feedbackEntries = [], addFeedbackEntry = () => {}, deleteFeedbackEntry = () => {} } = useEcommerce();

  const [newText, setNewText] = useState("");
  const [adding, setAdding] = useState(false);

  const sentimentData = [
    { label: "Positive", value: sentimentSnapshot.positivePercentage, color: "hsl(var(--success))" },
    { label: "Neutral", value: sentimentSnapshot.neutralPercentage, color: "hsl(var(--muted-foreground))" },
    { label: "Negative", value: sentimentSnapshot.negativePercentage, color: "hsl(var(--destructive))" },
  ];

  const trendData = sentimentTrend.map((t) => ({
    label: t.periodLabel,
    value: t.positiveScore,
  }));

  const improvements = [
    {
      category: "Product Descriptions",
      suggestion: "Clarify material and sizing details for top selling products to reduce confusion.",
    },
    {
      category: "Pricing",
      suggestion: "Negative feedback mentions 'too expensive'—consider targeted discounts for high-competition items.",
    },
    {
      category: "Customer Service",
      suggestion: "Respond faster to negative reviews within 24 hours to show you care.",
    },
    {
      category: "Shipping",
      suggestion: "Late shipping is a common complaint. Consider faster shipping options or clearer delivery estimates.",
    },
  ];

  return (
    <div className="container py-12 max-w-7xl">
      <div className="mb-8 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Customer Sentiment Analysis</h1>
          <p className="text-muted-foreground max-w-xl">Paste customer feedback (reviews, messages, comments). We analyze sentiment, surface patterns, and generate actionable improvements.</p>
        </div>
        <div className="flex gap-2">
          <Badge variant="secondary" className="text-sm">{feedbackEntries.length} feedback entries</Badge>
          <Button variant="outline" size="sm" disabled={feedbackEntries.length === 0}>Export CSV</Button>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left: input, feedback list, charts, keywords, trend, improvements, CTA */}
        <div className="lg:col-span-2 space-y-8">
          <Card className="p-6 space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2"><MessageSquare className="h-4 w-4"/> Add Feedback</h3>
            <Textarea placeholder="Paste a customer comment or review here..." value={newText} onChange={(e) => setNewText(e.target.value)} className="min-h-[120px]" />
            <div className="flex gap-2">
              <Button onClick={() => { if (!newText.trim()) return; setAdding(true); addFeedbackEntry(newText.trim()); setNewText(""); setAdding(false); }} disabled={adding || !newText.trim()} className="gap-2">
                <Plus className="h-4 w-4"/> Analyze & Save
              </Button>
              {newText && (
                <Button variant="outline" onClick={() => setNewText("")}>Clear</Button>
              )}
            </div>
            <p className="text-xs text-muted-foreground">We run lightweight on-device analysis (no data leaves your browser).</p>
          </Card>

          <Card className="p-6 space-y-4">
            <h3 className="text-lg font-semibold">Analyzed Feedback</h3>
            {feedbackEntries.length === 0 && (
              <p className="text-sm text-muted-foreground">No feedback yet. Add your first entry above.</p>
            )}
            <div className="space-y-4">
              {feedbackEntries.map((r) => (
                <div key={r.id} className="rounded-lg border border-border/50 p-4 space-y-3 bg-muted/30">
                  <div className="flex items-start justify-between gap-4">
                    <p className="text-sm leading-relaxed whitespace-pre-line">{r.text}</p>
                    <Button variant="ghost" size="sm" onClick={() => deleteFeedbackEntry(r.id)} className="text-muted-foreground hover:text-destructive">
                      <Trash2 className="h-4 w-4"/>
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <Badge variant={r.label === 'positive' ? 'default' : r.label === 'negative' ? 'destructive' : 'secondary'}>
                      {r.label.toUpperCase()} ({(r.score*100).toFixed(0)})
                    </Badge>
                    {r.categories.map(c => (
                      <Badge key={c} variant="outline" className="uppercase tracking-wide">{c}</Badge>
                    ))}
                  </div>
                  {r.suggestions.length > 0 && (
                    <div className="text-xs bg-accent/10 rounded-md p-3 space-y-1">
                      <p className="font-semibold text-accent">Suggestions:</p>
                      <ul className="list-disc ml-4 space-y-1">
                        {r.suggestions.map(s => <li key={s}>{s}</li>)}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Top Positive Keywords</h3>
              <div className="flex flex-wrap gap-2">
                {sentimentSnapshot.topPositiveKeywords.map((keyword, index) => (
                  <Badge key={index} className="bg-success/10 text-success border-success/20">{keyword}</Badge>
                ))}
              </div>
            </Card>
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Top Negative Keywords</h3>
              <div className="flex flex-wrap gap-2">
                {sentimentSnapshot.topNegativeKeywords.map((keyword, index) => (
                  <Badge key={index} className="bg-destructive/10 text-destructive border-destructive/20">{keyword}</Badge>
                ))}
              </div>
            </Card>
          </div>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Sentiment Trend Over Time</h3>
            <SimpleLineChart data={trendData} color="hsl(var(--success))" />
            <div className="mt-4 p-4 bg-success/5 border border-success/20 rounded-lg">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-success" />
                <p className="text-sm text-success-foreground">Overall sentiment has improved by 8% in the last 4 weeks. Keep up the good work!</p>
              </div>
            </div>
          </Card>

          <div className="flex justify-center">
            <Button size="lg" onClick={() => navigate("/ecommerce/roadmap")} className="bg-primary hover:bg-primary/90 text-primary-foreground">Improve your product visibility <ArrowRight className="ml-2 h-5 w-5" /></Button>
          </div>
        </div>

        {/* Right: summary & next steps */}
        <div className="space-y-8">
          <Card className="p-6 space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2"><TrendingUp className="h-4 w-4"/> Sentiment Summary</h3>
            <div className="grid grid-cols-3 gap-3 text-sm">
              <div className="rounded-md border p-3 flex flex-col items-center">
                <span className="text-[10px] tracking-wide font-semibold text-muted-foreground">POSITIVE</span>
                <span className="mt-1 text-xl font-bold">{sentimentSnapshot.positivePercentage}</span>
              </div>
              <div className="rounded-md border p-3 flex flex-col items-center">
                <span className="text-[10px] tracking-wide font-semibold text-muted-foreground">NEUTRAL</span>
                <span className="mt-1 text-xl font-bold">{sentimentSnapshot.neutralPercentage}</span>
              </div>
              <div className="rounded-md border p-3 flex flex-col items-center">
                <span className="text-[10px] tracking-wide font-semibold text-muted-foreground">NEGATIVE</span>
                <span className="mt-1 text-xl font-bold">{sentimentSnapshot.negativePercentage}</span>
              </div>
            </div>
            <div className="text-xs text-muted-foreground">Average sentiment score: <span className="font-semibold">{sentimentSnapshot.avgScore}</span> (−100 to 100 scale)</div>
            {sentimentSnapshot.topCategories && sentimentSnapshot.topCategories.length > 0 && (
              <div className="text-xs">
                <p className="font-semibold mb-1">Top recurring themes:</p>
                <div className="flex flex-wrap gap-2">
                  {sentimentSnapshot.topCategories.map((c, i) => <Badge key={i} variant="outline" className="uppercase tracking-wide">{c}</Badge>)}
                </div>
              </div>
            )}
          </Card>

          <Card className="p-6 space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2"><AlertTriangle className="h-4 w-4"/> Actionable Next Steps</h3>
            {improvements.length === 0 ? (
              <p className="text-sm text-muted-foreground">Add more feedback to see targeted improvement actions.</p>
            ) : (
              <ul className="list-disc ml-4 space-y-2 text-sm">
                {improvements.map((item, index) => <li key={index}>{item.suggestion}</li>)}
              </ul>
            )}
            {improvements.length > 0 && (
              <p className="text-xs text-muted-foreground">Focus on 2–3 items this week; mark improvements in your roadmap.</p>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SentimentAnalysis;
