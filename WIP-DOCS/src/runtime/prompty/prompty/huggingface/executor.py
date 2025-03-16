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
