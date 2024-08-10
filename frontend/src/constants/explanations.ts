export const TERM_EXPLANATIONS: Record<string, string> = {
  STRATEGY: "The strategy used to make decisions in the bot.",
  OBV: "On-Balance Volume (OBV) is a technical trading momentum indicator that uses volume flow to predict changes in stock price.",

  SYMBOL: "The stock symbol to run the bot on.",
  AAPL: "Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide.",
  TSLA: "Tesla, Inc. designs, manufactures, and sells electric vehicles and clean energy products worldwide.",

  PERIOD:
    "The time frame used to retrieve data and make decisions in the bot. DAY means daily data.",

  TRADE_AMOUNT: "Amount of money used to buy in each bot action.",
  DATE_RANGE: "The range of dates to run the bot on.",
};

export const DATE_RANGE_INFORMATION =
  "The days when NYSE are closed are exluded from the graph.";
