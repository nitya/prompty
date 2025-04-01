# Sandbox Setup

This page documents setup instructions for any libraries or tools used in the cookbook, in one central location. This enables easier maintenance and consistency in usage.

!!! info "DevContainer vs. Local Development"

    Whenever possible, we will recommend usage of a development container setup with the cookbook repo, for fast and reliable starts. For now, we assume you start in a default Codespaces (universal) with no custom setup. If you choose to work in a local development environment, we recommend using a virtual environment (conda or venv).

---

## 1. Setup Prompty

### 1.1 Install Package 

You can installl the stable version of prompty at any time with:

```bash title=""
pip install prompty
```

For interim testing, we will use a pre-release `prompty-xyz.whl` file that is downloaded to the local folder from its build location. Here the `xyz` will map to a specific build or commit version.

```bash title=""
pip install prompty-xyz.whl
```

### 1.2 Validate Install

Test if the prompty CLI was installed:

```title="" linenums="0"
prompty --help
```
You should see something like this:

```title="" linenums="0"
Usage: prompty [OPTIONS] [INPUTS]...

Options:
  -s, --source TEXT  [required]
  -e, --env TEXT
  -v, --verbose
  -c, --chat
  --version          Show the version and exit.
  --help             Show this message and exit.

  INPUTS: key=value pairs
      The values can come from:
      - plain strings - e.g.: question="Does it have windows?"
      - files - e.g.: question=@question.txt
      - stdin - e.g.: question=@-

  For more information, visit https://prompty.ai/
```

---

## 2. Test with Extension

### 2.1 Create Asset

<!--
#codebase look at the Prompty.yaml file - then using that schema define a openai.prompty file for an openai chat model called gpt-4o
-->

```yaml title=""
---
name: OpenAI Chat Example
description: A prompt that uses the OpenAI GPT-4o chat model to answer questions
authors:
  - Nitya AI
model:
  api: chat
  configuration:
    type: openai
    name: gpt-4o
    api_key: ${env:OPENAI_API_KEY}
parameters:
  max_tokens: 1500
  temperature: 0.7
  frequency_penalty: 0
  presence_penalty: 0
sample:
  firstName: John
  lastName: Doe
  question: What is the capital of France?
---

system:
You are a helpful assistant who provides accurate and concise answers.

# Customer
You are helping {{firstName}} {{lastName}} with their question.
user:
{{question}}

```

### 2.2 Run Asset

Open the above asset in VS Code. Press "Play"  or F5 inside extension.

---

## 3. Test With CLI

### 3.1 Create Asset

To test out the default CLI, let's get a _starter_ asset from the Prompty VS Code extension _GitHub_ panel. This is the auto-generated asset for a `gpt-4o` model.

```yml title="gpt-4o.prompty"
---
name: ExamplePrompt
description: A prompt that uses context to ground an incoming question
authors:
  - Seth Juarez
model:
  api: chat
  configuration:
    type: serverless
    endpoint: https://models.inference.ai.azure.com
    model: gpt-4o
sample:
  firstName: Seth
  context: >
    The Alpine Explorer Tent boasts a detachable divider for privacy, 
    numerous mesh windows and adjustable vents for ventilation, and 
    a waterproof design. It even has a built-in gear loft for storing 
    your outdoor essentials. In short, it's a blend of privacy, comfort, 
    and convenience, making it your second home in the heart of nature!
  question: What can you tell me about your tents?
---

system:
You are an AI assistant who helps people find information. As the assistant, 
you answer questions briefly, succinctly, and in a personable manner using 
markdown and even add some personal flair with appropriate emojis.

# Customer
You are helping {{firstName}} to find answers to their questions.
Use their name to address them in your responses.

# Context
Use the following context to provide a more personalized response to {{firstName}}:
{{context}}

user:
{{question}}
```
### 3.2 Run Asset

Run this command in terminal:

```bash
prompty -s gpt-4o.prompty
```