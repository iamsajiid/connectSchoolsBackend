import recommendation as r
from flask import Flask, request, jsonify


recommendationSystem = r.recommendation_model()
try:
    recommendationSystem.fit('connectschools.test.csv')
    print('trained successfully')
except:
    print('failed to start recommendation API')
app = Flask(__name__)
 
@app.route('/recommend', methods =['GET'])
def hello_world():
    try:
        print('hello')
        name = request.args.get('name')
        print(name)
        ids = recommendationSystem.recommend(name)
        return jsonify((ids))
    except:
        return 'improper api called'
 
# main driver function
if __name__ == '__main__':
    print('hellow')
    app.run()