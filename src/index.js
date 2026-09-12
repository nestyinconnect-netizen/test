export default {
  async fetch(request) {
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    };

    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: corsHeaders
      });
    }

    const jsonResponse = (body, status = 200) => new Response(
      JSON.stringify(body),
      {
        status,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders
        }
      }
    );

    // GET test
    if (request.method === "GET") {
      return jsonResponse({
        success: true,
        message: "Nestyin Connect Worker is working!"
      });
    }

    // POST test
    if (request.method === "POST") {
      try {
        const data = await request.json();

        console.log("Received submission:", data);

        return jsonResponse({
          success: true,
          message: "Submission received successfully.",
          received: data
        });

      } catch (error) {
        return jsonResponse({
          success: false,
          message: "Invalid JSON received.",
          error: error.message
        }, 400);
      }
    }

    return jsonResponse({
      success: false,
      message: "Method not allowed"
    }, 405);
  }
};
