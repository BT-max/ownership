import json
import requests
from bs4 import BeautifulSoup

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) '
                  'Chrome/96.0.4664.93 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,/;q=0.8',
    'referer': 'https://finance.yahoo.com/',
    'Accept-Language': 'en-US,en;q=0.5'
}


def get_html(url):
    """
    Sends a GET request to the provided URL and returns the response.
    """
    with requests.Session() as session:
        session.headers.update(HEADERS)
        try:
            response = session.get(url)
            response.raise_for_status()
            return response.text
        except (requests.RequestException, ValueError):
            print("Network error")
            return None


def parse_table(soup, index):
    table_data = []
    table = soup.find_all('table')[index]
    for row in table.find_all('tr')[1:]:
        cells = [cell.text.strip() for cell in row.find_all('td')]
        table_data.append(cells)
    return table_data


def get_data(soup):
    breakdown_data = parse_table(soup, 0)
    institutional_holders_data = parse_table(soup, 1)
    mutual_fund_holders_data = parse_table(soup, 2)

    return {
        "Breakdown": [{"percentage": item[0], "description": item[1]} for item in breakdown_data],
        "Top Institutional Holders": [
            {"holder": item[0], "shares": item[1], "date_reported": item[2], "percentage_out": item[3],
             "value": item[4]} for item in institutional_holders_data],
        "Top Mutual Fund Holders": [
            {"holder": item[0], "shares": item[1], "date_reported": item[2], "percentage_out": item[3],
             "value": item[4]} for item in mutual_fund_holders_data]
    }


def get_ownership(ticker):
    url = f'https://finance.yahoo.com/quote/{ticker}/holders/'
    html = get_html(url)
    if not html:
        return {
            "Breakdown": [],
            "Top Institutional Holders": [],
            "Top Mutual Fund Holders": []
        }

    soup = BeautifulSoup(html, 'html.parser')
    ownership_data = get_data(soup)
    return ownership_data


if __name__ == '__main__':
    print(json.dumps(get_ownership(input("Enter Ticker: ")), indent=4))
