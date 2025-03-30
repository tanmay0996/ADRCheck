from fastapi import FastAPI, HTTPException
import joblib
from pydantic import BaseModel
from typing import List

# Load the saved model and vectorizer
model = joblib.load("random_forest_model.pkl")
vectorizer = joblib.load("tfidf_vectorizer.pkl")
medications_list = joblib.load("medications_list.pkl")
symptoms_list = joblib.load("symptoms_list.pkl")

class AdverseEventDetector:
    def __init__(self, model, vectorizer, medications_list, symptoms_list):
        self.model = model
        self.vectorizer = vectorizer
        self.medications_list = medications_list
        self.symptoms_list = symptoms_list

    def detect_adverse_events(self, clinical_text):
        results = []
        for medication in self.medications_list:
            for symptom in self.symptoms_list:
                feature_vector = self.vectorizer.transform([medication + ' ' + symptom + ' ' + clinical_text])
                causality_prob = self.model.predict_proba(feature_vector)[0][1]
                if causality_prob > 0.5:
                    results.append({
                        "medication": medication,
                        "symptom": symptom,
                        "causality_probability": causality_prob
                    })
        return results

# Initialize API and Detector
app = FastAPI()
detector = AdverseEventDetector(model, vectorizer, medications_list, symptoms_list)

class ClinicalTextInput(BaseModel):
    text: str

@app.post("/detect_adverse_events")
async def detect_adverse_events(input_data: ClinicalTextInput):
    result = detector.detect_adverse_events(input_data.text)
    return {"detected_adverse_events": result}

