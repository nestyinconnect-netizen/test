export default {
  async fetch(request) {
    const url = new URL(request.url);

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
            "Content-Type": "application/json"
          }
        }
      );
    }

    // POST test
    if (request.method === "POST") {
      try {
        const data = await request.json();

        console.log("Received submission:", data);

        return new Response(
          JSON.stringify({
            success: true,
            message: "Submission received successfully.",
            received: data
          }),
          {
            status: 200,
            headers: {
              "Content-Type": "application/json"
            }
          }
        );

      } catch (error) {
        return new Response(
          JSON.stringify({
            success: false,
            message: "Invalid JSON received.",
            error: error.message
          }),
          {
            status: 400,
            headers: {
              "Content-Type": "application/json"
            }
          }
        );
      }
    }

    return new Response(
      JSON.stringify({
        success: false,
        message: "Method not allowed"
      }),
      {
        status: 405,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }
};
