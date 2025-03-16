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
