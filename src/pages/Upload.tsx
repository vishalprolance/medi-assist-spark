import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload as UploadIcon, FileText, Image as ImageIcon, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Upload = () => {
  const [medicalImage, setMedicalImage] = useState<File | null>(null);
  const [prescription, setPrescription] = useState("");
  const [patientDetails, setPatientDetails] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setMedicalImage(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!medicalImage || !prescription || !patientDetails) {
      toast({
        title: "Missing Information",
        description: "Please provide medical image, prescription, and patient details.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    
    // Simulate upload
    setTimeout(() => {
      toast({
        title: "Upload Successful",
        description: "Your medical data has been uploaded. You can now chat with the AI assistant.",
      });
      setIsUploading(false);
      navigate("/chat");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Upload Medical Data
            </h1>
            <p className="text-muted-foreground text-lg">
              Provide medical images and patient information for AI analysis
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ImageIcon className="h-5 w-5 text-primary" />
                  Medical Image
                </CardTitle>
                <CardDescription>Upload X-ray, MRI, CT scan, or other medical imaging</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="medical-image"
                  />
                  <Label htmlFor="medical-image" className="cursor-pointer">
                    {medicalImage ? (
                      <div className="flex items-center justify-center gap-2 text-success">
                        <CheckCircle2 className="h-6 w-6" />
                        <span>{medicalImage.name}</span>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <UploadIcon className="h-12 w-12 mx-auto text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">
                          Click to upload medical image
                        </p>
                      </div>
                    )}
                  </Label>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-accent" />
                  Patient Information
                </CardTitle>
                <CardDescription>Provide prescription and patient details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="prescription">Prescription</Label>
                  <Textarea
                    id="prescription"
                    placeholder="Enter prescription details..."
                    value={prescription}
                    onChange={(e) => setPrescription(e.target.value)}
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Patient Details</CardTitle>
              <CardDescription>Additional patient information and medical history</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Enter patient details, symptoms, medical history..."
                value={patientDetails}
                onChange={(e) => setPatientDetails(e.target.value)}
                rows={6}
              />
            </CardContent>
          </Card>

          <div className="flex justify-center">
            <Button
              size="lg"
              onClick={handleSubmit}
              disabled={isUploading}
              className="w-full md:w-auto px-8"
            >
              {isUploading ? "Uploading..." : "Upload & Continue to Chat"}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Upload;
