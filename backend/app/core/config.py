from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    alpaca_key: str = ""
    alpaca_secret: str = ""
    model_config = SettingsConfigDict(env_file="app/.env")
