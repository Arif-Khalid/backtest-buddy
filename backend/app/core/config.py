from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    ALPACA_KEY: str = ""
    ALPACA_SECRET: str = ""
    model_config = SettingsConfigDict(env_file="app/.env")
