import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Download, FileJson, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type ConversationResult = {
  id: string;
  patientId: string;
  timestamp: Date;
  summary: string;
  conversationLength: number;
};

const Results = () => {
  const { toast } = useToast();
  const [selectedResult, setSelectedResult] = useState<string | null>(null);

  // Mock data - in real implementation, this would come from the backend
  const mockResults: ConversationResult[] = [
    {
      id: "1",
      patientId: "P001",
      timestamp: new Date(),
      summary: "Chest X-ray analysis with prescription review",
      conversationLength: 12,
    },
    {
      id: "2",
      patientId: "P002",
      timestamp: new Date(Date.now() - 86400000),
      summary: "MRI scan interpretation and treatment plan",
      conversationLength: 8,
    },
    {
      id: "3",
      patientId: "P003",
      timestamp: new Date(Date.now() - 172800000),
      summary: "CT scan analysis with medication recommendations",
      conversationLength: 15,
    },
  ];

  const handleDownload = (id: string) => {
    // Mock download
    const jsonData = {
      conversationId: id,
      messages: [
        { role: "user", content: "What does this image show?" },
        { role: "assistant", content: "Based on the medical image analysis..." },
      ],
      timestamp: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(jsonData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `conversation-${id}.json`;
    a.click();

    toast({
      title: "Download Started",
      description: `Conversation ${id} JSON file is downloading.`,
    });
  };

  const handleView = (id: string) => {
    setSelectedResult(id === selectedResult ? null : id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Conversation Results
            </h1>
            <p className="text-muted-foreground text-lg">
              View and download JSON conversation files from your medical consultations
            </p>
          </div>

          <div className="grid gap-4">
            {mockResults.map((result) => (
              <Card
                key={result.id}
                className="hover:shadow-lg transition-all hover:scale-[1.01]"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="flex items-center gap-2">
                        <FileJson className="h-5 w-5 text-primary" />
                        Conversation {result.id}
                      </CardTitle>
                      <CardDescription>
                        Patient ID: {result.patientId} • {result.conversationLength} messages
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleView(result.id)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        {selectedResult === result.id ? "Hide" : "View"}
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleDownload(result.id)}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                
                {selectedResult === result.id && (
                  <CardContent>
                    <ScrollArea className="h-64 w-full rounded-md border p-4 bg-muted/50">
                      <pre className="text-sm">
                        {JSON.stringify(
                          {
                            conversationId: result.id,
                            patientId: result.patientId,
                            timestamp: result.timestamp.toISOString(),
                            summary: result.summary,
                            messages: [
                              {
                                role: "user",
                                content: "What does the medical image show?",
                                timestamp: result.timestamp.toISOString(),
                              },
                              {
                                role: "assistant",
                                content:
                                  "Based on the medical image analysis, I can identify several key findings that are relevant to the patient's condition. The imaging shows...",
                                timestamp: result.timestamp.toISOString(),
                              },
                              {
                                role: "user",
                                content: "What are the recommended next steps?",
                                timestamp: result.timestamp.toISOString(),
                              },
                              {
                                role: "assistant",
                                content:
                                  "Based on the analysis and prescription, I recommend the following steps: 1) Continue with prescribed medication, 2) Schedule follow-up imaging in 2 weeks, 3) Monitor symptoms closely.",
                                timestamp: result.timestamp.toISOString(),
                              },
                            ],
                          },
                          null,
                          2
                        )}
                      </pre>
                    </ScrollArea>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>

          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle>Export Format</CardTitle>
              <CardDescription>
                All conversations are exported in JSON format following the schema required by the capstone project
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <p className="font-semibold">JSON Structure:</p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>conversationId: Unique identifier</li>
                  <li>patientId: Patient reference</li>
                  <li>timestamp: ISO 8601 format</li>
                  <li>messages: Array of role-content pairs with timestamps</li>
                  <li>summary: Brief description of the consultation</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Results;
