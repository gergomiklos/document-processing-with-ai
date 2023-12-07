# Intelligent document processing with AI

ML-based PDF infomartion extraction system with storage and search functions.

Currently [pretrained](https://github.com/GergoMiklos/document-processing-with-ai/blob/main/model/model.ipynb) for Hungarian [EKR documents](https://ekr.gov.hu/ekr-szerzodestar/hu/szerzodesLista) (some official national contracts), but you can train 6 different models with your own data.

## Services:
### Backend
- `upload pdfs`
  -  store pdf file in AWS S3
  -  exract text with Tesseract OCR 
  -  exract information using the __model__ service
  -  store text data in Elastic Search
- `search`
  - return pdf text data by query (match/levenhstein/regex/...)
- `download`
  - download pdf file by filename

Tech: JavaScript, Express.js, Pdf-Poppler, Tesseract-OCR, Elastic Search, AWS S3

### Model
The backend can run any .py and .ipynb files as  with the excepted input/output formats

- `predict`
  - batch text information extraction with CRFSuite ML [model](https://github.com/GergoMiklos/document-processing-with-ai/blob/main/model/model.ipynb) (Conditional Random Fields)
  - many other models have been tried, but those reached lower accuracy for this amount of data
- `train`
  - todo

- tested models ([dataset](https://www.kaggle.com/miklosgergely/ekr-docs)):
  - Custom neural networks:
    - Embedding + bi-LSTM
    - Embedding + bi-LSTM + LSTM
    - Embedding + bi-LSTM + LSTM + CRF
  - Bert
  - XGBoost
  - CRFSuite

Tech: Python, Flask, Keras, PyTorch, Bert, XGboost, PyCRFSuite

### Frontend
- draft

Tech: JavaScript, React

