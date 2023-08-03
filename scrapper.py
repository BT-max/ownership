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
    try:
        response = requests.get(url, headers=HEADERS)
        response.raise_for_status()  # Raises a HTTPError if the status is 4xx, 5xx
    except (requests.RequestException, ValueError):
        print("Network error")
        return None
    return response.text if response.status_code == 200 else None


def get_data(soup):
    data = {
        "Major Holders": {
            "Breakdown": [],
            "Top Institutional Holders": [],
            "Top Mutual Fund Holders": []
        }
    }

    # Extract breakdown
    table = soup.find_all('table')[0]
    for row in table.find_all('tr'):
        cells = row.find_all('td')
        data["Major Holders"]["Breakdown"].append({
            "percentage": cells[0].text.strip(),
            "description": cells[1].text.strip()
        })

    # Extract top institutional holders
    table = soup.find_all('table')[1]
    for row in table.find_all('tr')[1:]:
        cells = row.find_all('td')
        data["Major Holders"]["Top Institutional Holders"].append({
            "holder": cells[0].text.strip(),
            "shares": cells[1].text.strip(),
            "date_reported": cells[2].text.strip(),
            "percentage_out": cells[3].text.strip(),
            "value": cells[4].text.strip()
        })

    # Extract top mutual fund holders
    table = soup.find_all('table')[2]
    for row in table.find_all('tr')[1:]:
        cells = row.find_all('td')
        data["Major Holders"]["Top Mutual Fund Holders"].append({
            "holder": cells[0].text.strip(),
            "shares": cells[1].text.strip(),
            "date_reported": cells[2].text.strip(),
            "percentage_out": cells[3].text.strip(),
            "value": cells[4].text.strip()
        })

    # Print the data in JSON format
    return data


def get_ownership(ticker):
    url = f'https://finance.yahoo.com/quote/{ticker}/holders/'
    html = get_html(url)
    if not html:
        return {
            "Major Holders": {
                "Breakdown": [],
                "Top Institutional Holders": [],
                "Top Mutual Fund Holders": []
            }
        }

    soup = BeautifulSoup(html, 'html.parser')
    ownership_data = get_data(soup)
    return ownership_data


if __name__ == '__main__':
    get_ownership("AAPL")
