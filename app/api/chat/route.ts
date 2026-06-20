export async function POST(req: Request) {
  const { prompt } = await req.json();
  
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    const result = await model.generateContent(
      `You are a helpful, compassionate assistant for someone with PMOS. Answer this question: ${prompt}`
    );
    
    // Log the result to your terminal console to see what the API returns
    console.log("Full AI Result:", JSON.stringify(result));
    
    const response = await result.response;
    const text = response.text();
    
    return NextResponse.json({ reply: text });
  } catch (error) {
    // Log the specific error to the terminal
    console.error("DEBUG AI ERROR:", error);
    return NextResponse.json({ reply: "Connection failed. Check terminal logs." }, { status: 500 });
  }
}
