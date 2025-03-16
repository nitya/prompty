from ...invoker import InvokerException

try:
    from .executor import HuggingFaceExecutor  # noqa
    from .processor import HuggingFaceProcessor  # noqa
except ImportError as e:
    raise InvokerException(
        f"Error registering HuggingFaceExecutor and HuggingFaceProcessor: {e}", "huggingface"
    )
