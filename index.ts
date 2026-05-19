import { defineSingleProviderPluginEntry } from "openclaw/plugin-sdk/provider-entry";
import { buildProviderReplayFamilyHooks } from "openclaw/plugin-sdk/provider-model-shared";

const PROVIDER_ID = "ambient";
const BASE_URL = "https://api.ambient.xyz/v1";

const MODELS = [
  {
    id: "zai-org/GLM-5.1-FP8",
    name: "GLM 5.1",
    input: ["text"],
    reasoning: true,
    tools: true,
    contextWindow: 202_752,
    maxTokens: 131_072,
    cost: { input: 1.4, output: 4.4, cacheRead: 0, cacheWrite: 0 },
  },
  {
    id: "moonshotai/kimi-k2.6",
    name: "Kimi K2.6",
    input: ["text", "image"],
    reasoning: true,
    tools: true,
    contextWindow: 262_144,
    maxTokens: 262_144,
    cost: { input: 0.95, output: 4.0, cacheRead: 0.2, cacheWrite: 0 },
  },
];

const DEFAULT_MODEL_REF = `${PROVIDER_ID}/zai-org/GLM-5.1-FP8`;

export default defineSingleProviderPluginEntry({
  id: PROVIDER_ID,
  name: "Ambient",
  description: "Ambient inference provider",
  provider: {
    label: "Ambient",
    docsPath: "/providers/ambient",
    auth: [
      {
        methodId: "api-key",
        label: "Ambient API key",
        hint: "API key from your Ambient dashboard",
        optionKey: "ambientApiKey",
        flagName: "--ambient-api-key",
        envVar: "AMBIENT_API_KEY",
        promptMessage: "Enter your Ambient API key",
        defaultModel: DEFAULT_MODEL_REF,
      },
    ],
    catalog: {
      buildProvider: (ctx) => ({
        api: "openai-completions",
        baseUrl: BASE_URL,
        apiKey: ctx.resolveProviderApiKey(PROVIDER_ID).apiKey,
        models: MODELS,
      }),
      buildStaticProvider: () => ({
        api: "openai-completions",
        baseUrl: BASE_URL,
        models: MODELS.map(({ id, name }) => ({ id, name })),
      }),
    },
    ...buildProviderReplayFamilyHooks({
      family: "openai-compatible",
      dropReasoningFromHistory: false,
    }),
  },
});
