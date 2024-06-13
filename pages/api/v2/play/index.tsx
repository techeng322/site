import axios from 'axios';

export const config = {
  runtime: "edge",
};

export default async function handler(req: any) {
  const trackUrl = req.nextUrl.searchParams.get("trackUrl") as string;

  const response: any = await fetch(trackUrl);

  const readable = new ReadableStream({
    async start(controller) {
      const reader = response.body.getReader();

      const read = async () => {
        const { done, value } = await reader.read();
        if (done) {
          controller.close();
          return;
        }
        controller.enqueue(value);
        await read();
      };

      await read();
    },
  });

  return new Response(readable, {
    headers: {
      "Content-Type": response.headers['content-type'],
      "Transfer-Encoding": "chunked",
    },
  });
}
