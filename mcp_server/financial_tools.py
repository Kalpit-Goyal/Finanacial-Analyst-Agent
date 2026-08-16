import yfinance as yf
from mcp.server.fastmcp import FastMCP

mcp=FastMCP("FinancialTools")

@mcp.tool()
def get_financials(ticker:str)->dict:
    '''Get Company's Income Statement From Yahoo Finance'''

    stock=yf.Ticker(ticker)

    income_statement=stock.income_stmt

    return income_statement.to_dict()

@mcp.tool()
def get_balance_sheet(ticker: str) -> dict:
    """Get the company's balance sheet from Yahoo Finance."""

    stock = yf.Ticker(ticker)

    balance_sheet = stock.balance_sheet

    return balance_sheet.to_dict()


@mcp.tool()
def get_market_data(ticker: str) -> dict:
    """Get the company's current market and valuation data from Yahoo Finance."""

    stock = yf.Ticker(ticker)

    return stock.info


if __name__ == "__main__":
    mcp.run()