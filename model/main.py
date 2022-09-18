import import_ipynb
from flask import Flask
from flask import request
# noinspection PyUnresolvedReferences
from model import init, predict

app = Flask(__name__)

init_data = None


def init_app():
    global init_data
    init_data = init()


@app.route('/predict', methods=['POST'])
def predict_endpoint():
    return {
        'results': predict(request.json, init_data)
    }


if __name__ == '__main__':
    init_app()
    app.run()
