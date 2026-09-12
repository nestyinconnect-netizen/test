export default {
  async fetch(request, env) {
    if (request.method === "GET") {
      return new Response("Nestyin Connect Worker is working!");
    }

    if (request.method === "POST") {
      try {
        const data = await request.json();

        console.log("Received:", data);

        return new Response(
          JSON.stringify({
            success: true,
            message: "Submission received",
            data: data
          }),
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        );
      } catch (error) {
        return new Response(
          JSON.stringify({
            success: false,
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

    return new Response("Method not allowed", {
      status: 405
    });
  }
};
