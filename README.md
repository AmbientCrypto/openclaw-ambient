# @ambientcrypto/openclaw

OpenClaw plugin for the [Ambient](https://ambient.xyz) inference provider.

## Install

```bash
openclaw plugins install clawhub:@ambientcrypto/openclaw
openclaw onboard --auth-choice ambient-api-key --ambient-api-key "$AMBIENT_API_KEY"
```

## Models

| Ref | Context | Output | Tools | Reasoning | Multimodal |
| --- | ------- | ------ | ----- | --------- | ---------- |
| `ambient/zai-org/GLM-5.1-FP8` | 202 752 | 131 072 | yes | yes | text |
| `ambient/moonshotai/kimi-k2.6` | 262 144 | 262 144 | yes | yes | text, image |

`ambient/zai-org/GLM-5.1-FP8` is the default.

## Get an API key

Sign up at https://app.ambient.xyz and create an API key. Export it as `AMBIENT_API_KEY` or pass `--ambient-api-key` to onboarding.

## Endpoints

- Base URL: `https://api.ambient.xyz/v1`
- Wire format: OpenAI-compatible chat completions
