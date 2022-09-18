# Intelligent document processing with ML

ML based contract infomartion extraction system with storage and search functions.

Currently [pretrained](https://github.com/GergoMiklos/document-processing-with-ai/blob/main/model/model.ipynb) for Hungarian [EKR documents](https://ekr.gov.hu/ekr-szerzodestar/hu/szerzodesLista) (national contracts), but you can replace it with your own custom model. Automatic retrain is in TODO.

## Services:
___
### Backend
- `upload pdfs`
-  -> store pdf file in AWS S3
-  -> exract text with Tesseract OCR 
-  -> exract information with [model service](#model)
-  -> store text data in Elastic Search
- `search`
- -> return pdf text data by query (match/levenhstein/regex/...)
- `download`
- -> download pdf file by filename

Technologies: JavaScript, Express.js + Pdf-Poppler, Tesseract-OCR, Elastic Search, AWS S3
___
### Model
- `predict`
- -> batch text information extraction with CRFSuite ML [model](https://github.com/GergoMiklos/document-processing-with-ai/blob/main/model/model.ipynb) (Conditional Random Fields)
- -> many other (DL) models have been tried, but those reached lower accuracy for this amount of data
- `train`
- -> todo

Can run .py and .ipynb model files

- tried models ([dataset](https://www.kaggle.com/miklosgergely/ekr-docs)):
  - Embedding + bi-LSTM
  - Embedding + bi-LSTM + LSTM
  - Embedding + bi-LSTM + LSTM + CRF
  - Bert
  - XGBoost
  - CRFSuite

Technologies: Python, Flask + Keras, PyTorch, Bert, XGboost, PyCRFSuite
___
### frontend
- in progress

Technologies: JavaScript, React
___
