from flask import Flask, jsonify, request
from flask_cors import CORS  # Import CORS
from datetime import datetime
from urllib.request import urlopen, Request
from bs4 import BeautifulSoup
from nltk.sentiment.vader import SentimentIntensityAnalyzer

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/sentiment', methods=['GET'])
def get_sentiment():
    ticker = request.args.get('ticker')
    finviz_url = 'https://finviz.com/quote.ashx?t='

    if not ticker:
        return jsonify({"error": "Ticker is required"}), 400

    url = finviz_url + ticker
    req = Request(url=url, headers={'user-agent': 'my-app'})
    response = urlopen(req)

    html = BeautifulSoup(response, 'html.parser')
    news_table = html.find(id='news-table')

    if not news_table:
        return jsonify({"error": "No news found"}), 404

    parsed_data = []
    vader = SentimentIntensityAnalyzer()

    for row in news_table.findAll('tr'):
        if row.a is not None:
            title = row.a.text
            date_data = row.td.text.strip().split(' ')

            if len(date_data) == 2:
                time = date_data[1]
            elif len(date_data) == 1:
                time = date_data[0]
            else:
                time = date_data[-1]

            # We assume all articles are from today
            date = datetime.today().date()

            score = vader.polarity_scores(title)['compound']
            parsed_data.append(score)

    if parsed_data:
        average_score = sum(parsed_data) / len(parsed_data)
    else:
        average_score = None

    return jsonify({
        "ticker": ticker,
        "average_compound_score": average_score
    })

if __name__ == '__main__':
    app.run(debug=True)
