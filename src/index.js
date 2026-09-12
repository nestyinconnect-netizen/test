export default {
  async fetch(request, env) {

    const url = new URL(request.url);

    /*
     * TEST WORKER
     */

    if (request.method === "GET") {

      return new Response(
        "Nestyin Connect Worker is working!",
        {
          status: 200,
          headers: {
            "Content-Type": "text/plain"
          }
        }
      );
    }


    /*
     * FORM SUBMISSION
     */

    if (request.method === "POST") {

      try {

        const data = await request.json();

        console.log(
          "Nestyin Connect submission:",
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
              "Content-Type": "application/json"
            }
          }
        );

      } catch (error) {

        return new Response(
          JSON.stringify({
            success: false,
            message: "Invalid submission.",
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
      "Method not allowed",
      {
        status: 405
      }
    );

  }
};
