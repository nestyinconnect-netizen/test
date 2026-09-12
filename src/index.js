export default {
  async fetch(request) {

    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    };

    // CORS preflight
    if (request.method === "OPTIONS") {

      return new Response(null, {
        status: 204,
        headers: corsHeaders
      });

    }

    // GET test
    if (request.method === "GET") {

      return new Response(
        JSON.stringify({
          success: true,
          message: "Nestyin Connect Worker is working!"
        }),
        {
          status: 200,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json"
          }
        }
      );

    }

    // POST test
    if (request.method === "POST") {

      try {

        const data = await request.json();

        console.log(
          "Received submission:",
          data
        );

        return new Response(
          JSON.stringify({
            success: true,
            message: "Submission received successfully.",
            received: data
          }),
          {
            status: 200,
            headers: {
              ...corsHeaders,
              "Content-Type": "application/json"
            }
          }
        );

      } catch (error) {

        return new Response(
          JSON.stringify({
            success: false,
            message: "Invalid JSON",
            error: error.message
          }),
          {
            status: 400,
            headers: {
              ...corsHeaders,
              "Content-Type": "application/json"
            }
          }
        );

      }

    }

    // Anything else
    return new Response(
      JSON.stringify({
        success: false,
        message: "Method not allowed",
        method: request.method
      }),
      {
        status: 405,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json"
        }
      }
    );

  }
};
