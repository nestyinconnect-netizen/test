export default {
  async fetch(request, env) {

    const url = new URL(request.url);

    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    };

    /*
     * CORS preflight
     */

    if (request.method === "OPTIONS") {

      return new Response(null, {
        status: 204,
        headers: corsHeaders
      });

    }

    /*
     * FORM SUBMISSION API
     *
     * POST /submit
     */

    if (
      request.method === "POST" &&
      url.pathname === "/submit"
    ) {

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

    /*
     * EVERYTHING ELSE
     *
     * Let Cloudflare Assets serve the website files.
     */

    if (env.ASSETS) {

      return env.ASSETS.fetch(request);

    }

    return new Response(
      "Nestyin Connect Worker is running.",
      {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "text/plain"
        }
      }
    );

  }
};
