import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, confusion_matrix
from imblearn.over_sampling import SMOTE
from sklearn.feature_extraction.text import TfidfVectorizer
import matplotlib.pyplot as plt
import seaborn as sns
from collections import Counter
import joblib
# Sample Data - Replace this with your actual dataset
data = {
    'medication': ['varenicline', 'varenicline', 'metformin', 'metformin', 'aspirin', 'aspirin', 'valsartan', 'valsartan', 'sildenafil', 'sildenafil',
                   'varenicline', 'varenicline', 'metformin', 'metformin', 'aspirin', 'aspirin', 'valsartan', 'valsartan', 'sildenafil', 'sildenafil',
                   'varenicline', 'varenicline', 'metformin', 'metformin', 'aspirin', 'aspirin', 'valsartan', 'valsartan', 'sildenafil', 'sildenafil'],
    'symptom': ['nausea', 'vomiting', 'nausea', 'vomiting', 'nausea', 'vomiting', 'nausea', 'vomiting', 'nausea', 'vomiting',
                'fatigue', 'dizziness', 'headache', 'abdominal pain', 'diarrhea', 'fever', 'shortness of breath', 'chest pain', 'rash', 'sweating',
                'jaundice', 'jaundice', 'fatigue', 'weight loss', 'dehydration', 'tremors', 'muscle pain', 'joint pain', 'swelling', 'elevated liver enzymes'],
    'causality': [
        1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 
        1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 
        1, 0, 1, 1, 0, 1, 1, 0, 0, 1
    ]   # 1 indicates adverse event (causality), 0 means no causality
}
df = pd.DataFrame(data)
# Step 1: Vectorization of text (medication + symptom) using TF-IDF
vectorizer = TfidfVectorizer()
X = vectorizer.fit_transform(df['medication'] + ' ' + df['symptom'])
y = df['causality']
# Step 2: Balance the dataset using SMOTE (Synthetic Minority Over-sampling Technique)
smote = SMOTE(random_state=42, k_neighbors=2)
X_resampled, y_resampled = smote.fit_resample(X, y)
# Check class distribution after resampling
print(f"Class distribution after SMOTE: {Counter(y_resampled)}")
# Step 3: Train-test split
X_train, X_test, y_train, y_test = train_test_split(X_resampled, y_resampled, test_size=0.2, random_state=42)
# Step 4: Train the model with RandomForestClassifier
model = RandomForestClassifier(n_estimators=100, random_state=42, class_weight='balanced')
model.fit(X_train, y_train)
# Step 5: Cross-validation to evaluate the model
cv_scores = cross_val_score(model, X_resampled, y_resampled, cv=5)
print(f"Cross-validation results (Accuracy): {cv_scores}")
print(f"Mean Accuracy: {cv_scores.mean()}")
print(f"Standard Deviation of Accuracy: {cv_scores.std()}")
# Step 6: Evaluate the model
y_pred = model.predict(X_test)
print("\nClassification Report:\n", classification_report(y_test, y_pred))
# Step 7: Confusion Matrix
cm = confusion_matrix(y_test, y_pred)
plt.figure(figsize=(8, 6))
sns.heatmap(cm, annot=True, fmt='d', cmap='Blues')
plt.xlabel('Predicted')
plt.ylabel('Actual')
plt.title('Confusion Matrix')
plt.show()
# Step 8: Function to detect adverse events in clinical text
class AdverseEventDetector:
    def __init__(self, model, vectorizer, medications_list, symptoms_list):
        self.model = model
        self.vectorizer = vectorizer
        self.medications_list = medications_list
        self.symptoms_list = symptoms_list
    def detect_adverse_events(self, clinical_text):
        results = []
        # Check for each combination of medication and symptom
        for medication in self.medications_list:
            for symptom in self.symptoms_list:
                # Combine medication and symptom for prediction
                feature_vector = self.vectorizer.transform([medication + ' ' + symptom + ' ' + clinical_text])
                
                # Predict causality
                causality_prob = self.model.predict_proba(feature_vector)[0][1]
                # If causality probability is greater than 0.5, consider it an adverse event
                if causality_prob > 0.5:
                    results.append({
                        "medication": medication,
                        "symptom": symptom,
                        "causality_probability": causality_prob
                    })
        return results
# Step 9: Test the detector with sample clinical text
medications_list = ['varenicline', 'metformin', 'aspirin', 'valsartan', 'sildenafil']
symptoms_list = ['nausea', 'vomiting', 'jaundice', 'elevated liver enzymes', 'fatigue']
detector = AdverseEventDetector(model, vectorizer, medications_list, symptoms_list)
sample_text = """
A 69-year-old Latino man was seen for urgent consultation in the outpatient Hepatology Clinic for evaluation of new onset jaundice and substantially elevated liver enzymes associated with nausea
and extreme malaise that developed three weeks prior to presentation. The patient's past medical
history was notable for type 2 diabetes mellitus, hypertension and tobacco abuse. He had no known
diagnosis of chronic liver disease prior to the onset this illness. The patient was prescribed
varenicline 0.5 mg orally once daily, which he began taking four weeks prior to his presentation
in Hepatology Clinic. Five days after starting the varenicline, the patient developed new onset
nausea, vomiting, decreased appetite, weight loss and extreme malaise. The patient's son noticed
yellowing of his father's eyes. Given these symptoms, the patient discontinued the varenicline on
his own at day 5. Approximately two months after stopping the varenicline, the patient's AST, ALT
and Alk Phos had normalized with near-normalization of the T Bili. He reported a substantial
improvement in his health status and normalization of his activity levels with resolution of the
nausea, vomiting, fatigue and jaundice, and a return of his appetite.
"""
result = detector.detect_adverse_events(sample_text)
print("\nDetection Results:", result)
# Save the trained model and vectorizer to disk
joblib.dump(model, 'random_forest_model.pkl')
joblib.dump(vectorizer, 'tfidf_vectorizer.pkl')
joblib.dump(medications_list, 'medications_list.pkl')
joblib.dump(symptoms_list, 'symptoms_list.pkl')
print("Model and vectorizer saved!")
