# Vibe Coding with Copilot Edits 😁

## 1️⃣  | Can I create a new Invoker?

### Prompt

`#codebase understand how the invoker works and write an invoker that will work with hugging face api`


### Response

I'll help create a HuggingFace invoker for Prompty. Based on the codebase analysis, invokers are used to execute external models and APIs, requiring implementation of the Invoker base class. Let me break this down step by step:

1. We need to create a HuggingFace executor and processor
2. The executor will handle the actual API calls to HuggingFace
3. The processor will handle the response formatting
4. Register these with the InvokerFactory

Here's the implementation:

#### [executor.py](./../runtime/prompty/prompty/huggingface/executor.py)

<details>
<summary> Create a HuggingFace executor that handles API calls:</summary>


````python
import typing
from ...invoker import Invoker, InvokerFactory
from ...core import Prompty
import requests
from ...tracer import trace

@InvokerFactory.register_executor("huggingface")
class HuggingFaceExecutor(Invoker):
    """HuggingFace Executor"""

    def __init__(self, prompty: Prompty) -> None:
        super().__init__(prompty)
        self.api_key = prompty.model.configuration.get("api_key")
        self.api_base = prompty.model.configuration.get("api_base", "https://api-inference.huggingface.co/models")
        self.model = prompty.model.configuration.get("model")

    @trace
    def invoke(self, data: typing.Any) -> typing.Any:
        """Invoke the HuggingFace API

        Parameters
        ----------
        data : any
            The data to send to the HuggingFace API

        Returns
        -------
        any
            The response from the HuggingFace API
        """
        headers = {"Authorization": f"Bearer {self.api_key}"}
        api_url = f"{self.api_base}/{self.model}"
        
        response = requests.post(api_url, headers=headers, json={"inputs": data})
        response.raise_for_status()
        
        return response.json()

    async def invoke_async(self, data: str) -> str:
        return self.invoke(data)
````

</details>

#### [processor.py](./../runtime/prompty/prompty/huggingface/processor.py)

<details>
<summary> Create a processor to handle the HuggingFace responses:</summary>


````python

Made changes.

import typing
from ...invoker import Invoker, InvokerFactory
from ...core import Prompty

@InvokerFactory.register_processor("huggingface")
class HuggingFaceProcessor(Invoker):
    """HuggingFace Processor"""

    def __init__(self, prompty: Prompty) -> None:
        super().__init__(prompty)

    def invoke(self, data: typing.Any) -> typing.Any:
        """Process the HuggingFace API response

        Parameters
        ----------
        data : any
            The response from the HuggingFace API

        Returns
        -------
        any
            The processed response
        """
        # Handle different response formats based on task type
        task = self.prompty.model.configuration.get("task", "text-generation")
        
        if task == "text-generation":
            return data[0]["generated_text"] if isinstance(data, list) else data
        else:
            return data

    async def invoke_async(self, data: typing.Any) -> typing.Any:
        return self.invoke(data)
````

</details>

#### [__init__.py](./../runtime/prompty/prompty/huggingface/__init__.py)


<details>
<summary> 
Create an init file to register the components:
</summary>

````python

Made changes.

from ...invoker import InvokerException

try:
    from .executor import HuggingFaceExecutor  # noqa
    from .processor import HuggingFaceProcessor  # noqa
except ImportError as e:
    raise InvokerException(
        f"Error registering HuggingFaceExecutor and HuggingFaceProcessor: {e}", "huggingface"
    )
````

</details>

#### Invoker usage

<details>
<summary>
To use this invoker, modify your prompty file like this:
</summary>

````prompty

Made changes.

---
name: ExamplePrompt
description: A prompt that uses context to ground an incoming question
authors:
  - Seth Juarez
model:
  api: chat
  configuration:
    type: huggingface
    api_key: your-hf-api-key
    model: gpt2  # or any other HF model
    task: text-generation
    api_base: https://api-inference.huggingface.co/models
sample:
  // ...existing code...
---
// ...existing code...
````

</details>

#### Summary

<details>
<summary>
Key points about this implementation:
</summary>

1. The executor handles API communication with HuggingFace
2. The processor formats responses based on the model task type
3. Configuration is done via the prompty file's model configuration section
4. Error handling and tracing are included for debugging
5. Both sync and async methods are supported
6. It follows the same pattern as other invokers in the codebase

To use this invoker, you'll need to:

1. Install required dependencies (requests)
2. Import the huggingface module in your code
3. Set your HuggingFace API key in the configuration
4. Specify the model and task type you want to use

The invoker will then handle the communication with HuggingFace's API and process the responses appropriately.

Made changes.

</details>

---


## 2️⃣  | Can I write a LangChain Tutorial?
