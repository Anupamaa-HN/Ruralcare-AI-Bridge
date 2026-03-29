import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Bot, Calendar, Loader2 } from "lucide-react";

interface Consultation {
  id: string;
  symptoms: string;
  ai_response: string | null;
  severity: string | null;
  created_at: string;
}

const History = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) navigate("/auth");
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (!user) return;
    const fetchHistory = async () => {
      const { data } = await supabase
        .from("consultations")
        .select("id, symptoms, ai_response, severity, created_at")
        .order("created_at", { ascending: false })
        .limit(50);
      setConsultations((data as Consultation[]) ?? []);
      setLoading(false);
    };
    fetchHistory();
  }, [user]);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </button>

        <h1 className="text-3xl font-bold text-foreground mb-2">
          Consultation History • परामर्श इतिहास
        </h1>
        <p className="text-muted-foreground mb-8">Your past health consultations with Swasthya AI</p>

        {consultations.length === 0 ? (
          <div className="bg-card rounded-2xl border border-border/50 p-12 text-center">
            <Bot className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg font-medium text-foreground">No consultations yet</p>
            <p className="text-muted-foreground mt-1">Start a chat with Swasthya AI to get health guidance</p>
            <Button onClick={() => navigate("/")} className="mt-4">
              Start Consultation
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {consultations.map((c) => (
              <div key={c.id} className="bg-card rounded-2xl border border-border/50 p-5">
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                  <Calendar className="w-3 h-3" />
                  {new Date(c.created_at).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                  {c.severity && c.severity !== "unknown" && (
                    <span className="ml-2 px-2 py-0.5 rounded-full bg-accent/20 text-accent-foreground text-xs">
                      {c.severity}
                    </span>
                  )}
                </div>
                <p className="font-medium text-foreground mb-2">Symptoms: {c.symptoms}</p>
                {c.ai_response && (
                  <p className="text-sm text-muted-foreground whitespace-pre-line line-clamp-4">
                    {c.ai_response}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
