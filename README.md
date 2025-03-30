# Medify

## Overview
Medify is an advanced AI-powered platform for the early and accurate detection of Adverse Drug Reactions (ADRs). It integrates multiple heterogeneous data sources, including FDA reports, unstructured patient feedback, and real-time social media discourse. Medify provides explainable AI insights to help users and healthcare professionals make informed decisions about drug safety.

## Features
- **Drug Search & Analysis**: Users can search for a drug and retrieve FDA reports, label composition, and known side effects.
- **Reddit-Based Sentiment & ADR Analysis**: Scrapes Reddit for anonymous yet legitimate user experiences regarding drug effects.
- **ADR Count & Statistics**: Aggregates patient reports to show the number of individuals affected by specific side effects.
- **Personal Health Record Analysis**: Users can upload past medical records to detect if a drug was responsible for previous adverse reactions.
- **Hospital Risk Analysis**: Healthcare institutions can assess patient susceptibility to diseases based on drug interaction data and historical trends.

## How It Works
1. **Data Aggregation**:
   - FDA reports are fetched and analyzed.
   - Social media (Reddit) data is scraped and classified using NLP models.
   - User-provided medical records are processed for potential ADR detection.
   
2. **AI-Powered Causal Detection**:
   - Uses Explainable AI (XAI) models to determine causal relationships between drugs and adverse reactions.
   - Overcomes data sparsity and bias through robust ML techniques.

3. **User Interaction**:
   - Simple search interface for retrieving drug-related information.
   - Insights into how many users report specific side effects.
   - Custom alerts for hospitals regarding at-risk patients.

## Tech Stack
- **Backend**: FastAPI / NextJS for API handling.
- **Database**: MongoDB.
- **AI & NLP**: Various models like logistic regression and NLP is used.
- **Frontend**: NextJS for visualization.
- **Scraping**: Reddit API for real-time ADR discussions.

## Future Enhancements
- Integrate real-time notifications for hospitals when a drug is flagged as high-risk.
- Expand social media analysis to platforms like Twitter and patient forums.
- Implement a patient-community portal for verified ADR reports.

## Contributing
We welcome open-source contributions! Feel free to submit issues, feature requests, or pull requests to help improve Medify.

## License
This project is licensed under the [MIT License]().

