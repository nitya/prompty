# Prompty Specification

??? quote "This page was AI-generated (using Claude Sonnet 3.7 in Copilot Edit mode with Prompty.yaml attached) with manual review for clarity and correctness on Apr 7."

    - Write comprehensive reference documentation for the provided YAML file. 
    - The documentation should be structured in Markdown format and include the following elements:
        - Clearly describe each attribute, including its purpose and expected values.
        - For sections containing multiple attributes, present them in a structured table format for readability.
        - Provide relevant usage examples showcasing different configurations of the YAML file.
        - Ensure proper mdx styling, including headers, code blocks, and bullet points where appropriate.

## Introduction

The Prompty specification defines the structure and configuration options for Prompty files through a YAML-based frontmatter. This document provides comprehensive reference for all available attributes, their expected values, and usage examples.

## Schema Overview

Prompty files use a YAML frontmatter to define their configuration. The schema includes:

- Metadata information (name, description, version, authors, tags)
- Model configuration (API type, model provider, parameters)
- Input and output specifications
- Sample data for testing
- Template engine specification

## Core Attributes

| Attribute | Type | Description | Required |
|-----------|------|-------------|----------|
| `$schema` | String | URI reference to the schema definition | No |
| `name` | String | Name of the prompty | Yes |
| `description` | String | Description of the prompty | Yes |
| `version` | String | Version of the prompty | Yes |
| `authors` | Array of Strings | Authors of the prompty | No |
| `tags` | Array of Strings | Tags for categorizing the prompty | No |
| `template` | String | Template engine to use (default: "jinja2") | No |

## Model Configuration

The `model` section defines which AI model to use and how to configure it.

### API Type

```yaml
model:
  api: chat # or "completion"
```

| Value | Description |
|-------|-------------|
| `chat` | Uses a chat-based API (default) |
| `completion` | Uses a completion-based API |

### Model Providers

Prompty supports three types of model providers, each with its own configuration requirements:

#### OpenAI Models

```yaml
model:
  api: chat
  configuration:
    type: openai
    name: gpt-4
    organization: your-org-id # optional
```

| Parameter | Type | Description | Required |
|-----------|------|-------------|----------|
| `type` | String | Must be "openai" | Yes |
| `name` | String | Model name (e.g., "gpt-4") | Yes |
| `organization` | String | OpenAI organization ID | No |

#### Azure OpenAI Models

```yaml
model:
  api: chat
  configuration:
    type: azure_openai
    api_key: ${env:AZURE_OPENAI_API_KEY}
    api_version: 2023-05-15
    azure_deployment: your-deployment-name
    azure_endpoint: https://your-resource.openai.azure.com/
```

| Parameter | Type | Description | Required |
|-----------|------|-------------|----------|
| `type` | String | Must be "azure_openai" | Yes |
| `api_key` | String | API key (recommended to use environment variables) | Yes |
| `api_version` | String | Azure OpenAI API version | Yes |
| `azure_deployment` | String | Azure deployment name | Yes |
| `azure_endpoint` | String | Azure OpenAI endpoint URL | Yes |

#### MaaS (Model as a Service) Models

```yaml
model:
  api: chat
  configuration:
    type: azure_serverless
    azure_endpoint: https://your-endpoint.com/
```

| Parameter | Type | Description | Required |
|-----------|------|-------------|----------|
| `type` | String | Must be "azure_serverless" | Yes |
| `azure_endpoint` | String | Azure serverless endpoint URL | Yes |

### Model Parameters

The `parameters` section allows you to configure model-specific parameters:

```yaml
model:
  # ...configuration
  parameters:
    temperature: 0.7
    max_tokens: 2000
    top_p: 0.95
    frequency_penalty: 0
    presence_penalty: 0
```

| Parameter | Type | Description | Default |
|-----------|------|-------------|---------|
| `temperature` | Number | Controls randomness (0-2, lower is more deterministic) | 1.0 |
| `max_tokens` | Integer | Maximum token count in the response | Model-dependent |
| `top_p` | Number | Nucleus sampling value (0-1) | 1.0 |
| `frequency_penalty` | Number | Penalty for frequent token use (-2.0 to 2.0) | 0 |
| `presence_penalty` | Number | Penalty for repeated tokens (-2.0 to 2.0) | 0 |
| `stop` | Array of Strings | Sequences where generation should stop | None |
| `response_format` | Object | Specifies output format (e.g., JSON mode) | None |
| `seed` | Integer | Seed for deterministic generation | None |
| `tools` | Array of Objects | Function calling specifications | None |
| `tools_choice` | String or Object | Controls function calling behavior | "auto" or "none" |

### Response Format

```yaml
model:
  # ...configuration and parameters
  response: first # or "all"
```

| Value | Description |
|-------|-------------|
| `first` | Returns only the first response in the choice array (default) |
| `all` | Returns the full raw response |

## Sample Data

The `sample` attribute allows you to specify test data for your prompty:

```yaml
# Inline sample
sample:
  messages:
    - role: user
      content: Where is the nearest coffee shop?
    - role: system
      content: I'm sorry, I don't know that. Would you like me to look it up for you?

# Or reference a sample file
sample: sample.json
```

## Inputs and Outputs

Define expected inputs and outputs for your prompty:

```yaml
inputs:
  query:
    type: string
    description: The user's query
  
outputs:
  answer:
    type: string
    description: The model's response
```

## Complete Example

Here's a complete example of a Prompty YAML frontmatter:

```yaml
$schema: http://json-schema.org/draft-07/schema#
name: Coffee Shop Finder
description: A prompty to help users find coffee shops near them
version: 1.0.0
authors:
  - John Doe
  - Jane Smith
tags:
  - location
  - coffee
  - search

model:
  api: chat
  configuration:
    type: azure_openai
    api_key: ${env:AZURE_OPENAI_API_KEY}
    api_version: 2023-05-15
    azure_deployment: gpt-4
    azure_endpoint: https://your-resource.openai.azure.com/
  parameters:
    temperature: 0.7
    max_tokens: 1000
    top_p: 0.95
  response: first

sample:
  messages:
    - role: user
      content: Where is the nearest coffee shop?
    - role: system
      content: I'm sorry, I don't know that. Would you like me to look it up for you?

inputs:
  query:
    type: string
    description: The user's query

outputs:
  answer:
    type: string
    description: The model's response

template: jinja2
```

## Best Practices

1. **Environment Variables**: Use environment variables for sensitive information such as API keys:
   ```yaml
   api_key: ${env:AZURE_OPENAI_API_KEY}
   ```

2. **Version Control**: Always specify a version for your prompty to track changes.

3. **Documentation**: Include comprehensive descriptions for inputs and outputs to improve usability.

4. **Testing**: Provide realistic sample data to ensure your prompty works as expected.

5. **Temperature Settings**: Use lower temperature values (0.0-0.5) for more deterministic responses and higher values (0.7-1.0) for more creative responses.
