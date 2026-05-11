import { GoogleGenAI } from "@google/genai";

// Usamos import.meta.env que es lo que entiende Vite en internet
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || ""; 
const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;

export async function transformToEmbroidery(base64Image: string) {
  // We use the specific prompt provided by the user if (!genAI) {
    throw new Error("La función de IA de Bordados Kavito requiere una configuración de seguridad (API KEY) para funcionar en vivo.");
  }
  const internalPrompt = `[(Transform the original photo into an ultra realistic machine embroidery digitized design created in authentic Wilcom E4.2 style.
The final image must look exactly like a real embroidery simulation preview from professional embroidery digitizing software and an actual embroidered sample sewn by an industrial embroidery machine.
Preserve the exact pose, proportions, colors, climbing gear, backpack, ice axe, ropes, boots, and frozen mountain environment from the original photo.
Create highly visible embroidery stitches with extremely realistic thread texture and true embroidery structure.
Use authentic embroidery techniques including:
• satin stitches
• tatami fill stitches
• running stitches
• zig-zag underlay
• edge walk underlay
• pull compensation
• stitch direction changes
• realistic density variations
• overlapping embroidery layers
• thread path simulation
• embroidery compensation effects
Make every embroidery stitch clearly visible with realistic thread thickness, thread shine, thread shadows, sewing tension, and needle penetration texture.
Simulate real polyester embroidery thread with reflective highlights and realistic stitch depth.
Add natural embroidery imperfections and realistic machine sewing behavior.
The image must resemble a real embroidery sew-out directly exported from Wilcom E4.2 with high stitch density and detailed stitch angles.
Show directional thread flow in all embroidered areas.
Large areas must use tatami fill patterns with visible stitch rows.
Borders and outlines must use dense satin stitch columns.
Fine details must use running stitches and thin embroidery paths.
The ice and snow should also appear embroidered using light-density tatami fills and directional stitch textures.
The climber must have strong embroidery outlines and layered stitching depth.
Simulate real fabric tension underneath the embroidery.
Add realistic textile base texture behind the stitches.
Make the embroidery appear raised and tactile like real machine embroidery.
Ultra detailed embroidery simulation, hyper realistic embroidery threads, embroidery sew-out texture, Wilcom E4.2 embroidery preview, industrial embroidery machine finish, realistic stitch rendering, detailed embroidery density map, thread realism, commercial embroidery sample, photoreal embroidery texture, visible stitch paths, authentic embroidery production look.
No painting, no digital art, no illustration, no watercolor, no vector effect, no smooth shading, no CGI.
The final result must clearly show thousands of real embroidery stitches exactly like a professionally digitized embroidery design sewn on an embroidery machine.)]`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Image.split(',')[1],
              mimeType: 'image/png',
            },
          },
          {
            text: internalPrompt,
          },
        ],
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    throw new Error("No image generated");
  } catch (error) {
    console.error("Error in transformToEmbroidery:", error);
    throw error;
  }
}
