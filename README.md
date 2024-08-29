# **Stock Sentiment Analyzer**

## **Overview**
**Stock Sentiment Analyzer** is a web application that provides real-time sentiment analysis of stock-related news headlines. The project fetches the latest articles, processes the sentiment using natural language processing techniques, and displays the overall sentiment for each stock ticker entered by the user.

## **Features**
- **Real-Time Sentiment Analysis**: Analyzes news articles for any stock ticker entered by the user.
- **Flask Backend**: Scrapes the latest stock-related news and performs sentiment analysis using the VADER Sentiment Analysis tool.
- **React Frontend**: Provides a user-friendly interface where users can input stock tickers and view the corresponding sentiment score.
- **Data Handling**: Displays the compound sentiment score for each stock based on today’s news articles.

## **Tech Stack**
- **Frontend**: React, JavaScript, HTML, CSS
- **Backend**: Python, Flask, Beautiful Soup
- **Sentiment Analysis**: VADER (Valence Aware Dictionary and sEntiment Reasoner)

## **How It Works**
- The frontend allows users to input stock ticker symbols.
- The backend scrapes the latest stock-related news using Beautiful Soup and processes it with VADER for sentiment analysis.
- The sentiment data is passed back to the frontend, where the compound score is displayed to the user.

## **Example**
- **Input**: AAPL
- **Output**: Compound Sentiment Score: 0.35 (Positive sentiment)
