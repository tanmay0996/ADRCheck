import pandas as pd
import re
from transformers import pipeline
from sklearn.metrics import classification_report

# Load the dataset (modify with the correct path to your dataset)
dataset_path = 'reddit_adr_posts2.csv'  # Replace with your file path
df = pd.read_csv(dataset_path)

# Display the first few rows of the dataset
print("Initial DataFrame:")
print(df.head())

# Optional: Clean the text data (remove non-alphabetic characters and convert to lowercase)
def clean_text(text):
    if not isinstance(text, str):
        text = str(text)  # Convert non-string types to string
    # Remove non-alphabetic characters (like punctuation)
    text = re.sub(r'[^a-zA-Z\s]', '', text)
    # Convert to lowercase
    text = text.lower()
    return text

# Apply the cleaning function to the text column
df['cleaned_text'] = df['title'].apply(clean_text)  # Assuming 'title' is the text column

# Display cleaned text
print("\nCleaned DataFrame:")
print(df[['title', 'cleaned_text']].head())

# Initialize the sentiment-analysis pipeline from Hugging Face
sentiment_analyzer = pipeline("sentiment-analysis")

# Run sentiment analysis on the cleaned text and add results to the DataFrame
df['sentiment'] = df['cleaned_text'].apply(lambda x: sentiment_analyzer(x)[0]['label'])
df['confidence'] = df['cleaned_text'].apply(lambda x: sentiment_analyzer(x)[0]['score'])

# Display the results
print("\nSentiment Analysis Results:")
print(df[['title', 'cleaned_text', 'sentiment', 'confidence']].head())

# Optional: If you have ground truth labels for evaluation, you can compare them.
# Assuming true sentiment labels are in a 'true_sentiment' column in your dataset
if 'true_sentiment' in df.columns:
    print("\nClassification Report:")
    print(classification_report(df['true_sentiment'], df['sentiment']))

# Save the results to a new CSV file
df.to_csv('sentiment_analysis_results.csv', index=False)

print("\nSentiment analysis results saved to 'sentiment_analysis_results.csv'")