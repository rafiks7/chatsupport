import { NextResponse } from "next/server";
import { Readable } from "stream";
import { BedrockRuntimeClient, ConverseStreamCommand } from "@aws-sdk/client-bedrock-runtime";
import { BedrockAgentRuntimeClient, RetrieveAndGenerateCommand } from '@aws-sdk/client-bedrock-agent-runtime';
import { SecretsManagerClient, GetSecretValueCommand } from "@aws-sdk/client-secrets-manager";

/*
// secret fetching from aws
const secretsManagerClient = new SecretsManagerClient({ region: 'us-west-2' });

// Function to retrieve a secret from AWS Secrets Manager
async function getSecret(secretName) {
  try {
      const command = new GetSecretValueCommand({ SecretId: secretName });
      const response = await secretsManagerClient.send(command);
      const secret = response.SecretString;
      if (secret) {
          return JSON.parse(secret);
      } else {
          throw new Error('Secret string is empty');
      }
  } catch (error) {
      console.error(`Error retrieving secret: ${error}`);
      throw error;
  }
}
const secretArn = 'andrew/bedrock/pinecone'; // Replace with your secret name


// bedrock agent declaration
const bedrockAgentRuntimeclient = new BedrockAgentRuntimeClient({ region: 'us-west-2' });

const systemPrompt = `You are a helpful support chatbot for the Huntington Beach Public Library system. Maintain a friendly and professional manner when interacting.`;

async function getContext(query) {
  try {
      const secrets = await getSecret(secretArn);
      const modelArn = secrets.modelArn;
      const kbId = secrets.kb_id;

      const params = {
          input: {
              text: query,
          },
          retrieveAndGenerateConfiguration: {
              type: 'KNOWLEDGE_BASE',
              knowledgeBaseConfiguration: {
                  knowledgeBaseId: kbId,
                  modelArn: modelArn,
              }
          }
      };

      const command = new RetrieveAndGenerateCommand(params);
      const response = await bedrockAgentRuntimeclient.send(command);
      if (response.output && response.output.text) {
          return response.output.text;
      } else {
          throw new Error('Response is missing output text');
      }
  } catch (error) {
      console.error('Error retrieving context:', error);
      throw error;
  }
}
  */
const systemPrompt = `You are a helpful support chatbot for the Huntington Beach Public Library system. Maintain a friendly and professional manner when interacting.`;

export async function POST(req) {
  const client = new BedrockRuntimeClient({ region: "us-west-2" });
  const modelId = "anthropic.claude-instant-v1";

  const data = await req.json();

  const input = {
    // ConverseStreamRequest
    modelId: modelId, // required
    messages: data,
    system: [
      // SystemContentBlocks
      {
        // SystemContentBlock Union: only one key present
        text: systemPrompt,
      },
    ],
    inferenceConfig: {
      // InferenceConfiguration
      maxTokens: Number(200),
      temperature: Number(0.7),
      topP: Number(0.9),
    },
  };

  const command = new ConverseStreamCommand(input);

  try {
    const response = await client.send(command);

    const stream = new Readable({
      read() {},
    });

    (async () => {
      for await (const item of response.stream) {
        if (item.contentBlockDelta) {
          const text = item.contentBlockDelta.delta?.text || "";
          stream.push(text);
        }
      }
      stream.push(null); // Signal end of stream
    })().catch((err) => {
      console.error(`Stream error: ${err}`);
      stream.push(null);
    });

    return new NextResponse(stream);
  } catch (err) {
    console.log(`ERROR: Can't invoke '${modelId}'. Reason: ${err}`);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
