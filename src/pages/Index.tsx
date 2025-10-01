import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, MessageSquare, FileJson, Activity, Brain, Stethoscope } from "lucide-react";
import heroImage from "@/assets/hero-medical.jpg";
import medicalIcon from "@/assets/medical-ai-icon.png";

const Index = () => {
  const features = [
    {
      icon: Upload,
      title: "Upload Medical Data",
      description: "Upload medical images (X-rays, MRIs, CT scans) along with prescriptions and patient details.",
    },
    {
      icon: MessageSquare,
      title: "AI-Powered Chat",
      description: "Engage in multimodal conversations with our AI assistant for clinical insights and decision support.",
    },
    {
      icon: FileJson,
      title: "Export Results",
      description: "Download complete conversation transcripts in JSON format for record-keeping and analysis.",
    },
  ];

  const capabilities = [
    {
      icon: Brain,
      title: "Multimodal AI Analysis",
      description: "Powered by Gemini 2.5 Flash for text and medical image understanding",
    },
    {
      icon: Stethoscope,
      title: "Clinical Decision Support",
      description: "AI-assisted triage, diagnosis suggestions, and treatment recommendations",
    },
    {
      icon: Activity,
      title: "Cross-Modal Reasoning",
      description: "Correlates medical images with patient history and prescriptions",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10" />
        <div className="container mx-auto px-4 py-20 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center gap-3">
                <img src={medicalIcon} alt="Medical AI Icon" className="w-12 h-12" />
                <span className="text-sm font-semibold text-primary uppercase tracking-wider">
                  HAAI++ Capstone Project
                </span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Multimodal Medical Assistant
                </span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                AI-powered clinical decision support system that processes medical images, 
                prescriptions, and patient data to provide intelligent healthcare insights.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="shadow-lg hover:shadow-xl transition-shadow">
                  <Link to="/upload">Get Started</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to="/chat">View Demo</Link>
                </Button>
              </div>
            </div>
            
            <div className="relative animate-fade-in">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-3xl" />
              <img 
                src={heroImage} 
                alt="Medical AI Dashboard" 
                className="relative rounded-2xl shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold">Key Features</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Comprehensive multimodal analysis combining medical imaging with clinical data
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index} 
                className="hover:shadow-lg transition-all hover:scale-105 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="bg-muted/50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold">AI Capabilities</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Powered by state-of-the-art multimodal AI models
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {capabilities.map((capability, index) => {
              const Icon = capability.icon;
              return (
                <Card 
                  key={index} 
                  className="text-center hover:shadow-lg transition-all animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="pt-6 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center mx-auto">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold text-lg">{capability.title}</h3>
                      <p className="text-sm text-muted-foreground">{capability.description}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="bg-gradient-to-r from-primary to-accent text-white border-0">
          <CardContent className="py-12 text-center space-y-6">
            <h2 className="text-3xl font-bold">Ready to Experience AI-Powered Healthcare?</h2>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              Upload your medical data and start exploring the capabilities of our multimodal medical assistant
            </p>
            <Button asChild size="lg" variant="secondary" className="shadow-lg">
              <Link to="/upload">Upload Medical Data</Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default Index;
