# ekr_docs

ML based contract infomartion extraction with storage and search functions.

Currently [pretrained](https://github.com/Duegreg/ekr_docs/blob/main/model/model.ipynb) for Hungarian [EKR documents](https://ekr.gov.hu/ekr-szerzodestar/hu/szerzodesLista), but you can replace it with your own custom model.

## Services:
___
### backend
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
### model
- `predict`
- -> batch text information extraction with CRFSuite ML model
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
