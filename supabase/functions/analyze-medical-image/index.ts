import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { image, patientDetails } = await req.json();
    
    if (!image) {
      throw new Error('Medical image is required');
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    console.log('Analyzing medical image with AI...');

    // Call Lovable AI Gateway with multimodal input
    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          {
            role: 'system',
            content: 'You are a medical AI assistant specialized in analyzing medical images. Provide detailed, professional analysis of medical imaging with clinical insights. Always include disclaimers that this is AI-assisted analysis and should be reviewed by qualified medical professionals.'
          },
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: `Analyze this medical image. Patient details: ${patientDetails || 'Not provided'}`
              },
              {
                type: 'image_url',
                image_url: {
                  url: image // Base64 or URL
                }
              }
            ]
          }
        ],
        temperature: 0.3, // Lower temperature for more consistent medical analysis
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI Gateway error:', response.status, errorText);
      throw new Error(`AI analysis failed: ${response.status}`);
    }

    const data = await response.json();
    const analysis = data.choices[0]?.message?.content;

    console.log('Medical image analysis completed successfully');

    return new Response(
      JSON.stringify({ 
        analysis,
        timestamp: new Date().toISOString(),
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    );
  } catch (error) {
    console.error('Error in analyze-medical-image function:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    );
  }
});
